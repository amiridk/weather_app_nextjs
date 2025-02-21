"use client";

import { useSession } from "next-auth/react";
import Navbar from "../Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AirPollution from "../AirPollution/AirPollution";
import DailyForecast from "../DailyForecast/DailyForecast";
import FeelsLike from "../FeelsLike/FeelsLike";
import Humidity from "../Humidity/Humidity";

import Population from "../Population/Population";
import Pressure from "../Pressure/Pressure";
import Sunset from "../Sunset/Sunset";
import Temperature from "../Temperature/Temperature";
import UvIndex from "../UvIndex/UvIndex";
import Visibility from "../Visibility/Visibility";
import Wind from "../Wind/Wind";
import defaultStates from "../../utils/defaultStates";
import FiveDayForecast from "../FiveDayForecast/FiveDayForecast";
import { useGlobalContextUpdate } from "../../context/globalContext";
import MainMap from "../Mapbox/MainMap";
import { HandleUserFav, HandleUserFavAdd } from "@/utils/server";

const DashBoardMain = ({ passFav }) => {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const getClickedCityCords = (lat, lon) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState([]);

  const router = useRouter();
  const { data, status } = useSession();
  const [info, setInfo] = useState();

  useEffect(() => {
    setInfo(data);
  }, [data]);

  async function handleCLick(d) {
    const newData = [...passFav];
    newData.push(d);

    await HandleUserFav(data.user.email, newData);
  }

  async function handleCLickAdd(d) {
    await HandleUserFavAdd(data.user.email, d);
  }

  if (status === "unauthenticated") {
    return router.push("/");
  }
  return (
    <main className=" mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[12rem] m-auto ">
      <Navbar />
      {status === "authenticated" && info && (
        <div className="flex w-full h-full flex-col gap-3 ">
          <div className="flex flex-col md:flex-row md:flex  gap-5 justify-center items-center">
            <div className="">
              <Image
                src={`/man.png`}
                width={80}
                height={80}
                className="object-contain "
              />
            </div>
            <div className="text-center mt-5 text-xl lg:text-2xl tracking-wide">
              {" "}
              {info.user.name}{" "}
            </div>
            <div className="text-center mt-5 text-xl lg:text-2xl tracking-wide">
              {" "}
              {info.user.email}{" "}
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-5 justify-center items-center mt-10">
        {!edit ? (
          <Button
            onClick={() => {
              setEdit(true);
            }}
            variant=""
          >
            ویرایش
          </Button>
        ) : (
          <Button
            onClick={() => {
              setEdit(false);
            }}
            variant=""
          >
            تایید
          </Button>
        )}

        <p className="text-xl lg:text-4xl"> علاقه مندی ها </p>
      </div>
      <div className="mt-10 ">
        <div className="pb-4 flex flex-col gap-4 md:flex-row">
          <div className=" flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
            <div
              className={`${
                edit || !passFav.includes("temp") ? "inline-block" : "hidden"
              }`}
            >
              <Temperature />
              {!passFav.includes("temp") && edit ? (
                <Button
                  className={`${!edit && "hidden"}`}
                  onClick={() => {
                    handleCLick("temp");
                  }}
                  variant="destructive"
                >
                  Delete
                </Button>
              ) : (
                <Button
                  className={`${!edit && "hidden"}`}
                  onClick={() => {
                    handleCLickAdd("temp");
                  }}
                >
                  add
                </Button>
              )}
            </div>
            <div
              className={`${
                edit || !passFav.includes("fore") ? "inline-block" : "hidden"
              }`}
            >
              <FiveDayForecast />
              {!passFav.includes("fore") && edit ? (
                <Button
                  className={`${!edit && "hidden"}`}
                  onClick={() => {
                    handleCLick("fore");
                  }}
                  variant="destructive"
                >
                  Delete
                </Button>
              ) : (
                <Button
                  className={`${!edit && "hidden"}`}
                  onClick={() => {
                    handleCLickAdd("fore");
                  }}
                >
                  add
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
              <div
                className={` ${
                  !edit &&
                  " pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
                } ${
                  edit || !passFav.includes("airp") ? "inline-block" : "hidden"
                }`}
              >
                <AirPollution />{" "}
                {!passFav.includes("airp") && edit ? (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLick("airp");
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLickAdd("airp");
                    }}
                  >
                    add
                  </Button>
                )}
              </div>
              <div
                className={`${
                  edit || !passFav.includes("sun") ? "inline-block" : "hidden"
                }`}
              >
                {" "}
                <Sunset />{" "}
                {!passFav.includes("sun") && edit ? (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLick("sun");
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLickAdd("sun");
                    }}
                  >
                    add
                  </Button>
                )}
              </div>
              <div
                className={`${
                  edit || !passFav.includes("wind") ? "inline-block" : "hidden"
                }`}
              >
                {" "}
                <Wind />{" "}
                {!passFav.includes("wind") && edit ? (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLick("wind");
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLickAdd("wind");
                    }}
                  >
                    add
                  </Button>
                )}
              </div>
              <div
                className={` ${
                  !edit &&
                  " pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
                } ${
                  edit || !passFav.includes("daily") ? "inline-block" : "hidden"
                }`}
              >
                <DailyForecast />{" "}
                {!passFav.includes("daily") && edit ? (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLick("daily");
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLickAdd("daily");
                    }}
                  >
                    add
                  </Button>
                )}
              </div>
              <div
                className={`${
                  edit || !passFav.includes("uv") ? "inline-block" : "hidden"
                }`}
              >
                {" "}
                <UvIndex />{" "}
                {!passFav.includes("uv") && edit ? (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLick("uv");
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLickAdd("uv");
                    }}
                  >
                    add
                  </Button>
                )}
              </div>
              <div
                className={`${
                  edit || !passFav.includes("pop") ? "inline-block" : "hidden"
                }`}
              >
                {" "}
                <Population />{" "}
                {!passFav.includes("pop") && edit ? (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLick("pop");
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLickAdd("pop");
                    }}
                  >
                    add
                  </Button>
                )}
              </div>
              <div
                className={`${
                  edit || !passFav.includes("feel") ? "inline-block" : "hidden"
                }`}
              >
                {" "}
                <FeelsLike />{" "}
                {!passFav.includes("feel") && edit ? (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLick("feel");
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLickAdd("feel");
                    }}
                  >
                    add
                  </Button>
                )}
              </div>
              <div
                className={`${
                  edit || !passFav.includes("hum") ? "inline-block" : "hidden"
                }`}
              >
                {" "}
                <Humidity />{" "}
                {!passFav.includes("hum") && edit ? (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLick("hum");
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLickAdd("hum");
                    }}
                  >
                    add
                  </Button>
                )}
              </div>
              <div
                className={`${
                  edit || !passFav.includes("visi") ? "inline-block" : "hidden"
                }`}
              >
                {" "}
                <Visibility />{" "}
                {!passFav.includes("visi") && edit ? (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLick("visi");
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLickAdd("visi");
                    }}
                  >
                    add
                  </Button>
                )}
              </div>
              <div
                className={`${
                  edit || !passFav.includes("pres") ? "inline-block" : "hidden"
                }`}
              >
                {" "}
                <Pressure />{" "}
                {!passFav.includes("pres") && edit ? (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLick("pres");
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    className={`${!edit && "hidden"}`}
                    onClick={() => {
                      handleCLickAdd("pres");
                    }}
                  >
                    add
                  </Button>
                )}
              </div>
            </div>
            <div className={``}>
              <div className={` mapbox-con mt-4 flex gap-4`}>
                {(edit || !passFav.includes("big")) && <MainMap />}
                <div
                  className={` states flex flex-col gap-3 flex-1 ${
                    edit || !passFav.includes("big") ? "inline-block" : "hidden"
                  }`}
                >
                  <h2 dir="rtl" className="flex items-center gap-2 font-medium">
                    شهر های بزرگ{" "}
                    {!passFav.includes("big") && edit ? (
                      <Button
                        className={`${!edit && "hidden"}`}
                        onClick={() => {
                          handleCLick("big");
                        }}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button
                        className={`${!edit && "hidden"}`}
                        onClick={() => {
                          handleCLickAdd("big");
                        }}
                      >
                        add
                      </Button>
                    )}
                  </h2>

                  <div className="flex flex-col gap-4">
                    {defaultStates.map((state, index) => {
                      return (
                        <div
                          key={index}
                          className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                          onClick={() => {
                            getClickedCityCords(state.lat, state.lon);
                          }}
                        >
                          <p className="px-6 py-4 ">{state.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashBoardMain;
