import { useState } from "react";

export default function useTokenIds(initialCount: number) {
  const initArr = [];
  for (let i = 1; i <= initialCount; i++) {
    initArr.push(BigInt(i));
  }

  const [tokenIds, setTokenIds] = useState<bigint[]>([...initArr]);

  return { tokenIds, setTokenIds };
}
