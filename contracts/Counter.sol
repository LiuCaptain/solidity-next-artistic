// SPDX-License-Identifier: UNLICENSED
// 部署地址： 0x5fbdb2315678afecb367f032d93f642f64180aa3
pragma solidity ^0.8.28;

contract Counter {
	uint public x;

	event Increment(uint by);

	function inc() public {
		x++;
		emit Increment(1);
	}

	function incBy(uint by) public {
		require(by > 0, "incBy: increment should be positive");
		x += by;
		emit Increment(by);
	}
}
