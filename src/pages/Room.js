import React, { useEffect, useRef, useState} from "react";
import { useHistory } from 'react-router-dom';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import Menu from '../components/Menu'
import Calendar from '../components/Calendar'
import streamSaver from "streamsaver";


const Container = styled.div`
    
`;

const StyledVideo = styled.video`
    
`;
const worker = new Worker("../worker.js");

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, [props.peer]);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
        );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};


function Room(props) {
    
    const history = useHistory()
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const [file, setFile] = useState();
    const [gotFile, setGotFile] = useState(false);
    const roomID = props.match.params.roomID;
    const [myVideoStream, setmyVideoStream] = useState()
    const [chatShow, setchatShow] = useState(false)
    let messagesTab = []
    const peerRef = useRef();
    const fileNameRef = useRef("");
    
    useEffect(() => {
        socketRef.current = io.connect("/");
        // console.log(io.connect("http://localhost:8000"));
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setmyVideoStream(stream) 
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })

                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })
                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            let text = document.querySelector('.chat_message');
            let sendmessage = document.querySelector('.sendmessage')
            // when press enter send message
            sendmessage.addEventListener("click", (e) =>{
                if (text.value.length !== 0) {
                    socketRef.current.emit('message', text.value);
                    text.value=''
                }
            });
            socketRef.current.on("createMessage", message => {
                let messageTemp = document.createElement("li")
                messageTemp.innerHTML = message
                document.querySelector('.messages').appendChild(messageTemp)
            })
            socketRef.current.on('test',()=>{
                console.log("c'est boen");
            })
        })
    }, [roomID]);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        peer.on("data", handleReceivingData);


        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        peer.on("data", handleReceivingData);


        return peer;
    }

    function handleReceivingData(data) {
        if (data.toString().includes("done")) {
            setGotFile(true);
            const parsed = JSON.parse(data);
            fileNameRef.current = parsed.fileName;
        } else {
            worker.postMessage(data);
        }
    }

    function download() {
        setGotFile(false);
        worker.postMessage("download");
        worker.addEventListener("message", event => {
            const stream = event.data.stream();
            const fileStream = streamSaver.createWriteStream(fileNameRef.current);
            stream.pipeTo(fileStream);
        })
    }

    function selectFile(e) {
        setFile(e.target.files[0]);
    }

    function sendFile() {
        const peer = peersRef.current;
        const stream = file.stream();
        const reader = stream.getReader();

        reader.read().then(obj => {
            handlereading(obj.done, obj.value);
        });

        function handlereading(done, value) {
            if (done) {
                peer.write(JSON.stringify({ done: true, fileName: file.name }));
                return;
            }

            peer.write(value);
            reader.read().then(obj => {
                handlereading(obj.done, obj.value);
            })

        }
    }

    const muteUnmute = () => {
        let mic = document.querySelector('.mic')
        const enabled = myVideoStream.getAudioTracks()[0].enabled;
        if (enabled) {
          myVideoStream.getAudioTracks()[0].enabled = false;
          mic.src = "../img/room/mic-mute.png"
        } else {
          myVideoStream.getAudioTracks()[0].enabled = true;
          mic.src = "../img/room/mic-demute.png"

        }
      }
      
      const playStop = () => {
          let cam = document.querySelector('.cam')
        let enabled = myVideoStream.getVideoTracks()[0].enabled;
        if (enabled) {
          myVideoStream.getVideoTracks()[0].enabled = false;
          cam.src = "../img/room/cam-mute.png"

        } else {
          myVideoStream.getVideoTracks()[0].enabled = true;
          cam.src = "../img/room/cam-demute.png"
        }
      }

      const chatDisplay = () => {
        let chat = document.querySelector('.main__right').style.display
        if (document.querySelector('.main__right').style.display === "flex"){
            document.querySelector('.main__right').style.display = "none"
        }else{
            document.querySelector('.main__right').style.display = "flex"
        }
      }

      const leaveRoom = () => {
        history.push("/maps")
      }

    let downloadPrompt;
    if (gotFile) {
        downloadPrompt = (
            <div>
                <span>You have received a file. Would you like to download the file?</span>
                <button onClick={download}>Yes</button>
            </div>
        );
    }
    
    return (
        <div className="content-container">
            <Menu></Menu>
            <div>
                <Calendar></Calendar>
                <div className="room-container">
                    <Container className="container-room">
                        <StyledVideo muted ref={userVideo} autoPlay playsInline />
                        {peers.map((peer, index) => {
                            return (
                                <Video key={index} peer={peer} />
                            );
                        })}
                    </Container>
                    <div className="main__right">
                        <div className="main__chat_window">
                            <ul className="messages">
                            </ul>
                        </div>
                        <div className="main__message_container">
                            <input className="chat_message" type="text" placeholder="Ecrire un message..." />
                            <button className="sendmessage">envoyer</button>
                        </div>
                        <div className="send-container">
                            <input onChange={selectFile} type="file" />
                            <button onClick={sendFile}>Send file</button>
                            {downloadPrompt}
                        </div> 
                    </div>
                </div>
                <div className="bar-bottom">
                    <div className="button-mute">
                        <img onClick={()=>{muteUnmute()}} src="../img/room/mic-demute.png" alt="" className="mic" />
                        <img onClick={()=>{playStop()}} src="../img/room/cam-demute.png" alt="" className="cam" />
                    </div>
                    <div className="mid-button">
                        <img src="../img/room/chat.png" alt="" onClick={()=>{chatDisplay()}} />
                    </div>
                    <div className="leave-button">
                        <img src="../img/room/leave.png" alt="" onClick={()=>{leaveRoom()}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Room
