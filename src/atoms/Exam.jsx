import { atom } from "recoil";

const optionsSelected = atom({
  key: "questionsSelected",
  default: [],
});
const questionsAttemptedAtom = atom({
  key: "questionsAttempted",
  default: [],
});
const currentOption = atom({
  key: "currentoption",
  default: "",
});

export { optionsSelected, currentOption, questionsAttemptedAtom };
