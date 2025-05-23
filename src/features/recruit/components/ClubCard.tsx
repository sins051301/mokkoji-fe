import styled from "styled-components";
import { ClubType } from "@/features/clubs/types/clubType";
import FavoriteButton from "@/components/FavoriteButton";
import { useLazyImg } from "@/hooks/useLazyImg";
import PeriodSection from "@/components/PeriodSection";
import { useGetStatus } from "../hooks/useGetStatus";

const Card = styled.div`
  display: flex;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 2%;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Image = styled.img`
  width: 33%;
  height: 90%;
  border-radius: 15px;
  object-fit: contain;
  margin-right: 5%;
  flex-shrink: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 60%;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const Status = styled.div<{ $backColor: string; $fontColor: string }>`
  width: fit-content;
  border-radius: 20px;
  padding: 3px 7px;
  background-color: ${({ $backColor }) => $backColor};
  color: ${({ $fontColor }) => $fontColor};
  font-size: 0.6rem;
  font-weight: 550;
`;

const RecruitPeriod = styled.div`
  font-size: 0.7rem;
  color: gray;
`;

const ClubName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const Category = styled.div`
  margin-top: 5%;
  font-size: 0.6rem;
  color: gray;
  font-weight: 550;
`;

const TitleSection = styled.div`
  margin: 5% 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface ClubProp {
  club: ClubType;
  onClick: () => void;
}

function ClubCard({ club, onClick }: ClubProp) {
  const { text, backColor, fontColor } = useGetStatus(club.recruitEndDate);
  const { imgSrc, imgRef } = useLazyImg({ src: club.imageURL || undefined });

  return (
    <Card onClick={onClick}>
      <Image ref={imgRef} src={imgSrc || undefined} alt={club.name} />
      <Content>
        <TopRow>
          <Status $backColor={backColor} $fontColor={fontColor}>
            {text}
          </Status>
          <RecruitPeriod>
            <PeriodSection
              startDate={club.recruitStartDate}
              endDate={club.recruitEndDate}
              size={0.75}
              simple={true}
            />
          </RecruitPeriod>
        </TopRow>
        <TitleSection>
          <ClubName>{club.name}</ClubName>
          <FavoriteButton club={club} />
        </TitleSection>
        <Category>
          {club.category} | {club.affiliation}
        </Category>
      </Content>
    </Card>
  );
}

export default ClubCard;
