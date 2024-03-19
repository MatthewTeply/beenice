import React from 'react';

export default async function Home() {

  const response = await fetch('http://127.0.0.1:54321/functions/v1/get-event/?event_id=2c0a4227-c7ea-40c7-9d26-c2faa5b5a90c', {
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
      })
  });

  const responseJson = await response.json();

  console.log(responseJson);

  return (
    <main>
      Hello world.
    </main>
  );
}
