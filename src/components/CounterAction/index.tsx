"use client"
import { useEffect, useState, useCallback } from "react"
import { Contract } from "ethers"
import { useEtherProvider } from "@/provider/EtherProvider"
import Button from "@/components/Button"
import styles from "./index.module.scss"
import counterJson from "@artifacts/contracts/Counter.sol/Counter.json"

type IncrementType = "normal" | "params"

const CounterAction = () => {
	const { provider, signer, isConnected } = useEtherProvider()
	const counterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
	const counterABI = counterJson.abi

	const [counterValue, setCounterValue] = useState(0)
	const [loadingType, setLoadingType] = useState<IncrementType | null>(null)
	const getCounterValue = useCallback(async () => {
		const contract = new Contract(counterAddress, counterABI, provider)
		const x = await contract.x()
		setCounterValue(Number(x))
	}, [provider, counterABI])

	const handleIncrement = async (type: IncrementType) => {
		setLoadingType(type)
		try {
			const contract = new Contract(counterAddress, counterABI, signer)
			const tx = type === "normal" ? await contract.inc() : await contract.incBy(8n)
			const receipt = await tx.wait()
			if (receipt.status === 1) await getCounterValue()
		} catch (error) {
			console.log(error)
		} finally {
			setLoadingType(null)
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
					<Button
						disabled={!!loadingType}
						loading={loadingType === "normal"}
						loadingText="调用中..."
						onClick={() => handleIncrement("normal")}
					>
						调用 inc()
					</Button>
					<Button
						disabled={!!loadingType}
						loading={loadingType === "params"}
						loadingText="调用中..."
						onClick={() => handleIncrement("params")}
						variant="secondary"
					>
						调用 incBy(1)
					</Button>
				</div>
			</div>
		</section>
	)
}

export default CounterAction
