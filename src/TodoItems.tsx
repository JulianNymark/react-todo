import React, { Component } from 'react'
import { ListItem } from './App';

interface Props {
  entries: Array<ListItem>;
  removeItem(itemKey: any): any;
}

class TodoItems extends Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.createTasks = this.createTasks.bind(this);
  }

  handleClick = (key: any) => {
    this.props.removeItem(key)
  }

  createTasks(item: ListItem) {
    return <li
      className="todoItem__li"
      key={item.key}
      onClick={this.handleClick.bind(() => this.handleClick(item.key))}
    >{item.text}</li>
  }

  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return <ul className="todoItem__ul">{listItems}</ul>
  }
}

export default TodoItems