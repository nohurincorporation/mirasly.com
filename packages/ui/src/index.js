export const miraslyTokens = {
  color: {
    ink: "#15251f",
    muted: "#61746c",
    surface: "#ffffff",
    canvas: "#f5f8f3",
    jade: "#1fa873",
    meadow: "#dff7c5",
    saffron: "#ffc857",
    sky: "#71c9f8",
    clay: "#ef8f73",
    border: "#dfe8e1",
    danger: "#d94d4d",
  },
  radius: {
    small: "8px",
    medium: "14px",
    large: "22px",
  },
  shadow: {
    soft: "0 18px 45px rgba(21, 37, 31, 0.10)",
  },
};

export const miraslyIconMetaphors = {
  vehicles: "rounded-road",
  real_estate: "sunlit-building",
  services: "woven-tools",
  shops: "market-arch",
  pharmacy: "safe-cross",
  fuel_charging: "charge-drop",
  made_locally: "turkmen-sun",
};

export function classNames(...parts) {
  return parts.filter(Boolean).join(" ");
}
