import { expect } from "chai"
import { network } from "hardhat"

const { ethers } = await network.create()

describe("ArtisticNFT", function () {
	it("This is the first mint, and the expected tokenId is 0", async function () {
		const artisticNFT = await ethers.deployContract("ArtisticNFT")

		const [owner] = await ethers.getSigners()

		const tokenId = await artisticNFT.mint.staticCall(owner.address, "ifps://test-uri")
		expect(tokenId).to.equal(0n)
	})

	it("sets the correct owner and token URI after minting", async function () {
		const artisticNFT = await ethers.deployContract("ArtisticNFT")

		const [owner] = await ethers.getSigners()

		await artisticNFT.mint(owner.address, "ipfs://test-uri")

		const ownerOfToken = await artisticNFT.ownerOf(0n)
		expect(ownerOfToken).to.equal(owner.address)

		const tokenURI = await artisticNFT.tokenURI(0n)
		expect(tokenURI).to.equal("ipfs://test-uri")
	})
})
