import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePagination = (intialPage = 0, intialLimit = 10) => {
  const [, setSearchParams] = useSearchParams();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: intialPage,
    pageSize: intialLimit,
  });

  useEffect(() => {
    setSearchParams((prev) => {
      const newSearchParams = new URLSearchParams(prev);
      newSearchParams.set("page", String(pagination.pageIndex));
      newSearchParams.set("limit", String(pagination.pageSize));
      return newSearchParams;
    });
  }, [pagination.pageIndex, pagination.pageSize, setSearchParams]);

  return {
    pagination,
    setPagination,
  };
};

export default usePagination;
