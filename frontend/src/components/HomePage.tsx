/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getAllRestaurants, searchRestaurant } from "@/utils/restaurnatApi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CuisineFilter from "./CuisineFilter";
import SearchBar from "./SearchBar";
import SearchResultInfo from "./SearchResultInfo";
import SortOptionDropdown from "./SortOptionDropdown";
import { Search } from "lucide-react";
import SearchResultCard from "./SearchResultCard";

export type searchState = {
  searchText: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as any},
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <h1 className="text-2xl font-bold text-destructive">Error</h1>
          <p className="text-muted-foreground">Error finding restaurants</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background w-full">
      <div className="max-w-screen-lg mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-64 lg:sticky lg:top-8 h-fit"
          >
            <CuisineFilter
              selectedCuisines={searchState.selectedCuisines}
              onChange={setSelectedCuisines}
              isExpanded={isExpanded}
              onExpandedClick={() =>
                setIsExpanded((prevIsExpanded) => !prevIsExpanded)
              }
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex flex-col w-full gap-6"
          >
            <SearchBar
              searchQuery={searchState.searchText}
              onSubmit={setSearchQuery}
              placeHolder="Search by Cuisine or Restaurant Name"
              onReset={resetSearch}
            />
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <SearchResultInfo total={restaurants.length} />
              <SortOptionDropdown
                sortOption={searchState.sortOption}
                onChange={(value) => setShortOption(value)}
              />
            </motion.div>

            <motion.div
              variants={gridVariants}
              className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
            >
              {isLoading ? (
                <motion.div
                  variants={itemVariants}
                  className="col-span-full flex items-center justify-center py-12"
                >
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <Search className="w-6 h-6 text-primary animate-spin" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">Loading restaurants...</h2>
                  </div>
                </motion.div>
              ) : restaurants.length < 1 ? (
                <motion.div
                  variants={itemVariants}
                  className="col-span-full text-center py-12"
                >
                  <h2 className="text-2xl font-semibold text-foreground mb-2">No restaurants found</h2>
                  <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                </motion.div>
              ) : (
                restaurants.map((restaurant, index) => (
                  <motion.div variants={itemVariants} key={index}>
                    <SearchResultCard restaurant={restaurant} />
                  </motion.div>
                ))
              )}
            </motion.div>
            {/*
            <PaginationSelector
            page={results.pagination.page}
            pages={results.pagination.pages}
            onPageChange={setPage}
          /> */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;