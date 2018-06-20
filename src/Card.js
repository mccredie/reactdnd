
import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    render() {
        const style = this.props.pos || {};
        return <div
         draggable
         className={["card", this.props.card.status].join(" ")}
         style={style}
         onDragStart={(e)=>{this.props.onDragStart(e, this.props.card)}}>{this.props.card.name}</div>;
    }
}

export default Card;