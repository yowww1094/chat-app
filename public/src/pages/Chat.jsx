import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import Contacts from '../components/Contacts'

import { getAllUsers } from '../utils/APIRoutes' 

function Chat() {
  const navigate = useNavigate()
  const [currentUser ,setCurrentuser] = useState(undefined)
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)

  useEffect(()=>{
    const fetch = async () => {
      const user = localStorage.getItem('chat-app-user')
      if (!user) {
        navigate('login')
      }
      setCurrentuser(await JSON.parse(localStorage.getItem('chat-app-user')))
    }
    fetch()
  }, [])

  useEffect(()=>{
    const fetch = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${getAllUsers}/${currentUser._id}`);
          setContacts(data.data)
        } else {
          navigate('/setAvatar')
        }
      }
    }
    fetch()
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <>
      <Container>
        <div className="container">
          <h1>chat</h1>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000075;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat