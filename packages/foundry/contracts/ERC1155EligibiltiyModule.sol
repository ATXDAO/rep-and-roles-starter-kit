// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ERC1155EligibiltiyModule {
    function getWearerStatus(
        address,
        uint256
    ) external pure returns (bool eligible, bool standing) {
        return (true, true);
    }
}
