//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/YourContract.sol";
import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
// import {DeployRepTokensInstanceWithData} from "./DeployRepTokensInstanceWithData.s.sol";
import {ReputationTokensStandalone} from "@atxdao/contracts/reputation/ReputationTokensStandalone.sol";
import {TokensPropertiesStorage} from "@atxdao/contracts/reputation/storage/TokensPropertiesStorage.sol";
import {IReputationTokensInternal} from "@atxdao/contracts/reputation/interfaces/IReputationTokensInternal.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    uint256 maxMintAmount = 100;
    string baseURI =
        "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }

        vm.startBroadcast(deployerPrivateKey);
        address[] memory admins = new address[](2);
        admins[0] = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        admins[1] = 0x62286D694F89a1B12c0214bfcD567bb6c2951491;

        ReputationTokensStandalone instance = new ReputationTokensStandalone(
            0x62286D694F89a1B12c0214bfcD567bb6c2951491,
            admins,
            baseURI
        );

        instance.grantRole(
            instance.TOKEN_CREATOR_ROLE(),
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        );

        instance.grantRole(
            instance.TOKEN_UPDATER_ROLE(),
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        );

        instance.grantRole(
            instance.MINTER_ROLE(),
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        );

        instance.grantRole(
            instance.DISTRIBUTOR_ROLE(),
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        );

        instance.grantRole(
            instance.TOKEN_CREATOR_ROLE(),
            0x62286D694F89a1B12c0214bfcD567bb6c2951491
        );

        instance.grantRole(
            instance.TOKEN_UPDATER_ROLE(),
            0x62286D694F89a1B12c0214bfcD567bb6c2951491
        );

        instance.grantRole(
            instance.MINTER_ROLE(),
            0x62286D694F89a1B12c0214bfcD567bb6c2951491
        );

        instance.grantRole(
            instance.DISTRIBUTOR_ROLE(),
            0x62286D694F89a1B12c0214bfcD567bb6c2951491
        );

        TokensPropertiesStorage.TokenProperties
            memory tokenProperties = TokensPropertiesStorage.TokenProperties(
                true,
                100
            );

        instance.createToken(tokenProperties);
        instance.createToken(tokenProperties);
        IReputationTokensInternal.TokensOperations memory mintOperations;
        mintOperations.to = 0x62286D694F89a1B12c0214bfcD567bb6c2951491;

        mintOperations
            .operations = new IReputationTokensInternal.TokenOperation[](2);
        mintOperations.operations[0] = IReputationTokensInternal.TokenOperation(
            0,
            90
        );
        mintOperations.operations[1] = IReputationTokensInternal.TokenOperation(
            1,
            90
        );

        instance.mint(mintOperations, "");

        // console.logString(
        //     string.concat(
        //         "YourContract deployed at: ",
        //         vm.toString(address(instance))
        //     )
        // );
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
