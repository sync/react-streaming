import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { todoList } from '../state';

export default function Index() {
  const [state, updateState] = useAtom(todoList);
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const addItem = async () => {
    if (!input) {
      return;
    }
    updateState((todoList) => {
      return [...todoList, input.value];
    });
    input.value = '';
  };

  return (
    <>
      <ul>
        {state.map((item, i) => {
          return <li key={`item-${i}`}>{item}</li>;
        })}
      </ul>
      <div>
        <input ref={setInput} />
        <button onClick={addItem}>Add</button>
      </div>
      <p>
        <Link to="/other">Go to another page</Link>
      </p>
    </>
  );
}
