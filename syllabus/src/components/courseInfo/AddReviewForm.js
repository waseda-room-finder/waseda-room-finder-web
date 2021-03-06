import React from "react";
import styled from "styled-components";
import { media } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { WithTranslation, withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import Statistic from "semantic-ui-react/dist/commonjs/views/Statistic";
import LoadingSpinner from "@bit/wasedatime.core.ts.ui.loading-spinner";

const StyledSubHeading = styled("h5")`
  align-self: flex-start;
  margin: 1rem 0px !important;
  padding-left: 1rem;
  border-left: 5px solid rgb(148, 27, 47);
  font-weight: 300;
  ${media.tablet`font-size: 2rem;`};
`;

const StyledForm = styled("form")`
  width: 100%;
  align-self: center;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ScalesList = styled("div")`
  display: flex;
  flex-direction: row;
  ${media.tablet`flex: 2; flex-direction: column;`};
`;

const Scale = styled(Statistic)`
  margin: 0.5em 0px !important;
  padding: 0px 2em !important;
  flex: 1 0 33%;
  text-align: center;
  font-size: 0.5em !important;
`;

const Stars = styled(Statistic.Value)``;

const StyledTextarea = styled("textarea")`
  border: 1px solid #eee;
  border-radius: 10px;
  background-color: ${(props) => props.theme.white};
  outline: none;
  padding: 10px;
  margin: 5px 0 0;
  height: 100px;
  flex: 1 0 auto;
  font-size: 1.5em !important;
`;

const FormActions = styled("div")`
  display: flex;
  margin-top: 10px;
  font-size: 1.5em !important;
`;

const SubmitFormButton = styled("button")`
  flex: 0 0 20%;
  background-color: orange;
  color: #fff;
  border: 0px;
  border-radius: 5px 0 0 5px;
  ${media.tablet`flex: 0 0 30%;`};
`;

const CloseFormButton = styled("button")`
  flex: 0 0 20%;
  background-color: #aaa;
  color: #fff;
  border: 0px;
  border-radius: 0 5px 5px 0;
  ${media.tablet`flex: 0 0 30%;`};
`;

const FieldLegend = styled(Divider)`
  font-size: 1.5em !important;
  width: 60% !important;
  margin: 1em 20% !important;
`;

class AddReviewForm extends React.Component {
  state = {
    paintedSatisfactionStars: 0,
    paintedDifficultyStars: 0,
    paintedBenefitStars: 0,
  };

  displayStars = (label, selectedStar, paintedStar) => {
    let stars = [];
    for (let n = 1; n <= 5; n++) {
      let paintedStarsLabel = "";
      switch (label) {
        case "satisfaction":
          paintedStarsLabel = "paintedSatisfactionStars";
          break;
        case "difficulty":
          paintedStarsLabel = "paintedDifficultyStars";
          break;
        case "benefit":
          paintedStarsLabel = "paintedBenefitStars";
          break;
        default:
          paintedStarsLabel = "paintedSatisfactionStars";
      }
      const color =
        n <= paintedStar || (paintedStar === 0 && n <= selectedStar)
          ? "orange"
          : "#ddd";

      stars.push(
        <FontAwesomeIcon
          key={n}
          icon={faStar}
          style={{ color: color, cursor: "pointer" }}
          onMouseOver={() => this.setState({ [paintedStarsLabel]: n })}
          onMouseOut={() =>
            this.setState({ [paintedStarsLabel]: selectedStar })
          }
          onClick={() => this.props.handleScaleChange(label, n)}
        />
      );
    }
    return stars;
  };

  changeStarsColor = (label, scale) => {
    switch (label) {
      case "satisfaction":
        this.setState({ paintedSatisfactionStars: scale });
        break;
      case "difficulty":
        this.setState({ paintedDifficultyStars: scale });
        break;
      case "benefit":
        this.setState({ paintedBenefitStars: scale });
        break;
      default:
        this.setState({ paintedSatisfactionStars: scale });
    }
  };

  handleTextareaChange = (event) => {
    event.preventDefault();
    const inputText = event.target.value;
    this.props.handleTextChange(inputText);
  };

  render() {
    const {
      closeModal,
      scales,
      text,
      handleFormSubmit,
      isSending,
      t,
    } = this.props;
    const {
      paintedSatisfactionStars,
      paintedDifficultyStars,
      paintedBenefitStars,
    } = this.state;

    return (
      <div>
        <StyledSubHeading>
          {t(`courseInfo.Add review to this course`)}
        </StyledSubHeading>

        {isSending ? (
          <LoadingSpinner message={"Posting your review..."} />
        ) : (
          <StyledForm
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FieldLegend horizontal>{t(`courseInfo.Scales`)}</FieldLegend>
            <ScalesList>
              <Scale size="tiny">
                <Stars>
                  {this.displayStars(
                    "satisfaction",
                    scales.satisfaction,
                    paintedSatisfactionStars
                  )}
                </Stars>
                <Statistic.Label>
                  <p>{t(`courseInfo.Satisfaction`)}</p>
                </Statistic.Label>
              </Scale>
              <Scale size="tiny">
                <Statistic.Value>
                  {this.displayStars(
                    "difficulty",
                    scales.difficulty,
                    paintedDifficultyStars
                  )}
                </Statistic.Value>
                <Statistic.Label><p>{t(`courseInfo.Difficulty`)}</p></Statistic.Label>
              </Scale>
              <Scale size="tiny">
                <Statistic.Value>
                  {this.displayStars(
                    "benefit",
                    scales.benefit,
                    paintedBenefitStars
                  )}
                </Statistic.Value>
                <Statistic.Label><p>{t(`courseInfo.Benefit`)}</p></Statistic.Label>
              </Scale>
            </ScalesList>
            <br />

            <FieldLegend horizontal>{t(`courseInfo.Review`)}</FieldLegend>
            <StyledTextarea
              placeholder={t(`courseInfo.Review placeholder`)}
              onChange={this.handleTextareaChange}
              value={text}
            />

            <FormActions>
              <SubmitFormButton onClick={handleFormSubmit}>
                <FontAwesomeIcon icon={faCheck} /> {t(`courseInfo.Submit`)}
              </SubmitFormButton>
              <CloseFormButton onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} /> {t(`courseInfo.Close`)}
              </CloseFormButton>
            </FormActions>
          </StyledForm>
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(AddReviewForm);
