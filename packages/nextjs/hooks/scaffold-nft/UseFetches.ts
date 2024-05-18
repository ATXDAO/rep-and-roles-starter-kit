import { useCallback, useEffect, useState } from "react";

export function useFetches(uris: string[]) {
  const [responses, setResponses] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const arr = [];
      for (let i = 0; i < uris.length; i++) {
        const response = await fetch(uris[i]);
        const responseJson = await response.json();
        arr.push(responseJson);
      }

      setResponses([...arr]);
      setIsError(false);
    } catch (e) {
      console.log("There was an error.");
      setIsError(true);
    }

    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(uris)]);

  useEffect(() => {
    async function get() {
      await refetch();
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uris, refetch]);

  return { responses, refetch, isLoading, isError };
}
