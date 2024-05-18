export const beautyStyleMap = {
  rounded: "rounded-lg",
  straight: "",
};

export type Style = "rounded" | "straight";

export type Size = "base";

export type RenderableTypes =
  | "Image"
  | "Token Id"
  | "Name"
  | "Description"
  | "Attributes"
  | "Address"
  | "Collection Name"
  | "Collection Symbol";

export type LoadType = "animated" | "text";
