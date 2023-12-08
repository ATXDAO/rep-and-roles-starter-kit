import { useClaimReputation, useGetRemainingTime } from "./hooks/CadentReputationDistributorHooks";
import { useClaimHat, useHatsCanClaim, useHatsClient } from "./hooks/hatsHooks";
import { useERC1155Information } from "./tokens/TokenInteractions";
import { ImageProperties } from "./tokens/token-card/ImageCard";
import { DefaultTokenGroupCard } from "./tokens/token-group-card/DefaultTokenGroupCard";
import {
  mainCardPropertiesClasses,
  mainCardRenderProps,
  prettifyLoadingProps,
} from "./tokens/token-group-card/TokenGroupCardConfig";
import { useAccount } from "wagmi";

const hatId = "9921260784893851876474358771529355516659303059594999436885558443376640";

export const ContractData = () => {
  const { address } = useAccount();

  const { hatsClient } = useHatsClient(5);
  const { canClaim, getCanClaim } = useHatsCanClaim(hatsClient, hatId, address);
  const { claimHat } = useClaimHat(hatsClient, hatId, address);

  const remainingTime = useGetRemainingTime(address);
  const claimReputation = useClaimReputation();

  const { token0, token1 } = useERC1155Information(address);
  token0.image = token0.image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  token1.image = token1.image?.replace("ipfs://", "https://ipfs.io/ipfs/");

  const tokenGroup = {
    token0: token0,
    token1: token1,
  };

  const mainCardImageProperties0 = new ImageProperties("Token 0", 256, 256);
  const mainCardImageProperties1 = new ImageProperties("Token 1", 256, 256);

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
            await getCanClaim(hatsClient, hatId, address);
          }}
        >
          Claim Rep
        </button>
      );
    }
  } else {
    remainingTimeOutput = <div></div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <p className="text-2xl text-white">Hats Demo Day</p>

        {remainingTimeOutput}

        <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
          <div>
            <DefaultTokenGroupCard
              tokenGroup={tokenGroup}
              imageProperties0={mainCardImageProperties0}
              imageProperties1={mainCardImageProperties1}
              prettifyLoadingProps={prettifyLoadingProps}
              propertiesClasses={mainCardPropertiesClasses}
              renderProps={mainCardRenderProps}
            />
          </div>
        </div>
        {canClaim ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-1"
            onClick={async () => {
              await claimHat();
              await getCanClaim(hatsClient, hatId, address);
            }}
          >
            Claim Hat
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
