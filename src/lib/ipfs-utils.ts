/** CID → 链上/元数据里使用的 URI */
export function toIpfsUri(cid: string): string {
	return `ipfs://${cid}`
}

/** ipfs://… 或裸 CID → 可在 <img src> 中使用的 Gateway URL */
export function resolveIpfsUrl(
	uri: string,
	gateway = process.env.NEXT_PUBLIC_IPFS_GATEWAY
): string {
	if (!uri) return ""

	if (uri.startsWith("ipfs://")) {
		const path = uri.slice("ipfs://".length).replace(/^\/+/, "")
		return `${gateway}/ipfs/${path}`
	}

	if (uri.startsWith("/ipfs/")) {
		return `${gateway}${uri}`
	}

	if (/^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|bafy[a-z0-9]+)/i.test(uri)) {
		return `${gateway}/ipfs/${uri}`
	}

	return uri
}
