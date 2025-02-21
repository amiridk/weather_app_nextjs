"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";

function Temperature() {
  const { forecast } = useGlobalContext();

  const { main, timezone, name, weather } = forecast;

  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  // State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const { main: weatherMain, description } = weather[0];

  const getPersianDay = (d: any) => {
    switch (d) {
      case "Saturday":
        return "شنبه";
      case "Sunday":
        return "یکشنبه";
      case "Monday":
        return "دوشنبه";
      case "Tuesday":
        return "سه شنبه";
      case "Wednesday":
        return "چهارشنبه";
      case "Thursday,":
        return "پنج شنبه";
      case "Friday":
        return "جمعه";
    }
  };

  const persianDescription = (desc: any) => {
    switch (desc) {
      case "Drizzle":
        return "نم باران و شبنم";
      case "Rain":
        return "باران";
      case "Snow":
        return "برف";
      case "Clear":
        return "آسمان پاک";
      case "Clouds":
        return "ابری";
      default:
        return "آسمان نیمه ابری";
    }
  };

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  // Live time update
  useEffect(() => {
    // upadte time every second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      // custom format: 24 hour format
      const formatedTime = localMoment.format("HH:mm:ss");
      // day of the week
      const day = localMoment.format("dddd");

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);

    // clear interval
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{localTime}</span>
        <span className="font-medium">{getPersianDay(currentDay)}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1 justify-end">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>

      <div>
        <div>
          <span className="w-full flex items-end justify-end">{getIcon()}</span>
          <p dir="rtl" className="pt-2 capitalize text-lg font-medium">
            {persianDescription(description)}
          </p>
        </div>
        <p className="flex items-center gap-5">
          <span dir="rtl">کمینه {minTemp}° </span>
          <span dir="rtl">بیشینه{maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
