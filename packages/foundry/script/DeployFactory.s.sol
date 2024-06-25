// //SPDX-License-Identifier: MIT
// pragma solidity ^0.8.19;

// import {console} from "forge-std/console.sol";

// import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
// import {ReputationTokensFactory} from "@atxdao/contracts/reputation/ReputationTokensFactory.sol";
// import {ReputationTokensUpgradeable} from "@atxdao/contracts/reputation/ReputationTokensUpgradeable.sol";

// contract DeployFactoryScript is ScaffoldETHDeploy {
//     error InvalidPrivateKey(string);

//     address controller = 0x2F15D4A66D22ecC6967928b6A76Ab06897b05676; //replace with burner or other address from wallet!

//     function run() external {
//         uint256 deployerPrivateKey = setupLocalhostEnv();
//         if (deployerPrivateKey == 0) {
//             revert InvalidPrivateKey(
//                 "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
//             );
//         }
//         address deployerPubKey = vm.createWallet(deployerPrivateKey).addr;

//         vm.startBroadcast(deployerPrivateKey);
//         address[] memory admins = new address[](2);
//         admins[0] = deployerPubKey;
//         admins[1] = controller;

//         address tokensAddr = address(0);

//         uint256 chainId;
//         assembly {
//             chainId := chainid()
//         }

//         if (chainId == 10) {
//             tokensAddr = 0x4200000000000000000000000000000000000042;
//         }

//         ReputationTokensUpgradeable implementation = new ReputationTokensUpgradeable();
//         ReputationTokensFactory factory = new ReputationTokensFactory(
//             admins,
//             address(implementation),
//             address(0)
//         );
//     }
// }
