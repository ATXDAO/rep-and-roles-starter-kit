// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ActiveModule {
    function getWearerStatus(
        uint256
    ) external pure returns (bool eligible, bool standing) {
        return (true, true);
    }
}
