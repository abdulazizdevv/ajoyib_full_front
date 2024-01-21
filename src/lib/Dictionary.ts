type Locale = keyof typeof dictionaries;

const dictionaries = {
  uz: () => import("../dictionaries/uz.json").then((module) => module.default),
  ru: () => import("../dictionaries/ru.json").then((module) => module.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
