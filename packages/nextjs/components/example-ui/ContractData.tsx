import { useERC1155Information } from "./tokens/TokenInteractions";
import { ImageProperties } from "./tokens/token-card/ImageCard";
import { TokenGroup, TokenGroupCard } from "./tokens/token-group-card/TokenGroupCard";
import { prettifyLoadingProps, propertiesClasses } from "./tokens/token-group-card/TokenGroupCardConfig";
import { useAccount } from "wagmi";

export const ContractData = () => {
  const { address } = useAccount();

  const { token0, token1 } = useERC1155Information(address);

  const tokenGroup = {
    token0: {
      balance: token0.balanceOf,
      name: token0.name,
      imageProperties: new ImageProperties(token0.image?.replace("ipfs://", "https://ipfs.io/ipfs/"), "Token 0"),
      description: token0?.description,
    },
    token1: {
      balance: token1.balanceOf,
      name: token1.name,
      imageProperties: new ImageProperties(token1?.image?.replace("ipfs://", "https://ipfs.io/ipfs/"), "Token 1"),
      description: token1?.description,
    },
  } as TokenGroup;

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard
            tokenGroup={tokenGroup}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={propertiesClasses}
          />
        </div>
      </div>
    </>
  );
};
