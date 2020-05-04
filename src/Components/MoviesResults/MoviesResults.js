import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MoviesReview from '../MoviesReviews/MoviesReviews';
import MoreMenu from './expandableMenu';
import Modal from './ModalMovie';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function MoviesResults(props) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [reviews, setReviews] = React.useState([])

    useEffect(() => {
        async function fetchData() {
            setReviews(
                await fetch(`https://api.themoviedb.org/3/movie/${props.id}/reviews?api_key=fdfd76b83d61c6a42b476b1cf05cc0d8&language=en-US&page=1`)
                    .then(res => res.json())
                    .then(res => res.results)
                    .catch(err => console.log(err, "something went wrong"))
            )
        }
        fetchData();
    }, [props.id])

    const [details, setDetails] = React.useState([])

    useEffect(() => {

        async function fetchData() {
            setDetails(
                await fetch(`https://api.themoviedb.org/3/movie/${props.id}?api_key=fdfd76b83d61c6a42b476b1cf05cc0d8&language=en-US`)
                    .then(res => res.json())
                    .catch(err => console.log(err, "something went wrong"))
            )
        }
        fetchData();

    }, [props.id])

    const [cast, setCast] = React.useState([])

    useEffect(() => {
        async function fetchData() {
            setCast(
                await fetch(`https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=fdfd76b83d61c6a42b476b1cf05cc0d8&language=en-US`)
                    .then(res => res.json())
                    .catch(err => console.log(err, "something went wrong"))
            )
        }
        fetchData();
    }, [props.id])

    const [like, setLike] = React.useState(false);

    const likeMovie = () => {

        setLike(!like);
    }
    const [dialog, setDialog] = useState(false);

    const handleClick = () => {
        setDialog(!dialog)
    }

    return (
        <>
        <Card className={classes.root} key={props.id}>
            <CardHeader
                action={
                    <MoreMenu details={details} id={props.id} click={handleClick} />
                }
                title={props.title}
                subheader={props.date}
            />
            <CardMedia
                className={classes.media}
                image={props.image}
                title="movie image"
            />
            
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.overview}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={likeMovie}>
                    <FavoriteIcon style={like ? { color: "rgb(255, 64, 128)" } : null} />
                </IconButton>
                <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>{props.vote}</span>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Reviews:</Typography>
                    {reviews.length ? "" : <Typography paragraph>No reviews</Typography>}
                    {reviews.map(review => <MoviesReview key={review.id} author={review.author} id={review.id} content={review.content} />)}
                </CardContent>
            </Collapse>
        </Card>
        <Modal open={dialog} click={handleClick} id={props.id} cast={cast}/>
        </>
    );
}

export default MoviesResults;









