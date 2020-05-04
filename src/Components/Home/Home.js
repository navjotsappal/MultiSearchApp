import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Search from '../Search/Search';
import SearchMovies from '../SearchMovies/SearchMovies';
import SearchMusic from '../SearchMusic/SearchMusic';
import { connect } from 'react-redux';
import {changePage} from '../Actions';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Home(props) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    props.change(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={props.currentPage} onChange={handleChange} aria-label="nav tabs example">
          <LinkTab label="Pictures" href="/" {...a11yProps(0)} />
          <LinkTab label="Movies" href="/movies" {...a11yProps(1)} />
          <LinkTab label="Song Lyrics" href="/music" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={props.currentPage} index={0}>
          <Search/>
      </TabPanel>
      <TabPanel value={props.currentPage} index={1}>
          <SearchMovies/>
      </TabPanel>
      <TabPanel value={props.currentPage} index={2}>
          <SearchMusic/>
      </TabPanel>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        change: (id) => { dispatch(changePage(id)) },
    }
}

const mapStateToProps = (state) => {
    return{
        currentPage: state.appReducer.currentPage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
