"use client";export const dynamic = "force-dynamic";
import { useGlobalContext } from "@/app/context/globalContext";
import { thermometer } from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function FeelsLike() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { feels_like, temp_min, temp_max } = forecast?.main;

  const feelsLikeText = (
    feelsLike: number,
    minTemo: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemo + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return "هوای امروز سرد تر از معمول است";
    }
    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return "هوای امروز معمولیست";
    }
    if (feelsLike > avgTemp + 5) {
      return "هوای امروز ازمعمول گرمتر است";
    }

    return "هوا معمولا همین طور است";
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 dir="rtl" className="flex items-center gap-2 font-medium">
          نسبت هوا{thermometer} 
        </h2>
        <p dir="rtl" className="pt-4 text-2xl">{kelvinToCelsius(feels_like)}°</p>
      </div>

      <p dir="rtl" className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
}

export default FeelsLike;
