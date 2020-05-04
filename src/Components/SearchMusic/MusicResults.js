import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ScrollDialog from './Lyrics';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function MusicResults(props) {
  const classes = useStyles();

  const [dialog, setDialog] = useState(false);

  const [lyrics, setLyrics] = useState([]);

  useEffect(() => {
    async function fetchData() {
        setLyrics(
            await fetch(`https://infinite-river-10904.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props.id}&apikey=15b2899b105a1bef9db3d840c69e3b22`)
                .then(res => res.json())
                .then(res => res.message.body.lyrics.lyrics_body)
                .catch(err => console.log(err))
        )
    }
    fetchData();
}, [props.id])

  const handleClick = () => {
      setDialog(!dialog)
  }

  return (
      <>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.track}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Album: {props.album}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>Show Lyrics</Button>
        <Button size="small" href={props.url} target="_blank">To Website</Button>
      </CardActions>
    </Card>
    <ScrollDialog lyrics={lyrics} open={dialog} click={handleClick} link={props.url} name={props.title} track={props.track}/>
    </>
  );
}

export default MusicResults;














