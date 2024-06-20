import { atom } from "recoil";

export const loading = atom({
  key: "loading", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});