import Image from "next/image";
import memberParty from "./assets/member-party.png";
import { useClaimReputation, useGetRemainingTime } from "./hooks/CadentReputationDistributorHooks";
import { useERC1155Information } from "./tokens/TokenInteractions";
import { useAccount } from "wagmi";

export const ContractData = () => {
  const { address } = useAccount();

  const remainingTime = useGetRemainingTime(address);
  const claimReputation = useClaimReputation();

  const { token0, token1 } = useERC1155Information(address);
  token0.image = token0.image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  token1.image = token1.image?.replace("ipfs://", "https://ipfs.io/ipfs/");

  let remainingTimeOutput;
  if (remainingTime !== undefined) {
    if (remainingTime.toString() > "0") {
      remainingTimeOutput = <span className="text-2xl text-white">Please check back later to redeem more tokens!</span>;
    } else {
      remainingTimeOutput = (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-1"
          onClick={async () => {
            await claimReputation();
          }}
        >
          Claim 100 Tokens!
        </button>
      );
    }
  } else {
    remainingTimeOutput = <div></div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <Image src={memberParty} alt="Image" width="800" height="800" />
        <p className="text-2xl text-white">
          Thank you for attending ATX DAOs Gala event. You can claim some Reputation Tokens as a thank you for your
          attendance!
        </p>
        <p className="text-2xl text-white">You can claim some Reputation Tokens as a thank you for your attendance!</p>
        {remainingTimeOutput}
      </div>
    </>
  );
};
