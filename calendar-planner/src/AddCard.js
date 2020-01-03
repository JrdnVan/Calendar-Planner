import React, { Component } from 'react';

class AddCard extends Component {
    render() {
        return(
            <div>
                {this.makeTimeInput()}
                {this.makeHeightInput()}
                {this.makeMessageInput()}
            </div>
        );
    }

    makeTimeInput = () => {
        var options = [];

        for(var i = 0; i < 24; i++){
            var string = i + ":00";
            options.push(<option value={i}>{string}</option>);
        }
        return(
        <select id="addCard_time">
            {options}
        </select>
        )
    }

    makeHeightInput = () => {
        var options = [];

        for(var i = 0; i < 24; i++){
            var string = i;
            options.push(<option value={i}>{string}</option>);
        }
        return(
        <select id="addCard_height">
            {options}
        </select>
        )
    }

    makeMessageInput = () => {
        return(
        <input type="text" id="addCard_message">
        </input>
        )
    }    
}

export default AddCard;
