// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { FC } from "react";

import { getAllRestaurants } from "@/utils/restaurnatApi";
// import { useParams } from "next/navigation";

// const HomePage: FC = () => {
//   const isAuth = useSelector((state: RootState) => state.user.isLoggedIn);
//   const isLoading = useSelector((state: RootState) => state.user.isLoading);
//   const userName = useSelector((state: RootState) => state.user.user);

//   return (
//     <div>
//       {isLoading ? (
//         <h1>loading...</h1>
//       ) : isAuth ? (
//         <h1>user name is {userName?.username}</h1>
//       ) : (
//         <h1>user is not logged in</h1>
//       )}
//     </div>
//   );
// };

// export default HomePage;

const HomePage = async () => {
  const { result } = await getAllRestaurants();
  console.log(result);
  // api fetching logic
  // loading state logic
  // if (isLoading) {
  //   return (
  //     <>
  //       <span>loading</span>
  //     </>
  //   );
  // }
  // error handling logic
  // if (!result?.data || !city) {
  //   return (
  //     <>
  //       <span>No result found</span>
  //     </>
  //   );
  // }

  return (
    <>
      <h1>search results</h1>
    </>
  );
};

export default HomePage;
