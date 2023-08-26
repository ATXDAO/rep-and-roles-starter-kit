// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {RepTokensInstance} from "../src/RepTokensInstance.sol";
import {Script, console} from "forge-std/Script.sol";

contract DeployRepTokensInstance is Script {
    function run(address[] memory admins, uint256 maxMintAmount, string memory baseURI)
        public
        returns (RepTokensInstance)
    {
        vm.startBroadcast();
        RepTokensInstance instance = new RepTokensInstance(admins, maxMintAmount, baseURI);
        vm.stopBroadcast();
        return instance;
    }
}
