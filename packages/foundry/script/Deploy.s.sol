//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";

import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
import {ReputationTokensStandalone} from "@atxdao/contracts/reputation/ReputationTokensStandalone.sol";
import {TokensPropertiesStorage} from "@atxdao/contracts/reputation/storage/TokensPropertiesStorage.sol";
import {IReputationTokensInternal} from "@atxdao/contracts/reputation/interfaces/IReputationTokensInternal.sol";
import {Hats} from "../contracts/Hats/Hats.sol";

import {DeployDemoScript} from "./DeployDemo.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        DeployDemoScript deployer = new DeployDemoScript();
        deployer.run();

        exportDeployments();
    }

    function test() external {}
}
