import React from 'react'

export default function page({ params }: { params: { chatId: string } }) {
  const { chatId } = params;
  console.log("Chat ID:", chatId);
  
  return (
    <div>

      
    </div>
  )
}
