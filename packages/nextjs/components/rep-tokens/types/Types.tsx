import { ImageProps } from "../cards/property-cards/ImageCard";
import { StringCardProps } from "../cards/property-cards/StringCard";

export interface ElementClasses {
  container?: string;
  value?: string;
}

export interface BaseElementConfigProp {
  isRendering?: boolean;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
}

export interface ImageElementConfigProp extends BaseElementConfigProp {
  imageProperties: ImageProps;
}

export interface TokenElementsConfigProps {
  balanceProps?: BaseElementConfigProp;
  imageProps?: ImageElementConfigProp;
  nameProps?: BaseElementConfigProp;
  descriptionProps?: BaseElementConfigProp;
  addressProps?: BaseElementConfigProp;
}

export interface TokenCardConfigProps {
  isRendering: true;
  cardClasses: string;
  elementsProps: TokenElementsConfigProps;
  isPrettyLoading: true;
}

export interface TokenGroupCardConfigProps {
  isRendering: boolean;
  classes: TokenGroupCardClasses;
  address: StringCardProps;
  isPrettyLoading: boolean;
  tokenCardProps: TokenCardConfigProps;
}

export interface TokenGroupCardClasses {
  container: string;
  card: string;
}
