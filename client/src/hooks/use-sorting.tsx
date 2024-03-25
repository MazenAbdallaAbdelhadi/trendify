import { SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSorting = () => {
  const [, setSearchParams] = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    if (sorting.length > 0) {
      const sort = sorting.map((e) => `${e.desc ? "-" : ""}${e.id}`).join(",");
      setSearchParams((prevSearchParams) => {
        if (sort) {
          const newSearchParams = new URLSearchParams(prevSearchParams);
          newSearchParams.set("sort", sort);
          return newSearchParams;
        }
        return prevSearchParams;
      });
    } else {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = new URLSearchParams(prevSearchParams);
        newSearchParams.delete("sort");
        return newSearchParams;
      });
    }
  }, [setSearchParams, sorting]);

  return {
    sorting,
    setSorting,
  };
};

export default useSorting;
