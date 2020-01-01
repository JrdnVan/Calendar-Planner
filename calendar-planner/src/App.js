import React, { Component } from 'react';
import './styles.css';
import postData from './data/cards.json';
import PostCards from './PostCards.js';
import logo from './logo.svg';
import ReactDOM from 'react-dom'; 
class App extends Component {
    constructor(props){
        super(props);
        let currDate = new Date();
        let currYear = currDate.getFullYear();
        let currMonth = currDate.getMonth() + 1;
        this.state = {
            year: currYear,
            month: currMonth,
            week: 1,
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            calGrid: this.getCalendarDates(currYear, currMonth)
        };
    }
    render() {
        return(
        <div className="App" id="app">
            <header className="header MainText">
                HOME
            </header>

            <body className="body">
                <div className="Center MainText">
                    <button onClick={this.decYear} id="decYearButton" className="decButton">&lt;</button>                
                    {this.state.year}
                    <button onClick={this.incYear} id="incYearButton" className="incButton">&gt;</button>
                </div>

                <div className="Center MainText">
                    <button onClick={this.decMonth} id="decMonthButton" className="decButton">&lt;</button>
                    {this.state.monthNames[this.state.month - 1]}
                    <button onClick={this.incMonth} id="incMonthButton" className="incButton">&gt;</button>
                </div>

                <div className="Center MainText">
                    <button onClick={this.decWeek} id="decWeekButton" className="decButton">&lt;</button>
                    {"Week " + this.state.week}
                    <button onClick={this.incWeek} id="incWeekButton" className="incButton">&gt;</button>
                </div>
                
                <div id="board_wrapper" className="Center">{this.createBoard()}</div>

                <p>TEST</p>
                <p>TEST</p>
            </body>
        </div>
        );
    }

    incYear = () => {
        this.setState({year : this.state.year + 1, week : 1, calGrid : this.getCalendarDates(this.state.year + 1, this.state.month)});
    }

    decYear = () => {
        this.setState({year : this.state.year - 1, week : 1, calGrid : this.getCalendarDates(this.state.year - 1, this.state.month)});
    }

    incMonth = () => {
        if(this.state.month == 12){
            this.setState({year : this.state.year + 1, month : 1, week : 1, calGrid : this.getCalendarDates(this.state.year + 1, 1)});
        }else{
            this.setState({month : this.state.month + 1, week : 1, calGrid : this.getCalendarDates(this.state.year, this.state.month + 1)});   
        }
    }

    decMonth = () => {
        if(this.state.month == 1){
            this.setState({year : this.state.year - 1, month : 12, week : 1, calGrid : this.getCalendarDates(this.state.year - 1, 12)});
        }else{
            this.setState({month : this.state.month - 1, week : 1, calGrid : this.getCalendarDates(this.state.year, this.state.month - 1)});   
        }
    }

    incWeek = () => {
        if(this.state.week < 6){
            this.setState({week : this.state.week + 1});
        }
    }

    decWeek = () => {
        if(this.state.week > 1){
            this.setState({week : this.state.week - 1});
        }
    }

    createBoard = () => {
        console.log(this.state.year + "_" + this.state.month + "_" + this.state.week);
        const cols = [];
        const cards = this.placeExistingCards();
        for(var i = 0; i < 7; i++){
            cols.push(this.createColumn(i, cards));
        }
        return(
            <div id="board" className="Calendar">
                {cols}
            </div>
        );
    }

    createColumn = (day, cards) => {
        const hrs = [];
        const currDay = this.state.dayNames[day];
        for(var i = 0; i < 24; i++){
            hrs.push(<div id = {this.state.year + "_" + this.state.month + "_" + this.state.calGrid[this.state.week - 1][day] + "_" + i} 
                        class="outer"
                        className="box LightGray Text"
                        onDrop={this.drop}
                        onDragOver={this.allowDrop}                    
                    >
                        {i + ":00"}
                        {this.placeValidCards(cards, this.state.calGrid[this.state.week - 1][day], i)}
                    </div>);
        }

        return(
            <div className="Column" id={day}>
                <div className="box Gray Text">{this.state.calGrid[this.state.week - 1][day] + "," + currDay}</div>
                {hrs}
            </div>
        )
    }

    isLeapYear = (y) => {
        return ((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0);
    }

    getMaxDays = (y, m) => {
        const noDays = [31, this.isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return noDays[m - 1];
    }

    getCalendarDates = (y, m) => {
        const cal =[[],[],[],[],[],[]];
        //cd = what DAY the 1st lies on for the given date
        var d = new Date(y + '-' + m + '-' + 1);
        var cd = d.getDay();

        var d_i = 1;
        //foreach [week, days] DO: fill arr 
        for(var i = 0; i < 6; i++){
            for(var j = 0; j < 7; j++){
                //if first occurrence
                if(d_i == 1 && i == 0){
                    cal[i][j] = cd == j ? 1 : 0;
                //if past max days fill with 0's
                }else if(d_i > this.getMaxDays(y, m)){
                    cal[i][j] = 0;
                }else{
                    cal[i][j] = d_i;
                }
                if(cal[i][j] != 0) d_i++;
            }
        }
        return cal;
    }

    makeCard = (idName, height) =>{
        return(
            <div id={idName} class="inner" className="Red Text card" style={height} draggable="true" onDragStart={this.drag}></div>
        )
    }

    drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var card = document.getElementById(data);
        ev.target.appendChild(card);
        card.id = "card" + "_" + "length" + "_" + ev.target.id;
    }

    allowDrop = (ev) => {
        ev.preventDefault();
    }

    placeExistingCards = () => {
        var allCards = [];
        postData.map((postDetail, index)=> {
            var h = 20;
            var br = 3;
            //If card belongs on the current board
            if(postDetail.year == this.state.year && postDetail.month == this.state.month && postDetail.week == this.state.week){
                var height = {height: h*postDetail.length + br*(postDetail.length - 2)}
                var card_name = "card" + "_" + postDetail.length + "_" + postDetail.year + "_" + postDetail.month + "_" + postDetail.day + "_" + postDetail.start_time;
                var card = this.makeCard(card_name, height);

                allCards.push(card);
            }
        })
        return allCards;
    }

    placeValidCards = (cards, d, time) => {
        console.log(d + "_" + time);
        for(var i = 0; i < cards.length; i++){
            var cardString = cards[i].props.id.split("_");
            //console.log(cardString[4] + "_" + d + "_" + cardString[5] + "_" + time);
            if(cardString[4] == d && cardString[5] == time){
                console.log("hello");
                return cards[i];
            }
        }
        return;
    }
}

export default App;
