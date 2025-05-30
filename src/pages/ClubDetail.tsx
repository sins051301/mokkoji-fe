import styled from "styled-components";

import {
  ClubDetailInfo,
  convertLinks,
  useGetClubsDetail,
} from "@/features/clubs";
import useCustomParams from "@/hooks/useCustomParams";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 95%;
  height: 95%;
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 770px) {
    margin-top: 60px;
  }
`;

const Divider = styled.hr`
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ddd;

  @media (max-width: 770px) {
    margin: 20px 20px 20px 0;
  }
`;

const RecruitmentText = styled.p`
  font-size: 0.8rem;
  color: black;
  margin-left: 20px;
  width: 95%;
  white-space: pre-wrap;
  margin-bottom: 20px;
  line-height: 1.4;
  a {
    color: blue;
    text-decoration: underline;
  }

  @media (max-width: 770px) {
    width: 90%;
  }
`;

function ClubDetail() {
  const id = useCustomParams();

  const { data } = useGetClubsDetail(id);

  const clubDetail = data.data;
  const formattedText = convertLinks(clubDetail.recruitPost);

  return (
    <>
   
        <title>{clubDetail.name}</title>
        <meta name="title" content={clubDetail.name} />
        <meta
          name="description"
          content="세종대학교 동아리 상세정보 페이지입니다."
        />
        <meta name="keywords" content="세종대학교, 세종대, 동아리" />
        <meta name="robots" content="index, follow" />

      <Wrapper>
        <Container>
          <ClubDetailInfo clubDetail={clubDetail} />
          <Divider />
          <RecruitmentText
            dangerouslySetInnerHTML={{ __html: formattedText }}
          ></RecruitmentText>
        </Container>
      </Wrapper>
    </>
  );
}

export default ClubDetail;
