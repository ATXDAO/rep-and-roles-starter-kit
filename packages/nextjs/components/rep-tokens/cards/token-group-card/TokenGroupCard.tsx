import { CardClasses } from "../../types/Types";
import { TokenCard } from "../token-card/TokenCard";
import { TokenCardProps } from "../token-card/TokenCard";
import { StringCardProps } from "../value-cards/StringCard";
import { Address } from "~~/components/scaffold-eth";

export interface TokenGroupProps {
  address: StringCardProps;
  tokenCardsProps: TokenCardProps[];
  classes?: TokenGroupCardElementsClasses;
  isPrettyLoading?: boolean;
}

export interface TokenGroupCardElementsClasses {
  card?: string;
  tokenCardsContainer?: string;
  address?: CardClasses;
}

export interface TokenGroupCardInternalProps {
  props: TokenGroupProps;
}

export const TokenGroupCard = ({ props }: TokenGroupCardInternalProps) => {
  const tokenCards = props?.tokenCardsProps.map((cardProps, index) => (
    <TokenCard key={`tokenCard+${index}`} props={cardProps}></TokenCard>
  ));

  let output = (
    <>
      <Address props={props.address}></Address>
      <div className={props.classes?.tokenCardsContainer}>{tokenCards}</div>
    </>
  );

  if (props.isPrettyLoading) {
    let isLoaded = true;
    for (let i = 0; i < props?.tokenCardsProps.length; i++) {
      if (
        props?.tokenCardsProps[i].valuesProps?.balanceProps?.value === undefined &&
        props?.tokenCardsProps[i].valuesProps?.nameProps?.value === undefined &&
        props?.tokenCardsProps[i].valuesProps?.descriptionProps?.value === undefined &&
        props?.tokenCardsProps[i].valuesProps?.imageProps?.value === undefined
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
