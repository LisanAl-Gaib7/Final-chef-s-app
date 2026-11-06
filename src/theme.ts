// Central place for colours, spacing and font sizes.
// Keeping all of this in one file means the whole app looks
// consistent, and it is easy to change the "brand" colours later.

export const colors = {
  background: "#FDF3EA", // warm cream background, matches the Part 1 mockups
  card: "#FFFFFF",
  primary: "#E2600B", // orange accent used for buttons / active tab / price
  primaryDark: "#C24F05",
  textDark: "#1F2A44", // navy, used for headings
  textMuted: "#8A8F98", // grey, used for descriptions / placeholders
  border: "#F0E4D6",
  danger: "#D14343", // used for validation error text
  success: "#2E7D32", // used for the "saved" confirmation banner
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  pill: 999,
};

export const fontSize = {
  title: 22,
  subtitle: 16,
  body: 15,
  label: 13,
  price: 17,
};
