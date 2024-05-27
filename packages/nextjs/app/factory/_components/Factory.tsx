"use client";

import { useState } from "react";
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

  async function onSubmit(event: any) {
    event.preventDefault();
    const target = event.target;
    console.log(target.name.value);
    console.log(target.symbol.value);
    console.log(target.uri.value);

    // await instance.updateToken(0, tokenType);
    // await instance.updateToken(1, tokenType);
    // await instance.setBaseURI(baseURI);
  }

  const [tokens, setTokens] = useState<string[]>([]);

  async function addToken(tokenType: string) {
    setTokens([...tokens, tokenType]);
  }

  const tokensOutputMapped = tokens.map((type, index) => {
    return (
      <div key={index}>
        <p>
          Token {index}: {type}
        </p>
      </div>
    );
  });

  console.log(tokens);
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
            <div className="flex items-center flex-col flex-grow pt-2">
              <form className="flex flex-col" onSubmit={onSubmit}>
                <p>Base URI</p>
                <input type="text" name="baseURI" />
                {/* <p>Symbol</p>
          <input type="text" name="symbol" />
          <p>URI</p>
          <input type="text" name="uri" className="w-[600px]" /> */}
                <button className="btn btn-secondary" type="submit">
                  Submit
                </button>
              </form>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  addToken("Lifetime");
                }}
              >
                Add Lifetime
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  addToken("Redeemable");
                }}
              >
                Add Redeemable
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  addToken("Transferable");
                }}
              >
                Add Transferable
              </button>
              {tokensOutputMapped}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
