import { Token } from "../../hooks/Hooks";
import { BalanceCard } from "../property-cards/BalanceCard";
import { ImageCard } from "../property-cards/ImageCard";
import { ImageProperties } from "../property-cards/ImageCard";
import { StringCard } from "../property-cards/StringCard";
import { ElementClasses } from "../types/Types";
import { Address } from "~~/components/scaffold-eth";

export interface BaseTokenCardProps {
  token: Token;
  address?: string;
  imageProperties?: ImageProperties;
  elementsClasses?: BaseTokenCardElementsClasses;
  isBeautifyLoadingElementsProps?: BaseTokenCardElementsSetOfBooleans;
  isRenderingElementsProps?: BaseTokenCardElementsSetOfBooleans;
}

export interface BaseTokenCardElementsClasses {
  balance: ElementClasses;
  name: ElementClasses;
  description: ElementClasses;
  image: ElementClasses;
  address: ElementClasses;
}

export interface BaseTokenCardElementsSetOfBooleans {
  balance: boolean;
  name: boolean;
  description: boolean;
  image: boolean;
  address: boolean;
}

export const BaseTokenCard = ({
  token,
  address,
  imageProperties,
  elementsClasses,
  isRenderingElementsProps = { balance: true, image: true, name: true, description: true, address: true },
  isBeautifyLoadingElementsProps = { balance: false, image: false, name: false, description: false, address: false },
}: BaseTokenCardProps) => {
  return (
    <>
      {isRenderingElementsProps.balance ? (
        <BalanceCard
          value={token.balance}
          elementClasses={elementsClasses?.balance}
          prettifyLoading={isBeautifyLoadingElementsProps?.balance}
        />
      ) : (
        <></>
      )}
      {isRenderingElementsProps.image ? (
        <ImageCard
          value={token.image}
          imageProperties={imageProperties}
          elementClasses={elementsClasses?.image}
          prettifyLoading={isBeautifyLoadingElementsProps?.image}
        />
      ) : (
        <></>
      )}
      {isRenderingElementsProps.name ? (
        <StringCard
          value={token.name}
          elementClasses={elementsClasses?.name}
          prettifyLoading={isBeautifyLoadingElementsProps?.name}
        />
      ) : (
        <></>
      )}
      {isRenderingElementsProps.description ? (
        <StringCard
          value={token.description}
          elementClasses={elementsClasses?.description}
          prettifyLoading={isBeautifyLoadingElementsProps?.description}
        />
      ) : (
        <></>
      )}
      {isRenderingElementsProps.address ? (
        <Address address={address} propertyClasses={elementsClasses?.address} />
      ) : (
        <></>
      )}
    </>
  );
};
