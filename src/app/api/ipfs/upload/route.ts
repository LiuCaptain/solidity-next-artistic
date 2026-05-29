/**
 * 服务端 IPFS 上传代理
 *
 * 浏览器不能直接连本地 IPFS 节点（跨域、密钥等），所以前端 POST 到本路由，
 * 再由 Next.js 在服务端转发到 IPFS 守护进程的 HTTP API。
 */
import { NextResponse } from "next/server"

// 例如 http://127.0.0.1:5001，在 .env 里配置
const IPFS_API_URL = process.env.IPFS_API_URL

/** IPFS `add` 接口返回的单条记录（字段名是 IPFS 官方约定的 PascalCase） */
type IpfsAddResult = {
	Name: string // 上传时用的文件名
	Hash: string // 内容寻址 ID，即常说的 CID
	Size: string // 字节大小（字符串形式）
}

/**
 * 把一段二进制内容交给 IPFS 节点存储，并自动 pin（防止被 GC 清掉）
 */
async function addToIPFS(file: Blob, filename: string): Promise<IpfsAddResult> {
	const form = new FormData()
	form.append("file", file, filename)

	const res = await fetch(`${IPFS_API_URL}/api/v0/add?pin=true`, {
		method: "POST",
		body: form
	})

	if (!res.ok) {
		const text = await res.text()
		throw new Error(text || `IPFS API 请求失败（${res.status}）`)
	}

	// IPFS 可能返回多行 JSON（每加一个文件一行），取最后一行即本次结果
	const raw = await res.text()
	const line = raw.trim().split("\n").pop()
	if (!line) {
		throw new Error("IPFS API 返回为空")
	}

	return JSON.parse(line) as IpfsAddResult
}

/**
 * 处理 POST /api/ipfs/upload
 *
 * 根据请求头 Content-Type 分两种上传方式（见 ipfs-client.ts）：
 * - application/json → NFT 元数据
 * - multipart/form-data → 图片等文件（字段名须为 file）
 */
export async function POST(request: Request) {
	try {
		const contentType = request.headers.get("content-type") ?? ""

		// 分支一：前端用 JSON 上传 ERC-721 元数据（name、description、imageUri 等）
		if (contentType.includes("application/json")) {
			const json = await request.json()
			// 格式化成可读 JSON 再当作文件上传，链上/网关展示更整齐
			const content = JSON.stringify(json, null, 2)
			const file = new Blob([content], { type: "application/json" })
			const result = await addToIPFS(file, "metadata.json")
			return NextResponse.json({
				cid: result.Hash,
				name: result.Name,
				size: result.Size
			})
		}

		// 分支二：前端用 FormData 上传图片（或其它二进制）
		const formData = await request.formData()
		const file = formData.get("file")

		if (!(file instanceof Blob)) {
			return NextResponse.json({ error: "请通过 form-data 上传 file 字段" }, { status: 400 })
		}

		const filename = file instanceof File ? file.name : "upload.bin"
		const result = await addToIPFS(file, filename)

		return NextResponse.json({
			cid: result.Hash,
			name: result.Name,
			size: result.Size
		})
	} catch (error) {
		const message = error instanceof Error ? error.message : "IPFS 上传失败"
		// 502：本服务收到了请求，但转发 IPFS 或解析结果时失败
		return NextResponse.json({ error: message }, { status: 502 })
	}
}
