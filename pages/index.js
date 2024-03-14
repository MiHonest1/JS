import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import styles from '../styles/Home.module.css'

import Modal from './Modal'

const headerStyle = {
  color:'white',
  position:"absolute",
  zIndex:4,
  top:'30%',
  left:'40%'
}

const contentStyle = {
  color:'white',
  textAlign:"center",
  top:'50%',
  left:'25%',
  position:"absolute",
  zIndex:4
}
  
const bgImg = {
  position: "fixed",
  zIndex: 3,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

function sendEmail(email){
  const body = `Здравствуйте, я нашел вашего питомца.%0A-----------%0AС уважением, ${localStorage.user}`;
  window.open(`mailto:${email}?subject=Потерянный зверь&body=${body}`);
}


function Animal(props){
    if(!props.data) return <p>Loading</p>
    const {header,content,img} = props.data;
    return (
        <div>
          <h1 style={headerStyle}>{header}</h1> <br />
          <h2 style={contentStyle}>{content}</h2>
          <img
            style={bgImg}
            alt="Чара (моя собака)"
            src={img}
          />
        </div>
    );
}

export default function Home() {
  const [modalActive, setModalActive] = React.useState(false);

  const [registerData, setRegisterData] = React.useState({ firstName: '', lastName: '', email: '', password: '' });
  const [loginData, setLoginData] = React.useState({ email: '', password: '' });

  const [animals,setAnimals] = React.useState([]);
  React.useEffect(()=>{
    fetch('/animals.json').then(data=>data.json()).then(data=>setAnimals(data));
  },[]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Petto</title>
        <meta name="description" content="Социальная сеть для питомцев" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <button onClick={() => setModalActive(true)}>Открыть модальное окно</button>

        <h1>Petto</h1>
        <AwesomeSlider style={{ "--slider-height-percentage": "100%" }}>
          {
            animals.map((data,i)=><div key={i} style={{ zIndex: 2 }} onClick={()=>sendEmail(data?.email)}>
              <Animal data={data} />
            </div>)
          }
        </AwesomeSlider>

        <Modal active={modalActive} setActive={setModalActive}>
          <form action="">
          </form>
        </Modal>
      </main>

      <footer className={styles.footer}>
        Petto, (c) 2022
      </footer>
    </div>
  )
}
