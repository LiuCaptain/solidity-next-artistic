"use client"
import { createContext, useState, useMemo, useContext, useCallback } from "react"
import { BrowserProvider } from "ethers"
import type { Signer } from "ethers"
import { notification } from "antd"
import { getDefaultNetworkConfig } from "@/network-config"

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
	const [api, contextHolder] = notification.useNotification()
	const [etherState, setEtherState] = useState<EtherState>({
		provider: null,
		signer: null,
		address: null
	})

	const connectOnce = useCallback(async () => {
		if (window.ethereum === undefined || window.ethereum === null) {
			api.error({ description: "请安装 Metamask 钱包" })
			throw new Error("请安装 Metamask 钱包")
		}
		const provider = new BrowserProvider(window.ethereum)
		const signer = await provider.getSigner()
		const address = await signer.getAddress()
		const balance = await provider.getBalance(address)
		const network = await provider.getNetwork()
		const chainId = network.chainId

		setEtherState({
			provider: provider,
			signer: signer,
			address: address
		})
		console.log(
			"provider",
			provider,
			"signer",
			signer,
			"address",
			address,
			"balance",
			balance,
			"chainId",
			chainId
		)

		return { provider, signer, address, balance, chainId }
	}, [api])

	const tryConnect = useCallback(async () => {
		const { chainId, address, provider, signer } = await connectOnce()
		const targetChainId = chainId.toString()
		const supportedChainId = getDefaultNetworkConfig().chainId.toString()

		if (targetChainId === supportedChainId) {
			const message = `钱包连接成功，当前链接账号：${address}`
			api.success({ description: message })
			return { success: true, provider, signer, address }
		} else {
			const message = `当前钱包网络与应用支持的网络不一致，请切换到${supportedChainId}网络`
			api.error({ description: message })
			return { success: false }
		}
	}, [connectOnce, api])

	const connectWallet = useCallback(async () => {
		const { success } = await tryConnect()
		if (success) return
		const defaultNetworkConfig = getDefaultNetworkConfig()
		try {
			await window.ethereum!.request({
				method: "wallet_switchEthereumChain",
				params: defaultNetworkConfig.params
			})
		} catch (error) {
			console.log(error)
			await window.ethereum!.request({
				method: "wallet_addEthereumChain",
				params: defaultNetworkConfig.params
			})
		}
	}, [tryConnect])

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

	return (
		<EtherProviderContext value={contextValue}>
			{contextHolder}
			{children}
		</EtherProviderContext>
	)
}

export const useEtherProvider = () => {
	const context = useContext(EtherProviderContext)

	if (context === null) {
		throw new Error("useEtherProvider must be used within EtherProviderContent")
	}

	return context
}

export default EtherProviderContent
