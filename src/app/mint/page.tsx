import Navigation from "@/components/Navigation"
import MintStudio from "@/components/MintStudio"
import styles from "./page.module.scss"

export default function MintPage() {
	return (
		<main className={styles.page}>
			<Navigation />
			<MintStudio />
		</main>
	)
}
