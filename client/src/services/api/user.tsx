import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAppDispatch } from "../state/store";
import usePrivateAxios from "@/hooks/user-private-axios";
import { setUser } from "../state/authSlice";
import { extractResponse } from "@/lib/utils";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const useGetMeQuery = () => {
  const dispatch = useAppDispatch();
  const privateApi = usePrivateAxios();

  const getMe = async () => {
    return await privateApi.get("/v1/users/getMe");
  };

  const { data, isSuccess, ...rest } = useQuery({
    queryFn: getMe,
    queryKey: ["profile"],
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      const user = extractResponse(data!);

      dispatch(setUser({ user: user.data }));
    }
  }, [data, dispatch, isSuccess]);

  return { data, isSuccess, ...rest };
};

// TODO add update profile and update password and delete profile

export const useGetAllUsersQuery = () => {
  const privateApi = usePrivateAxios();
  const [searchParams] = useSearchParams();

  const getAllUsers = async () => {
    return privateApi.get("/v1/users", {
      params: searchParams,
    });
  };

  const query = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users", searchParams],
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    query.refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return query;
};

export const useDeleteUserMutaion = (id: string) => {
  const privateApi = usePrivateAxios();
  const queryClient = useQueryClient();

  const deleteUser = async () => {
    return privateApi.delete(`/v1/users/${id}`);
  };

  return useMutation({
    mutationFn: deleteUser,
    mutationKey: ["users"],
    onSuccess: () => {
      toast("user deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
