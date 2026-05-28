"use client"
import { useState } from "react"
import Button from "@/components/Button"
import styles from "./index.module.scss"
import { useEtherProvider } from "@/provider/EtherProvider"

const Navigation = () => {
	const { connectWallet, isConnected } = useEtherProvider()

	const [connectLoading, setConnectLoading] = useState(false)
	const handleConnectWallet = async (): Promise<void> => {
		setConnectLoading(true)
		try {
			await connectWallet()
		} finally {
			setConnectLoading(false)
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

			<Button
				className={styles.walletButton}
				type="button"
				loading={connectLoading}
				onClick={handleConnectWallet}
			>
				{isConnected ? "已连接" : "链接钱包"}
			</Button>
		</header>
	)
}

export default Navigation
