import { DataTable } from "@/components/tabels/ui/data-tabel";
import { columns } from "@/components/tabels/user-tabel";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/lib/types/user";
import { extractResponse } from "@/lib/utils";
import { useGetAllUsersQuery } from "@/services/api/user";

type AllUsersRes = {
  docs: User[];
  results: number;
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    next?: number;
    prev?: number;
    documentCount: number;
  };
};

const AllUsersPage = () => {
  const { data, isSuccess, isLoading, isError } = useGetAllUsersQuery();

  if (isLoading) {
    return <Skeleton className="container mx-auto my-10 w-[90%] h-[500px]" />;
  }

  if (isError) return <p>ops!!! some error happend</p>;

  if (isSuccess) {
    const docs = extractResponse<AllUsersRes>(data!).data?.docs;
    const paginationResult = extractResponse<AllUsersRes>(data!).data
      ?.paginationResult;

    return (
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={docs || []}
          paginationResult={paginationResult!}
        />
      </div>
    );
  }
};

export default AllUsersPage;
