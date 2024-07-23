import { useContext, useEffect, useRef, useState } from 'react';
import './ContactInfo.css'
import AuthContext from '../../../contexts/authContext';
import sendSound from '../../../media/sendMsg.mp3'
import receiveSound from '../../../media/receiveMsg.mp3'
import * as request from '../../../lib/request'
import * as url from '../../../const/const'
import { Link } from 'react-router-dom';
import { showErrorToast } from '../../../Toasts/toastsMsg';


export default function ContactInfo({ data, toggleContactForm }) {
    const { isAuthenticated, email, userId } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('about'); // Default tab
    const [personData, setPersonData] = useState(data);
    const [sentMessages, setSentMessages] = useState([])
    let [msgHeader, setMsgHeader] = useState(false);
    let userName = 'You';
    const formRef = useRef(null);
    const modalRef = useRef(null);

    console.log(activeTab);

    if (email) {
        userName = email.split('@')[0];
    }
    useEffect(() => {
        setPersonData(data);
    }, [data]);

    // handle tabs
    const handleTabClick = (tabId) => {
        if(tabId !== 'message') {
            setMsgHeader(false);
        } else {
            setMsgHeader(true);
        }
        setActiveTab(tabId);
    };

    // chat sounds 
    const playSendSound = () => {
        const audio = new Audio(sendSound);
        audio.play();
    };


    // load chat messages on opening
    useEffect(() => {
        const oldMessages = request.get(`${url.MESSAGES}?distinct=${userId}`)
            .then(data => {
                if (data.length > 0) {
                    const receiverId = personData._id;
                    const personMsg = data[0].messages.filter(x => x.receiverId == receiverId);
                    if (personMsg.length == 0) {
                        setSentMessages([]);
                        return;
                    } else {
                        const messages = personMsg[0].sentMsg;
                        setSentMessages(messages);
                    }
                }
                return;
            })
    }, [toggleContactForm])


    // main chat handler 
    async function messageHandler(e) {
        e.preventDefault();

        // console.log('entered');
        // console.log(e.target.value);
        let textarea = e.target.value || e.target.elements.msgArea.value;
        // console.log(textarea.value);
        const msg = textarea.trim();
        if (msg === '') {
            showErrorToast('Message cannot be empty!', { toastId: "messageError" })
            return;
        }

        const receiverId = personData._id;

        const oldData = await request.get(`${url.MESSAGES}?distinct=${userId}`); // load all chat messages by ownerId
        console.log(oldData);
        if (oldData.length == 0 || oldData[0]._ownerId != userId) {
            createNewChat(msg, receiverId, e)
            // console.log('new');
        } else {
            const chatId = oldData[0]._id;
            const oldMessages = oldData[0].messages;
            const index = oldMessages.findIndex(x => x.receiverId == receiverId);
            // console.log('old');
            if (index == -1) {                                 // if not chats with this person create new
                addNewChat(oldMessages, receiverId, msg, chatId, e)
            } else {
                const sentMsg = oldMessages[index].sentMsg;
                sentMsg.push(msg);

                const newMsg = {
                    receiverId: receiverId,
                    sentMsg: sentMsg,
                    receivedMsg: []
                }
                oldData[0].messages[index] = newMsg;
                const newData = await request.put(`${url.MESSAGES}/${chatId}`, oldData[0]);
                setSentMessages(sentMsg);
                playSendSound();
                e.target.elements ? e.target.elements.msgArea.value = '' : e.target.value = '';
            }
        }
    }

    // create new chat if have none
    async function createNewChat(msg, receiverId, e) {
        const newMsg = {
            messages: [{
                receiverId: receiverId,
                sentMsg: [msg],
                receivedMsg: []
            }]
        }
        const data = await request.post(`${url.MESSAGES}`, newMsg);
        // console.log('newchat', data);
        setSentMessages([msg]);
        playSendSound();
        e.target.elements ? e.target.elements.msgArea.value = '' : e.target.value = '';
    }

    // add a new chat with new person
    async function addNewChat(messages, receiverId, msg, chatId, e) {
        const newMsg = {
            receiverId: receiverId,
            sentMsg: [msg],
            receivedMsg: []
        }

        messages.push(newMsg);
        // console.log(messages);
        const data = await request.put(`${url.MESSAGES}/${chatId}`, { messages });
        // console.log(data);
        setSentMessages([msg]);
        playSendSound();
        e.target.elements ? e.target.elements.msgArea.value = '' : e.target.value = '';

    }

    /* submit on press enter */
    function submitOnEnter(event) {
        if (event.key == "Enter") {
            event.preventDefault();
            messageHandler(event);
            // console.log(event.target.value);
        }
    }

    /* clear on close */
    const clearForm = () => {
        setSentMessages([]);
        if (formRef.current) {
            formRef.current.reset();
        }
        setActiveTab('about');
        setMsgHeader(false);
        toggleContactForm();
    };


    // handle backdrop close
    useEffect(() => {
        const modalElement = modalRef.current;
        const handleModalHidden = () => {
            clearForm();
        };

        if (modalElement) {
            modalElement.addEventListener('hidden.bs.modal', handleModalHidden);
        }

        return () => {
            if (modalElement) {
                modalElement.removeEventListener('hidden.bs.modal', handleModalHidden);
            }
        };
    }, []);


    return (
        <>
            {personData && (

                <div className="modal fade" ref={modalRef} id="contactInfoModal" tabIndex="-1" aria-labelledby="contactInfoModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            {
                                msgHeader && (
                                    <div className="modal-header with-form">
                                        <div className="image-section">
                                            <div className="image-wrapper">
                                                <img src={personData.imageUrl} alt=""></img>
                                            </div>
                                            <p className='person-name'>{personData.name}&nbsp;{personData.title}</p>
                                            <p className='person-department'>{personData.department}</p>
                                            <button type="button" className="btn btn-primary btn-sm add-to-favorities">Add to Favorities</button>

                                        </div>

                                        <div className="messages-wrapper">
                                            {/* <textarea className="displayMsg" name="displayMsg" id="displayMsg" cols="30" rows="10"  value={text} disabled={true}></textarea> */}
                                            <div className='displayMsg'>
                                                <ul>
                                                    {sentMessages.map((data, index) => (

                                                        <li key={index}><span className='yourMsg'>{data}</span><span className='yourName'>{userName}</span></li>


                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="close-modal">
                                            <button type="button" onClick={clearForm} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                !msgHeader && (
                                    <div className="modal-header no-form">
                                        <div className='modal-container'>
                                            <div className='person-name-wrapper'>
                                                <p className='person-name'>{personData.name}&nbsp;{personData.title}</p>
                                                <p className='person-department'>{personData.department}</p>
                                                <button type="button" className="btn btn-primary btn-sm add-to-favorities">Add to Favorities</button>
                                                <button type="button" className="btn btn-primary btn-sm add-to-favorities">Make Appointment</button>
                                            </div>
                                            <div className="image-section">
                                                <div className="image-wrapper">
                                                    <img src={personData.imageUrl} alt=""></img>
                                                </div>
                                            </div>
                                            <div className="close-modal">
                                                <button type="button" onClick={clearForm} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="modal-body">
                                {/* Nav tabs */}
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                                            id="about-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#about"
                                            type="button"
                                            role="tab"
                                            aria-controls="about"
                                            aria-selected={activeTab === 'about'}
                                            onClick={() => handleTabClick('about')}
                                        >
                                            About
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${activeTab === 'summary' ? 'active' : ''}`}
                                            id="summary-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#summary"
                                            type="button"
                                            role="tab"
                                            aria-controls="summary"
                                            aria-selected={activeTab === 'summary'}
                                            onClick={() => handleTabClick('summary')}
                                        >
                                            Summary
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                                            id="contact-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#contact"
                                            type="button"
                                            role="tab"
                                            aria-controls="contact"
                                            aria-selected={activeTab === 'contact'}
                                            onClick={() => handleTabClick('contact')}
                                        >
                                            Contacts

                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${activeTab === 'message' ? 'active' : ''}`}
                                            id="message-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#message"
                                            type="button"
                                            role="tab"
                                            aria-controls="message"
                                            aria-selected={activeTab === 'message'}
                                            onClick={() => handleTabClick('message')}
                                        >
                                            Message
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${activeTab === 'comments' ? 'active' : ''}`}
                                            id="comments-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#comments"
                                            type="button"
                                            role="tab"
                                            aria-controls="comments"
                                            aria-selected={activeTab === 'comments'}
                                            onClick={() => handleTabClick('comments')}
                                        >
                                            Comments
                                        </button>
                                    </li>

                                </ul>
                                {/* Tab panes */}
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className={`tab-pane fade ${activeTab === 'about' ? 'show active' : ''}`}
                                        id="about"
                                        role="tabpanel"
                                        aria-labelledby="about-tab"
                                    >
                                        {
                                            personData.info && (
                                                <p><i className="fas fa-info-circle"></i>&nbsp;{personData.info['about']}</p>
                                            )
                                        }
                                        <ul>
                                            {
                                                personData.info && (
                                                    personData.info['facts'].map((data, index) => (
                                                        <li key={index}>{data}</li>
                                                    ))
                                                )
                                            }
                                        </ul>
                                    </div>
                                    <div
                                        className={`tab-pane fade ${activeTab === 'summary' ? 'show active' : ''}`}
                                        id="summary"
                                        role="tabpanel"
                                        aria-labelledby="summary-tab"
                                    >
                                        <p>SPECIALITY</p>
                                        <ul>
                                            {
                                                personData.info && (
                                                    <li>{personData.info.summary.speciality}</li>
                                                )
                                            }
                                        </ul>
                                        <p>EDUCATION</p>
                                        <ul>
                                            {
                                                personData.info && (
                                                    <li>{personData.info.summary.education}</li>
                                                )
                                            }
                                        </ul>
                                        <p>CERTIFICATIONS</p>
                                        <ul>
                                            {
                                                personData.info && (
                                                    personData.info.summary['certifications'].map((data, index) => (
                                                        <li key={index}>{data}</li>
                                                    ))
                                                )
                                            }
                                        </ul>
                                        <p>SKILLS</p>
                                        <ul>
                                            {
                                                personData.info && (
                                                    <li>{personData.info.summary.skills}</li>
                                                )
                                            }
                                        </ul>

                                    </div>
                                    <div
                                        className={`tab-pane fade ${activeTab === 'contact' ? 'show active' : ''}`}
                                        id="contact"
                                        role="tabpanel"
                                        aria-labelledby="contact-tab"
                                    >
                                        {personData.info && (
                                            <ul>
                                                <li><Link to={`tel:${personData.info.contacts.phone}`}><i className="fas fa-phone"></i>&nbsp;&nbsp;&nbsp;{personData.info.contacts.phone}</Link></li>
                                                <li><Link to={`mailto:${personData.info.contacts.email}`} target="_blank"><i className="far fa-envelope"></i>&nbsp;&nbsp;&nbsp;{personData.info.contacts.email}</Link ></li>
                                                <li><Link to="http://linkedin.com" target="_blank"><i className="fab fa-linkedin-in"></i>&nbsp;&nbsp;&nbsp;{personData.info.contacts.linkedin}</Link ></li>
                                                <li><Link to="http://twitter.com" target="_blank"><i className="fab fa-twitter"></i>&nbsp;&nbsp;&nbsp;{personData.info.contacts.twitter}</Link ></li>
                                            </ul>
                                        )

                                        }
                                    </div>
                                    <div
                                        className={`tab-pane fade ${activeTab === 'message' ? 'show active' : ''}`}
                                        id="message"
                                        role="tabpanel"
                                        aria-labelledby="message-tab"
                                    >
                                        <div className='person-message-wrapper'>
                                            <p>You can leave me a message. I`ll respond ASAP.</p>
                                            <form ref={formRef} className='msgForm' onSubmit={messageHandler}>
                                                <textarea name="msgArea" id="msgArea" cols="40" rows="5" onKeyPress={() => submitOnEnter(event)}></textarea>
                                                <button type="btn btn-submit" className='btn  btn-primary'>Send</button>
                                            </form>

                                        </div>
                                    </div>
                                    <div
                                        className={`tab-pane fade ${activeTab === 'comments' ? 'show active' : ''}`}
                                        id="comments"
                                        role="tabpanel"
                                        aria-labelledby="comments-tab"
                                    >
                                        <div className='person-comments-wrapper'>
                                            <p>You can leave a comment.</p>
                                            <form className='commentForm' >
                                                <textarea name="commentArea" id="commentArea" cols="40" rows="5"></textarea>
                                                <button type="btn btn-submit" className='btn  btn-primary'>Post</button>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
            }

        </>
    )
}


