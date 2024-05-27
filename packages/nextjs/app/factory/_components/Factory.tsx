"use client";

import { useAccount } from "wagmi";
import { useScaffoldWatchContractEvent, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export function Factory() {
  const account = useAccount();

  const { writeContractAsync: writeFactoryAsync } = useScaffoldWriteContract("ReputationTokensFactory");

  useScaffoldWatchContractEvent({
    contractName: "ReputationTokensFactory",
    eventName: "CreatedNewInstance",
    // The onLogs function is called whenever a GreetingChange event is emitted by the contract.
    // Parameters emitted by the event can be destructed using the below example
    // for this example: event GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
    onLogs: logs => {
      logs.map(log => {
        const { instance } = log.args;
        console.log("📡 Factory create", instance);
      });
    },
  });

  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <button
              className="btn btn-secondary"
              onClick={async () => {
                await writeFactoryAsync({
                  functionName: "createNewInstance",
                  args: [account?.address, [account.address!]],
                });
              }}
            >
              Create Reputation Smart Contract
            </button>
            <p>{"hello"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
