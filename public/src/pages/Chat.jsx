import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Chat() {
  const navigate = useNavigate()
  const [currentUser ,setCurrentuser] = useState(undefined)

  useEffect(()=>{
    const user = localStorage.getItem('chat-app-user')
    if (!user) {
      navigate('login')
    }
    setCurrentuser(user)
  }, [currentUser])
  return (
    <div>Chat</div>
  )
}

export default Chat