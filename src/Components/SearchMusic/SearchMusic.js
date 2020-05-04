import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import Grid from '@material-ui/core/Grid';
import { typeMusic, topSongs } from '../Actions';
import { connect } from 'react-redux';
import MusicResults from './MusicResults';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Progress from './Progress';
class SearchMusic extends Component {

    componentDidMount() {
        if (this.props.music.length < 1) {
            this.fetchData()
        }
    }

    fetchData = () => {
        fetch(`https://infinite-river-10904.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=uk&f_has_lyrics=1&apikey=15b2899b105a1bef9db3d840c69e3b22`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(res => this.props.typeMusic('', res.message.body.track_list))
            .catch(error => console.log(error))
    }

    fetchDataOnKeywordChange = () => {
        fetch(`https://infinite-river-10904.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=${this.props.keyword}&page_size=10&page=1&s_track_rating=desc&apikey=15b2899b105a1bef9db3d840c69e3b22`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(res => this.props.typeMusic('', res.message.body.track_list))
            .catch(error => console.log(error))
    }

    handleChange = (e) => {
        const val = e.target.value;
        this.props.typeMusic(val, this.props.music)
    }

    onClickSearchButton = () => {
        this.fetchDataOnKeywordChange();
        if (this.props.songs) {
            this.props.topSongs()
        }
    }

    onClickTopTenButton = () => {
        this.fetchData();
        if (!this.props.songs) {
            this.props.topSongs()
        }
    }

    render() {

        const h2 = this.props.songs ? "Top 10 Songs" : "";

        return (
            <div className="container">
                <TextField name="searchMusic" value={this.props.keyword} onChange={this.handleChange} floatingLabelText="search for music" fullWidth={true} />
                <Button variant="contained" onClick={this.onClickSearchButton}>Search</Button>
                <Button variant="contained" onClick={this.onClickTopTenButton}>Get Top 10 Songs</Button>
                <br />
                <Grid container spacing={5} style={{ padding: '20px' }}>
                    <Grid item xs={12}><Typography variant="h2">{h2}</Typography></Grid>
                    {(typeof this.props.music !== 'undefined')&&<>
                        {this.props.music.length < 1 ? <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><Progress /></div> : null}
                        {this.props.music.map((item, index) => <Grid key={index} item xs={12} sm={6} lg={3}><MusicResults title={item.track.artist_name} id={item.track.track_id} track={item.track.track_name} url={item.track.track_share_url} album={item.track.album_name} /></Grid>)}
                    </>}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        keyword: state.musicReducer.musicKeyword,
        music: state.musicReducer.music,
        songs: state.musicReducer.displayTopSongs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        typeMusic: (keyword, music) => { dispatch(typeMusic(keyword, music)) },
        topSongs: () => { dispatch(topSongs()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMusic);