import type { NFTMeta } from "@/types/NFT"
import { toIpfsUri } from "@/lib/ipfs-utils"

type UploadResponse = {
	cid: string
	name: string
	size: string
}

async function postToIpfsApi(body: FormData): Promise<UploadResponse> {
	const res = await fetch("/api/ipfs/upload", {
		method: "POST",
		body
	})

	if (!res.ok) {
		const payload = (await res.json().catch(() => null)) as { error?: string } | null
		throw new Error(payload?.error ?? `IPFS 上传失败（${res.status}）`)
	}

	return res.json() as Promise<UploadResponse>
}

/** 上传图片文件，返回 CID */
export async function uploadImageToIPFS(file: File): Promise<string> {
	const formData = new FormData()
	formData.append("file", file)
	const { cid } = await postToIpfsApi(formData)
	return cid
}

/** 上传 ERC-721 元数据 JSON，imageUri 应为 ipfs:// 图片 CID */
export async function uploadNftMetadataToIpfs(meta: NFTMeta): Promise<string> {
	const res = await fetch("/api/ipfs/upload", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(meta)
	})

	if (!res.ok) {
		const payload = (await res.json().catch(() => null)) as { error?: string } | null
		throw new Error(payload?.error ?? `元数据上传失败（${res.status}）`)
	}

	const { cid } = (await res.json()) as UploadResponse
	return cid
}

/** 图片 + 元数据一步上传，返回铸造用的 tokenURI */
export async function prepareNftTokenUri(
	file: File,
	meta: Omit<NFTMeta, "imageUri">
): Promise<{ imageCid: string; tokenUri: string }> {
	const imageCid = await uploadImageToIPFS(file)
	const metadataCid = await uploadNftMetadataToIpfs({
		...meta,
		imageUri: toIpfsUri(imageCid)
	})

	return {
		imageCid,
		tokenUri: toIpfsUri(metadataCid)
	}
}
