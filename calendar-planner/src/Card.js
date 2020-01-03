import React, { Component } from 'react';

class Card extends Component {

    constructor(props){
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
    }
    handleEvent(){
        console.log(this.props);
    }
    render() {
        return(
            <div 
                id={this.props.idName} 
                class="inner" 
                className="Red Text card" 
                style={this.props.height} 
                draggable="true" 
                onDragStart={this.drag}
            >
                hello
            </div>
        );
    }

    drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }
}

export default Card;
