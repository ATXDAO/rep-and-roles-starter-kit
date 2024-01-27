import { ElementClasses } from "../../types/Types";
import { TokenCard } from "../token-card/TokenCard";
import { TokenCardProps } from "../token-card/TokenCard";

// import { Address } from "~~/components/scaffold-eth";

export interface TokenGroupProps {
  address?: string;
  tokenCardsProps: TokenCardProps[];
  elementsClasses?: TokenGroupCardElementsClasses;
  isBeautifyingTokenGroupCardLoadingProps?: boolean;
}

export interface TokenGroupCardElementsClasses {
  card?: string;
  container?: string;
  address?: ElementClasses;
}

export const TokenGroupCard = ({
  // address,
  tokenCardsProps,
  elementsClasses,
  isBeautifyingTokenGroupCardLoadingProps,
}: TokenGroupProps) => {
  const components = tokenCardsProps.map((props, index) => (
    <TokenCard
      key={`${props.id}+${index}`}
      id={props.id}
      elementsClasses={props.elementsClasses}
      isBeautifyingTokenCardLoadingProps={props.isBeautifyingTokenCardLoadingProps}
      elementsProps={props.elementsProps}
    ></TokenCard>
  ));

  const loadedOutput = (
    <>
      {/* <Address valu classes={elementsClasses?.address}></Address> */}
      <div className={elementsClasses?.container}>{components}</div>
    </>
  );

  let output = loadedOutput;

  if (isBeautifyingTokenGroupCardLoadingProps) {
    let isLoaded = true;
    for (let i = 0; i < tokenCardsProps.length; i++) {
      if (
        tokenCardsProps[i].elementsProps.balanceProp?.value === undefined &&
        tokenCardsProps[i].elementsProps.nameProp?.value === undefined &&
        tokenCardsProps[i].elementsProps.descriptionProp?.value === undefined &&
        tokenCardsProps[i].elementsProps.imageProp?.value === undefined
      ) {
        isLoaded = false;
        break;
      }
    }

    if (tokenCardsProps.length === 0) isLoaded = !isLoaded;

    if (!isLoaded) output = <p>Loading Reputation Tokens...</p>;
    else output = loadedOutput;
  }

  return (
    <>
      <div className={elementsClasses?.card}>{output}</div>
    </>
  );
};
