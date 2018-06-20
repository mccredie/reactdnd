import React, { Component } from 'react';
import Card from './Card';
import './App.css';

class App extends Component {
  state = {
    dragging: null,
    cards: [
      {status: "unranked", name: "foo"},
      {status: "unranked", name: "bar"}
    ]
  };

  constructor(props) {
    super(props);
    this.theCanvas = React.createRef();
  }

  componentDidMount() {
    this.canvasBox = this.theCanvas.current.getBoundingClientRect();
  }


  handleDragStart(e, dragging) {
    const cardBox = e.target.getBoundingClientRect();
    this.shiftX = e.pageX - cardBox.left; 
    this.shiftY = e.pageY - cardBox.top;
    this.setState({dragging});
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleRank(e) {
    const left = e.pageX - this.shiftX - this.canvasBox.left;
    const top = e.pageY - this.shiftY - this.canvasBox.top;
    const pos = {top: top+'px', left: left+'px'};
    const cards = this.rank(this.state.dragging, pos);
    this.setState({cards, dragging: null});
  }

  handleUnrank() {
    const cards = this.unrank(this.state.dragging);
    this.setState({cards, dragging: null});
  }

  getRanked() {
    return this.state.cards.filter((c) => (c.status==="ranked"));
  }

  getUnranked() {
    return this.state.cards.filter((c) => (c.status==="unranked"));
  }

  rank(card, pos) {
    return this.state.cards.map(c=>(
      c === card? {...card, status: "ranked", pos}: c
    ));
  }

  unrank(card) {
    return this.state.cards.map(c=>(
      c === card? {...card, status: "unranked", pos: undefined}: c
    ));
  }

  render() {
    return (
      <div className="App">
        <div className="cards" 
            onDragOver={(e)=>this.handleDragOver(e)}
            onDrop={()=>{this.handleUnrank()}}>
          {this.getUnranked().map((c, i)=>(
            <Card key={c.name} card={c} onDragStart={(e, c)=>{this.handleDragStart(e, c)}}></Card>
          ))}
        </div>
        <div className="canvas"
          ref={this.theCanvas}
          onDragOver={(e)=>this.handleDragOver(e)}
          onDrop={e=>this.handleRank(e)}>
          {this.getRanked().map((c) => (
            <Card key={c.name} card={c} pos={c.pos} onDragStart={(e, c)=>{this.handleDragStart(e, c)}}></Card>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
