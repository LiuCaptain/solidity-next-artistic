import styles from "./page.module.scss"

export default function Home() {
	return (
		<main className={styles.page}>
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

				<button className={styles.walletButton} type="button">
					链接钱包
				</button>
			</header>
		</main>
	)
}
