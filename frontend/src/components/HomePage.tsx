"use client";
import { getAllRestaurants, searchRestaurant } from "@/utils/restaurnatApi";
import { useEffect, useState } from "react";
import SearchResultCard from "./SearchResultCard";
import CuisineFilter from "./CuisineFilter";
import SearchBar from "./SearchBar";
import SearchResultInfo from "./SearchResultInfo";
import SortOptionDropdown from "./SortOptionDropdown";

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
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
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
        <div id="main-content" className="flex flex-col gap-5">
          <SearchBar
            searchQuery={searchState.searchQuery}
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

          {restaurants.map((restaurant, index) => (
            <SearchResultCard restaurant={restaurant} key={index} />
          ))}
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
