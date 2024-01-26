import { ImageProperties } from "../cards/property-cards/ImageCard";
import { IsBeautifyingTokenCardLoadingProps, IsRenderingTokenCardProps } from "../cards/token-card/TokenCard";
import { TokenCardElementsClasses } from "../cards/token-card/TokenCard";
import { TokenCardProps } from "../cards/token-card/TokenCard";
import { Token } from "../hooks/Hooks";

export function buildTokenGroupCard(
  tokens: Token[],
  address?: string,
  imageProperties?: ImageProperties,
  elementsClasses?: TokenCardElementsClasses,
  isRenderingTokenCardProps?: IsRenderingTokenCardProps,
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
      isRenderingTokenCardProps,
    };

    arr.push(tokenCardProp);
  }

  return arr;
}
