import React, { Component } from 'react';

class AddCard extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <div className="break"></div>
                {this.makeDayInput()}<br></br>
                {this.makeTimeInput()}<br></br>
                {this.makeHeightInput()}<br></br>
                {this.makeColourInput()}<br></br>
                {this.makeMessageInput()}<br></br>
            </div>
        );
    }

    makeDayInput = () => {
        var options = [];
        options.push(<option className = "boldText" value="" selected disabled hidden>Day</option>);
        for(var i = 0; i < 7; i++){
            if(this.props.grid[this.props.week - 1][i] == 0) continue;
            options.push(<option className = "boldText" value={this.props.grid[this.props.week - 1][i]}>{this.props.grid[this.props.week - 1][i]}</option>);
        }
        return(
            <select id="addCard_day" className="input">
                {options}
            </select>
        )
    }

    makeTimeInput = () => {
        var options = [];
        options.push(<option className = "boldText" value="" selected disabled hidden>Start Time</option>);
        for(var i = 0; i < 24; i++){
            var string = i + ":00";
            options.push(<option className = "boldText" value={i}>{string}</option>);
        }
        return(
        <select id="addCard_time" className="input">
            {options}
        </select>
        )
    }

    makeHeightInput = () => {
        var options = [];
        options.push(<option className = "boldText" value="" selected disabled hidden>Length</option>);
        for(var i = 1; i <= 24; i++){
            var string = i;
            options.push(<option className = "boldText" value={i}>{string}</option>);
        }
        return(
        <select id="addCard_height" className="input">
            {options}
        </select>
        )
    }

    makeColourInput = () => {
        var options = [];
        options.push(<option className = "boldText" value="" selected disabled hidden>Colour</option>);
        console.log(this.props.colours.length);
        for(var i = 0; i < this.props.colours.length; i++){
            console.log(this.props.colours[i]);
            options.push(<option className = "boldText" value={this.props.colours[i].colour} style={{color: this.props.colours[i].colour}}>{this.props.colours[i].name}</option>);
        }

        return(
            <select id="addCard_colour" className="input">
                {options}
            </select>
        )
    }
    makeMessageInput = () => {
        return(
        <input type="text" id="addCard_message" className="input inputText" placeholder="Activity">
        </input>
        )
    }    
}

export default AddCard;
