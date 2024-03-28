"use client";

import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export function Hats() {
  const { address } = useAccount();

  //  26959946667150639794667015087019630673637144422540572481103610249216
  // 26960358043289970096177553829315270011263390106506980876069447401472

  // console.log(loadBurnerSK());

  // const { data: isAdminOfHat } = useScaffoldContractRead({
  //   contractName: "Hats",
  //   functionName: "isAdminOfHat",
  //   args: [address, BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  // });

  // const { data: balanceOfHat } = useScaffoldContractRead({
  //   contractName: "Hats",
  //   functionName: "balanceOf",
  //   args: [address, BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  // });

  // const { data: viewHat } = useScaffoldContractRead({
  //   contractName: "Hats",
  //   functionName: "viewHat",
  //   args: [BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  // });

  const { data: isEligible } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "isEligible",
    args: [address, BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  });

  const { data: isActive } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "isActive",
    args: [BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  });

  console.log(isEligible);
  console.log(isActive);

  // const { writeAsync: mintHat } = useScaffoldContractWrite({
  //   contractName: "Hats",
  //   functionName: "mintHat",
  //   args: [BigInt("26959946667150639794667015087019630673637144422540572481103610249216"), address],
  // });

  // console.log(isEligible);

  // console.log(viewHat);

  const { data: balanceOfClaimableHat, refetch } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "balanceOf",
    args: [address, BigInt("26960358049567071831564234593151059434471056522609336320533481914368")],
  });

  console.log(balanceOfClaimableHat);

  const { writeAsync: claimHat } = useScaffoldContractWrite({
    contractName: "SimpleClaimHatter",
    functionName: "claimHat",
    args: [BigInt("26960358049567071831564234593151059434471056522609336320533481914368")],
  });

  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <button
          className="btn btn-secondary btn-sm font-normal gap-1"
          onClick={async () => {
            await claimHat();
            await refetch();
          }}
        >
          Claim Hat
        </button>
      </div>
    </>
  );
}
