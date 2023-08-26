// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "../lib/forge-std/src/Test.sol";
import {RepTokensInstance} from "../src/RepTokensInstance.sol";
import {DeployRepTokensInstance} from "../script/DeployRepTokensInstance.s.sol";

contract RepTokensInstanceTest is Test {
    RepTokensInstance instance;

    uint256 constant MAX_MINT_AMOUNT = 100;
    string constant BASE_URI = "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";
    address ADMIN = makeAddr("ADMIN");

    function setUp() external {
        address[] memory admins = new address[](1);
        admins[0] = ADMIN;

        instance = new DeployRepTokensInstance().run(admins, MAX_MINT_AMOUNT, BASE_URI);
    }

    function testHasAdminRole() external {
        assertEq(instance.hasRole(instance.DEFAULT_ADMIN_ROLE(), ADMIN), true);
    }

    function testMaxMintAmount() external {
        assertEq(instance.getMaxMintAmountPerTransaciton(), 100);
    }

    function test0URI() external {
        assertEq(instance.uri(0), "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/0");
    }
}

// import {Counter} from "../src/Counter.sol";

// contract CounterTest is Test {
//     Counter public counter;

//     function setUp() public {
//         counter = new Counter();
//         counter.setNumber(0);
//     }

//     function testIncrement() public {
//         counter.increment();
//         assertEq(counter.number(), 1);
//     }

//     function testSetNumber(uint256 x) public {
//         counter.setNumber(x);
//         assertEq(counter.number(), x);
//     }
// }
