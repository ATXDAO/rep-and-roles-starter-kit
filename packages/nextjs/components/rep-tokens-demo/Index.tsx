import { useRepTokens } from "./tokens/Hooks";
import { ImageProperties } from "./tokens/token-card/ImageCard";
import { TokensCard } from "./tokens/tokens-card/TokensCard";
import {
  mainCardPropertiesClasses,
  mainCardRenderProps,
  mainCardWithNumberOverlayPropertiesClasses,
  navBarPropertiesClasses,
  navBarRenderProps,
  prettifyLoadingProps,
} from "./tokens/tokens-card/TokensCardConfig";
import { useAccount } from "wagmi";

export const Index = () => {
  const { address } = useAccount();

  const { tokensData } = useRepTokens(address);

  for (let i = 0; i < tokensData.tokens.length; i++) {
    tokensData.tokens[i].image = tokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  const navBarCardImageProperties = new ImageProperties("Token", 64, 64);
  const mainCardImageProperties = new ImageProperties("Token", 256, 256);

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokensCard
            tokensData={tokensData}
            imageProperties={navBarCardImageProperties}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={navBarPropertiesClasses}
            renderProps={navBarRenderProps}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokensCard
            tokensData={tokensData}
            imageProperties={mainCardImageProperties}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={mainCardPropertiesClasses}
            renderProps={mainCardRenderProps}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokensCard
            tokensData={tokensData}
            imageProperties={mainCardImageProperties}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={mainCardWithNumberOverlayPropertiesClasses}
            renderProps={mainCardRenderProps}
          />
        </div>
      </div>
    </>
  );
};
