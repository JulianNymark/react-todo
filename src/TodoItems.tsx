import React, { Component } from 'react'
import { ListItem } from './App';

interface Props {
  entries: Array<ListItem>;
  removeItem(itemKey: any): any;
}

class TodoItems extends Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  /*   handleClick = (key: any) => {
      this.props.removeItem(key)
    }
   */
  createTasks(item: ListItem) {
    return <li
      className="todoItem__li todoItem__dropzone-container drag-drop"
      key={item.key}
    // onClick={() => this.props.removeItem(item.key)}
    >
      <div className="todoItem__dropzone todoItem__dropzone--upper dropzone-candidate dropzone"></div>
      <div className="todoItem__dropzone todoItem__dropzone--lower dropzone-candidate dropzone"></div>
      <div className="todoItem__content">{item.text}</div>
    </li>
  }

  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return <ul className="todoItem__ul">{listItems}</ul>
  }
}

export default TodoItems