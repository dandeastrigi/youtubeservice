import React, { useState } from 'react'
import axios from 'axios'

export default function Searchbar() {
    const [term, setTerm] = useState("")
    const [ searchedTerms, setSearchedTerms ] = useState([])
    const [ videoList, setVideoList ] = useState([]);
    
    function handleTermChange(e){
        setTerm(e.target.value)
    }
        
    function onSubmit(){
        pushTerm()
        getVideoList()
    }
    
    function pushTerm(){
        let termArray = searchedTerms
        termArray.push([term])
        setSearchedTerms(termArray)
    }
    
    function getVideoList() {
        axios.post('http://localhost:4000', {
            searchTerm: term
        }).then((response) => {
            const videoListArray = videoList;
            const thisResponse = response.data
            thisResponse['result'].map((video) => videoListArray.push([ video.id.videoId, video.snippet]));
            console.log(videoListArray)
            setVideoList(videoListArray);
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    return(
       <div className="searchbar">
            <input type="text" value={term} onChange={handleTermChange} placeholder="Informe a busca"></input>
            <button onClick={onSubmit}>Buscar</button>
            <hr/>
        </div>
    )
}