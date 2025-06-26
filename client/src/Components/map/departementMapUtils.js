export const domTomMap = {
  ZA: "971", // Guadeloupe
  ZB: "972", // Martinique
  ZC: "973", // Guyane
  ZD: "974", // Réunion
  ZE: "976"  // Mayotte
};

export const reverseDomTomMap = Object.fromEntries(
  Object.entries(domTomMap).map(([key, val]) => [val, key])
);
