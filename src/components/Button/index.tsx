"use client"

import { Fragment } from "react"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import styles from "./index.module.scss"

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
	variant?: "primary" | "secondary"
	loading?: boolean
	loadingText?: ReactNode
}

const Button: React.FC<ButtonProps> = ({
	children,
	className,
	disabled,
	loading = false,
	loadingText,
	type = "button",
	variant = "primary",
	...props
}: ButtonProps) => {
	const buttonClassName = [
		styles.button,
		styles[variant],
		loading ? styles.loading : "",
		className ?? ""
	]
		.filter(Boolean)
		.join(" ")

	return (
		<button {...props} className={buttonClassName} disabled={disabled || loading} type={type}>
			{loading ? (
				<Fragment>
					<span className={styles.loadingIcon} />
					{loadingText ?? children}
				</Fragment>
			) : (
				children
			)}
		</button>
	)
}

export default Button
