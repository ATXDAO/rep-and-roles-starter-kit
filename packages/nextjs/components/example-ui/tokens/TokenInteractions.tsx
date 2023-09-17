import { useFetch } from "usehooks-ts";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface Nft {
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
  return useScaffoldContractRead({
    contractName: "RepTokensInstance",
    functionName: "balanceOf",
    args: [address, BigInt(Number(tokenId))],
  });
};

export const useERC1155Information = (address?: string) => {
  const { data: uri0 } = useUri(0);
  const { data: uri1 } = useUri(1);

  const { data: balanceOf0 } = useBalanceOf(address, 0);
  const { data: balanceOf1 } = useBalanceOf(address, 0);

  const { data: json0 /* error: error0 */ } = useFetch<Nft>(uri0?.replace("ipfs://", "https://ipfs.io/ipfs/"));
  const { data: json1 /* error: error1 */ } = useFetch<Nft>(uri1?.replace("ipfs://", "https://ipfs.io/ipfs/"));

  return {
    token0: {
      uri: uri0,
      balanceOf: balanceOf0,
      name: json0?.name,
      description: json0?.description,
      image: json0?.image,
    },
    token1: {
      uri: uri1,
      balanceOf: balanceOf1,
      name: json1?.name,
      description: json1?.description,
      image: json1?.image,
    },
  };
};
