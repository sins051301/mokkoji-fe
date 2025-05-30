import { ClubCategory, PaginationType } from "@/features/clubs/types/clubType";
import { useEffect } from "react";
import { prefetchGetClubs } from "../features/clubs/query/clubs.query";

const categoryPreFetchingArr = Object.values(ClubCategory);

export const usePrefetchClubs = (
  currentPage: number,
  pagination: PaginationType,
  ITEMS_PER_PAGE: number,
  searchText: string | undefined,
  selectedCategory: ClubCategory | undefined,
  affiliation: string | undefined
) => {
  useEffect(() => {
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;
    if (nextPage <= pagination.totalPages) {
      prefetchGetClubs(
        nextPage,
        ITEMS_PER_PAGE,
        searchText,
        selectedCategory,
        affiliation
      );
    }
    if (prevPage >= 1) {
      prefetchGetClubs(
        prevPage,
        ITEMS_PER_PAGE,
        searchText,
        selectedCategory,
        affiliation
      );
    }

    if (selectedCategory) {
      const idx = categoryPreFetchingArr.findIndex(
        (category) => category === selectedCategory
      );
      const nextIdx = idx + 1;
      const prevIdx = idx - 1;
      if (nextIdx <= categoryPreFetchingArr.length - 1) {
        prefetchGetClubs(
          currentPage,
          ITEMS_PER_PAGE,
          searchText,
          categoryPreFetchingArr[nextIdx],
          affiliation
        );
      }
      if (prevIdx >= 0) {
        prefetchGetClubs(
          currentPage,
          ITEMS_PER_PAGE,
          searchText,
          categoryPreFetchingArr[prevIdx],
          affiliation
        );
      }
    }
  }, [
    ITEMS_PER_PAGE,
    affiliation,
    currentPage,
    pagination.totalPages,
    searchText,
    selectedCategory,
  ]);
};
