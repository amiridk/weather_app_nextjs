"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { gauge } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Pressure() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { pressure } = forecast?.main;

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return "فشار بسیار پایین";

    if (pressure >= 1000 && pressure < 1015) return "فشار کم";

    if (pressure >= 1015 && pressure < 1025) return "فشار معمول";

    if (pressure >= 1025 && pressure < 1040) return "فشار بالا";

    if (pressure >= 1040) return "فشار بسیار بالا";

    return "داده ناقص است";
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 dir="rtl" className="flex items-center gap-2 font-medium">
          فشار {gauge}
        </h2>
        <p className="pt-4 text-2xl">{pressure} hPa</p>
      </div>

      <p dir="rtl" className="text-sm">
        {getPressureDescription(pressure)}
      </p>
    </div>
  );
}

export default Pressure;
