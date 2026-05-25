export const getContractOperationText = () => {
	switch (process.env.type) {
		case "test":
			return "测试"
		case "deploy":
			return "部署"
	}
}
