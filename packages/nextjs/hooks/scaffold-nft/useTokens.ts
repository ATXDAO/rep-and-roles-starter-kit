import { useEffect } from "react";
import { useState } from "react";
// import erc1155Abi from "./erc1155Abi.json";
import { abi as repAbi } from "../../z_app/factory/repAbi";
// import { erc721Abi } from "viem";
import * as allChains from "viem/chains";
import { usePublicClient } from "wagmi";
import { createConfig, http } from "wagmi";
import { ScaffoldCollection } from "~~/types/scaffold-nft/ScaffoldCollection";

export type replacementType = "ipfs" | "nftstorage" | "w3s";

const replacement = {
  ipfs: "https://ipfs.io/ipfs/",
  nftstorage: "https://nftstorage.link/ipfs/",
  w3s: "https://w3s.link/ipfs/",
};

export const useTokens = (
  chainName: string,
  address: string,
  userAddress: string | undefined,
  tokenIds: bigint[],
  replacementType: string,
  // loadType = "url",
) => {
  const chain = allChains[chainName as keyof typeof allChains];

  const config = createConfig({
    chains: [chain],
    transports: {
      [chain.id]: http(),
    } as any,
  });

  const publicClient = usePublicClient({ chainId: chain.id, config });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [collection, setCollection] = useState<any>(undefined);

  useEffect(() => {
    async function get() {
      if (!userAddress) return;

      setIsLoading(true);
      setIsError(false);

      // let collectionName;
      // try {
      //   collectionName = await publicClient?.readContract({
      //     address,
      //     abi: erc1155Abi,
      //     functionName: "name",
      //   });
      // } catch (e) {
      //   console.log(e);
      // }

      // let collectionSymbol;
      // try {
      //   collectionSymbol = await publicClient?.readContract({
      //     address,
      //     abi: erc1155Abi,
      //     functionName: "symbol",
      //   });
      // } catch (e) {
      //   console.log(e);
      // }
      try {
        // const collectionName = await publicClient?.readContract({
        //   address,
        //   abi: erc721Abi,
        //   functionName: "name",
        // });

        // const collectionSymbol = await publicClient?.readContract({
        //   address,
        //   abi: erc721Abi,
        //   functionName: "symbol",
        // });

        //const balanceOf =

        const arr = [];

        for (let i = 0; i < 10; i++) {
          let tokenURI: any;
          try {
            tokenURI = await publicClient?.readContract({
              address,
              abi: repAbi,
              functionName: "uri",
              args: [BigInt(i)],
            });
          } catch (e) {
            console.log(e);
            break;
          }

          // if (loadType === "base64") {
          //   const data = Buffer.from(tokenURI!.substring(29), "base64").toString();
          //   const parsedJson = JSON.parse(data);
          //   jsonMetadata = parsedJson;
          // }
          //  else if (loadType === "url") {

          let tokenURIFormatted;
          let metadataJson;

          try {
            tokenURIFormatted = tokenURI?.replace("ipfs://", replacement[replacementType as replacementType]);

            const metadata = await fetch(tokenURIFormatted!);
            metadataJson = await metadata.json();
          } catch (e) {
            console.log(e);

            try {
              metadataJson = JSON.parse(tokenURI?.substring(27));
            } catch (e) {
              break;
            }
          }

          metadataJson.image = metadataJson.image.replace("ipfs://", replacement[replacementType as replacementType]);

          metadataJson.image = {
            value: metadataJson.image,
            alt: metadataJson.name + " Image",
          };

          let balanceOf;
          try {
            console.log(i);
            console.log(userAddress);
            balanceOf = await publicClient?.readContract({
              address,
              abi: repAbi,
              functionName: "balanceOf",
              args: [userAddress, BigInt(i)],
            });
          } catch (e) {
            console.log(e);
          }

          let tokenType;

          try {
            tokenType = await publicClient?.readContract({
              address,
              abi: repAbi,
              functionName: "getTokenType",
              args: [BigInt(i)],
            });
          } catch (e) {
            console.log(e);
          }

          const token = {} as any;
          token.address = address;
          token.metadata = metadataJson;
          token.id = i;
          token.balanceOf = balanceOf;
          token.uri = tokenURIFormatted;
          token.tokenType = tokenType;
          // token.collectionName = collectionName;
          // token.collectionSymbol = collectionSymbol;
          arr.push(token);
        }

        const collection = {} as ScaffoldCollection;
        collection.tokens = arr;
        collection.address = address;
        // collection.symbol = collectionSymbol as string | undefined;
        // collection.name = collectionName as string | undefined;

        setCollection(collection);
      } catch (e) {
        console.log(e);
        setIsError(true);
      }

      setIsLoading(false);
    }
    get();
  }, [publicClient?.account, tokenIds, userAddress]);

  return { collection, isLoading, isError };
};
