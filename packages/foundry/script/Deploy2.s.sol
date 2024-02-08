//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";

import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
import {ReputationTokensStandalone} from "@atxdao/contracts/reputation/ReputationTokensStandalone.sol";
import {TokensPropertiesStorage} from "@atxdao/contracts/reputation/storage/TokensPropertiesStorage.sol";
import {IReputationTokensInternal} from "@atxdao/contracts/reputation/interfaces/IReputationTokensInternal.sol";
import {Hats} from "../contracts/Hats/Hats.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    uint256 maxMintAmount = 100;
    string BASE_URI =
        "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }

        vm.startBroadcast(deployerPrivateKey);
        address[] memory admins = new address[](4);
        admins[0] = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        admins[1] = 0x62286D694F89a1B12c0214bfcD567bb6c2951491;
        admins[2] = 0x2643658817324C6536E3A027a15Cd11576Fa5884;
        admins[3] = 0x3bEc6a181d6Ef7239F699DAf2fAa5FE3A5f01Edf;

        ReputationTokensStandalone instance = new ReputationTokensStandalone(
            0x3bEc6a181d6Ef7239F699DAf2fAa5FE3A5f01Edf,
            admins
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
            instance.TOKEN_URI_SETTER_ROLE(),
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
            instance.TOKEN_URI_SETTER_ROLE(),
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

        instance.grantRole(
            instance.TOKEN_CREATOR_ROLE(),
            0x2643658817324C6536E3A027a15Cd11576Fa5884
        );

        instance.grantRole(
            instance.TOKEN_UPDATER_ROLE(),
            0x2643658817324C6536E3A027a15Cd11576Fa5884
        );

        instance.grantRole(
            instance.TOKEN_URI_SETTER_ROLE(),
            0x2643658817324C6536E3A027a15Cd11576Fa5884
        );

        instance.grantRole(
            instance.MINTER_ROLE(),
            0x2643658817324C6536E3A027a15Cd11576Fa5884
        );

        instance.grantRole(
            instance.DISTRIBUTOR_ROLE(),
            0x2643658817324C6536E3A027a15Cd11576Fa5884
        );

        instance.grantRole(
            instance.TOKEN_CREATOR_ROLE(),
            0x3bEc6a181d6Ef7239F699DAf2fAa5FE3A5f01Edf
        );

        instance.grantRole(
            instance.TOKEN_UPDATER_ROLE(),
            0x3bEc6a181d6Ef7239F699DAf2fAa5FE3A5f01Edf
        );

        instance.grantRole(
            instance.TOKEN_URI_SETTER_ROLE(),
            0x3bEc6a181d6Ef7239F699DAf2fAa5FE3A5f01Edf
        );

        instance.grantRole(
            instance.MINTER_ROLE(),
            0x3bEc6a181d6Ef7239F699DAf2fAa5FE3A5f01Edf
        );

        instance.grantRole(
            instance.DISTRIBUTOR_ROLE(),
            0x3bEc6a181d6Ef7239F699DAf2fAa5FE3A5f01Edf
        );

        TokensPropertiesStorage.TokenProperties
            memory tokenProperties = TokensPropertiesStorage.TokenProperties(
                false,
                100
            );

        instance.createToken(tokenProperties);

        TokensPropertiesStorage.TokenProperties
            memory tokenProperties2 = TokensPropertiesStorage.TokenProperties(
                true,
                100
            );

        instance.createToken(tokenProperties2);

        instance.setTokenURI(0, string.concat(BASE_URI, "0"));
        instance.setTokenURI(1, string.concat(BASE_URI, "1"));

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
            45
        );
        instance.mint(mintOperations);

        IReputationTokensInternal.TokensOperations memory mintOperations2;
        mintOperations2.to = 0x2643658817324C6536E3A027a15Cd11576Fa5884;

        mintOperations2
            .operations = new IReputationTokensInternal.TokenOperation[](2);
        mintOperations2.operations[0] = IReputationTokensInternal
            .TokenOperation(0, 90);
        mintOperations2.operations[1] = IReputationTokensInternal
            .TokenOperation(1, 45);
        instance.mint(mintOperations2);

        // Hats hatsInstance = new Hats("Hats", "ipfs");

        // uint256 topHatId = hatsInstance.mintTopHat(
        //     0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
        //     "",
        //     ""
        // );

        // uint256 newHatId = hatsInstance.createHat(
        //     topHatId,
        //     "Details...",
        //     100,
        //     0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
        //     0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
        //     true,
        //     ""
        // );

        // console.log(topHatId);
        // console.log(newHatId);

        vm.stopBroadcast();

        exportDeployments();
    }
}
