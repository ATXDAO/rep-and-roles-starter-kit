import { useCallback, useEffect, useState } from "react";

export function useTokenURIs(contract: any, tokenIds: bigint[]) {
  const [uris, setUris] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    console.log("got new uris");
    try {
      const arr = [];
      for (let i = 0; i < tokenIds.length; i++) {
        const result = await contract.read.tokenURI([tokenIds[i]]);
        arr.push(result);
      }
      setUris([...arr]);
      setIsError(false);
    } catch (e) {
      setIsError(true);
    }

    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.address, tokenIds, uris]);

  useEffect(() => {
    async function get() {
      await refetch();
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.address, tokenIds]);

  return { uris, setUris, refetch, isLoading, isError };
}
