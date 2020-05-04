import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
        {props.cast.cast.map((person, index) => { return (
        <div key={index}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="star pic" src={"https://image.tmdb.org/t/p/w500" + person.profile_path} />
        </ListItemAvatar>
        <ListItemText
          primary={person.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
            {person.character}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
        </div>)})}
    </List>
  );
}