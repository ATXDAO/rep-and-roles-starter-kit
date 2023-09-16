import { useState } from "react";
import { TTokenGroupCardToggleProps, TokenGroupCard } from "./TokenGroupCard";
import { useBalanceOf, useUri } from "./TokenInteractions";
import axios from "axios";
import { useAccount } from "wagmi";

export const ContractData = () => {
  const propsConfig = {
    toggleTokenGroupCardChecking: true,
    tokenToggleProps: {
      toggleLoading: false,
      tokenInternalToggleProps: {
        toggleBalanceChecking: false,
        toggleImageUriChecking: false,
        toggleNameChecking: false,
        toggleDescriptionChecking: false,
      },
    },
  } as TTokenGroupCardToggleProps;

  const { address } = useAccount();

  const { data: uri0 } = useUri(0);
  const { data: uri1 } = useUri(1);

  const { data: balanceOf0 } = useBalanceOf(address!, 0);
  const { data: balanceOf1 } = useBalanceOf(address!, 0);

  const [tokenGroup, setTokenGroup] = useState({
    token0: {
      balance: undefined,
      name: undefined,
      imageUri: undefined,
      description: undefined,
    },
    token1: {
      balance: undefined,
      name: undefined,
      imageUri: undefined,
      description: undefined,
    },
  }) as any;

  tokenGroup.token0.balance = balanceOf0;
  tokenGroup.token1.balance = balanceOf1;

  if (uri0 !== undefined && uri1 !== undefined) {
    const finalURL0 = uri0.replace("ipfs://", "https://ipfs.io/ipfs/");
    const finalURL1 = uri1.replace("ipfs://", "https://ipfs.io/ipfs/");

    const getJsonData = async () => {
      const finalJson0 = await axios.get(finalURL0);

      tokenGroup.token0.name = finalJson0.data.name;
      tokenGroup.token0.description = finalJson0.data.description;
      tokenGroup.token0.imageUri = finalJson0.data.image.replace("ipfs://", "https://ipfs.io/ipfs/");

      const finalJson1 = await axios.get(finalURL1);

      tokenGroup.token1.name = finalJson1.data.name;
      tokenGroup.token1.description = finalJson1.data.description;
      tokenGroup.token1.imageUri = finalJson1.data.image.replace("ipfs://", "https://ipfs.io/ipfs/");

      setTokenGroup(tokenGroup);
    };

    getJsonData();
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div>
        <TokenGroupCard tokenGroup={tokenGroup} toggleProps={propsConfig} />
      </div>
    </div>
  );
};
