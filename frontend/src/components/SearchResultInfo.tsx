import Link from "next/link";

const SearchResultInfo = ({ total }: { total: number }) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found
        <Link
          href="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
