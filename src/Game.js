import React, { Component } from 'react';

import Card from './Card';
import DropTarget from './DropTarget';

class Game extends Component {
  state = {
    dragging: null
  };

  static RANKED = 'ranked';
  static UNRANKED = 'unranked';

  constructor(props) {
    super(props);
    this.theCanvas = React.createRef();
  }

  componentDidMount() {
    this.canvasBox = this.theCanvas.current.getBoundingClientRect();
  }

  handleDragStart = (e, dragging) => { 
    const cardBox = e.target.getBoundingClientRect();
    this.shiftX = e.pageX - cardBox.left; 
    this.shiftY = e.pageY - cardBox.top;
    this.setState({dragging});
  }

  handleRank = e => {
    this.setState({dragging: null});
    this.props.onCardsUpdated(
      this.updateCard(this.state.dragging, {
        status: Game.RANKED,
        pos: {
            top: (e.pageY - this.shiftY - this.canvasBox.top) +'px', 
            left: (e.pageX - this.shiftX - this.canvasBox.left) +'px'
        }
      })
    );
  }

  handleUnrank = () => {
    this.setState({dragging: null});
    this.props.onCardsUpdated(
        this.updateCard(this.state.dragging, {status: Game.UNRANKED, pos: null})
    );
  }

  getCardsWithStatus = status => (
    this.props.cards.filter(c => (c.status===status))
  )

  updateCard = (card, changes) => (
    this.props.cards.map(
      c=>(c === card? {...card, ...changes}: c))
  )

  renderCard = c => (
    <Card 
        key={c.name}
        card={c}
        pos={c.pos}
        onDragStart={this.handleDragStart}>
    </Card>
  )

  render = () => (
      <div className="Game">
        <DropTarget
            className="cards" 
            onDrop={this.handleUnrank}>
          {this.getCardsWithStatus(Game.UNRANKED).map(this.renderCard)}
        </DropTarget>
        <DropTarget
            className="canvas"
            ref={this.theCanvas}
            onDrop={this.handleRank}>
          {this.getCardsWithStatus(Game.RANKED).map(this.renderCard)}
        </DropTarget>
      </div>
  )
}

export default Game;
