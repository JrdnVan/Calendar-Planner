import React, { Component } from 'react';
import './styles.css';
import AddCard from './AddCard.js';
//import postData from './data/cards.json';
import Card from './Card.js';
import PostCards from './PostCards.js';
import BinIcon from './bin-icon.png';
import ReactDOM from 'react-dom';
var postData = JSON.parse(localStorage.getItem('cards'));
if (postData == null) postData = [];
class App extends Component {
    constructor(props){
        super(props);
        let currDate = new Date();
        let currYear = currDate.getFullYear();
        let currMonth = currDate.getMonth() + 1;
        let currWeek = 1;
        this.state = {
            year: currYear,
            month: currMonth,
            week: currWeek,
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
                    
                    <div id="board_wrapper" className="Center">
                        {this.createBoard()}
                    </div>

                    <div id="addCard" className="addCard">
                        <AddCard grid={this.state.calGrid} week={this.state.week}/>
                        <button onClick = {this.addCard}>
                            Add a new card!
                        </button>
                    </div>
                    <img 
                        src="bin-icon.png"
                        className = "bin"
                        onDrop={this.dropRemove}
                        onDragOver={this.allowDrop}            
                    >

                    </img>
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

    createTimeColumn = () => {
        var col = [];
        for(var i = 0; i < 24; i++){
            col.push(<div 
                        class="outer"
                        className="box Gray Text"               
                    >
                        {i+":00"}
                    </div>);
        }
        return(
            <div className="Column" id="time_column">
                <div className="box White"></div>
                {col}
            </div>
        )        
    }

    createBoard = () => {
        console.log(this.state.year + "_" + this.state.month + "_" + this.state.week);
        const cols = [];
        const cards = this.placeExistingCards();
        cols.push(this.createTimeColumn());
        for(var i = 0; i < 7; i++){
            if(this.state.calGrid[this.state.week - 1][i]){
                cols.push(this.createColumn(i, cards));
            }else{
                cols.push(this.createBlankColumn(i));
            }
        }
        return(
            <div id="board" className="Calendar">
                {cols}
            </div>
        );
    }

    createBlankColumn = (day) => {
        const boxes = [];
        const currDay = this.state.dayNames[day];
        for(var i = 0; i < 24; i++){
            boxes.push(<div 
                        className="clearBox"               
                        >
                        </div>);
        }

        return(
            <div className="Column" id={day}>
                <div className="box Gray Text">{currDay}</div>
                {boxes}
            </div>
        )        
    }

    createColumn = (day, cards) => {
        const hrs = [];
        const currDay = this.state.dayNames[day];
        for(var i = 0; i < 24; i++){
            hrs.push(<div id = {"box" + "_" + this.state.year + "_" + this.state.month + "_" + this.state.calGrid[this.state.week - 1][day] + "_" + i} 
                        class="outer"
                        className="box LightGray Text"
                        onDrop={this.drop}
                        onDragOver={this.allowDrop}                    
                    >
                        {this.placeValidCards(cards, this.state.calGrid[this.state.week - 1][day], i)}
                    </div>);
        }

        return(
            <div className="Column" id={day}>
                <div className="box Gray Text">{this.state.calGrid[this.state.week - 1][day] + " " + currDay}</div>
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

    makeCard = (idName, height, msg) =>{
        return (
            <div 
                id={idName}
                class="inner"
                className="LightSmoothGreen Text card" 
                draggable="true" 
                style={height}
                onDragStart={this.drag}
            >
                {msg}
            </div>
        )
    }

    drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var card = document.getElementById(data);
        if(!this.isValidMove(ev, card)) return;
        console.log(card);
        ev.target.appendChild(card);
        card.id = "card" + "_" + card.id.split("_")[1] + "_" + ev.target.id + "_" + card.id.split("_")[7];
        this.SaveJSON(ev, card);
        //this.removeCard(postData.length - 1);
        console.log(card.id);
        //TEMPORARY FIX FOR A BUG VVV
        this.refreshPage();
    }

    dropRemove = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var card = document.getElementById(data);
        this.removeCard(card.id.split("_")[7]);
        this.refreshPage();
    }

    isValidMove = (ev, card) => {
        var pattern = /^box.+$/;
        if(!pattern.test(ev.target.id)) return false;
        if(!this.checkOntopOfExistingCard(ev, card, this.getAllCardsOnBoard())) return false;
        if(Number(ev.target.id.split("_")[4]) + Number(card.id.split("_")[1]) > 24) return false;
        return true;
    }
    
    checkOntopOfExistingCard = (ev, card, list) => {
        const board = [[], [], [], [], [], [], []];
        for(var i = 0; i < list.length; i++){
            if(card == list[i]) continue;
            var cardVals = list[i].id.split("_");
            var h = cardVals[1]; var y = cardVals[3]; var m = cardVals[4]; var d = cardVals[5]; var t = cardVals[6];
            var date = new Date(y + '-' + m + '-' + d);
            var curr_day = date.getDay();
            for(var j = 0; j < h; j++){
                board[curr_day][Number(t) + Number(j)] = 1;
            }
        }

        var divVals = ev.target.id.split("_");
        var div_year = divVals[1]; var div_month = divVals[2]; var div_day = divVals[3]; var div_time = divVals[4]; 
        var date = new Date(div_year + '-' + div_month + '-' + div_day);
        var curr_day = date.getDay();
        var height = card.id.split("_")[1];
        for(var i = 0; i < height; i++){
            if(board[curr_day][Number(div_time) + Number(i)] == 1){
                return false;
            }
        }
        return true;
    }

    getAllCardsOnBoard = () => {
        var list = document.querySelectorAll('[id*="card"]');
        return list;
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
                var height = {height: h*(postDetail.length) + br*(postDetail.length - 2)}
                var card_name = "card" + "_" + postDetail.length + "_" + "box" + "_" + postDetail.year + "_" + postDetail.month + "_" + postDetail.day + "_" + postDetail.start_time + "_" + postDetail.id;
                var card = this.makeCard(card_name, height, postDetail.message);
                allCards.push(card);
            }
        })
        return allCards;
    }

    placeValidCards = (cards, d, time) => {
        for(var i = 0; i < cards.length; i++){
            var cardString = cards[i].props.id.split("_");
            //console.log(cardString[4] + "_" + d + "_" + cardString[5] + "_" + time);
            if(cardString[5] == d && cardString[6] == time){
                return cards[i];
            }
        }
        return;
    }

    SaveJSON = (ev, card) => {
        var id = card.id.split("_")[7];
        postData[id].day = ev.target.id.split("_")[3];
        postData[id].start_time = ev.target.id.split("_")[4];
        this.saveState();
    }

    saveState = () =>{
        localStorage.setItem('cards', JSON.stringify(postData));
        console.log(localStorage.getItem('cards'));
    }

    addCard = () => {
        console.log("making card");
        var time = document.getElementById("addCard_time");
        var height = document.getElementById("addCard_height");
        var msg = document.getElementById("addCard_message");
        var d = document.getElementById("addCard_day");
        if(time == null || height == null || msg == null || d == null){
            console.log("error");
            return;
        }
        
        time = Number(time.value);
        height = Number(height.value);
        msg = msg.value;
        d = d.value;
        var id = 0;
        if(postData.length != 0) id = postData[postData.length - 1].id + 1;
        var y = this.state.year;
        var m = this.state.month;
        var w = this.state.week;

        var JSONObject = {
            "id": id,
            "year": y,
            "month": m,
            "day": d,
            "week": w,
            "start_time": time,
            "length": height,
            "message": msg
        }

        postData.push(JSONObject);
        this.saveState();
        this.refreshPage();
    }

    removeCard = (id) => {
        postData.splice(id, 1);
        this.recomputeJSONIdTags();
        this.refreshPage();
    }

    recomputeJSONIdTags = () => {
        for(var i = 0; i < postData.length; i++){
            postData[i].id = i;
        }
        this.saveState();
    }

    refreshPage = () => {
        window.location.reload();
    }
}

export default App;
