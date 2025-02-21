import { getUserFav } from "@/utils/server";
import DashBoardMain from "../Components/dashboard/DashBoard";
import { getServerSession } from "next-auth/next";

import { redirect } from "next/navigation";

const getData = async (email) => {
  const res = await getUserFav(email);
  return res;
};
const DashBoardPage = async () => {
  const data = await getServerSession();
  if (!data) {
    return redirect("/");
  }
  const passFav = await getUserFav(data.user.email);
 
  return <>{<DashBoardMain passFav={passFav} />}</>;
};

export default DashBoardPage;
