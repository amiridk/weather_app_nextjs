// import dynamic from "next/dynamic";

// const MainMap = () => {
//   return (
//     <>

//     </>
//   );
// };

// export default MainMap;
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Mapbox"), {
  ssr: false,
});

export default Map;
