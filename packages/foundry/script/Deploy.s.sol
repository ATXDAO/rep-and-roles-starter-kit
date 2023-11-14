//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/YourContract.sol";
import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
import {DeployRepTokensInstanceWithData} from "./DeployRepTokensInstanceWithData.s.sol";
import {RepTokensInstance} from "./DeployRepTokensInstance.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        // uint256 deployerPrivateKey = configureDeployer();
        // if (deployerPrivateKey == 0) {
        //     revert InvalidPrivateKey(
        //         "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
        //     );
        // }

        DeployRepTokensInstanceWithData deploy = new DeployRepTokensInstanceWithData();
        RepTokensInstance instance = deploy.run();

        // vm.startBroadcast(deployerPrivateKey);
        // YourContract yourContract = new YourContract(
        //     vm.addr(deployerPrivateKey)
        // );
        console.logString(
            string.concat(
                "YourContract deployed at: ",
                vm.toString(address(instance))
            )
        );
        // vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
