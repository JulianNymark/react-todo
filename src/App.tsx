import React, { Component, FormEvent, ChangeEvent, RefObject } from 'react';
import interact from 'interactjs';

import './App.css';
import { TodoCreator } from './TodoCreator';
import TodoItems from './TodoItems';
import { DragEvent } from '@interactjs/actions';
import { EventTarget } from '@interactjs/types/types';
import InteractEvent from '@interactjs/core/InteractEvent';

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
    interact('.dropzone').dropzone({
      overlap: 0.50,

      ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
        console.log('ondropactivate!');
      },
      ondragenter: function (event) {
        let draggableElement = event.relatedTarget;
        let dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        console.log('ondragenter!');
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        // event.relatedTarget.textContent = 'Dragged out';
        console.log('ondragleave!');
      },
      ondrop: function (event) {
        // event.relatedTarget.textContent = 'Dropped';
        console.log('ondrop!');
      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
        console.log('ondropdeactivate!');
      }
    });

    interact('.drag-drop').draggable({
      restrict: {
        restriction: "self",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
      },
      inertia: false,
      autoScroll: true,
      onmove: dragMoveListener,
      onstart: (event: DragEvent) => {
        const children = event.target.children;
        for (let child of children) {
          if (child.classList.contains('dropzone-candidate')) {
            child.classList.remove('dropzone');
          }
        }
        event.target.classList.add('dragging');
      },
      onend: (event) => {
        const children = event.target.children;
        for (let child of children) {
          if (child.classList.contains('dropzone-candidate')) {
            child.classList.add('dropzone');
          }
        }
        event.target.classList.remove('dragging');
        setTargetPos(event.target, 0, 0);
      }
    });

    function setTargetPos(target: HTMLElement, x: number, y: number) {
      // translate the element
      target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', `${x}`);
      target.setAttribute('data-y', `${y}`);
    }

    function dragMoveListener(event: DragEvent) {
      let target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      let x = (parseFloat(target.getAttribute('data-x') || '0')) + event.dx;
      let y = (parseFloat(target.getAttribute('data-y') || '0')) + event.dy;

      setTargetPos(target as HTMLElement, x, y);
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
