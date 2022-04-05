import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import axios from "axios";

export const Translate = props => {
    const { store, actions } = useContext(Context);
    const [inputText, setInputText] = useState('')
    const [resultText, setResultText] = useState('')
    const [languageList, setLanguageList] = useState([])
    const[langaugeCode, setLenguageCode]=useState('')
    const[dropdown, setDropDonw]=useState('')
    const[detectLen, setDetectLen]=('')


    const getLenguageCode =()=>{
        axios.post('https://libretranslate.com/detect',{
           q: inputText
        })
        .then((res)=>{
            console.log(res.data[0].language)
        })
    }
    const trasnlateText = () => {
        setResultText(inputText)

        getLenguageCode();

        let data = {
            q: inputText,
            target: langaugeCode,
        }
        axios.post('https://libretranslate.com/translate')
    }
    const params = useParams();
    useEffect(() => {
        axios.get('https://libretranslate.com/languages')
            .then((res) => {
                console.log(res.data)
                setLanguageList(res.data)
            })

    }, [])
    const lenguageKey = (e) => {
     const index =  languageList.findIndex((language)=>{
          return language.name === e.target.innerHTML
      })
      setLenguageCode(languageList[index].code)
        setDropDonw(e.target.innerHTML)
    }
    return (
        <div className="jumbotron">
            <div>
                <h1>Lucci Translates</h1>
            </div>

            <div>
                <textarea className='textarea' onChange={(e) => setInputText(e.target.value)}></textarea>
            </div>
            <div class="input-group mb-3"style={{width: '60%'}}>
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
                <ul class="dropdown-menu">
                {languageList.map((lenguage, index) => {
                            return (

                                <li key={index} onClick={(e)=>lenguageKey(e)} value={lenguage.code} ><a  className="dropdown-item">{lenguage.name}</a></li>
                            )
                        })}
                </ul>
                <input type="text" class="form-control" aria-label="Text input with dropdown button" value={dropdown}/>
            </div>
            <div>
                <div>
                    <textarea className='textarea' value={resultText}></textarea>
                </div>
                <div>
                    <button type="button" onClick={trasnlateText} className="btn btn-danger">Danger</button>
                </div>
            </div>


        </div>
    );
};



Translate.propTypes = {
    match: PropTypes.object
};
