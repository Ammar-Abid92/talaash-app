import en from "./en";
import roman from "./roman";
let I18n = {};
I18n = en;

export const setLanguage = (language) => {
  console.log("from set Language function: ", I18n, " language: ", language);
  switch (language) {
    case "roman":
      I18n = roman;
      console.log("from roman: ", I18n);
      break;
    case "en":
      I18n = en;
      break;

    default:
      I18n = en;
  }
};

export default I18n;
