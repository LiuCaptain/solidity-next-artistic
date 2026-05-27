import select from "@inquirer/select"
import { execa, parseCommandString } from "execa"
import chalk from "chalk"
import { readFile } from "node:fs/promises"
import { contractList } from "./constant"
import { getContractOperationText } from "./utils"

const contractValue = await select({
	message: `请选择要${getContractOperationText()}的智能合约`,
	choices: contractList.map((item) => ({
		name: item.name,
		value: item.value,
		description: item.description,
		disabled: item.disabled
	}))
})

const currentContract = contractList.find((item) => item.value === contractValue)!
const networkList = currentContract.networkList
const networkValue = await select({
	message: `请选择${getContractOperationText()}所在的区块链网络`,
	choices: networkList
})
const currentNetwork = networkList.find((item) => item.value === networkValue)!
const chainId = currentNetwork.chainId

switch (process.env.type) {
	case "test": {
		const command = `${currentContract.testValue} --network ${currentNetwork.value}`
		console.log("command", command)
		const [file, ...args] = parseCommandString(command)
		await execa(file, args, { stdio: "inherit" })
		break
	}
	case "deploy": {
		const command = `${currentContract.deployValue} --network ${currentNetwork.value}`
		const [file, ...args] = parseCommandString(command)
		await execa(file, args, { stdio: "inherit" })

		const deployedAddressesPath = `ignition/deployments/chain-${chainId}/deployed_addresses.json`
		const fileJSON = await readFile(deployedAddressesPath, "utf-8")
		const deployedAddresses = JSON.parse(fileJSON) as Record<string, string>
		const deployedAddress = deployedAddresses[currentContract.deployedAddressKey]
		if (deployedAddress) {
			const message = `合约部署成功: ${deployedAddress}`
			console.log(chalk.green.bold(message))
		} else {
			const message = `未能通过 ${currentContract.deployedAddressKey} 获取合约地址`
			console.log(chalk.red.bold(message))
		}
		break
	}
}
