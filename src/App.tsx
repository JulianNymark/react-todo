import React, { Component, FormEvent, createRef, ChangeEvent, RefObject } from 'react';
import interact from 'interactjs';

import './App.css';
import { TodoCreator } from './TodoCreator';
import TodoItems from './TodoItems';

interface State {
  items: Array<ListItem>;
  currentItem: ListItem;
}

export interface ListItem {
  text: string;
  key: any;
}

class App extends Component<{}, State> {

  inputElement: RefObject<HTMLInputElement> = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      currentItem: { text: '', key: '' },
    }
  }

  componentDidMount() {
    interact('.drag-drop').draggable({
      inertia: false,
      autoScroll: true,
      onmove: () => { console.log('onmove!') },
    });
  }

  addItem = (e: FormEvent) => {
    e.preventDefault();
    let items = this.state.items;
    items.push(this.state.currentItem);
    this.setState({
      items
    });
  }

  removeItem = (itemKey: any) => {
    let items = this.state.items;
    const idx = items.findIndex((item) => item.key === itemKey);
    items.splice(idx, 1);
    this.setState({ items });
  }

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentItem: { text: e.target.value, key: Date.now() }
    });
  }

  render() {
    return (
      <div className="App">
        <TodoCreator
          addItem={this.addItem}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}
        />
        <TodoItems
          entries={this.state.items}
          removeItem={this.removeItem}
        />
      </div>
    )
  }
}
export default App;
