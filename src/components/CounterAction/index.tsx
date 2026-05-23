"use client"
import { useEffect, useState, useCallback } from "react"
import { Contract } from "ethers"
import { useEtherProvider } from "@/provider/EtherProvider"
import styles from "./index.module.scss"
import counterJson from "@artifacts/contracts/Counter.sol/Counter.json"

const CounterAction = () => {
	const { provider, signer, isConnected } = useEtherProvider()
	const counterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
	const counterABI = counterJson.abi

	const [counterValue, setCounterValue] = useState(0)
	const getCounterValue = useCallback(async () => {
		const contract = new Contract(counterAddress, counterABI, provider)
		const x = await contract.x()
		setCounterValue(Number(x))
	}, [provider, counterABI])

	const handleIncrement = async (type: "normal" | "param") => {
		try {
			const contract = new Contract(counterAddress, counterABI, signer)
			switch (type) {
				case "normal":
					{
						const tx = await contract.inc()
						const receipt = await tx.wait()
						console.log("执行", receipt.blockNumber)
						await getCounterValue()
					}
					break
				case "param":
					const tx = await contract.incBy()
					console.log("param", tx)
					break
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!isConnected) return
		const sync = async () => {
			await getCounterValue()
		}
		void sync()
	}, [isConnected, getCounterValue])

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
					<strong className={styles.value}>{counterValue}</strong>
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

export default CounterAction
