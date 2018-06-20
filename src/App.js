import React, { Component } from 'react';

import Card from './Card';
import DropTarget from './DropTarget';

import './App.css';

const RANKED = 'ranked';
const UNRANKED = 'unranked';

class App extends Component {
  state = {
    dragging: null,
    cards: [
      {status: UNRANKED, name: "foo"},
      {status: UNRANKED, name: "bar"}
    ]
  };

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

  handleRank = e => this.setState({
    cards: this.updateCard(this.state.dragging, {
      status: RANKED,
      pos: {
        top: (e.pageY - this.shiftY - this.canvasBox.top) +'px', 
        left: (e.pageX - this.shiftX - this.canvasBox.left) +'px'
      }
    }),
    dragging: null
  })

  handleUnrank = () => this.setState({
    cards: this.updateCard(this.state.dragging, {status: UNRANKED, pos: null}),
    dragging: null
  })

  getCardsWithStatus = status => (
    this.state.cards.filter(c => (c.status===status))
  )

  updateCard = (card, changes) => (
    this.state.cards.map(
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
      <div className="App">
        <DropTarget
            className="cards" 
            onDrop={this.handleUnrank}>
          {this.getCardsWithStatus(UNRANKED).map(this.renderCard)}
        </DropTarget>
        <DropTarget
            className="canvas"
            ref={this.theCanvas}
            onDrop={this.handleRank}>
          {this.getCardsWithStatus(RANKED).map(this.renderCard)}
        </DropTarget>
      </div>
  )
}

export default App;
