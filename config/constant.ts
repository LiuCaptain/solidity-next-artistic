const environmentList = [
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
		value: "pnpm hardhat ignition deploy ignition/modules/Counter.ts --network",
		deployedAddressKey: "CounterModule#Counter",
		description: "计算器合约",
		disabled: false,
		environmentList: environmentList
	},
	{
		name: "Lock",
		value: "pnpm hardhat ignition deploy ignition/modules/Lock.ts --network",
		deployedAddressKey: "LockModule#Lock",
		description: "锁仓合约",
		disabled: false,
		environmentList: environmentList
	}
]
