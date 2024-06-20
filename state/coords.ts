import { atom } from "recoil";

export const coords = atom<[number, number] | [null, null]>({
  key: "coords", // unique ID (with respect to other atoms/selectors)
  default: [null, null], // default value (aka initial value)
});