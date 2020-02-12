import * as React from 'react';
import { useDispatch } from 'redux-react-hook';
import actions from '../actions/item';
import { uuid } from 'uuidv4';
import { scroller } from "react-scroll";

const inputStyle: any = {
  width: '80%',
  borderRadius: 5,
  height: 35,
  paddingLeft: 5,
  border: '#ABABAB solid 1px',
  marginRight: 10,
  fontSize: 14
};
const buttonStyle: any = {
  backgroundColor: '#EE224F',
  border: 'none',
  borderRadius: 5,
  height: 36,
  color: '#fff',
  fontSize: 14,
  width: 50
};

const scrollToBottom = () => {
  scroller.scrollTo('endOfList', {
    duration: 1500,
    delay: 100,
    smooth: true,
    containerId: 'droppableContainer',
  });
}

export default function TodoInput({ listId }: any) {
  const [newTodo, setNewTodo] = React.useState('');
  const dispatch = useDispatch();
  const payload = { title: newTodo, listId, tempId: uuid() };
  return (
    <div>
      <input
        style={inputStyle}
        type="text"
        onChange={e => setNewTodo(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && newTodo.trim().length > 0) {
            dispatch(actions.createItem(payload));
            setNewTodo('');
            scrollToBottom();
          }
        }}
        placeholder="Enter Item"
        value={newTodo}
      />
      <button
        style={buttonStyle}
        onClick={e => {
          if (newTodo.trim().length > 0) {
            dispatch(actions.createItem(payload));
            setNewTodo('');
            scrollToBottom();
          }
        }}
      >
        Add
      </button>
    </div>
  );
}
