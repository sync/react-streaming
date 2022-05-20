import type { FastifyRequest } from 'fastify';
import { Link } from 'react-router-dom';

export async function getServerSideProps({ req }: { req: FastifyRequest }) {
  const host = req.headers.host;
  const baseUrl = ` ${host?.includes('localhost') ? 'http' : 'https'}://${
    host ?? 'localhost:3000'
  }`;
  const response = await fetch(`${baseUrl}/api/todo-list`);
  const todoList: Array<string> = await response.json();

  return {
    todoList,
  };
}

export default function ItemsIndex({
  todoList = [],
}: {
  todoList: Array<string>;
}) {
  return (
    <>
      <ul>
        {todoList.map((item, i) => {
          return (
            <li key={`item-${i}`}>
              <Link to={`/items/${i}`}>{item}</Link>
            </li>
          );
        })}
      </ul>
      <p>
        <Link to="/">Go to the index</Link>
      </p>
    </>
  );
}
