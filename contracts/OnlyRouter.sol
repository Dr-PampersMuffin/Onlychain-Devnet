// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IOnlyCoin {
    function transfer(address, uint256) external returns (bool);
    function balanceOf(address) external view returns (uint256);
}

contract OnlyRouter {
    address public token;

    constructor(address _token) {
        token = _token;
    }

    function buyOnlyCoin(address to, uint256 amount) public {
        IOnlyCoin(token).transfer(to, amount);
    }
}
