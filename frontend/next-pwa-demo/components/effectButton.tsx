
interface EffectButtonProps{
    toggle:boolean,
    title:string,
    number:number,
    changefc:Function
}


export default function EffectButton(props:EffectButtonProps)
{
    return <>
        <div onClick={()=>props.changefc(props.number)} style={{padding:'1vw',display:'flex',minWidth:'20vw',flexDirection:'column',alignContent:'center'}}>
            <div style={{height:'8vh',background:props.toggle?'#FBBB18':'#D9D9D9',borderRadius:'20px'}}>
            
            </div>
            <p style={{textAlign:'center',color:props.toggle?'#FBBB18':'#D9D9D9'}}>{props.title}</p>
        </div>
    
    </>
}