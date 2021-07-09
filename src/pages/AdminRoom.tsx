
import { useHistory, useParams } from 'react-router-dom'
//import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { database } from '../services/firebase'

import  '../styles/rooms.scss'

type RoomParams ={
  id: string;
}





export function AdminRoom(){
  //const  { user }  = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();
  
  const {questions, title} = useRoom(roomId)
  
  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })
    history.push('/')
  }
 
  async function handleDeleteQuestion(questionId: string){
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')){
       await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
  
  async function handleCheckQuestionAsAsnwered(questionId:string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered:true,
    });
  }

  async function handleHighlightQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted:true,
    });
  }

  


  return(
    <div id="page-room">
      <header>
        <div className="content"> 
          <img src={logoImg} alt="Letmeask" className="logo"/>
            <div>
              <RoomCode code={roomId} />
              <Button 
              isOutlined
              onClick={handleEndRoom}
              >Encerrar sala</Button>
            </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1> {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
            {questions.map(question => {
              return(
                <Question 
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAsnwered(question.id)}
                      >
                        <img src={checkImg} alt="Marcar como respondida" title="Marcar como respondida" />
                      </button>
                      <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Destacar pergunta" title="Destacar pergunta"/>
                      </button>
                    </>
                  )}
                  <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Excluir pergunta" title="Excluir pergunta" />
                  </button>
                </Question>
              );
            })}
        </div>
      </main>
    </div>
  )
}