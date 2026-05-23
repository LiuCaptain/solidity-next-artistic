import Navigation from "@/components/Navigation"
import CounterAction from "@/components/CounterAction"
import styles from "./page.module.scss"

export default function Home() {
	return (
		<main className={styles.page}>
			<Navigation />
			<CounterAction></CounterAction>
		</main>
	)
}
