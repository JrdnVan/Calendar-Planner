(this["webpackJsonpcalendar-planner"]=this["webpackJsonpcalendar-planner"]||[]).push([[0],[,,,,,,,,,function(e){e.exports=JSON.parse('[{"id":0,"year":2020,"month":1,"day":1,"week":1,"start_time":8,"length":3},{"id":1,"year":2020,"month":1,"day":2,"week":1,"start_time":8,"length":2},{"id":2,"year":2021,"month":1,"day":3,"week":2,"start_time":12,"length":2}]')},function(e,t,a){e.exports=a(18)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){e.exports=a.p+"static/media/bin-icon.6fa01a90.png"},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(6),i=a.n(s),o=(a(15),a(1)),l=a(2),c=a(4),d=a(3),m=a(5),u=(a(16),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).makeDayInput=function(){var e=[];e.push(r.a.createElement("option",{value:"",selected:!0,disabled:!0,hidden:!0},"Day"));for(var t=0;t<7;t++)0!=a.props.grid[a.props.week-1][t]&&e.push(r.a.createElement("option",{value:a.props.grid[a.props.week-1][t]},a.props.grid[a.props.week-1][t]));return r.a.createElement("select",{id:"addCard_day"},e)},a.makeTimeInput=function(){var e=[];e.push(r.a.createElement("option",{value:"",selected:!0,disabled:!0,hidden:!0},"Start Time"));for(var t=0;t<24;t++){var a=t+":00";e.push(r.a.createElement("option",{value:t},a))}return r.a.createElement("select",{id:"addCard_time"},e)},a.makeHeightInput=function(){var e=[];e.push(r.a.createElement("option",{value:"",selected:!0,disabled:!0,hidden:!0},"Length"));for(var t=0;t<24;t++){var a=t;e.push(r.a.createElement("option",{value:t},a))}return r.a.createElement("select",{id:"addCard_height"},e)},a.makeMessageInput=function(){return r.a.createElement("input",{type:"text",id:"addCard_message"})},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,this.makeDayInput(),r.a.createElement("br",null),this.makeTimeInput(),r.a.createElement("br",null),this.makeHeightInput(),r.a.createElement("br",null),this.makeMessageInput())}}]),t}(n.Component)),h=a(7),p=(n.Component,a(9)),g=(n.Component,a(17),JSON.parse(localStorage.getItem("cards")));null==g&&(g=[]);var v=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).incYear=function(){a.setState({year:a.state.year+1,week:1,calGrid:a.getCalendarDates(a.state.year+1,a.state.month)})},a.decYear=function(){a.setState({year:a.state.year-1,week:1,calGrid:a.getCalendarDates(a.state.year-1,a.state.month)})},a.incMonth=function(){12==a.state.month?a.setState({year:a.state.year+1,month:1,week:1,calGrid:a.getCalendarDates(a.state.year+1,1)}):a.setState({month:a.state.month+1,week:1,calGrid:a.getCalendarDates(a.state.year,a.state.month+1)})},a.decMonth=function(){1==a.state.month?a.setState({year:a.state.year-1,month:12,week:1,calGrid:a.getCalendarDates(a.state.year-1,12)}):a.setState({month:a.state.month-1,week:1,calGrid:a.getCalendarDates(a.state.year,a.state.month-1)})},a.incWeek=function(){a.state.week<6&&a.setState({week:a.state.week+1})},a.decWeek=function(){a.state.week>1&&a.setState({week:a.state.week-1})},a.createTimeColumn=function(){for(var e=[],t=0;t<24;t++)e.push(r.a.createElement("div",{class:"outer",className:"box Gray Text"},t+":00"));return r.a.createElement("div",{className:"Column",id:"time_column"},r.a.createElement("div",{className:"box White"}),e)},a.createBoard=function(){console.log(a.state.year+"_"+a.state.month+"_"+a.state.week);var e=[],t=a.placeExistingCards();e.push(a.createTimeColumn());for(var n=0;n<7;n++)a.state.calGrid[a.state.week-1][n]?e.push(a.createColumn(n,t)):e.push(a.createBlankColumn(n));return r.a.createElement("div",{id:"board",className:"Calendar"},e)},a.createBlankColumn=function(e){for(var t=[],n=a.state.dayNames[e],s=0;s<24;s++)t.push(r.a.createElement("div",{className:"clearBox"}));return r.a.createElement("div",{className:"Column",id:e},r.a.createElement("div",{className:"box Gray Text"},n),t)},a.createColumn=function(e,t){for(var n=[],s=a.state.dayNames[e],i=0;i<24;i++)n.push(r.a.createElement("div",{id:"box_"+a.state.year+"_"+a.state.month+"_"+a.state.calGrid[a.state.week-1][e]+"_"+i,class:"outer",className:"box LightGray Text",onDrop:a.drop,onDragOver:a.allowDrop},a.placeValidCards(t,a.state.calGrid[a.state.week-1][e],i)));return r.a.createElement("div",{className:"Column",id:e},r.a.createElement("div",{className:"box Gray Text"},a.state.calGrid[a.state.week-1][e]+" "+s),n)},a.isLeapYear=function(e){return e%4==0&&e%100!=0||e%400==0},a.getMaxDays=function(e,t){return[31,a.isLeapYear(e)?29:28,31,30,31,30,31,31,30,31,30,31][t-1]},a.getCalendarDates=function(e,t){for(var n=[[],[],[],[],[],[]],r=new Date(e+"-"+t+"-1").getDay(),s=1,i=0;i<6;i++)for(var o=0;o<7;o++)1==s&&0==i?n[i][o]=r==o?1:0:s>a.getMaxDays(e,t)?n[i][o]=0:n[i][o]=s,0!=n[i][o]&&s++;return n},a.makeCard=function(e,t,n){return r.a.createElement("div",{id:e,class:"inner",className:"LightSmoothGreen Text card",draggable:"true",style:t,onDragStart:a.drag},n)},a.drag=function(e){e.dataTransfer.setData("text",e.target.id)},a.drop=function(e){e.preventDefault();var t=e.dataTransfer.getData("text"),n=document.getElementById(t);a.isValidMove(e,n)&&(console.log(n),e.target.appendChild(n),n.id="card_"+n.id.split("_")[1]+"_"+e.target.id+"_"+n.id.split("_")[7],a.SaveJSON(e,n),console.log(n.id),a.refreshPage())},a.dropRemove=function(e){e.preventDefault();var t=e.dataTransfer.getData("text"),n=document.getElementById(t);a.removeCard(n.id.split("_")[7]),a.refreshPage()},a.isValidMove=function(e,t){return!!/^box.+$/.test(e.target.id)&&(!!a.checkOntopOfExistingCard(e,t,a.getAllCardsOnBoard())&&!(Number(e.target.id.split("_")[4])+Number(t.id.split("_")[1])>24))},a.checkOntopOfExistingCard=function(e,t,a){for(var n=[[],[],[],[],[],[],[]],r=0;r<a.length;r++)if(t!=a[r])for(var s=a[r].id.split("_"),i=s[1],o=s[3],l=s[4],c=s[5],d=s[6],m=new Date(o+"-"+l+"-"+c).getDay(),u=0;u<i;u++)n[m][Number(d)+Number(u)]=1;var h=e.target.id.split("_"),p=h[1],g=h[2],v=h[3],f=h[4],y=(m=new Date(p+"-"+g+"-"+v).getDay(),t.id.split("_")[1]);for(r=0;r<y;r++)if(1==n[m][Number(f)+Number(r)])return!1;return!0},a.getAllCardsOnBoard=function(){return document.querySelectorAll('[id*="card"]')},a.allowDrop=function(e){e.preventDefault()},a.placeExistingCards=function(){var e=[];return g.map((function(t,n){if(t.year==a.state.year&&t.month==a.state.month&&t.week==a.state.week){var r={height:20*t.length+3*(t.length-2)},s="card_"+t.length+"_box_"+t.year+"_"+t.month+"_"+t.day+"_"+t.start_time+"_"+t.id,i=a.makeCard(s,r,t.message);e.push(i)}})),e},a.placeValidCards=function(e,t,a){for(var n=0;n<e.length;n++){var r=e[n].props.id.split("_");if(r[5]==t&&r[6]==a)return e[n]}},a.SaveJSON=function(e,t){var n=t.id.split("_")[7];g[n].day=e.target.id.split("_")[3],g[n].start_time=e.target.id.split("_")[4],a.saveState()},a.saveState=function(){localStorage.setItem("cards",JSON.stringify(g)),console.log(localStorage.getItem("cards"))},a.addCard=function(){console.log("making card");var e=document.getElementById("addCard_time"),t=document.getElementById("addCard_height"),n=document.getElementById("addCard_message"),r=document.getElementById("addCard_day");if(null!=e&&null!=t&&null!=n&&null!=r){e=Number(e.value),t=Number(t.value),n=n.value,r=r.value;var s=0;0!=g.length&&(s=g[g.length-1].id+1);var i={id:s,year:a.state.year,month:a.state.month,day:r,week:a.state.week,start_time:e,length:t,message:n};g.push(i),a.saveState(),a.refreshPage()}else console.log("error")},a.removeCard=function(e){g.splice(e,1),a.recomputeJSONIdTags(),a.refreshPage()},a.recomputeJSONIdTags=function(){for(var e=0;e<g.length;e++)g[e].id=e;a.saveState()},a.refreshPage=function(){window.location.reload()};var n=new Date,s=n.getFullYear(),i=n.getMonth()+1;return a.state={year:s,month:i,week:1,monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],calGrid:a.getCalendarDates(s,i)},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App",id:"app"},r.a.createElement("header",{className:"header MainText"},"HOME"),r.a.createElement("body",{className:"body"},r.a.createElement("div",{className:"Center MainText"},r.a.createElement("button",{onClick:this.decYear,id:"decYearButton",className:"decButton"},"<"),this.state.year,r.a.createElement("button",{onClick:this.incYear,id:"incYearButton",className:"incButton"},">")),r.a.createElement("div",{className:"Center MainText"},r.a.createElement("button",{onClick:this.decMonth,id:"decMonthButton",className:"decButton"},"<"),this.state.monthNames[this.state.month-1],r.a.createElement("button",{onClick:this.incMonth,id:"incMonthButton",className:"incButton"},">")),r.a.createElement("div",{className:"Center MainText"},r.a.createElement("button",{onClick:this.decWeek,id:"decWeekButton",className:"decButton"},"<"),"Week "+this.state.week,r.a.createElement("button",{onClick:this.incWeek,id:"incWeekButton",className:"incButton"},">")),r.a.createElement("div",{id:"board_wrapper",className:"Center"},this.createBoard()),r.a.createElement("div",{id:"addCard",className:"addCard"},r.a.createElement(u,{grid:this.state.calGrid,week:this.state.week}),r.a.createElement("button",{onClick:this.addCard},"Add a new card!")),r.a.createElement("img",{src:"bin-icon.png",className:"bin",onDrop:this.dropRemove,onDragOver:this.allowDrop})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[10,1,2]]]);
//# sourceMappingURL=main.4ce48f03.chunk.js.map