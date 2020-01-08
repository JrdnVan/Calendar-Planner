import React, { Component } from 'react';
import './styles.css';
import AddCard from './AddCard.js';

var postData = JSON.parse(localStorage.getItem('cards'));
if (postData == null) postData = [];

var lightBoxColour = "#f7f7f7"; //Default
var lightBox = JSON.parse(localStorage.getItem('lightBox'));
if (lightBox == null){
    document.documentElement.style.setProperty('--lightBox', lightBoxColour);
}else{
    document.documentElement.style.setProperty('--lightBox', lightBox);
}

var normalBoxColour = "#ededed"; //Default
var normalBox = JSON.parse(localStorage.getItem('normalBox'));
if (normalBox == null){
    document.documentElement.style.setProperty('--normalBox', normalBoxColour);
}else{
    document.documentElement.style.setProperty('--normalBox', normalBox);
}

var darkBoxColour = "#d6d6d6"; //Default
var darkBox = JSON.parse(localStorage.getItem('darkBox'));
if (darkBox == null){
    document.documentElement.style.setProperty('--darkBox', darkBoxColour);
}else{
    document.documentElement.style.setProperty('--darkBox', darkBox);
}

var mainColourColour = "#79B508"; //Default
var mainColour = JSON.parse(localStorage.getItem('mainColour'));
if (mainColour == null){
    document.documentElement.style.setProperty('--mainColour', mainColourColour);
}else{
    document.documentElement.style.setProperty('--mainColour', mainColour);
}

var darkMainColourColour = "#5B8905"; //Default
var darkMainColour = JSON.parse(localStorage.getItem('darkMainColour'));
if (darkMainColour == null){
    document.documentElement.style.setProperty('--darkMainColour', darkMainColourColour);
}else{
    document.documentElement.style.setProperty('--darkMainColour', darkMainColour);
}

var backgroundColourColour = "#FFFFFF"; //Default
var backgroundColour = JSON.parse(localStorage.getItem('backgroundColour'));
if (backgroundColour == null){
    document.documentElement.style.setProperty('--backgroundColour', backgroundColourColour);
}else{
    document.documentElement.style.setProperty('--backgroundColour', backgroundColour);
}

