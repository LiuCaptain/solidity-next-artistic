"use client"
import { createContext, useState, useMemo, useContext, useCallback } from "react"
import { BrowserProvider } from "ethers"
import type { Signer } from "ethers"

interface ContextProps {
	provider: BrowserProvider | null
	signer: Signer | null
	address: string | null
	isConnected: boolean
	connectWallet: () => Promise<void>
	disconnectWallet: () => void
}

interface EtherProviderContentProps {
	children: React.ReactNode
}

interface EtherState {
	provider: BrowserProvider | null
	signer: Signer | null
	address: string | null
}

const EtherProviderContext = createContext<ContextProps | null>(null)

const EtherProviderContent: React.FC<EtherProviderContentProps> = ({ children }) => {
	const [etherState, setEtherState] = useState<EtherState>({
		provider: null,
		signer: null,
		address: null
	})

	const connectWallet = useCallback(async () => {
		if (window.ethereum === null) {
			throw new Error("请安装 Metamask 钱包")
		} else {
			const provider = new BrowserProvider(window.ethereum)
			const signer = await provider.getSigner()
			const address = await signer.getAddress()
			const balance = await provider.getBalance(address)
			console.log("address", address)

			setEtherState({
				provider: provider,
				signer: signer,
				address: address
			})
		}
	}, [])

	const disconnectWallet = useCallback(() => {
		setEtherState({
			provider: null,
			signer: null,
			address: null
		})
	}, [])

	const contextValue = useMemo(
		() => ({
			...etherState,
			isConnected: etherState.address !== null,
			connectWallet,
			disconnectWallet
		}),
		[etherState, connectWallet, disconnectWallet]
	)

	return <EtherProviderContext value={contextValue}>{children}</EtherProviderContext>
}

export const useEtherProvider = () => {
	const context = useContext(EtherProviderContext)

	if (context === null) {
		throw new Error("useEtherProvider must be used within EtherProviderContent")
	}

	return context
}

export default EtherProviderContent
