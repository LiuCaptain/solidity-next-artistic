"use client"
import styles from "./index.module.scss"
import { useEtherProvider } from "@/provider/EtherProvider"

const Navigation = () => {
	const { connectWallet, isConnected } = useEtherProvider()

	const handleConnectWallet = async () => {
		await connectWallet()
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
				{isConnected ? "已连接" : "链接钱包"}
			</button>
		</header>
	)
}

export default Navigation
