import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import EffectButton from '../components/effectButton'
import PowerButton from '../components/PowerButton'
import styles from '../styles/Home.module.css'

import PageVisibility from 'react-page-visibility';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [effect1,setEffect1]=useState(false);
  const [effect2,setEffect2]=useState(false);
  const [effect3,setEffect3]=useState(false);
  const [effect4,setEffect4]=useState(false);
  const [effectOn,setEffectOn]=useState(0);
  const [power,setPower]=useState(false);

  const notifyConnect = () => toast.info('Connecting to server!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  const notifyError = ()=> toast.error('Error connecting to the server!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  
    const notifySucess=()=>toast.success('Connected to the server!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  useEffect(() => {
    getData();
  }, [])

  function getData(){
    notifyConnect()
    setTimeout(()=>{},1700)
    const response=fetch('https://lights.rodrigodev.tech/get',{method:'GET'})
    response.then(e=>{
      var jsons=e.json();
      jsons.then((json)=>{
        console.log(json)
        notifySucess()
        manualPower(json.power,json.effect)
      })
    })
    response.catch(function() {
      console.log("error");
      notifyError();
    });
    
  }
  function toggleEffects(effect:number){
    if(effect==-1){
      setEffect1(true)
      setEffectOn(1)
    }
      
    else if(power)
    {
      switch (effectOn) {
        case 1:
            setEffect1(false);
          break;
        case 2:
          setEffect2(false);
          break;
        case 3:
          setEffect3(false);
          break;
        case 4:
          setEffect4(false);
          break;
      
        default:
          break;
      }
      if(effect!=effectOn)
      {
        fetch('https://lights.rodrigodev.tech/light',{
          method: "POST",
          body: JSON.stringify({"power":1,"effect":effect}),
        }).catch(function() {
          console.log("error");
          notifyError();
        });;
        switch (effect) {
          case 1:
              setEffect1(true);
            break;
          case 2:
            setEffect2(true);
            break;
          case 3:
            setEffect3(true);
            break;
          case 4:
            setEffect4(true);
            break;
        
          default:
            break;
      }
      setEffectOn(effect)
      }
      else
        setEffectOn(0)
    }
      
  }
  function tooglePower(){
    var p= power
    if(!p)
    {
      try {
        
      } catch (error) {
        
      }
      fetch('https://lights.rodrigodev.tech/light',{
        method: "POST",
        body: JSON.stringify({"power":1,"effect":1}),
      }).catch(function() {
        console.log("error");
        notifyError();
      });
      setPower(!p)
      toggleEffects(-1)
      
    }
    else
    {
      fetch('https://lights.rodrigodev.tech/light',{
        method: "POST",
        body: JSON.stringify({"power":0,"effect":0}),
      }).catch(function() {
        console.log("error");
        notifyError();
      });;
      toggleEffects(0)
      setPower(!p)
      setTimeout(()=>{},1500)
      fetch('https://lights.rodrigodev.tech/light',{
        method: "POST",
        body: JSON.stringify({"power":0,"effect":0}),
      }).catch(function() {
        console.log("error");
        notifyError();
      });;
    }
      
  }
  function manualPower(power:number,effect:number)
  {
    console.log("power")
    console.log(power)
    console.log("effect")
    console.log(effect)
    if (power==1){
      setPower(true);
    }else
    setPower(false);
    switch (effectOn) {
      case 1:
          setEffect1(false);
        break;
      case 2:
        setEffect2(false);
        break;
      case 3:
        setEffect3(false);
        break;
      case 4:
        setEffect4(false);
        break;
    
      default:
        break;
    }
    switch (effect) {
      case 1:
          setEffect1(true);
        break;
      case 2:
        setEffect2(true);
        break;
      case 3:
        setEffect3(true);
        break;
      case 4:
        setEffect4(true);
        break;
    
      default:
        break;
  }
  setEffectOn(effect)
  }


  
  return (
    <PageVisibility onChange={getData}>
      <>
      <div className={styles.container}>
      <Head>
        <title>Ligh Control</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Luzes de Natal
        </h1>
        <div style={{display:'flex',flexDirection:'row',width:'80vw',justifyContent:'space-around'}}>
          <EffectButton changefc={toggleEffects} number={1} toggle={effect1} title={"Efeito 1"}/>
          <EffectButton changefc={toggleEffects} number={2} toggle={effect2} title={"Efeito 2"}/>
          
        </div>
        <PowerButton changefc={tooglePower} number={effectOn} toggle={power}/>
        <div style={{display:'flex',flexDirection:'row',width:'80vw',justifyContent:'space-around'}}>
          <EffectButton changefc={toggleEffects} number={3} toggle={effect3} title={"Efeito 3"}/>
          <EffectButton changefc={toggleEffects} number={4} toggle={effect4} title={"Efeito 4"}/>
          
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/28rodrigo/"
          target="_blank"
          rel="noopener noreferrer">
          Powered by Rodrigo Pereira @ 2022
        </a>
      </footer>
    </div>
    <ToastContainer />
      </>
      
    </PageVisibility>
    
  )
}
