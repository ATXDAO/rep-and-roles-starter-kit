import { useCallback, useEffect, useState } from "react";
import { PublicClient, erc721Abi } from "viem";

export function useTokenURIs(publicClient: PublicClient | undefined, address: string, tokenIds: bigint[]) {
  const [uris, setUris] = useState<string[]>([]);

  const refetch = useCallback(async () => {
    const arr = [];

    if (publicClient) {
      for (let i = 0; i < tokenIds.length; i++) {
        const result = await publicClient.readContract({
          address,
          abi: erc721Abi,
          functionName: "tokenURI",
          args: [tokenIds[i]],
        });
        arr.push(result);
      }
    }

    setUris([...arr]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicClient?.account, tokenIds.length, uris.length]);

  useEffect(() => {
    async function get() {
      await refetch();
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicClient?.account, tokenIds.length, uris.length, refetch]);

  return { uris, setUris, refetch };
}
