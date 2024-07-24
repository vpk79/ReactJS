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
    const [chat, setChat] = useState([]);
    let [moreInfoCounter, setMoreInfoCounter] = useState(5);
    let [doctorCounter, setDoctorCounter] = useState(0);
    let [msgHeader, setMsgHeader] = useState(false);
    let [commentHeader, setCommentHeader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(null);
    const msgAreaRef = useRef(null);
    const commentRef = useRef(null);
    const userNameRef = useRef(null);

    let userName = 'Patient';
    let personName = 'Dr.'
    const formMsgRef = useRef(null);
    const modalRef = useRef(null);
    const timeoutIdRef = useRef(null);

    if (email) userName = email.split('@')[0];
    if (personData.hasOwnProperty('name')) personName = personData.name.split(' ')[0];

    useEffect(() => {
        setPersonData(data);
    }, [data]);

    // handle tabs
    const handleTabClick = (tabId) => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }

        if (tabId == 'message') {
            setMsgHeader(true);
            setCommentHeader(false);
            setTimeout(() => {
                if (msgAreaRef.current) {
                    msgAreaRef.current.focus();
                }
            }, 100);
        } else if (tabId == 'comments') {
            setCommentHeader(true);
            setMsgHeader(false);
            setTimeout(() => {
                if (userNameRef.current) {
                    userNameRef.current.focus();
                }
            }, 100);
        } else {
            setMsgHeader(false);
            setCommentHeader(false);
        }



        setActiveTab(tabId);
        setDoctorCounter(0);
        setMoreInfoCounter(5);

        if (formMsgRef.current) {
            formMsgRef.current.reset();
        }
    };

    // chat sounds 
    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };


    // post new comment

    function commentHandler(e) {
        e.preventDefault();

        if (isAuthenticated) {
            const userName = userNameRef.current.value;
            const comment = commentRef.current.value;

            const newComment = createNewComment(userName, comment);
            console.log(commentRef.current.value);
            console.log(userNameRef.current.value);
        } else {
            showErrorToast('You are not logged in!', { toastId: 'notLogged' });
            return;
        }


    }

    function createNewComment(userName, comment) {

    }


    // start new chat
    function intitiateChat() {
        setChat([]);
        const responses = personData.responses;
        const greetings = responses[0];
        const newMsg = {
            name: personName,
            message: greetings,
            user: 'doctor'
        }

        setLoading(true);
        setLoadingMessage({ name: personName, message: '', user: 'doctor' });

        timeoutIdRef.current = setTimeout(() => {
            setChat((chat) => [...chat, newMsg]);
            playSound(receiveSound);
            setDoctorCounter((state) => state + 1);
            setLoading(false);
            setLoadingMessage(null);
        }, 2200);
    }


    function userChatMsg(e) {
        e.preventDefault();
        if(isAuthenticated){
            let textarea = e.target.value || e.target.elements.msgArea.value;
            const name = userName;
            const msg = textarea.trim();
            if (msg === '') {
                showErrorToast('Message cannot be empty!', { toastId: "messageError" })
                return;
            }
            // console.log(msg);
            const newMsg = {
                name: name,
                message: msg,
                user: 'user'
            }

            setChat([...chat, newMsg]);
            playSound(sendSound);
            chatManager(name, msg);
            e.target.value ? e.target.value = '' : e.target.elements.msgArea.value = '';
        } else {
            showErrorToast('You are not logged in!', { toastId: 'notLogged' });
            return;
        }
        

    }


    /* responses map */

    //  greetings =   responses[0];
    //  describe =    responses[1];
    //  appointment = responses[2];
    //  busy =        responses[3];
    //  bye =         responses[4];
    //  moreInfo1 =   responses[5];
    //  moreInfo2 =   responses[6];
    //  moreInfo3 =   responses[7];
    //  moreInfo4 =   responses[8];

    function chatManager(name, msg) {
        let response = 'Ok.';
        if (doctorCounter > 4) return;

        const responses = personData.responses;

        if (doctorCounter == 2 && msg.length < 20) {
            if (moreInfoCounter > 8) {
                response = responses[3];
                setDoctorCounter((state) => state + 1);
            } else {
                setDoctorCounter((state) => state - 1);
                setMoreInfoCounter((state) => state + 1);
                response = responses[moreInfoCounter];
            }
        } else {
            response = responses[doctorCounter];
        }

        const newMsg = {
            name: personName,
            message: response,
            user: 'doctor'
        }

        setLoading(true);
        setLoadingMessage({ name: personName, message: '', user: 'doctor' });

        timeoutIdRef.current = setTimeout(() => {
            setChat((chat) => [...chat, newMsg]);
            playSound(receiveSound);
            setDoctorCounter((state) => state + 1);
            setLoading(false);
            setLoadingMessage(null);
        }, 2200 + (response.length) * 100);
    }


    /* submit on press enter */
    function submitOnEnter(event) {
        if (event.key == "Enter") {
            event.preventDefault();
            userChatMsg(event);
        }
    }

    /* clear on close */
    const clearForm = () => {
        if (formMsgRef.current) {
            formMsgRef.current.reset();
        }
        setActiveTab('about');
        setMsgHeader(false);
        setCommentHeader(false);
        setDoctorCounter(0);
        setMoreInfoCounter(5);
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
                                    <div className="message-section modal-header with-form">
                                        <div className="image-section">
                                            <div className="image-wrapper">
                                                <img src={personData.imageUrl} alt=""></img>
                                            </div>
                                            <p className='person-name'>{personData.name}&nbsp;{personData.title}</p>
                                            <p className='person-department'>{personData.department}</p>
                                            <button type="button" className="btn btn-primary btn-sm add-to-favorities">Add to Favorities</button>

                                        </div>

                                        <div className="messages-wrapper">
                                            <div className='displayMsg'>
                                                <ul>
                                                    {chat.map((data, index) => (
                                                        data.user == 'doctor' ?

                                                            <li key={index} className='doctorMsg'><span className='doctorName'>{data.name}</span>
                                                                <span className='doctorText'>{data.message}</span>
                                                            </li>

                                                            :
                                                            <li key={index} className='userMsg'><span className='userText'>{data.message}</span>
                                                                <span className='userName'>{data.name}</span>
                                                            </li>
                                                    ))

                                                    }
                                                    {loadingMessage && (
                                                        <li>
                                                            <span className='doctorName'>{loadingMessage.name}</span>
                                                            <svg height={40} width={40} className="loader">
                                                                <circle className="dot" cx={10} cy={20} r={3} style={{ fill: "grey" }} />
                                                                <circle className="dot" cx={20} cy={20} r={3} style={{ fill: "grey" }} />
                                                                <circle className="dot" cx={30} cy={20} r={3} style={{ fill: "grey" }} />
                                                            </svg>
                                                        </li>

                                                    )}
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
                                !msgHeader && commentHeader && (
                                    <div className="comments-section modal-header with-form">
                                        <div className="image-section">
                                            <div className="image-wrapper">
                                                <img src={personData.imageUrl} alt=""></img>
                                            </div>
                                            <p className='person-name'>{personData.name}&nbsp;{personData.title}</p>
                                            <p className='person-department'>{personData.department}</p>
                                            <button type="button" className="btn btn-primary btn-sm add-to-favorities">Add to Favorities</button>

                                        </div>

                                        <div className="comments-wrapper">
                                            <div className='displayComments'>
                                                <ul className='comments-list'>
                                                    <li className='comments-row'>
                                                        <span className='userName'>Peter says:</span>
                                                        <span className='userComment'>
                                                            Verry nice person. I am very satisfied.Verry nice person.
                                                            I am very satisfied.Verry nice person.
                                                            I am very satisfied.Verry nice person.
                                                            I am very satisfied.
                                                        </span>
                                                        <span className='like-comment'><Link to="" className='btn btn-sm btn-like'>Like: <span>10</span></Link></span>
                                                        <span className='dislike-comment'><Link to="" className='btn btn-sm btn-dislike'>Dislike: <span>20</span></Link></span>
                                                        <span className='timeStamp'>24 юли 2024 | 13:08</span>
                                                    </li>
                                                    <li className='comments-row'>
                                                        <span className='userName'>Peter says:</span>
                                                        <span className='userComment'>
                                                            Verry nice person. I am very satisfied.Verry nice person.
                                                            I am very satisfied.Verry nice person.
                                                            I am very satisfied.Verry nice person.
                                                            I am very satisfied.
                                                        </span>
                                                        <span className='like-comment'><Link to="" className='btn btn-sm btn-like'>Like: <span>10</span></Link></span>
                                                        <span className='dislike-comment'><Link to="" className='btn btn-sm btn-dislike'>Dislike: <span>20</span></Link></span>
                                                        <span className='timeStamp'>24 юли 2024 | 13:08</span>
                                                    </li>
                                                    <li className='comments-row'>
                                                        <span className='userName'>Peter says:</span>
                                                        <span className='userComment'>
                                                            Verry nice person. I am very satisfied.Verry nice person.
                                                            I am very satisfied.Verry nice person.
                                                            I am very satisfied.Verry nice person.
                                                            I am very satisfied.
                                                        </span>
                                                        <span className='like-comment'><Link to="" className='btn btn-sm btn-like'>Like: <span>10</span></Link></span>
                                                        <span className='dislike-comment'><Link to="" className='btn btn-sm btn-dislike'>Dislike: <span>20</span></Link></span>
                                                        <span className='timeStamp'>24 юли 2024 | 13:08</span>
                                                    </li>
                                                    <li className='comments-row'>
                                                        <span className='userName'>Peter says:</span>
                                                        <span className='userComment'>
                                                            Verry nice person. I am very satisfied.Verry nice person.
                                                            I am very satisfied.Verry nice person.
                                                            I am very satisfied.Verry nice person.
                                                            I am very satisfied.
                                                        </span>
                                                        <span className='like-comment'><Link to="" className='btn btn-sm btn-like'>Like: <span>10</span></Link></span>
                                                        <span className='dislike-comment'><Link to="" className='btn btn-sm btn-dislike'>Dislike: <span>20</span></Link></span>
                                                        <span className='timeStamp'>24 юли 2024 | 13:08</span>
                                                    </li>
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
                                !msgHeader && !commentHeader && (
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
                                            className={`nav-link  ${activeTab === 'about' ? 'active' : ''}`}
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
                                            className={`nav-link  ${activeTab === 'summary' ? 'active' : ''}`}
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
                                            className={`nav-link  ${activeTab === 'contact' ? 'active' : ''}`}
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
                                            className={`nav-link  ${activeTab === 'message' ? 'active' : ''}`}
                                            id="message-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#message"
                                            type="button"
                                            role="tab"
                                            aria-controls="message"
                                            aria-selected={activeTab === 'message'}
                                            onClick={() => { handleTabClick('message'); intitiateChat() }}
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
                                        className={`tab-pane fade person-about ${activeTab === 'about' ? 'show active' : ''}`}
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
                                        className={`tab-pane fade person-summary ${activeTab === 'summary' ? 'show active' : ''}`}
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
                                        className={`tab-pane fade person-contact ${activeTab === 'contact' ? 'show active' : ''}`}
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
                                        className={`tab-pane fade person-message ${activeTab === 'message' ? 'show active' : ''}`}
                                        id="message"
                                        role="tabpanel"
                                        aria-labelledby="message-tab"
                                    >
                                        <div className='person-message-wrapper'>
                                            <p>You can leave me a message. I`ll respond ASAP.</p>
                                            <form ref={formMsgRef} className='msgForm' onSubmit={userChatMsg}>
                                                <textarea ref={msgAreaRef} className="msgArea" name="msgArea" id="msgArea" cols="40" rows="5" onKeyPress={() => submitOnEnter(event)}></textarea>
                                                <button type="btn btn-submit" className='btn  btn-primary'>Send</button>
                                            </form>

                                        </div>
                                    </div>
                                    <div
                                        className={`tab-pane fade person-comments ${activeTab === 'comments' ? 'show active' : ''}`}
                                        id="comments"
                                        role="tabpanel"
                                        aria-labelledby="comments-tab"
                                    >
                                        <div className='person-comments-wrapper'>
                                            <p>You can leave a comment.</p>
                                            <form className='commentForm' onSubmit={commentHandler}>
                                                <div className='userInput'>
                                                    <label htmlFor="userName">*Username:</label>
                                                    <input ref={userNameRef} type="text" className="userName" name='userName' id="userName"></input>
                                                </div>

                                                <textarea ref={commentRef} name="commentArea" id="commentArea" cols="40" rows="5"></textarea>
                                                <button type="btn submit" className='btn  btn-primary'>Post</button>
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


