import { faCoffee,faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface PowerButtonProps{
    toggle:boolean,
    changefc:Function,
    number:number
}


export default function PowerButton(props:PowerButtonProps)
{
    return <>
        <div onClick={()=>props.changefc(props.number)} style={{padding:'1vw',minWidth:'40vw',display:'flex',flexDirection:'column',alignContent:'center'}}>
            <div style={{padding:'1vw',background:props.toggle?'#0A57EE':'#D9D9D9',borderRadius:'20px'}}>
            <FontAwesomeIcon icon={faPowerOff} color={props.toggle?'white':'red'} size={'xs'}/>
            </div>
            <p style={{textAlign:'center',color:props.toggle?'#0A57EE':'#D9D9D9'}}>{props.toggle?"ON":"OFF"}</p>
        </div>
    
    </>
}