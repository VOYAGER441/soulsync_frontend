import React from 'react';

export default async function page({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params; // Await the promise to get the actual value
  console.log("Chat ID:", chatId);
  
  return (
    <div>
      {/* You can render content here based on the chatId */}
      <h1 className="text-2xl font-bold mb-4">Chat ID: {chatId}</h1>
      {/* Add your chat interface or other components here */}
    </div>
  );
}
