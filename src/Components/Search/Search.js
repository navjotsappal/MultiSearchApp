import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageResults from '../ImageResults/ImageResults';
import { connect } from 'react-redux';
import { typePicture } from '../Actions/index';
import ProgressBar from '../SearchMusic/Progress';
import {debounce} from 'lodash';

class Search extends Component {

    state = {
        apiUrl: 'https://pixabay.com/api',
        apiKey: '15164621-e9e63a50c846d79421bd72c77'
    }

    componentDidMount() {

        if (this.props.images.length < 1) {

            this.fetchData();
            this.props.typeKeyword('', this.props.amount, this.props.images)
        }

        window.addEventListener('scroll', this.onScroll());
    }

   onScroll = () => {
 window.onscroll = debounce(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop
          === document.documentElement.offsetHeight
        ) {
            this.props.typeKeyword(this.props.keyword, this.props.amount + 10, this.props.images)
        }
      }, 100);}

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.keyword !== this.props.keyword && this.props.keyword === '') { return null } else if (
            prevProps.keyword !== this.props.keyword || prevProps.amount !== this.props.amount) {
            this.fetchData();
        }
    }

    componentWillUnmount(){
        this.onTextChange.cancel()
    }

    fetchData() {
        fetch(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.props.keyword}&image_type=photo&per_page=${this.props.amount}&safesearch=true`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.props.typeKeyword(this.props.keyword, this.props.amount, data.hits))
            .catch(error => console.log("error: " + error));
    }

    onTextChange = debounce((text) => {
        this.props.typeKeyword(text, this.props.amount, this.props.images)
    },500)

    onAmountChange = (e, index, val) => {

        this.props.typeKeyword(this.props.keyword, val, this.props.images)

    }

    onTextFieldClick = (e) => {
        this.props.typeKeyword('', this.props.amount, this.props.images)
        e.target.value='';
    }

    render() {

        return (
            <div className="container">
                <TextField name="searchText" onChange={e=>this.onTextChange(e.target.value)} onClick={this.onTextFieldClick} floatingLabelText="search for images" fullWidth={true} />
                <br />
                <SelectField name="amount" floatingLabelText="Amount" value={this.props.amount} onChange={this.onAmountChange}>
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={20} primaryText="20" />
                    <MenuItem value={25} primaryText="25" />
                </SelectField>
                <br />
                {this.props.images.length > 0 ? <ImageResults images={this.props.images} /> : null}
                {this.props.images.length < 1 ? <div style={{ width: "100%", height:"50vh", display: "flex", alignItems: "center", flexDirection:"column", justifyContent: "center" }}><ProgressBar /></div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        keyword: state.pictureReducer.pictureKeyword,
        amount: state.pictureReducer.picturesAmount,
        images: state.pictureReducer.pictures
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        typeKeyword: (keyword, amount, images) => { dispatch(typePicture(keyword, amount, images)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

 