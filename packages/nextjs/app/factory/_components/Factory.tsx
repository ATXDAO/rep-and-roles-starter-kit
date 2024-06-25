"use client";

import { useState } from "react";
import { abi as factoryAbi } from "../factoryAbi";
import { abi as repAbi } from "../repAbi";
import { UpdateTokenCard } from "./UpdateTokenCard";
import { decodeEventLog } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { useWalletClient } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export function Factory() {
  const account = useAccount();

  // const { data: factoryContract } = useScaffoldContract({ contractName: "ReputationTokensFactory" });

  const { writeContractAsync: writeFactoryAsync } = useScaffoldWriteContract("ReputationTokensFactory");

  // const blockNum = useBlockNumber();
  // const initialBlock = useBlock();

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  // const [block, setBlock] = useState<any>(initialBlock);

  // useWatchContractEvent({
  //   address: factoryContract?.address,
  //   abi: factoryContract?.abi,
  //   eventName: "CreatedNewInstance",
  //   onLogs: logs => {
  //     logs.map(log => {
  //       console.log("mapped");
  //       console.log(log);
  //       // const { instance } = log.args;
  //       // console.log("📡 Factory create", instance);
  //     });
  //   },
  // });

  // const {
  //   data: events,
  //   isLoading: isLoadingEvents,
  //   error: errorReadingEvents,
  // } = useScaffoldEventHistory({
  //   contractName: "ReputationTokensFactory",
  //   eventName: "CreatedNewInstance",
  //   fromBlock: block?.number || BigInt(0),
  //   watch: true,
  //   blockData: true,
  //   transactionData: true,
  //   receiptData: true,
  // });

  // console.log(events);

  // const [deployedInstance, setDeployedInstance] = useState<any>();

  const [deployedInstance, setDeployedInstance] = useState<string>();

  // let deployedInstance;
  // events?.map(event => {
  //   const { instance } = event.args;
  //   deployedInstance = instance;
  //   // setDeployedInstance(instance);
  // });

  // useScaffoldWatchContractEvent({
  //   contractName: "ReputationTokensFactory",
  //   eventName: "CreatedNewInstance",
  //   watch: true,
  //   // The onLogs function is called whenever a GreetingChange event is emitted by the contract.
  //   // Parameters emitted by the event can be destructed using the below example
  //   // for this example: event GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
  //   onLogs: logs => {
  //     logs.map(log => {
  //       const { instance } = log.args;
  //       console.log("📡 Factory create", instance);
  //     });
  //   },
  // });

  const [newTokens, setNewTokens] = useState<any[]>([{ tokenType: 0, uri: "" }]);

  console.log(newTokens);

  async function onTypeChanged(index: number, res: any) {
    const tokens = newTokens;
    tokens[index].tokenType = res.value;
    setNewTokens([...tokens]);
  }

  async function onUriChanged(index: number, uri: any) {
    const tokens = newTokens;
    tokens[index].uri = uri.target.value;
    setNewTokens([...tokens]);
  }

  const updateCards = newTokens.map((token, index) => {
    return <UpdateTokenCard key={index} index={index} onTypeChanged={onTypeChanged} onUriChanged={onUriChanged} />;
  });

  // console.log(tokens);
  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-wrap items-center justify-center">{updateCards}</div>
            {/* <UpdateTokenCard index={0} onTypeChanged={onTypeChanged} onUriChanged={onUriChanged} /> */}

            <button
              className="btn btn-secondary mb-10"
              onClick={() => {
                setNewTokens([...newTokens, { tokenType: 0, uri: "" }]);
              }}
            >
              Add New Token
            </button>

            <button
              className="btn btn-secondary"
              onClick={async () => {
                const tx = await writeFactoryAsync({
                  functionName: "createNewInstance",
                  args: [account?.address, [account.address!], [account.address!]],
                });

                const transactionReceipt = await publicClient?.waitForTransactionReceipt({
                  hash: tx!,
                });

                transactionReceipt?.logs.map(async log => {
                  let topics;
                  try {
                    topics = decodeEventLog({
                      abi: factoryAbi,
                      data: log.data,
                      topics: log.topics,
                    });
                  } catch (e) {}

                  if (topics?.args) {
                    const { creator, instance } = topics?.args as {
                      creator: string;
                      instance: string;
                    };

                    console.log("creator:", creator);
                    console.log("instance:", instance);

                    if (instance) {
                      const ids = [];
                      const types = [];
                      const uris = [];

                      for (let i = 0; i < newTokens.length; i++) {
                        ids.push(BigInt(i));
                        types.push(newTokens[i].tokenType);
                        uris.push(newTokens[i].uri);
                      }

                      console.log("start sim");

                      console.log(ids);
                      console.log(types);
                      console.log(uris);

                      const res = await publicClient?.simulateContract({
                        address: instance,
                        abi: repAbi,
                        functionName: "updateTokenBatch",
                        args: [ids, types, uris],
                        account: account.address,
                      });

                      console.log("simmed");
                      console.log(res);

                      const hash = await walletClient?.writeContract(res!.request);
                      console.log(hash);
                      // simulateContract({})
                      // writeContract({})
                    }
                  }

                  // }
                  // catch (e) {
                  //   if (e instanceof BaseError) {
                  //     const revertError = e.walk(err => err instanceof ContractFunctionRevertedError);
                  //     if (revertError instanceof ContractFunctionRevertedError) {
                  //       const errorName = revertError.data?.errorName ?? "";
                  //       console.log(errorName);
                  //       // do something with `errorName`
                  //     }
                  //   }

                  //   console.log(e);
                  // }

                  setDeployedInstance(log.address);
                });

                // const block = await getBlock(wagmiConfig);
                // setBlock(block);
              }}
            >
              Create Reputation Smart Contract
            </button>
          </div>
        </div>

        <p className="">Reputation Tokens deployed at: {deployedInstance}</p>
      </div>
    </>
  );
}
