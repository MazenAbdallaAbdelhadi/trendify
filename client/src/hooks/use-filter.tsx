import { ColumnFiltersState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilter = () => {
  const [, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    if (filter.length > 0) {
      const keyword = filter[0]?.value;

      setSearchParams((prev) => {
        const newSearchParams = new URLSearchParams(prev);
        newSearchParams.set("keyword", keyword as string);
        return newSearchParams;
      });
    } else {
      setSearchParams((prev) => {
        const newSearchParams = new URLSearchParams(prev);
        newSearchParams.delete("keyword");
        return newSearchParams;
      });
    }
  }, [setSearchParams, filter]);

  return { filter, setFilter };
};
