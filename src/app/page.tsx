import Navigation from "@/components/Navigation"
import Computer from "@/components/Computer"
import styles from "./page.module.scss"

export default function Home() {
	return (
		<main className={styles.page}>
			<Navigation />
			<Computer></Computer>
		</main>
	)
}
