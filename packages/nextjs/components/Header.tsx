"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReputationTokenGroupCard } from "./rep-tokens/cards/ReputationTokenGroupCard";
import { ReputationComponent } from "./rep-tokens/cards/ReputationTokenGroupCard";
import { useRepTokens } from "./rep-tokens/hooks/Hooks";
import { useAccount } from "wagmi";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const [instancedHeaderLinks, setInstancedHeaderLinks] = useState(menuLinks);

  const { address } = useAccount();

  const { tokens } = useRepTokens([BigInt(0), BigInt(1), BigInt(2)], address, "nftstorage");

  const widgetComponents: ReputationComponent[] = ["Balance", "Image"];

  const claimableHatId2 = "26960358055844173566950915356986848857678722938711691764997516427264";

  const { data: balanceOfClaimableHat2 } = useScaffoldReadContract({
    contractName: "Hats",
    functionName: "balanceOf",
    args: [address, BigInt(claimableHatId2)],
  });

  useEffect(() => {
    if (location?.hostname === "localhost" || location?.hostname === "127.0.0.1") {
      setOutput(
        <ReputationTokenGroupCard tokens={tokens} components={widgetComponents} isBalanceOverlayed={true} size="xs" />,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens.length]);

  useEffect(() => {
    const linksToAdd: any = [];

    if (location?.hostname === "localhost" || location?.hostname === "127.0.0.1") {
      linksToAdd.push({
        label: "Roles",
        href: "/hats",
      });

      linksToAdd.push({
        label: "Debug Contracts",
        href: "/debug",
        icon: <BugAntIcon className="h-4 w-4" />,
      });

      // setInstancedHeaderLinks([
      //   ...instancedHeaderLinks,
      //   {
      //     label: "Roles",
      //     href: "/hats",
      //   },
      //   {
      //     label: "Debug Contracts",
      //     href: "/debug",
      //     icon: <BugAntIcon className="h-4 w-4" />,
      //   },
      // ]);
    }

    if (Number(balanceOfClaimableHat2) > 0) {
      console.log("im set");

      linksToAdd.push({
        label: "Steward's Hideout",
        href: "/stewards-hideout",
      });

      setInstancedHeaderLinks([
        ...instancedHeaderLinks,
        {
          label: "Steward's Hideout",
          href: "/stewards-hideout",
        },
      ]);

      setInstancedHeaderLinks([...instancedHeaderLinks, linksToAdd]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceOfClaimableHat2]);

  const [output, setOutput] = useState<any>();

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Reputation & Roles</span>
            <span className="text-xs">Onchain tracking of trust</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        {output}
        {/* <ReputationTokenGroupCard tokens={tokens} components={widgetComponents} isBalanceOverlayed={true} size="xs" /> */}

        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
