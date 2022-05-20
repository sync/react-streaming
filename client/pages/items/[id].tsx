import type { FastifyRequest } from 'fastify';
import { Link } from 'react-router-dom';

export async function getServerSideProps({ req }: { req: FastifyRequest }) {
  if (Math.random() > 0.5) {
    throw new Error('This error was intentionally thrown');
  }

  const host = req.headers.host;
  const baseUrl = ` ${host?.includes('localhost') ? 'http' : 'https'}://${
    host ?? 'localhost:3000'
  }`;
  const response = await fetch(`${baseUrl}/api/todo-list`);
  const todoList: Array<string> = await response.json();
  const params = req.params as { id: number };
  return { item: todoList[params.id] };
}

export default function Item({ item }: { item: string | undefined }) {
  return (
    <>
      <p>{item}</p>
      <p>
        <Link to="/">Go to the index</Link>
      </p>
    </>
  );
}
