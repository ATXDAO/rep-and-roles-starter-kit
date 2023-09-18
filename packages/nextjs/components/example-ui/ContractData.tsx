import { useERC1155Information } from "./tokens/TokenInteractions";
import { ImageProperties } from "./tokens/token-card/ImageCard";
import { DefaultNavBarTokenGroupCard, TokenGroup as tg2 } from "./tokens/token-group-card/DefaultNavBarTokenGroupCard";
import { DefaultTokenGroupCard, TokenGroup } from "./tokens/token-group-card/DefaultTokenGroupCard";
import {
  mainCardPropertiesClasses,
  mainCardWithNumberOverlayPropertiesClasses,
  navBarPropertiesClasses,
  prettifyLoadingProps,
} from "./tokens/token-group-card/TokenGroupCardConfig";
import { useAccount } from "wagmi";

export const ContractData = () => {
  const { address } = useAccount();

  const { token0, token1 } = useERC1155Information(address);

  const tokenGroup = {
    token0: {
      balance: token0.balanceOf,
      name: token0.name,
      imageProperties: new ImageProperties(
        token0.image?.replace("ipfs://", "https://ipfs.io/ipfs/"),
        "Token 0",
        256,
        256,
      ),
      description: token0?.description,
    },
    token1: {
      balance: token1.balanceOf,
      name: token1.name,
      imageProperties: new ImageProperties(
        token1?.image?.replace("ipfs://", "https://ipfs.io/ipfs/"),
        "Token 1",
        256,
        256,
      ),
      description: token1?.description,
    },
  } as TokenGroup;

  const tokenGroup2 = {
    token0: {
      balance: token0.balanceOf,
      imageProperties: new ImageProperties(
        token0.image?.replace("ipfs://", "https://ipfs.io/ipfs/"),
        "Token 0",
        64,
        64,
      ),
    },
    token1: {
      balance: token1.balanceOf,
      imageProperties: new ImageProperties(
        token1?.image?.replace("ipfs://", "https://ipfs.io/ipfs/"),
        "Token 1",
        64,
        64,
      ),
    },
  } as tg2;

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <DefaultNavBarTokenGroupCard
            tokenGroup={tokenGroup2}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={navBarPropertiesClasses}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <DefaultTokenGroupCard
            tokenGroup={tokenGroup}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={mainCardPropertiesClasses}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <DefaultTokenGroupCard
            tokenGroup={tokenGroup}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={mainCardWithNumberOverlayPropertiesClasses}
          />
        </div>
      </div>
    </>
  );
};
