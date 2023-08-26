// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
import "../lib/openzeppelin-contracts/contracts/access/AccessControl.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "../lib/openzeppelin-contracts/contracts/security/Pausable.sol";

//this is a temp change

contract RepTokens is AccessControl, Ownable, ERC1155, Pausable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant TOKEN_MIGRATOR_ROLE = keccak256("TOKEN_MIGRATOR_ROLE");

    uint256 private s_maxMintAmountPerTx;

    function getMaxMintAmountPerTransaciton() external view returns (uint256) {
        return s_maxMintAmountPerTx;
    }

    mapping(uint256 => address[]) ownersOfTokenTypes;
    mapping(address => address) public destinationWallets;

    event Mint(address minter, address to, uint256 amount);
    event DestinationWalletSet(address coreAddress, address destination);
    event Distributed(address from, address to, uint256 amount);
    event OwnershipOfTokensMigrated(address from, address to, uint256 lifetimeBalance, uint256 redeemableBalance);
    event BurnedRedeemable(address from, address to, uint256 amount);

    string private s_baseURI;

    //id 0 = lifetime token
    //id 1 = transferable token
    constructor(address[] memory admins, uint256 maxMintAmountPerTx, string memory baseURI)
        ERC1155(string.concat(baseURI, "{id}"))
    {
        for (uint256 i = 0; i < admins.length; i++) {
            _setupRole(DEFAULT_ADMIN_ROLE, admins[i]);
        }

        s_maxMintAmountPerTx = maxMintAmountPerTx;
        s_baseURI = baseURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(s_baseURI, Strings.toString(tokenId)));
    }

    function mint(address to, uint256 amount, bytes memory data) public onlyRole(MINTER_ROLE) whenNotPaused {
        require(amount <= s_maxMintAmountPerTx, "Cannot mint that many tokens in a single transaction!");

        require(hasRole(DISTRIBUTOR_ROLE, to), "Minter can only mint tokens to distributors!");

        //mints an amount of lifetime tokens to an address.
        super._mint(to, 0, amount, data);
        //mints an amount of transferable tokens to an address.
        super._mint(to, 1, amount, data);

        emit Mint(_msgSender(), to, amount);
    }

    function mintBatch(address[] memory to, uint256[] memory amount, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
        whenNotPaused
    {
        for (uint256 i = 0; i < to.length; i++) {
            mint(to[i], amount[i], data);
        }
    }

    function setMaxMintAmount(uint256 value) external onlyRole(DEFAULT_ADMIN_ROLE) {
        s_maxMintAmountPerTx = value;
    }

    function setDestinationWallet(address destination) public {
        _setDestinationWallet(_msgSender(), destination);
    }

    function _setDestinationWallet(address coreAddress, address destination) internal {
        destinationWallets[coreAddress] = destination;
        emit DestinationWalletSet(coreAddress, destination);
    }

    //from : distributor
    //to : address
    function distribute(address from, address to, uint256 amount, bytes memory data)
        public
        onlyRole(DISTRIBUTOR_ROLE)
        whenNotPaused
    {
        if (destinationWallets[to] == address(0)) {
            _setDestinationWallet(to, to);
        }

        super.safeTransferFrom(from, destinationWallets[to], 0, amount, data);
        super.safeTransferFrom(from, destinationWallets[to], 1, amount, data);
        emit Distributed(from, destinationWallets[to], amount);
    }

    function distributeBatch(address from, address[] memory to, uint256[] memory amount, bytes memory data)
        public
        onlyRole(DISTRIBUTOR_ROLE)
        whenNotPaused
    {
        for (uint256 i = 0; i < to.length; i++) {
            distribute(from, to[i], amount[i], data);
        }
    }

    //from : address
    //to : burner
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data)
        public
        override
    {
        require(id == 1, "Can only send a redeemable token!");

        require(
            !hasRole(DISTRIBUTOR_ROLE, from),
            "Distributors can only send tokens in pairs through the transferFromDistributor function!"
        );

        require(!hasRole(BURNER_ROLE, from), "Burners cannot send tokens!");

        require(hasRole(BURNER_ROLE, to), "Can only send Redeemable Tokens to burners!");

        super.safeTransferFrom(from, to, id, amount, data);
        emit BurnedRedeemable(from, to, amount);
    }

    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override {
        //loop through transferred token IDs
        for (uint256 i = 0; i < ids.length; i++) {
            //if the tokenID balance of the receiving address is greater than zero after the transfer, then check to see if the receiving
            //address needs to be added as an owner to the tokenID
            if (balanceOf(to, ids[i]) > 0) {
                addAddressAsOwnerOfTokenIDIfNotAlreadyPresent(to, ids[i]);
            }

            //address(0) cannot have a balance of tokens so check to see if it is the sender (usually from == address(0) in the case of minting)
            if (from != address(0)) {
                //if the tokenID balance of the sending address is less than zero after the transfer, then remove it from being an owner
                //of the tokenID
                if (balanceOf(from, ids[i]) <= 0) {
                    removeAddressAsOwnerOfTokenID(from, ids[i]);
                }
            }
        }

        super._afterTokenTransfer(operator, from, to, ids, amounts, data);
    }

    //this needs to be called beforehand by address that wants to transfer its lifetime tokens:
    //setApprovalForAll(TOKEN_MIGRATOR_ROLE, true)
    function migrateOwnershipOfTokens(address from, address to) public onlyRole(TOKEN_MIGRATOR_ROLE) {
        uint256 lifetimeBalance = balanceOf(from, 0);
        uint256 redeemableBalance = balanceOf(from, 1);

        super.safeTransferFrom(from, to, 0, lifetimeBalance, "");
        super.safeTransferFrom(from, to, 1, redeemableBalance, "");
        emit OwnershipOfTokensMigrated(from, to, lifetimeBalance, redeemableBalance);
    }

    //@addrToCheck: Address to check during _afterTokenTransfer if it is already registered
    //as an owner of @tokenID.
    //@tokenID: the ID of the token selected.
    function addAddressAsOwnerOfTokenIDIfNotAlreadyPresent(address addrToCheck, uint256 tokenID) internal {
        //get all owners of a given tokenID.
        address[] storage owners = ownersOfTokenTypes[tokenID];

        bool isPresent = false;

        //loop through all token owners of selected tokenID.
        for (uint256 i = 0; i < owners.length; i++) {
            //if address of receiver is found within selected tokenID's owners.
            if (owners[i] == addrToCheck) {
                //the address of receiver is equal to a current owner of the selected tokenID.
                isPresent = true;
                //leave loop for performance
                break;
            }
        }

        //if address of receiver is not currently registered as an owner of selected tokenID, but it now
        //holds a positive balance of the selected tokenID
        if (!isPresent) {
            //register address of receiver as an an owner of selected tokenID
            owners.push(addrToCheck);
        }
    }

    function removeAddressAsOwnerOfTokenID(address addrToCheck, uint256 id) internal {
        address[] storage owners = ownersOfTokenTypes[id];

        uint256 index;
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == addrToCheck) {
                index = i;
                break;
            }
        }

        for (uint256 i = index; i < owners.length - 1; i++) {
            owners[i] = owners[i + 1];
        }
        owners.pop();
    }

    function getOwnersOfTokenID(uint256 tokenID) public view returns (address[] memory) {
        return ownersOfTokenTypes[tokenID];
    }

    function getOwnersOfTokenIDLength(uint256 tokenID) public view returns (uint256) {
        return ownersOfTokenTypes[tokenID].length;
    }

    function togglePause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (paused()) {
            _unpause();
        } else {
            _pause();
        }
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
