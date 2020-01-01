import React, { Component } from 'react';
import postData from './data/cards.json';
import ReactDOM from 'react-dom'; 

class PostCards extends Component {
    constructor(props, year, month, week){
        super(props);
        this.state = {
            year: year,
            month: month,
            week: week
        }
    }
    render() {
        return(
            <div>{
                postData.map((postDetail, index)=> {
                    //If card belongs on the current board
                        //getting the div
                        //var topDiv = document.getElementById(postDetail.year + "_" + postDetail.month + "_" + postDetail.day + "_" + postDetail.start_time);
                        return <div>hello</div>
                    

                })
            }</div>
        );
    }
}

export default PostCards;
