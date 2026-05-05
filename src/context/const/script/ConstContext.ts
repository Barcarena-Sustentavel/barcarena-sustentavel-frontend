import { createContext } from "react";

export type ConstContextType = {
  dimensoes: string[];
  dimensoesIcones: Record<string, string>;
  dimensoesCores: Record<string, string>;
  //loading: boolean;
};
export const ConstContext = createContext<ConstContextType>({
  dimensoes: [],
  dimensoesIcones: {},
  dimensoesCores: {},
  //loading: true
});