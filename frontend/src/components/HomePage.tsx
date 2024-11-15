"use client";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { FC } from "react";

import { getAllRestaurants } from "@/utils/restaurnatApi";
import { error } from "console";
import { useEffect, useState } from "react";
import SearchResultCard from "./SearchResultCard";
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

const HomePage = () => {
  const [isLoading, setloading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [isError, setError] = useState<undefined | any>(undefined);

  const getRestaurants = async () => {
    setloading(true);
    const { restaurants, error } = await getAllRestaurants();
    if (restaurants) {
      setRestaurants(restaurants);
      console.log(restaurants);
    }

    if (error) {
      setError(error);
    }
    setloading(false);

    // api fetching logic
    // loading state logic
    // error handling logic
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  if (isLoading) {
    return (
      <>
        <span>loading</span>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <span>error finding in restaurants</span>
      </>
    );
  }

  if (restaurants.length < 1) {
    return (
      <>
        <h1>no restaurants found</h1>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div id="cuisines-list">
          {/* <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        /> */}
        </div>
        <div id="main-content" className="flex flex-col gap-5">
          {/* <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        /> */}
          <div className="flex justify-between flex-col gap-3 lg:flex-row">
            {/* <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          /> */}
          </div>

          {restaurants.map((restaurant, index) => (
            <SearchResultCard restaurant={restaurant} key={index} />
          ))}

          {/* <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        /> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
