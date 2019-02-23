import React, { Component } from 'react'
import { ListItem } from './App';

interface Props {
  entries: Array<ListItem>;
}

class TodoItems extends Component<Props, {}> {

  createTasks(item: ListItem) {
    return <li className="todoItem__li" key={item.key}>{item.text}</li>
  }

  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return <ul className="todoItem__ul">{listItems}</ul>
  }
}

export default TodoItems