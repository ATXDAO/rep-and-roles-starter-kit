import { BaseImageProps } from "../cards/property-cards/ImageCard";

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
  imageProperties: BaseImageProps;
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
  classes: {
    card: string;
  };
  elementsProps: TokenElementsConfigProps;
  isPrettyLoading: true;
}
