
import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps){

  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
  }

  return(
    <button className="room-code" onClick={copyRoomCodeToClipboard} title="Copiar">
      <div>
        <img src={copyImg} alt="Copiar" />
      </div>
      <span> {props.code}</span>
    </button>
  )
}