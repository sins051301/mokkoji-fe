import { useSuspenseQuery } from "@tanstack/react-query";
import { getClubItems, getClubItemsDetail } from "../api/clubs.api";
import {
  ClubDetailResponseType,
  ClubResponseType,
  ClubCategory,
} from "@/features/clubs/types/clubType";
import { queryClient } from "@/services/TanstackQueryStore";

export const useGetClubs = (
  page: number,
  size: number,
  keyword: string | undefined,
  category: ClubCategory | undefined,
  affiliation: string | undefined,
  recruitStatus: string | undefined
) => {
  return useSuspenseQuery<ClubResponseType>({
    queryKey: [
      "clubs",
      page,
      size,
      keyword || "",
      category || "",
      affiliation || "",
      recruitStatus || "",
    ],
    queryFn: () =>
      getClubItems(page, size, keyword, category, affiliation, recruitStatus),
  });
};

export const prefetchGetClubs = async (
  page: number,
  size: number,
  keyword?: string,
  category?: ClubCategory,
  affiliation?: string,
  recruitStatus?: string
) => {
  await queryClient.prefetchQuery<ClubResponseType>({
    queryKey: [
      "clubs",
      page,
      size,
      keyword || "",
      category || "",
      affiliation || "",
      recruitStatus || "",
    ],
    queryFn: () =>
      getClubItems(page, size, keyword, category, affiliation, recruitStatus),
  });
};

export const useGetClubsDetail = (id: string) => {
  return useSuspenseQuery<ClubDetailResponseType>({
    queryKey: ["clubs", id],
    queryFn: () => getClubItemsDetail(id),
  });
};
