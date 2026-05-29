"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Button from "@/components/Button"
import styles from "./index.module.scss"
import { useEtherProvider } from "@/provider/EtherProvider"

const Navigation = () => {
	const pathname = usePathname()
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
			<Link className={styles.brand} href="/">
				Artistic Contracts
			</Link>

			<nav className={styles.nav} aria-label="Primary navigation">
				<Link className={pathname === "/" ? styles.navActive : undefined} href="/">
					控制台
				</Link>
				<Link className={pathname === "/mint" ? styles.navActive : undefined} href="/mint">
					铸造 NFT
				</Link>
				<a href="#">部署工具</a>
				<a href="#">链上数据</a>
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
