// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC1155} from "./Hats/utils/ERC1155.sol";

contract ERC1155EligibiltiyModule {
    ERC1155 s_erc1155;

    constructor(address erc1155Address) {
        s_erc1155 = ERC1155(erc1155Address);
    }

    function getWearerStatus(
        address,
        uint256
    ) external pure returns (bool eligible, bool standing) {
        return (true, true);
    }
}
