import { useBalanceOf, useUri } from "./tokens/TokenInteractions";
import { ImageProperties } from "./tokens/token-card/ImageCard";
import { TokenGroup, TokenGroupCard } from "./tokens/token-group-card/TokenGroupCard";
import { prettifyLoadingProps, propertiesClasses } from "./tokens/token-group-card/TokenGroupCardConfig";
import { useFetch } from "usehooks-ts";
import { useAccount } from "wagmi";

interface Nft {
  name: string;
  description: string;
  image: string;
}

export const ContractData = () => {
  const { address } = useAccount();

  const { data: uri0 } = useUri(0);
  const { data: uri1 } = useUri(1);

  const { data: balanceOf0 } = useBalanceOf(address, 0);
  const { data: balanceOf1 } = useBalanceOf(address, 0);

  const { data: json0 /* error: error0 */ } = useFetch<Nft>(uri0?.replace("ipfs://", "https://ipfs.io/ipfs/"));
  const { data: json1 /* error: error1 */ } = useFetch<Nft>(uri1?.replace("ipfs://", "https://ipfs.io/ipfs/"));

  const tokenGroup = {
    token0: {
      balance: balanceOf0,
      name: json0?.name,
      imageProperties: new ImageProperties(json0?.image?.replace("ipfs://", "https://ipfs.io/ipfs/"), "Token 0"),
      description: json0?.description,
    },
    token1: {
      balance: balanceOf1,
      name: json1?.name,
      imageProperties: new ImageProperties(json1?.image?.replace("ipfs://", "https://ipfs.io/ipfs/"), "Token 1"),
      description: json1?.description,
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
