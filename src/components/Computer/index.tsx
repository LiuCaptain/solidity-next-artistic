"use client"
import styles from "./index.module.scss"
import counterJson from "@artifacts/contracts/Counter.sol/Counter.json"

const Computer = () => {
	const handleIncrement = (type: "normal" | "param") => {
		const counterABI = counterJson.abi
		const counterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
		console.log("counterABI", counterABI, type, counterAddress)
	}

	return (
		<section className={styles.computer} aria-labelledby="counter-title">
			<div className={styles.panel}>
				<p className={styles.eyebrow}>Hardhat Local Contract</p>
				<h1 id="counter-title" className={styles.title}>
					Counter 控制台
				</h1>
				<p className={styles.description}>
					通过下方按钮触发 Counter 合约中的自增方法。合约调用逻辑可以稍后接入到按钮事件中。
				</p>

				<div className={styles.valueCard}>
					<span className={styles.valueLabel}>当前计数</span>
					<strong className={styles.value}>--</strong>
				</div>

				<div className={styles.actions}>
					<button
						className={styles.primaryButton}
						type="button"
						onClick={() => handleIncrement("normal")}
					>
						调用 inc()
					</button>
					<button
						className={styles.secondaryButton}
						type="button"
						onClick={() => handleIncrement("param")}
					>
						调用 incBy()
					</button>
				</div>
			</div>
		</section>
	)
}

export default Computer
