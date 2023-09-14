// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {RepTokens} from "../src/RepTokens.sol";

contract DeployRepTokens is Script {
    function run(address[] memory admins, uint256 maxMintAmountPerTx, string memory tokenURI)
        external
        returns (RepTokens)
    {
        vm.startBroadcast();
        RepTokens repTokens = new RepTokens(admins, maxMintAmountPerTx, tokenURI);
        vm.stopBroadcast();
        return repTokens;
    }
}
