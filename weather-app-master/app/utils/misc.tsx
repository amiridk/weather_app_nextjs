import moment from "moment";

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};

export const airQulaityIndexText = [
  {
    rating: 10,
    description: "بسیارعالی",
  },
  {
    rating: 20,
    description: "عالی",
  },
  {
    rating: 30,
    description: "خوب",
  },
  {
    rating: 40,
    description: "قابل قبول",
  },
  {
    rating: 50,
    description: "متوسط",
  },
  {
    rating: 60,
    description: "متوسط",
  },
  {
    rating: 70,
    description: "ضعیف",
  },
  {
    rating: 80,
    description: "ضعیف",
  },
  {
    rating: 90,
    description: "بسیار ضعیف",
  },
  {
    rating: 100,
    description: "بسیار ضعیف",
  },
];
