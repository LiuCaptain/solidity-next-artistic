const networkList = [
	{
		name: "Hardhat 测试网络",
		value: "localhost",
		disabled: false,
		chainId: 31337
	},
	{
		name: "Sepolia 测试网络",
		value: "sepolia",
		disabled: false,
		chainId: 11155111
	},
	{
		name: "Ethereum 主网",
		value: "mainnet",
		disabled: false,
		chainId: 1
	}
]

export const contractList = [
	{
		name: "Counter",
		value: "Counter",
		description: "计算器合约",
		testValue: "pnpm hardhat test test/Counter.ts",
		deployValue: "pnpm hardhat ignition deploy ignition/modules/Counter.ts",
		deployedAddressKey: "CounterModule#Counter",
		disabled: false,
		networkList: networkList
	}
]
