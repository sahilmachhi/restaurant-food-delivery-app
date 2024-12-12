"use client";
import { getAllRestaurants, searchRestaurant } from "@/utils/restaurnatApi";
import { useEffect, useState } from "react";
import SearchResultCard from "./SearchResultCard";
import CuisineFilter from "./CuisineFilter";
import SearchBar from "./SearchBar";
import SearchResultInfo from "./SearchResultInfo";
import SortOptionDropdown from "./SortOptionDropdown";
import { CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export type searchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const HomePage = () => {
  const [isLoading, setloading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [isError, setError] = useState<undefined | any>(undefined);
  const [searchState, setSearchState] = useState<searchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const setShortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchQuery: any) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchQuery.searchQuery,
      page: 1,
    }));
  };

  useEffect(() => {
    searchRestaurant(searchState);
  }, [searchState]);

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  // data fetching logic start here
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
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* <FilterPage /> */}
        <div className="flex-1">
          {/* Search Input Field  */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              // value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              // onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              // onClick={() =>
              //   searchRestaurant(params.text!, searchQuery, appliedFilter)
              // }
              className="bg-orange hover:bg-hoverOrange"
            >
              Search
            </Button>
          </div>
          {/* Searched Items display here  */}
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">
                {/* ({searchedRestaurant?.data.length}) Search result found */}
              </h1>
              {/* <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {appliedFilter.map((selectedFilter: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative inline-flex items-center max-w-full"
                  >
                    <Badge
                      className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                      variant="outline"
                    >
                      {selectedFilter}
                    </Badge>
                    <X
                      onClick={() => setAppliedFilter(selectedFilter)}
                      size={16}
                      className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                    />
                  </div>
                ))}
              </div> */}
            </div>
            {/* Restaurant Cards  */}
            {/* <div className="grid md:grid-cols-3 gap-4">
              {loading ? (
                <SearchPageSkeleton />
              ) : !loading && searchedRestaurant?.data.length === 0 ? (
                <NoResultFound searchText={params.text!} />
              ) : (
                searchedRestaurant?.data.map((restaurant: Restaurant) => (
                  <Card
                    key={restaurant._id}
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="relative">
                      <AspectRatio ratio={16 / 6}>
                        <img
                          src={restaurant.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Featured
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {restaurant.restaurantName}
                      </h1>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <p className="text-sm">
                          City:{" "}
                          <span className="font-medium">{restaurant.city}</span>
                        </p>
                      </div>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <Globe size={16} />
                        <p className="text-sm">
                          Country:{" "}
                          <span className="font-medium">
                            {restaurant.country}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {restaurant.cuisines.map(
                          (cuisine: string, idx: number) => (
                            <Badge
                              key={idx}
                              className="font-medium px-2 py-1 rounded-full shadow-sm"
                            >
                              {cuisine}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                      <Link to={`/restaurant/${restaurant._id}`}>
                        <Button className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                          View Menus
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
  //       <div id="cuisines-list">
  //         <CuisineFilter
  //           selectedCuisines={searchState.selectedCuisines}
  //           onChange={setSelectedCuisines}
  //           isExpanded={isExpanded}
  //           onExpandedClick={() =>
  //             setIsExpanded((prevIsExpanded) => !prevIsExpanded)
  //           }
  //         />
  //       </div>
  //       <div id="main-content" className="flex flex-col gap-5">
  //         <SearchBar
  //           searchQuery={searchState.searchQuery}
  //           onSubmit={setSearchQuery}
  //           placeHolder="Search by Cuisine or Restaurant Name"
  //           onReset={resetSearch}
  //         />
  //         <div className="flex justify-between flex-col gap-3 lg:flex-row">
  //           <SearchResultInfo total={restaurants.length} />
  //           <SortOptionDropdown
  //             sortOption={searchState.sortOption}
  //             onChange={(value) => setShortOption(value)}
  //           />
  //         </div>

  //         {restaurants.map((restaurant, index) => (
  //           <SearchResultCard restaurant={restaurant} key={index} />
  //         ))}
  //         {/*
  //         <PaginationSelector
  //         page={results.pagination.page}
  //         pages={results.pagination.pages}
  //         onPageChange={setPage}
  //       /> */}
  //       </div>
  //     </div>
  //   </>
  // );
};

export default HomePage;
