import Link from "next/link"
import styles from "./index.module.scss"

/** 首页 → 铸造页入口卡片 */
const HomeMintEntry = () => {
	return (
		<section className={styles.section} aria-label="铸造入口">
			<div className={styles.inner}>
				<Link className={styles.card} href="/mint">
					<div className={styles.copy}>
						<span className={styles.tag}>ArtisticNFT</span>
						<h2 className={styles.title}>铸造 NFT</h2>
						<p className={styles.desc}>上传作品、填写元数据，一键完成 IPFS 存储与链上 mint。</p>
					</div>
					<span className={styles.cta}>进入铸造台</span>
				</Link>
			</div>
		</section>
	)
}

export default HomeMintEntry
