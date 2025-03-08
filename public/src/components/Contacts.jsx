import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import Logo from '../assets/logo.svg'
import { FaPowerOff } from "react-icons/fa6";


function Contacts({contacts, currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [selectedUser, setSelectedUser] = useState(undefined)

    useEffect(()=>{
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])

    const changeCurrentChat = (contact, index) => {
        setSelectedUser(index)
        changeChat(contact)
    }

  return (
    <>
        {
            currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>yoww</h1>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact, index)=>{
                                return(
                                    <div key={index} className={`contact ${index === selectedUser ? 'selected' : ''}`} onClick={()=>changeCurrentChat(contact, index)}>
                                        <img className='avatar' src={`data:image/svg+xml;based64, ${contact.avatarImage}`} alt="avatar" />
                                        <h2 className='username'>{contact.username}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="current-user">
                        <img className='avatar' src={`data:image/svg+xml;based64, ${currentUser.avatarImage}`} alt="avatar" />
                        <h2 className='username'>{currentUser.username}</h2>
                        <button>
                            <FaPowerOff />
                        </button>
                    </div>
                </Container>
            )
        }
    </>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display:flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        img {
            height: 5rem
        }
        h1 {
            color: white;
            transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            background-color: #ffffff39;
            min-height: 5rem;
            width: 95%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: start;
            transition: 0.5s ease-in-out;
            .avatar {
                img {
                    height: 5rem;
                }
            }
            .username {
                h3{
                    color: white
                }
            }
        }
        .selected {
            background-color: #9186f3;
        }
    }
    .current-user {
        background-color: #0d0d39;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 0.5rem;
        .avatar {
            img {
                height: 5rem;
            }
        }
        .username {
            h2{
                color: white;
            }
        }
    }
`;

export default Contacts