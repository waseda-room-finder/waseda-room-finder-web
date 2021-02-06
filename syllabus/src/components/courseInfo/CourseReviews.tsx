import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { media, sizes } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ReviewLangSwitches from "./ReviewLangSwitches";
import ReviewScalesCountContainer from "./ReviewScalesCountContainer";
import ReviewsList from "./ReviewsList";
import { WithTranslation, withTranslation } from "react-i18next";
import { getAvgScales } from "../../utils/get-avg-scales";
import { Review, Scales } from "../../types/review";

const StyledReviewsWrapper = styled("div")`
  ${media.phone`padding: 0 1em;`}
`;

const StyledSubHeading = styled("h2")`
  align-self: flex-start;
  margin: 1rem 0px;
  padding-left: 1rem;
  border-left: 5px solid rgb(148, 27, 47);
  font-size: 2rem;
  font-weight: 300;
  ${media.tablet`font-size: 2rem;`};
`;

const AddReviewButton = styled("button")`
  background-color: #b51e36;
  color: #fff;
  border: 0px;
  border-radius: 5px;
  font-size: 0.9em;
  float: right;
  ${media.phone`float: none;`}
  ${media.phone`width: 100%;`}
  padding: 0.3rem 0.5em;
`;

const Announcement = styled("div")`
  background-color: #48af37;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 5px;
  padding: 5px 10px;
  font-size: 0.7em;
  border-radius: 3px;
  line-height: normal;
`;

const Disclaimer = styled(Announcement)`
  background-color: #aaa;
  margin: 0.5rem 0px;
`;

const ReviewsListWrapper = styled("div")`
  max-height: 60vh;
  overflow-y: auto;
`;

interface Props extends WithTranslation {
  searchLang: string;
  reviews: Review[];
}

interface State {
  reviews: Review[];
  scalesAvg: Scales;
  reviewLang: string;
}

class CourseReviews extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      reviews: props.reviews,
      scalesAvg: getAvgScales(props.reviews),
      reviewLang: props.searchLang,
    };
  }

  render() {
    const { searchLang, t } = this.props;

    const { reviews, scalesAvg, reviewLang } = this.state;

    return (
      <StyledReviewsWrapper>
        <StyledSubHeading>
          {t(`courseInfo.Reviews`)}{" "}
          <MediaQuery minWidth={sizes.phone}>
            {(matches) => (matches ? " " : <br />)}
          </MediaQuery>
          <span style={{ marginLeft: "10px" }}>
            <ReviewLangSwitches
              reviewLang={reviewLang}
              switchReviewLang={(lng) => this.setState({ reviewLang: lng })}
              isInHeading={true}
            />
          </span>
          <MediaQuery minWidth={sizes.phone}>
            {(matches) =>
              matches && (
                <AddReviewButton onClick={() => {}}>
                  <FontAwesomeIcon icon={faPen} />{" "}
                  {t(`courseInfo.Write your Review`)}
                </AddReviewButton>
              )
            }
          </MediaQuery>
        </StyledSubHeading>
        <MediaQuery minWidth={sizes.phone}>
          {(matches) =>
            !matches && (
              <AddReviewButton onClick={() => {}}>
                <FontAwesomeIcon icon={faPen} />{" "}
                {t(`courseInfo.Write your Review`)}
              </AddReviewButton>
            )
          }
        </MediaQuery>
        <Disclaimer>{t(`courseInfo.Disclaimer`)}</Disclaimer>
        <ReviewsListWrapper>
          <ReviewScalesCountContainer
            avgSatisfaction={scalesAvg.satisfaction}
            avgDifficulty={scalesAvg.difficulty}
            avgBenefit={scalesAvg.benefit}
            thisCourseReviewsLength={reviews.length}
          />
          <ReviewsList
            reviews={reviews}
            searchLang={searchLang}
            reviewLang={reviewLang}
            openReviewEditForm={() => {}}
            deleteReview={() => {}}
          />
        </ReviewsListWrapper>
        <br />
      </StyledReviewsWrapper>
    );
  }
}

export default withTranslation("translation")(CourseReviews);