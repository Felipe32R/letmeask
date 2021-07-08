import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useHistory } from 'react-router-dom'


import { database } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'


import { Button } from '../components/Button'

import '../styles/auth.scss'



export function NewRoom(){

  const history = useHistory();

  const {user} = useAuth();

  const [newRoom, setNewRoom] = useState(''); 

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault();

    console.log(newRoom);

    if(newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = roomRef.push({

      title: newRoom,
      authorId: user?.id,
      userName: user?.name,
    })

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return(
  <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="aaa" />
        <strong>Crie salas de Q&amp;A ao vivo </strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      
      <main >

      
        <div className="main-content">
        <div className="user">
                
                <p>{ user?.name }</p>
                <img src={user?.avatar} alt="Profile" />
          </div> 
          
          <img src={logoImg} alt="Letmeask" />


          <form  onSubmit={handleCreateRoom}> 
            <input 
            type="text" 
            placeholder="Nome da sala"
            value ={newRoom}
            onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>

          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
            
          </p>
        </div>
      </main>
  </div>
  );
}
