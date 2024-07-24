import React from 'react'
import Conversation from './Conversation.jsx'
import useGetConversation from '../../hooks/useGetConversation.jsx'
import { getRandomEmoji } from '../../utils/emoji.js';

const Conversations = () => {
  const{loading,conversations} = useGetConversation();
   
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      
      {conversations.map((conversation,laindex)=>(
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex={laindex===conversations.length-1} 
        />
      ))
      }
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
		
  )
}

export default Conversations