class App extends Component {
    constructor(props){
        super(props);
        let currDate = new Date();
        let currYear = JSON.parse(localStorage.getItem('year'));
        let currMonth = JSON.parse(localStorage.getItem('month'));
        let currWeek = JSON.parse(localStorage.getItem('week'));
        currYear = currYear == null ? currDate.getFullYear() : Number(currYear);
        currMonth = currMonth == null ? currDate.getMonth() + 1 : Number(currMonth);
        currWeek = currWeek == null ? 1 : Number(currWeek);
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
                <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
                <header className="header MainText">
                    HOME
                </header>
                <div className="break"></div>
                <body className="body">
                    <div className="Center MainText">
                        <button onClick={this.decYear} id="decYearButton" className="decButton Button">&lt;</button>                
                        {this.state.year}
                        <button onClick={this.incYear} id="incYearButton" className="incButton Button">&gt;</button>
                    </div>

                    <div className="Center MainText">
                        <button onClick={this.decMonth} id="decMonthButton" className="decButton Button">&lt;</button>
                        {this.state.monthNames[this.state.month - 1]}
                        <button onClick={this.incMonth} id="incMonthButton" className="incButton Button">&gt;</button>
                    </div>

                    <div className="Center MainText">
                        <button onClick={this.decWeek} id="decWeekButton" className="decButton Button">&lt;</button>
                        {"Week " + this.state.week}
                        <button onClick={this.incWeek} id="incWeekButton" className="incButton Button">&gt;</button>
                    </div>
                    <div className="break"></div>
                    <div id="board_wrapper" className="Center">
                        {this.createBoard()}
                    </div>

                    <div id="addCard" className="addCard">
                        <AddCard grid={this.state.calGrid} week={this.state.week}/>
                        <button onClick = {this.addCard} className="Button addCardButton">
                            Add card
                        </button>
                    </div>

                    <img 
                        src="bin-icon.png"
                        className = "bin"
                        onDrop={this.dropRemove}
                        onDragOver={this.allowDrop}            
                    >
                    </img>
                    <div className = "settingButtons">
                        <div className="hideme">
                            <button className = "Button tipsButton ButtonC">
                                DELETE DATA
                            </button>
                            <button className = "Button tipsButton ButtonB">
                                CUSTOM COLOURS
                            </button>
                            {this.makeSettingButton("A", "PREMADE THEMES", "TESTINGGGG")}
                        </div>
                        {this.makeSettingButton("Main", "GUIDE / SETTINGS", this.openTips())}
                    </div>

                    <button onClick = {this.applyColourNormal}>NORMAL</button>
                    <button onClick = {this.applyColourPink}>PINK</button>
                    <button onClick = {this.applyColourEpic}>EPIC</button>
                </body>
            </div>
        );
    }

    incYear = () => {
        this.setState({year : this.state.year + 1, week : 1, calGrid : this.getCalendarDates(this.state.year + 1, this.state.month)});
        this.saveTimeState(this.state.year + 1, this.state.month, 1); 
    }

    decYear = () => {
        if(this.state.year == 0) return;
        this.setState({year : this.state.year - 1, week : 1, calGrid : this.getCalendarDates(this.state.year - 1, this.state.month)});
        this.saveTimeState(this.state.year - 1, this.state.month, 1); 
    }
    
    incMonth = () => {
        if(this.state.month == 12){
            this.setState({year : this.state.year + 1, month : 1, week : 1, calGrid : this.getCalendarDates(this.state.year + 1, 1)});
            this.saveTimeState(this.state.year + 1, 1, 1); 
        }else{
            this.setState({month : this.state.month + 1, week : 1, calGrid : this.getCalendarDates(this.state.year, this.state.month + 1)});  
            this.saveTimeState(this.state.year, this.state.month + 1, 1); 
        }
    }
    
    decMonth = () => {
        if(this.state.month == 1){
            this.setState({year : this.state.year - 1, month : 12, week : 1, calGrid : this.getCalendarDates(this.state.year - 1, 12)});
            this.saveTimeState(this.state.year - 1, 12, 1);
        }else{
            this.setState({month : this.state.month - 1, week : 1, calGrid : this.getCalendarDates(this.state.year, this.state.month - 1)}); 
            this.saveTimeState(this.state.year, this.state.month - 1, 1);
        }
    }
    
    incWeek = () => {
        if(this.state.week < this.howManyWeeks()){
            this.setState({week : this.state.week + 1});
            this.saveTimeState(this.state.year, this.state.month, this.state.week + 1);
        }
    }
    
    decWeek = () => {
        if(this.state.week > 1){
            this.setState({week : this.state.week - 1});
            this.saveTimeState(this.state.year, this.state.month, this.state.week - 1);
        }
    }
    
    saveTimeState = (y, m, w) => {     
        localStorage.setItem('year', JSON.stringify(y));
        localStorage.setItem('month', JSON.stringify(m));
        localStorage.setItem('week', JSON.stringify(w));
    }

    createTimeColumn = () => {
        var col = [];
        for(var i = 0; i < 24; i++){
            col.push(<div 
                        class="outer"
                        className="box darkBoxColour Text"               
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
                        className="clearBox lightBoxColour"               
                        >
                        </div>);
        }

        return(
            <div className="Column" id={day}>
                <div className="box darkBoxColour Text">{currDay}</div>
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
                        className="box normalBoxColour Text"
                        onDrop={this.drop}
                        onDragOver={this.allowDrop}                    
                    >
                        {this.placeValidCards(cards, this.state.calGrid[this.state.week - 1][day], i)}
                    </div>);
        }

        return(
            <div className="Column" id={day}>
                <div className="box darkBoxColour Text">{this.state.calGrid[this.state.week - 1][day] + " " + currDay}</div>
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
        var d = new Date((y + '-' + m + '-' + 1).replace(/-/g, "/"));
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
                className="mainColour CardText card" 
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
            var date = new Date((y + '-' + m + '-' + d).replace(/-/g, "/"));
            var curr_day = date.getDay();
            for(var j = 0; j < h; j++){
                board[curr_day][Number(t) + Number(j)] = 1;
            }
        }

        var divVals = ev.target.id.split("_");
        var div_year = divVals[1]; var div_month = divVals[2]; var div_day = divVals[3]; var div_time = divVals[4]; 
        var date = new Date((div_year + '-' + div_month + '-' + div_day).replace(/-/g, "/"));
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
            var br = 2;
            //If card belongs on the current board
            if(postDetail.year == this.state.year && postDetail.month == this.state.month && postDetail.week == this.state.week){
                var height = {height: h*(postDetail.length) + br*(postDetail.length-1)}
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
            alert("Error: NULL");
            return;
        }
        
        time = Number(time.value);
        height = Number(height.value);
        msg = msg.value;
        d = Number(d.value);
        console.log(time + "A" + height + "A" + msg + "A" + d);
        if((time == "" && time != 0) || height == "" || msg == "" || d == ""){
            alert("Please select all fields before adding a card.");
            return;
        }
        if(time + height > 24){
            alert("The height of a card can't exceed (24 - Start Time).");
            return;
        }

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

    howManyWeeks = () => {
        for(var i = 1; i < this.state.calGrid.length; i++){
            if(this.state.calGrid[i][0] == 0) return i;
        }
        return 6;
    }

    openTips = () => {
        return(
            <div className = "tipText">
                <h5> Tips:</h5>
                <p> 1. When dragging a card onto another time block, the top of the card will appear where your cursor is.</p>
                <p> 2. Card data is currently stored on your computer via cookies. Clearing cookies will also clear your card data.</p>
                <p> 3. When creating a card, wisely choose the Length of the card as it can't exceed (24 - (Starting Time)). (Would like to fix selection options in the future)</p>
                <p> -----</p>
                <h5> Current issues to fix:</h5>
                <p> 1. Safari iOS can't drag/drop.</p>
                <h5> Noted Feedbacks:</h5>
                <p> 1. Ability to edit pre-existing cards. (Probably?)</p>
                <p> 2. Adding an online DB via Facebook/Gmail logins. (Most likely will do)</p>
            </div>
            );
    }

    applyColourNormal = () => {
        this.setColours("#f7f7f7", "#ededed", "#d6d6d6", "#79B508", "#5B8905", "#FFFFFF");
        this.refreshPage();
    }

    applyColourPink = () => {
        this.setColours("#FFF0F5", "#FFE4E1", "#FFC1C1", "#FFAEB9", "#FF8C69", "#FFFFFF");
        this.refreshPage();
    }

    applyColourEpic = () => {
        this.setColours("red", "yellow", "green", "orange", "blue", "purple");
        this.refreshPage();
    }
    setColours = (lb, nb, db, mc, dmc, bgc) => {
        localStorage.setItem('lightBox', JSON.stringify(lb));
        localStorage.setItem('normalBox', JSON.stringify(nb));
        localStorage.setItem('darkBox', JSON.stringify(db));
        localStorage.setItem('mainColour', JSON.stringify(mc));
        localStorage.setItem('darkMainColour', JSON.stringify(dmc));
        localStorage.setItem('backgroundColour', JSON.stringify(bgc));
    }

    makeSettingButton = (id, text, child) => {
        var Hider = "Hider" + id;
        var hideme = "hideme" + id;
        var setting = "backgroundHideme setting" + id + " settingDiv";
        var button = "Button tipsButton Button" + id;
        var settingID = "setting" + id;
        return(
            <div className ={Hider}>
                <div className = {hideme}>
                    <div id={settingID} className={setting}>
                        {child}
                    </div>
                </div>
                <button className = {button}>
                    {text}
                </button>
            </div>
        )
    }
}

export default App;
