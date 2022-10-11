import { atom } from "recoil";

export const autocomplete = atom<any>({
  key: "autocomplete", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});