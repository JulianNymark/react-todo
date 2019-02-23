import React, { Component, FormEvent, ChangeEvent, ReactElement, ReactHTMLElement, RefObject } from 'react';

interface Props {
  addItem(e: FormEvent): any;
  handleInput(e: ChangeEvent<HTMLInputElement>): any;
  inputElement: RefObject<HTMLInputElement>;
  currentItem: any;
}

class TodoList extends Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.inputElement.current) {
      this.props.inputElement.current.focus();
    }
  }

  render() {
    return (
      <div className="main">
        <div className="main__form-container">
          <form className="main main__form" onSubmit={this.props.addItem}>
            <input
              className="main__form-input"
              placeholder="Task"
              ref={this.props.inputElement}
              value={this.props.currentItem.text}
              onChange={this.props.handleInput}
            />
            <button className="main__button" type="submit"> Add Task </button>
          </form>
        </div>
      </div>
    )
  }
}

export default TodoList
