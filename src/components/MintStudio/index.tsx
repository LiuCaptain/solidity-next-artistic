import styles from "./index.module.scss"

/**
 * NFT 铸造页静态 UI（仅布局与样式，不含 IPFS / 合约逻辑）
 */
const MintStudio = () => {
	return (
		<section className={styles.studio} aria-labelledby="mint-title">
			<div className={styles.shell}>
				<header className={styles.hero}>
					<p className={styles.eyebrow}>ArtisticNFT · ERC-721</p>
					<h1 id="mint-title" className={styles.title}>
						铸造你的链上作品
					</h1>
					<p className={styles.subtitle}>
						上传图片、填写名称与描述，元数据将存到 IPFS，再通过{" "}
						<code className={styles.contractChip}>mint(to, tokenURI)</code>{" "}
						写入合约。当前页面仅为界面预览。
					</p>

					<ol className={styles.steps} aria-label="铸造流程">
						<li className={`${styles.step} ${styles.stepActive}`}>
							<span className={styles.stepIndex}>1</span>
							上传作品
						</li>
						<li className={styles.step}>
							<span className={styles.stepIndex}>2</span>
							填写信息
						</li>
						<li className={styles.step}>
							<span className={styles.stepIndex}>3</span>
							上链铸造
						</li>
					</ol>
				</header>

				<div className={styles.walletBar}>
					<span className={styles.walletLabel}>铸造前需连接钱包</span>
					<span className={styles.walletBadge}>未连接</span>
				</div>

				<div className={styles.grid}>
					<div className={styles.panel}>
						<h2 className={styles.panelTitle}>作品信息</h2>

						<div className={styles.field}>
							<span className={styles.label} id="mint-image-label">
								作品图片
							</span>
							<div className={styles.uploadWrap}>
								<label className={styles.upload} htmlFor="mint-image">
									<span className={styles.uploadIcon} aria-hidden>
										+
									</span>
									<p className={styles.uploadTitle}>点击或拖拽上传图片</p>
									<p className={styles.uploadMeta}>支持 PNG、JPG、GIF · 建议 1:1 比例</p>
								</label>
								<input
									className={styles.fileInput}
									id="mint-image"
									type="file"
									accept="image/png,image/jpeg,image/gif,image/webp"
									aria-labelledby="mint-image-label"
								/>
							</div>
							<p className={styles.hint}>接入逻辑后将调用 uploadImageToIpfs</p>
						</div>

						<div className={styles.field}>
							<label className={styles.label} htmlFor="mint-name">
								名称
							</label>
							<input
								className={styles.input}
								id="mint-name"
								name="name"
								type="text"
								placeholder="例如：星夜下的港湾"
								autoComplete="off"
								disabled
							/>
						</div>

						<div className={styles.field}>
							<label className={styles.label} htmlFor="mint-description">
								描述
							</label>
							<textarea
								className={styles.textarea}
								id="mint-description"
								name="description"
								placeholder="简要介绍这件作品的创作背景、风格或寓意…"
								disabled
							/>
						</div>

						<div className={styles.field}>
							<label className={styles.label} htmlFor="mint-recipient">
								接收地址（to）
							</label>
							<input
								className={styles.input}
								id="mint-recipient"
								name="recipient"
								type="text"
								placeholder="0x… 默认将铸造到当前连接的钱包地址"
								spellCheck={false}
								disabled
							/>
							<p className={styles.hint}>对应合约 mint(address to, string memory _tokenURI)</p>
						</div>

						<p className={styles.note}>
							界面占位：表单与按钮已禁用。后续可串联 prepareNftTokenUri → ArtisticNFT.mint。
						</p>

						<div className={styles.actions}>
							<button
								className={`${styles.actionButton} ${styles.actionSecondary}`}
								type="button"
								disabled
							>
								重置
							</button>
							<button
								className={`${styles.actionButton} ${styles.actionPrimary}`}
								type="button"
								disabled
							>
								上传 IPFS 并铸造
							</button>
						</div>
					</div>

					<div className={styles.panel}>
						<h2 className={styles.panelTitle}>预览与进度</h2>

						<div className={styles.previewFrame} aria-label="作品预览占位">
							上传图片后在此预览
						</div>

						<dl className={styles.metaList}>
							<div className={styles.metaItem}>
								<dt className={styles.metaKey}>名称</dt>
								<dd className={`${styles.metaValue} ${styles.metaValueMuted}`}>—</dd>
							</div>
							<div className={styles.metaItem}>
								<dt className={styles.metaKey}>描述</dt>
								<dd className={`${styles.metaValue} ${styles.metaValueMuted}`}>—</dd>
							</div>
							<div className={styles.metaItem}>
								<dt className={styles.metaKey}>image（元数据）</dt>
								<dd className={`${styles.metaValue} ${styles.metaValueMuted}`}>ipfs://…</dd>
							</div>
							<div className={styles.metaItem}>
								<dt className={styles.metaKey}>tokenURI（铸造参数）</dt>
								<dd className={`${styles.metaValue} ${styles.metaValueMuted}`}>ipfs://…</dd>
							</div>
						</dl>

						<ul className={styles.statusList} aria-label="上链步骤">
							<li className={styles.statusItem}>
								<span className={styles.statusDot} aria-hidden />
								等待上传图片到 IPFS
							</li>
							<li className={styles.statusItem}>
								<span className={styles.statusDot} aria-hidden />
								等待上传元数据 JSON 到 IPFS
							</li>
							<li className={styles.statusItem}>
								<span className={styles.statusDot} aria-hidden />
								等待调用合约铸造
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

export default MintStudio
