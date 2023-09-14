// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {RepTokens} from "../src/RepTokens.sol";
import {DeployRepTokens} from "./DeployRepTokens.s.sol";

contract DeployRepTokensWithData is Script {
    address ADMIN = 0xD08B05944d58c8d75e9b09d5d83d311caF28A7c5;
    uint256 constant MAX_MINT_PER_TX = 20;
    string baseURI = "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4";

    address[] public admins;

    function run() external returns (RepTokens) {
        DeployRepTokens deployer = new DeployRepTokens();
        admins = [ADMIN];

        return deployer.run(admins, MAX_MINT_PER_TX, baseURI);
    }
}
