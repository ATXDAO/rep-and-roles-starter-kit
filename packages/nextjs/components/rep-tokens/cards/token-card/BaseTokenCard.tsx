import { Token } from "../../hooks/Hooks";
import { BalanceCard } from "../property-cards/BalanceCard";
import { ImageCard } from "../property-cards/ImageCard";
import { ImageProperties } from "../property-cards/ImageCard";
import { StringCard } from "../property-cards/StringCard";
import { PropertyClasses } from "../types/Types";
import { Address } from "~~/components/scaffold-eth";

// export interface PropertyClasses {
//   container: string;
//   value: string;
// };

export interface BaseTokenCardProps {
  token: Token;
  address?: string;
  imageProperties?: ImageProperties;
  propertiesClasses?: BaseTokenCardPropertiesClasses;
  prettifyLoadingProps?: BaseTokenCardPropertiesBooleanSet;
  renderProps?: BaseTokenCardPropertiesBooleanSet;
}

export interface BaseTokenCardPropertiesClasses {
  balance: PropertyClasses;
  name: PropertyClasses;
  description: PropertyClasses;
  image: PropertyClasses;
  address: PropertyClasses;
}

export interface BaseTokenCardPropertiesBooleanSet {
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
  propertiesClasses,
  prettifyLoadingProps,
  renderProps = { balance: true, image: true, name: true, description: true, address: true },
}: BaseTokenCardProps) => {
  return (
    <>
      {renderProps.balance ? (
        <BalanceCard
          value={token.balance}
          propertyClasses={propertiesClasses?.balance}
          prettifyLoading={prettifyLoadingProps?.balance}
        />
      ) : (
        <></>
      )}
      {renderProps.image ? (
        <ImageCard
          value={token.image}
          imageProperties={imageProperties}
          propertyClasses={propertiesClasses?.image}
          prettifyLoading={prettifyLoadingProps?.image}
        />
      ) : (
        <></>
      )}
      {renderProps.name ? (
        <StringCard
          value={token.name}
          propertyClasses={propertiesClasses?.name}
          prettifyLoading={prettifyLoadingProps?.name}
        />
      ) : (
        <></>
      )}
      {renderProps.description ? (
        <StringCard
          value={token.description}
          propertyClasses={propertiesClasses?.description}
          prettifyLoading={prettifyLoadingProps?.description}
        />
      ) : (
        <></>
      )}
      {renderProps.address ? <Address address={address} propertyClasses={propertiesClasses?.address} /> : <></>}
    </>
  );
};
