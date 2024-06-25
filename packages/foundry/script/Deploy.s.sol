//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";

import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
import {Hats} from "../contracts/Hats/Hats.sol";

import {DeployDemoScript} from "./DeployDemo.s.sol";
import {DeployFactoryScript} from "./DeployFactory.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        DeployDemoScript deployer = new DeployDemoScript();
        deployer.run();

        // DeployFactoryScript factoryDeployer = new DeployFactoryScript();
        // factoryDeployer.run();
        exportDeployments();
    }

    function test() external {}
}
