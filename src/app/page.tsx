import Navigation from "@/components/Navigation"
import HomeMintEntry from "@/components/HomeMintEntry"
import CounterAction from "@/components/CounterAction"
import styles from "./page.module.scss"

export default function Home() {
	return (
		<main className={styles.page}>
			<Navigation />
			<HomeMintEntry />
			<CounterAction />
		</main>
	)
}
