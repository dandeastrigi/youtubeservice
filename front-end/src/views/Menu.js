import React, { useState } from 'react'
import 'antd/dist/antd.css'
import User from '../data/User'
import { Input, Col, Row, Space } from 'antd'
import Config from '../components/Config'
import Timer from '../components/Timer'
import ListInfo from '../components/ListInfo'
import Logo from '../public/images/you-search.svg'
import YouTube from 'react-youtube';
import axios from 'axios'
import {
    LoadingOutlined,
} from '@ant-design/icons'

const { Search } = Input;

const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
};

export default function Menu() {
    const [ loading, setLoading ] = useState("")
    const [ timer, setTimer ] = useState("");
    const [ search, setSearch ] = useState("")
    const [ videoList, setVideoList ] = useState([])
    
    function makeSearch(term) {
        axios.post(process.env.REACT_APP_SERVICE_URL+':'+process.env.REACT_APP_SERVICE_PORT, {
            searchTerm: term
        }).then((response) => {
            const videoListArray = videoList
            const thisResponse = response.data
            thisResponse['result'].map((video) => videoListArray.push([ video.id.videoId, video.snippet]))
            console.log(videoListArray)
            setVideoList(videoListArray)
            User.video_list = videoListArray
        })
    }
    
    function handleSearch(value){
        setSearch(value)
        makeSearch(value)
        setLoading(<LoadingOutlined/>)
        setTimeout(() => {
            setLoading("")
        }, 3000);
    }
    
    function getVideoPlay(){
        console.log("Play")
        setTimer(<Timer/>)
        User.using_now = true
    }
    
    function getVideoPause(){
        console.log("Pause")
        setTimer("")
        User.using_now = false
    }
    
    return(
        <div className="menuTop">
            <Row>
                <Col className="col-search" span={18} push={6}>
                    <div className="top-menu-search">
                        <div class="you-search-box"> 
                            <h1>YoutubeSearch</h1>
                            <img class="logo" src={Logo} alt="React Logo" />
                        </div>    
                        <div class="menuSearch">
                            <Search onSearch={value => handleSearch(value)} style={{ width: 400 }}/>
                        </div>
                        <div>{loading}</div>
                        <div>{timer}</div>
                    </div>
                </Col>
                <Col span={6} pull={18}>
                    <div className="top-menu-buttons">   
                        <Config />
                        <ListInfo list={videoList}/>
                    </div>
                </Col>
            </Row>
             <Row justify="left" align="top">
                <Col className="video-list" span={24}>        
                    {videoList.map(vid => (
                        <div className="video-item">
                            <div className="video-title">
                                <div className="title">{vid[1].title}</div>
                            </div>
                            <Space size="middle"/> 
                            <div className="video-thumbnail" style={{userSelect: "none"}}>
                                <YouTube onPause={getVideoPause} onPlay={getVideoPlay} videoId={vid[0]} opts={opts}/>
                            </div>
                            <Space size="middle"/> 
                            <div className="video-description">
                                <div className="video-video">
                                    <div className="description">{vid[1].description}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Col>
             </Row>
        </div>
    )
}