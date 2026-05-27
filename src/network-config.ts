type Params = {
	chainId: string
	rpcUrls: string[]
	chainName: string
	nativeCurrency: {
		name: string
		symbol: string
		decimals: number
	}
	blockExplorerUrls: string[]
}

interface NetworkConfig {
	chainId: number
	artisticNFTAddress: string
	params: Params[]
}

const netWorkConfig: NetworkConfig[] = [
	{
		chainId: 0x7a69, // 31337
		artisticNFTAddress: "",
		params: [
			{
				chainId: "0x7a69",
				rpcUrls: ["http://127.0.0.1:8545"],
				chainName: "localhost-hardhat",
				nativeCurrency: {
					name: "hardhatETH",
					symbol: "hardhatETH",
					decimals: 18
				},
				blockExplorerUrls: ["https://polygonscan.com"]
			}
		]
	},
	{
		chainId: 0x539, // 1337
		artisticNFTAddress: "",
		params: [
			{
				chainId: "0x539",
				rpcUrls: ["http://127.0.0.1:8545"],
				chainName: "localhost-ganache",
				nativeCurrency: {
					name: "GETH",
					symbol: "GETH",
					decimals: 18
				},
				blockExplorerUrls: ["https://polygonscan.com"]
			}
		]
	}
]

const getDefaultNetworkConfig = () => {
	return netWorkConfig[0]
}

export { getDefaultNetworkConfig }

export default netWorkConfig
