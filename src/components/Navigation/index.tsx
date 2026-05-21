"use client"
import { useRef } from "react"
import styles from "./index.module.scss"
import { BrowserProvider, Signer } from "ethers"

const Navigation = () => {
	const provider = useRef<BrowserProvider | null>(null)
	const signer = useRef<Signer | null>(null)

	const handleConnectWallet = async () => {
		if (window.ethereum == null) {
			alert("请安装 Metamask 钱包")
		} else {
			provider.current = new BrowserProvider(window.ethereum)
			signer.current = await provider.current.getSigner()
			const address = await signer.current.getAddress()
			console.log("address", address)
		}
	}

	return (
		<header className={styles.header}>
			<a className={styles.brand} href="#">
				Artistic Contracts
			</a>

			<nav className={styles.nav} aria-label="Primary navigation">
				<a href="#">合约市场</a>
				<a href="#">部署工具</a>
				<a href="#">链上数据</a>
				<a href="#">开发文档</a>
			</nav>

			<button className={styles.walletButton} type="button" onClick={handleConnectWallet}>
				链接钱包
			</button>
		</header>
	)
}

export default Navigation
