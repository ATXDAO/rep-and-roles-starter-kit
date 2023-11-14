import { useERC1155Information } from "./tokens/TokenInteractions";
import { ImageProperties } from "./tokens/token-card/ImageCard";
import { DefaultTokenGroupCard } from "./tokens/token-group-card/DefaultTokenGroupCard";
import {
  mainCardPropertiesClasses,
  mainCardRenderProps,
  mainCardWithNumberOverlayPropertiesClasses,
  navBarPropertiesClasses,
  navBarRenderProps,
  prettifyLoadingProps,
} from "./tokens/token-group-card/TokenGroupCardConfig";
import { useAccount } from "wagmi";

export const ContractData = () => {
  const { address } = useAccount();

  const { token0, token1 } = useERC1155Information(address);

  token0.image = token0.image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  token1.image = token1.image?.replace("ipfs://", "https://ipfs.io/ipfs/");

  const tokenGroup = {
    token0: token0,
    token1: token1,
  };

  const navBarCardImageProperties0 = new ImageProperties("Token 0", 64, 64);
  const navBarCardImageProperties1 = new ImageProperties("Token 1", 64, 64);

  const mainCardImageProperties0 = new ImageProperties("Token 0", 256, 256);
  const mainCardImageProperties1 = new ImageProperties("Token 1", 256, 256);

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <DefaultTokenGroupCard
            tokenGroup={tokenGroup}
            imageProperties0={navBarCardImageProperties0}
            imageProperties1={navBarCardImageProperties1}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={navBarPropertiesClasses}
            renderProps={navBarRenderProps}
          />
        </div>
      </div>

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

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <DefaultTokenGroupCard
            tokenGroup={tokenGroup}
            imageProperties0={mainCardImageProperties0}
            imageProperties1={mainCardImageProperties1}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={mainCardWithNumberOverlayPropertiesClasses}
            renderProps={mainCardRenderProps}
          />
        </div>
      </div>
    </>
  );
};
