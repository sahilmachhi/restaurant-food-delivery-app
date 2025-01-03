/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getAllRestaurants, searchRestaurant } from "@/utils/restaurnatApi";
import { useEffect, useState } from "react";
import SearchResultCard from "./SearchResultCard";
import CuisineFilter from "./CuisineFilter";
import SearchBar from "./SearchBar";
import SearchResultInfo from "./SearchResultInfo";
import SortOptionDropdown from "./SortOptionDropdown";


export type searchState = {
  searchText: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const HomePage = () => {
  const [isLoading, setloading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [isError, setError] = useState<undefined | any>(undefined);
  const [searchState, setSearchState] = useState<searchState>({
    searchText: "",
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
      searchText: searchQuery.searchQuery,
      page: 1,
    }));
  };

  const getSearchedRestaurants = async () => {
    setloading(true)
    const { restaurants, error } = await searchRestaurant(searchState)
    if (!restaurants) {
      console.log(error)
    }
    setRestaurants(restaurants)
    setloading(false)
    return
  }
  useEffect(() => {
    getSearchedRestaurants()
  }, [searchState]);

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchText: "",
      page: 1,
    }));
  };

  // data fetching logic start here
  const getRestaurants = async () => {
    setloading(true);
    const { restaurants, error } = await getAllRestaurants();
    if (restaurants) {
      setRestaurants(restaurants);
      console.log("restaurant is set")
    }

    if (error) {
      setError(error);
    }
    setloading(false);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  if (isError) {
    return (
      <>
        <span>error finding in restaurants</span>
      </>
    );
  }
  
  return (
    <>
      <div className="flex items-start w-full justify-between gap-5">
        <div id="cuisines-list">
          <CuisineFilter
            selectedCuisines={searchState.selectedCuisines}
            onChange={setSelectedCuisines}
            isExpanded={isExpanded}
            onExpandedClick={() =>
              setIsExpanded((prevIsExpanded) => !prevIsExpanded)
            }
          />
        </div>
        <div id="main-content" className="flex flex-col w-full gap-5">
          <SearchBar
            searchQuery={searchState.searchText}
            onSubmit={setSearchQuery}
            placeHolder="Search by Cuisine or Restaurant Name"
            onReset={resetSearch}
          />
          <div className="flex justify-between flex-col gap-3 lg:flex-row">
            <SearchResultInfo total={restaurants.length} />
            <SortOptionDropdown
              sortOption={searchState.sortOption}
              onChange={(value) => setShortOption(value)}
            />
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {isLoading ? <h1>loading restaurants</h1> :
              restaurants.length < 1 ? <h1>
                no restaurant found
              </h1> :
                restaurants.map((restaurant, index) => (
                  <SearchResultCard restaurant={restaurant} key={index} />
                ))}
          </div>
          {/*
          <PaginationSelector
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
