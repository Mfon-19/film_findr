'use client';
import { useEffect, useState } from 'react';

interface Greeting {
  message: string
}

export default function Home() {
  const [msg, setMsg] = useState<Greeting | string>('');
  useEffect(() => {
    fetch('http://localhost:8080/api/hello')
      .then(r => r.json())
      .then((data: Greeting) => setMsg(data));
  }, []);
  return <div className="text-3xl text-white p-8">{msg ? (msg as Greeting).message : "Loading..."}</div>;
}
