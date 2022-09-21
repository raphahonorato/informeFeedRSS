import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

let news = [{}];

function App() {
  return(
    < Feed/>
  )
}

function Feed()
{
  axios.get('http://localhost:5000/rss')
  .then(res => res.data)
  .then((xml)=>{
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml,"text/xml");
    

    for (let i = 0; i < xmlDoc.querySelectorAll("item").length; i++) {
      news.push({
        name:RemoveCDATA(xmlDoc.querySelectorAll("item")[i].childNodes[1].innerHTML),
        description:ExtractDescription(xmlDoc.querySelectorAll("item")[i].childNodes[xmlDoc.querySelectorAll("item")[i].childNodes.length-2].innerHTML),
        link:xmlDoc.querySelectorAll("item")[i].childNodes[3].innerHTML,
        date:xmlDoc.querySelectorAll("item")[i].childNodes[9].innerHTML
      });
    }

    news.shift();

    // 1 - Titulo da Noticias
    // 3 - Link da Notícia
    // 7 - Descrição cortada
    // 9 - Data
  })

  let [ready, setReady] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setReady(ready = true);
    }, 1500)
  }, [ready])

  if(ready)
  {
      return(
          <div className='App'>
              <h1>Informe Cripto</h1>
              {Noticias()}
          </div>
      )
  }else{
      return(
          <div className='App'>
              <h1>Informe Cripto</h1>
              <h2>CARREGANDO NOTÍCIAS...</h2>
          </div>
      )
  }
}

function RemoveCDATA(text)
{
  return text.replace("<![CDATA[", "").replace("]]>", "");
}

function ExtractDescription(text)
{
  return text.split("<p>")[1].split("</p>")[0];
}

function Noticias()
{
    return news.map((value, index)=>{
        return(
            <div key={index} className="NewsBox">
                <p>{value.name}.<br></br>
                {value.description}</p>
                <a href={value.link} target='_blank'>→ Notícia Completa</a>
                {/* <h6>{value.date}</h6> */}
            </div>
        )   
    })
}

export default App;
