// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import {Test, console2} from "../lib/forge-std/src/Test.sol";
// import {RepTokensInstance} from "../contracts/RepTokensInstance.sol";
// import {DeployRepTokensInstance} from "../script/DeployRepTokensInstance.s.sol";

// contract RepTokensInstanceTest is Test {
//     RepTokensInstance instance;

//     string constant BASE_URI =
//         "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";
//     address ADMIN = makeAddr("ADMIN");

//     function setUp() external {
//         address[] memory admins = new address[](1);
//         admins[0] = ADMIN;

//         instance = new DeployRepTokensInstance().run(ADMIN, admins, BASE_URI);
//     }
// }
