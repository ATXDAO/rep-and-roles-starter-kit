import { TTokenGroupCardPrettifyLoadingProps, TokenGroupCard } from "./TokenGroupCard";
import { useBalanceOf, useUri } from "./TokenInteractions";
import { useFetch } from "usehooks-ts";
import { useAccount } from "wagmi";

const prettifyLoadingProps = {
  groupCard: true,
  tokenCardPrettifyLoadingProps: {
    card: true,
    tokenCardInternalPrettifyLoadingProps: {
      balance: true,
      imageUri: true,
      name: true,
      description: true,
    },
  },
} as TTokenGroupCardPrettifyLoadingProps;

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
      imageUri: json0?.image?.replace("ipfs://", "https://ipfs.io/ipfs/"),
      description: json0?.description,
    },
    token1: {
      balance: balanceOf1,
      name: json1?.name,
      imageUri: json1?.image?.replace("ipfs://", "https://ipfs.io/ipfs/"),
      description: json1?.description,
    },
  } as any;

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard tokenGroup={tokenGroup} prettifyLoadingProps={prettifyLoadingProps} />
        </div>
      </div>
    </>
  );
};
