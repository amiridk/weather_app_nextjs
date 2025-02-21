"use client";export const dynamic = "force-dynamic";
import { useGlobalContext } from "@/app/context/globalContext";
import { eye } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Visibility() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { visibility } = forecast;

  const getVisibilityDescription = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 10) return "بسیار عالی - شعاع دید شما پاک است";
    if (visibilityInKm > 5) return "خوب - شعاع دید شما بالاست";
    if (visibilityInKm > 2) return "متوسط - ممکن است شعاع دید پایین باشد";
    if (visibilityInKm <= 2) return "ضعیف - شعاع دید شما پایین است";
    return "داده ای در دسترس نیست";
  };
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 dir="rtl" className="flex items-center gap-2 font-medium">
          شعاع دید{eye}
        </h2>
        <p className="pt-4 text-2xl">{Math.round(visibility / 1000)} km</p>
      </div>

      <p dir="rtl" className="text-sm">{getVisibilityDescription(visibility)}.</p>
    </div>
  );
}

export default Visibility;
