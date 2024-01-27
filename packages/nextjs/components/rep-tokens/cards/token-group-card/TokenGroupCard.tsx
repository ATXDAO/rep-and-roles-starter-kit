import { ElementClasses } from "../../types/Types";
import { StringCardProps } from "../property-cards/StringCard";
import { TokenCard } from "../token-card/TokenCard";
import { TokenCardProps } from "../token-card/TokenCard";
import { Address } from "~~/components/scaffold-eth";

export interface TokenGroupCardInternalProps {
  props: TokenGroupProps;
}

export interface TokenGroupProps {
  address: StringCardProps;
  tokenCardsProps: TokenCardProps[];
  classes?: TokenGroupCardElementsClasses;
  isPrettyLoading?: boolean;
}

export interface TokenGroupCardElementsClasses {
  card?: string;
  container?: string;
  address?: ElementClasses;
}

export const TokenGroupCard = ({ props }: TokenGroupCardInternalProps) => {
  const components = props?.tokenCardsProps.map((cardProps, index) => (
    <TokenCard
      key={`tokenCard+${index}`}
      elementsClasses={cardProps.elementsClasses}
      isBeautifyingTokenCardLoadingProps={cardProps.isBeautifyingTokenCardLoadingProps}
      elementsProps={cardProps.elementsProps}
    ></TokenCard>
  ));

  let output = (
    <>
      <Address props={props.address}></Address>
      <div className={props.classes?.container}>{components}</div>
    </>
  );

  if (props.isPrettyLoading) {
    let isLoaded = true;
    for (let i = 0; i < props?.tokenCardsProps.length; i++) {
      if (
        props?.tokenCardsProps[i].elementsProps.balanceProp?.value === undefined &&
        props?.tokenCardsProps[i].elementsProps.nameProp?.value === undefined &&
        props?.tokenCardsProps[i].elementsProps.descriptionProp?.value === undefined &&
        props?.tokenCardsProps[i].elementsProps.imageProp?.value === undefined
      ) {
        isLoaded = false;
        break;
      }
    }

    if (props?.tokenCardsProps.length === 0) {
      isLoaded = !isLoaded;
    }

    if (!isLoaded) {
      output = <p>Loading Reputation Tokens...</p>;
    }
  }

  return (
    <>
      <div className={props?.classes?.card}>{output}</div>
    </>
  );
};
