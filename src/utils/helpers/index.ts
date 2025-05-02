import { ConcealedName } from "./ConcealedName";

export const generateProductLink = (code: string) => {
  return `/?t=P${encodeURIComponent(code)}`;
};

export { ConcealedName };
