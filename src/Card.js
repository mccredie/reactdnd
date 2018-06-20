
import React from 'react';
import './Card.css';

export default props => (
    <div
        draggable
        className={["card", props.card.status].join(" ")}
        style={props.pos || {}}
        onDragStart={(e)=>{props.onDragStart(e, props.card)}}>{props.card.name}</div>
);
