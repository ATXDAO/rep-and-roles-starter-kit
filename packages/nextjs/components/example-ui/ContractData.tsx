import { TTokenGroupCardToggleProps, TokenGroupCard } from "./TokenGroupCard";
import { useBalanceOf, useUri } from "./TokenInteractions";
import useAxios from "axios-hooks";
import { useAccount } from "wagmi";

const propsConfig = {
  toggleTokenGroupCardChecking: false,
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

export const ContractData = () => {
  const { address } = useAccount();

  const { data: uri0 } = useUri(0);
  const { data: uri1 } = useUri(1);

  const { data: balanceOf0 } = useBalanceOf(address!, 0);
  const { data: balanceOf1 } = useBalanceOf(address!, 0);

  const [{ data }] = useAxios<any>({
    url: uri0?.replace("ipfs://", "https://ipfs.io/ipfs/"),
  });

  const [{ data: jsonData1 }] = useAxios<any>({
    url: uri1?.replace("ipfs://", "https://ipfs.io/ipfs/"),
  });

  const tokenGroup = {
    token0: {
      balance: balanceOf0,
      name: data?.name,
      imageUri: data?.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
      description: data?.description,
    },
    token1: {
      balance: balanceOf1,
      name: jsonData1?.name,
      imageUri: jsonData1?.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
      description: jsonData1?.description,
    },
  } as any;

  tokenGroup.token0.balance = balanceOf0;
  tokenGroup.token1.balance = balanceOf1;

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <TokenGroupCard tokenGroup={tokenGroup} toggleProps={propsConfig} />
        </div>
      </div>
    </>
  );
};
