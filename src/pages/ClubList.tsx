import styled from "styled-components";
import Pagination from "../components/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useFilterStore } from "@/stores/useFilterStore";
import { usePrefetchClubs } from "@/hooks/usePrefetchClubs";
import NoResults from "@/components/NoResults";
import { ClubBox, ClubType, useGetClubs } from "@/features/clubs";


const ITEMS_PER_PAGE = 12;

const ClubWrapper = styled.div`
  height: calc(100vh - 105px);
  overflow: auto;
  @media (max-width: 770px) {
    margin-top: 60px;
  }
`;

const ClubGrid = styled.div`
  margin-top: 1%;
  display: grid;
  grid-template-columns: repeat(3, 30%);
  width: 100%;
  min-height: 90%;
  justify-content: space-evenly;
  align-content: flex-start;

  @media (max-width: 770px) {
    grid-template-columns: repeat(1, 90%);
  }
`;

const PaginateSection = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

function ClubList() {
  const { affiliation } = useParams<{ affiliation: string }>();
  const navigate = useNavigate();
  const { selectedCategory, searchText, currentPage, setCurrentPage } =
    useFilterStore();

  const { data } = useGetClubs(
    currentPage,
    ITEMS_PER_PAGE,
    searchText,
    selectedCategory,
    affiliation,
    undefined
  );

  const { clubs, pagination } = data.data;

  usePrefetchClubs(
    currentPage,
    pagination,
    ITEMS_PER_PAGE,
    searchText,
    selectedCategory,
    affiliation
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  function onClick(club: ClubType) {
    navigate(`/clubs/${club.id}`);
  }

  return (
    <>
      <title>{`동아리 목록 ${currentPage}페이지`}</title>
      <meta name="title" content="세종대학교 동아리 목록 페이지" />
      <meta
        name="description"
        content="세종대학교 동아리 동아리 목록 페이지입니다."
      />
      <meta name="keywords" content="세종대학교, 세종대, 동아리" />
      <meta name="robots" content="index, follow" />

      <ClubWrapper>
        {clubs.length === 0 ? (
          <NoResults />
        ) : (
          <>
            <ClubGrid>
              {clubs.map((club) => (
                <ClubBox
                  key={club.id}
                  club={club}
                  onClick={() => onClick(club)}
                />
              ))}
            </ClubGrid>
            <PaginateSection>
              {pagination && (
                <Pagination
                  totalPages={pagination.totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </PaginateSection>
          </>
        )}
      </ClubWrapper>
    </>
  );
}

export default ClubList;
