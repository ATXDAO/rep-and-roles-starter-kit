import { useFetch } from "usehooks-ts";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export type TokenGroup = {
  token0: Token;
  token1: Token;
};

export type Token = {
  balance: bigint;
  image: string;
  name: string;
  description: string;
};

export interface Nft {
  name: string;
  description: string;
  image: string;
}

export const useUri = (tokenId?: number) => {
  return useScaffoldContractRead({
    contractName: "RepTokensInstance",
    functionName: "uri",
    args: [BigInt(Number(tokenId))],
  });
};

export const useBalanceOf = (address?: string, tokenId?: number) => {
  const { data: balance } = useScaffoldContractRead({
    contractName: "RepTokensInstance",
    functionName: "balanceOf",
    args: [address, BigInt(Number(tokenId))],
  });

  return balance;
};

export const useERC1155Information = (address?: string) => {
  const { data: uri0 } = useUri(0);
  const { data: uri1 } = useUri(1);

  const balance0 = useBalanceOf(address, 0);
  const balance1 = useBalanceOf(address, 1);

  const { data: json0 /* error: error0 */ } = useFetch<Nft>(uri0?.replace("ipfs://", "https://ipfs.io/ipfs/"));
  const { data: json1 /* error: error1 */ } = useFetch<Nft>(uri1?.replace("ipfs://", "https://ipfs.io/ipfs/"));

  return {
    token0: {
      balance: balance0,
      name: json0?.name,
      description: json0?.description,
      image: json0?.image,
    },
    token1: {
      balance: balance1,
      name: json1?.name,
      description: json1?.description,
      image: json1?.image,
    },
  } as TokenGroup;
};
