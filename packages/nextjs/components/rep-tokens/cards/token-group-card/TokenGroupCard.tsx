import { ElementClasses } from "../../types/Types";
import { TokenCard } from "../token-card/TokenCard";
import { TokenCardProps } from "../token-card/TokenCard";
import { Address } from "~~/components/scaffold-eth";

export interface TokenGroupProps {
  address?: string;
  tokenCardsProps: TokenCardProps[];
  elementsClasses?: TokenGroupCardElementsClasses;
  isBeautifyingTokenGroupCardLoadingProps?: boolean;
}

export interface TokenGroupCardElementsClasses {
  card: string;
  container: string;
  address: ElementClasses;
}

export interface IsBeautifyingTokenGroupCardLoadingProps {
  card: boolean;
}

export const TokenGroupCard = ({
  address,
  tokenCardsProps,
  elementsClasses,
  isBeautifyingTokenGroupCardLoadingProps,
}: TokenGroupProps) => {
  const components = tokenCardsProps.map((props, index) => (
    <TokenCard
      key={`${props.token.id}+${index}`}
      token={props.token}
      elementsClasses={props.elementsClasses}
      isBeautifyingTokenCardLoadingProps={props.isBeautifyingTokenCardLoadingProps}
      balanceProp={props.balanceProp}
      nameProp={props.nameProp}
      descriptionProp={props.descriptionProp}
      imageProp={props.imageProp}
      addressProp={props.addressProp}
    ></TokenCard>
  ));

  const loadedOutput = (
    <>
      <Address address={address} propertyClasses={elementsClasses?.address}></Address>
      <div className={elementsClasses?.container}>{components}</div>
    </>
  );

  let output = loadedOutput;

  if (isBeautifyingTokenGroupCardLoadingProps) {
    let isLoaded = true;
    for (let i = 0; i < tokenCardsProps.length; i++) {
      if (
        tokenCardsProps[i].token.balance === undefined &&
        tokenCardsProps[i].token.name === undefined &&
        tokenCardsProps[i].token.description === undefined &&
        tokenCardsProps[i].token.image === undefined &&
        tokenCardsProps[i].token.properties === undefined
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
