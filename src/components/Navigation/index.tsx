"use client"
import styles from "./index.module.scss"
// import { BrowserProvider } from "ethers"

const Navigation = () => {
	const handleConnectWallet = () => {
		console.log("connect wallet")
		// if (window.ethereum == null) {
		// }
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
