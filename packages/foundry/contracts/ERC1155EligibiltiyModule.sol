// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC1155} from "./Hats/utils/ERC1155.sol";

contract ERC1155EligibiltiyModule {
    ERC1155 s_erc1155;

    uint256 s_amount;

    constructor(address erc1155Address, uint256 amount) {
        s_erc1155 = ERC1155(erc1155Address);
        s_amount = amount;
    }

    function getWearerStatus(address _wearer, uint256) external view returns (bool eligible, bool standing) {
        if (s_erc1155.balanceOf(_wearer, 0) > s_amount) {
            eligible = true;
        } else {
            eligible = false;
        }

        return (eligible, true);
    }
}
