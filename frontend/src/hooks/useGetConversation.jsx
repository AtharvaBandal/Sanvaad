import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetConversation = () => {
  const [loading,setLoading] =  useState(false);
  const [conversations,setConversations] = useState([]);

  useEffect(()=>{  
    
    const getConversation = async() =>{
    setLoading(true);

    try {
      const res = await fetch('https://sanvaad.onrender.com/api/users', {
        method: 'GET',
        credentials: 'include', // Make sure cookies are sent with request
      });
      

      const data = await res.json();
      if(data.error)
        {
          throw new Error(data.error);
        }

      setConversations(data);

    }catch (error) {
         toast.error(error.message);
    }finally{
      setLoading(false)
    }

    }

    getConversation();
  },[])


  return {loading,conversations} 
}

export default useGetConversation