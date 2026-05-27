// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ArtisticNFT is ERC721Enumerable, ERC721URIStorage {
	uint256 private _nextTokenId;

	event CurrentTokenId(uint256 tokenId);

	constructor() ERC721("ArtisticNFT", "AN") {}

	function _increaseBalance(
		address account,
		uint128 value
	) internal override(ERC721, ERC721Enumerable) {
		super._increaseBalance(account, value);
	}

	function _update(
		address to,
		uint256 tokenId,
		address auth
	) internal override(ERC721, ERC721Enumerable) returns (address) {
		return super._update(to, tokenId, auth);
	}

	function supportsInterface(
		bytes4 interfaceId
	) public view override(ERC721Enumerable, ERC721URIStorage) returns (bool) {
		return super.supportsInterface(interfaceId);
	}

	function tokenURI(
		uint256 tokenId
	) public view override(ERC721, ERC721URIStorage) returns (string memory) {
		return super.tokenURI(tokenId);
	}

	// 铸币
	function mint(address to, string memory _tokenURI) public returns (uint256) {
		uint256 tokenId = _nextTokenId;
		emit CurrentTokenId(tokenId);
		_safeMint(to, tokenId);
		_setTokenURI(tokenId, _tokenURI);
		_nextTokenId++;
		return tokenId;
	}
}
