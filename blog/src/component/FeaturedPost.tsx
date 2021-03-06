import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Post } from "../types/post";
import { parseSrcS3ToHttps, getArticleTitle } from '../utils/parseS3Link';

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
    padding: 10,
  },
  cardMedia: {
    width: 160,
  },
  title: {
    fontFamily: "Lato, Yu Gothic Medium, Segoe UI"
  },
  text: {
    fontFamily: "Segoe UI, Yu Gothic Medium, Lato"
  },
});

function FeaturedPost(props: { post: Post }) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Link to={`/feeds/articles/${getArticleTitle(post.src)}`} style={{ textDecoration: 'none' }}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h4" className={classes.title}>
                  {post.title}
                </Typography>
                <Typography variant="h6" color="textSecondary" className={classes.text}>
                  {post.created_at.match(/\d{4}\-\d{2}\-\d{2}/g)}
                </Typography>
                <Typography variant="h6" paragraph className={classes.text}>
                  {post.summary}
                </Typography>
                <Typography variant="h6" color="primary" className={classes.text}>
                  Continue reading...
                  {/* {post.src} */}
                </Typography>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={`${parseSrcS3ToHttps(post.src)}cover.jpg`}
                title="Article Cover"
              />
            </Hidden>
          </Card>
        </Link>
      </CardActionArea>
      {/* <Route path={`/user/${post.src}`} component={CareerArticles} /> */}
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    // image: PropTypes.string.isRequired,
    // imageText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
