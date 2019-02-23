import React, { Component, FormEvent, createRef, ChangeEvent, RefObject } from 'react';
import './App.css';

import TodoList from './TodoList';
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

  addItem = (e: FormEvent) => {
    e.preventDefault();
    let items = this.state.items;
    items.push(this.state.currentItem);
    this.setState({
      items
    });
  }

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentItem: { text: e.target.value, key: Date.now() }
    });
  }

  render() {
    return (
      <div className="App">
        <TodoList
          addItem={this.addItem}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}
        />
        <TodoItems entries={this.state.items} />
      </div>
    )
  }
}
export default App;
