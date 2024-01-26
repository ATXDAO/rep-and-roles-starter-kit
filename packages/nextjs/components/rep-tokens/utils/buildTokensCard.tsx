import { ImageProperties } from "../cards/property-cards/ImageCard";
import { IsBeautifyingTokenCardLoadingProps } from "../cards/token-card/TokenCard";
import { TokenCardElementsClasses } from "../cards/token-card/TokenCard";
import { TokenCardProps } from "../cards/token-card/TokenCard";
import { Token } from "../hooks/Hooks";

export function buildTokenGroupCard(
  tokens: Token[],
  address?: string,
  imageProperties?: ImageProperties,
  elementsClasses?: TokenCardElementsClasses,
  //   isRenderingTokenCardProps?: IsRenderingTokenCardProps,
  isBeautifyingTokenCardLoadingProps?: IsBeautifyingTokenCardLoadingProps,
) {
  const arr = [];

  for (let i = 0; i < tokens.length; i++) {
    const tokenCardProp: TokenCardProps = {
      token: tokens[i],
      address,
      imageProperties,
      isBeautifyingTokenCardLoadingProps,
      elementsClasses,
      balanceProp: {
        value: tokens[i].balance,
        classes: elementsClasses?.baseTokenCardElementsClasses?.balance,
        isBeautifyLoading: isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps.balance,
      },
      nameProp: {
        value: tokens[i].name,
        classes: elementsClasses?.baseTokenCardElementsClasses?.name,
        isBeautifyLoading: isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps.name,
      },
      descriptionProp: {
        value: tokens[i].description,
        classes: elementsClasses?.baseTokenCardElementsClasses?.description,
        isBeautifyLoading: isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps.description,
      },
      imageProp: {
        value: tokens[i].image,
        properties: imageProperties,
        classes: elementsClasses?.baseTokenCardElementsClasses?.image,
        isBeautifyLoading: isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps.image,
      },
      addressProp: {
        value: address,
        classes: elementsClasses?.baseTokenCardElementsClasses?.address,
        isBeautifyLoading: isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps.address,
      },
    };

    arr.push(tokenCardProp);
  }

  return arr;
}
