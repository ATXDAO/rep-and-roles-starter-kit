-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil 

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

help:
	@echo "Usage:"
	@echo "  make deploy [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""
	@echo ""
	@echo "  make fund [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""

all: clean remove install update build

# Clean the repo
clean  :; forge clean

# Remove modules
remove :; rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules && git add . && git commit -m "modules"

install :; forge install cyfrin/foundry-devops@0.0.11 --no-commit && forge install smartcontractkit/chainlink-brownie-contracts@0.6.1 --no-commit && forge install foundry-rs/forge-std@v1.5.3 --no-commit

# Update Dependencies
update:; forge update

build:; forge build

test :; forge test 

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast

ifeq ($(findstring --network sepolia,$(ARGS)),--network sepolia)
	NETWORK_ARGS := --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv
endif

ifeq ($(findstring --network goerli,$(ARGS)),--network goerli)
	NETWORK_ARGS := --rpc-url $(GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv
endif

ifeq ($(findstring --network polygon,$(ARGS)),--network polygon)
	NETWORK_ARGS := --rpc-url $(POLYGON_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(POLYGONSCAN_API_KEY) -vvvv
endif

ifeq ($(findstring --network op-mainnet,$(ARGS)),--network op-mainnet)
	NETWORK_ARGS := --rpc-url $(OP_MAINNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(OP_MAINNET_API_KEY) -vvvv
endif


deployRepTokensWithData:
	@forge script script/DeployRepTokensWithData.s.sol:DeployRepTokensWithData $(NETWORK_ARGS)

deployCadentRepDistributorWithData:
	@forge script script/DeployCadentRepDistributorWithData.s.sol:DeployCadentRepDistributorWithData $(NETWORK_ARGS)