import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class MoviesReviews extends Component {

    state = {
        readMoreOpen: false
    }

    handleClick = () => {
        this.setState({ readMoreOpen: !this.state.readMoreOpen })
    }

    render() {

        const dots = this.state.readMoreOpen? "" : "...";
        const readMoreButton = <span className="read_more_button">{this.state.readMoreOpen? " Show less" : "Read more"}</span>;

        return (
            <div key={this.props.id} >
                <Typography variant="h5">{this.props.author}</Typography>
                <div>{this.props.content.length > 129 ? <p>{this.props.content.slice(0, 130)}{dots}<span onClick={this.handleClick}>{this.state.readMoreOpen ? <>{this.props.content.slice(130, this.props.content.length)}{readMoreButton}</> : readMoreButton}</span></p> : this.props.content}<br/></div>
            </div>
        )
    }
}

export default MoviesReviews;



