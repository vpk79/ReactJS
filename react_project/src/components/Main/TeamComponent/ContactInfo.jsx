import { useContext, useEffect, useState } from 'react';
import './ContactInfo.css'
import AuthContext from '../../../contexts/authContext';
import * as request from '../../../lib/request'
import * as url from '../../../const/const'

export default function ContactInfo({ data }) {
    const { isAuthenticated, email, userId } = useContext(AuthContext);
    const [personData, setPersonData] = useState(data);

    useEffect(() => {
        setPersonData(data);
    }, [data]);


    async function messageHandler(e) {
        e.preventDefault();
        const textarea = e.target.elements.msgArea;
        const msg = textarea.value;
        if (msg === '') return;

        const receiverId = personData._id;
        const user_Id = userId;
        const oldData = await request.get(`${url.MESSAGES}?distinct=${user_Id}`);

        console.log(userId);
        console.log(oldData);
        // console.log(oldData[0]._ownerId);
  
        if (oldData.length == 0 || oldData[0]._ownerId != userId) {
            createNewChat(msg, receiverId)
        } else {
            const chatId = oldData[0]._id;
            const oldMessages = oldData[0].messages;
            const index = oldMessages.findIndex(x => x.receiverId == receiverId);
            console.log(index);

            // const oldDataFiltered = oldMessages.filter(x => x.receiverId == receiverId);

            if (index == -1) {
                addNewChat(oldMessages, receiverId, msg, chatId)
            } else {
                const sentMsg = oldMessages[index].sentMsg;
                sentMsg.push(msg);

                const newMsg = {

                        receiverId: receiverId,
                        sentMsg: sentMsg,
                        receivedMsg: []
                }

                // oldData.push(newMsg);
                // console.log(oldMessages);
                oldData[0].messages[index] = newMsg;
                // oldMessages[index] = newMsg;
                // console.log(oldMessages);
                console.log(oldData);
                const newData = await request.put(`${url.MESSAGES}/${chatId}`, oldData[0]);
                // console.log(newData);
            }
        }

        async function createNewChat(msg, receiverId) {
            const newMsg = {
                messages: [{
                    receiverId: receiverId,
                    sentMsg: [msg],
                    receivedMsg: []
                }]
            }
            const data = await request.post(`${url.MESSAGES}`, newMsg);
            // console.log(data);

        }

        async function addNewChat(messages, receiverId, msg, chatId) {
            const newMsg = {
                receiverId: receiverId,
                sentMsg: [msg],
                receivedMsg: []
            }

            messages.push(newMsg);
            // console.log(messages);
            const data = await request.put(`${url.MESSAGES}/${chatId}`, { messages });
            // console.log(data);

        }
    }

    return (
        <>
            {personData && (

                <div className="modal fade" id="contactInfoModal" tabIndex="-1" aria-labelledby="contactInfoModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="image-section">
                                    <div className="image-wrapper">
                                        <img src={personData.imageUrl} alt=""></img>
                                    </div>
                                    <p className='person-name'>{personData.name}&nbsp;{personData.title}</p>
                                    <p className='person-department'>{personData.department}</p>
                                    <button type="button" className="btn btn-primary btn-sm add-to-favorities">Add to Favorities</button>

                                </div>

                                <div className="messages-wrapper">
                                    <textarea name="" id="" cols="30" rows="10" disabled={true}></textarea>
                                </div>
                                <div className="close-modal">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            </div>
                            <div className="modal-body">
                                {/* Nav tabs */}
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="about-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#about"
                                            type="button"
                                            role="tab"
                                            aria-controls="about"
                                            aria-selected="true"
                                        >
                                            About
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="summary-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#summary"
                                            type="button"
                                            role="tab"
                                            aria-controls="summary"
                                            aria-selected="false"
                                        >
                                            Summary
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="contact-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#contact"
                                            type="button"
                                            role="tab"
                                            aria-controls="contact"
                                            aria-selected="false"
                                        >
                                            Contacts
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="message-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#message"
                                            type="button"
                                            role="tab"
                                            aria-controls="message"
                                            aria-selected="false"
                                        >
                                            Message
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="comments-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#comments"
                                            type="button"
                                            role="tab"
                                            aria-controls="comments"
                                            aria-selected="false"
                                        >
                                            Comments
                                        </button>
                                    </li>
                                    {/* <li className="nav-item add-to-favorites" role="presentation">
                                        <button
                                            className="btn btn-primary add-to-favorites-btn"
                                            id="add-to-favorites-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#add-to-favorites"
                                            type="button"
                                            role="tab"
                                            aria-controls="message"
                                            aria-selected="false"
                                        >
                                            Add to favorites
                                        </button>
                                    </li> */}
                                </ul>
                                {/* Tab panes */}
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active person-about"
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
                                        className="tab-pane fade person-summary"
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
                                        className="tab-pane fade person-contact"
                                        id="contact"
                                        role="tabpanel"
                                        aria-labelledby="contact-tab"
                                    >
                                        {personData.info && (
                                            <ul>
                                                <li><i className="fas fa-phone"></i>&nbsp;&nbsp;&nbsp;<a href={`tel:${personData.info.contacts.phone}`}>{personData.info.contacts.phone}</a></li>
                                                <li><i className="far fa-envelope"></i>&nbsp;&nbsp;&nbsp;<a href={`mailto:${personData.info.contacts.email}`} target="_blank">{personData.info.contacts.email}</a></li>
                                                <li><i className="fab fa-linkedin-in"></i>&nbsp;&nbsp;&nbsp;<a href="http://linkedin.com" target="_blank">{personData.info.contacts.linkedin}</a></li>
                                                <li><i className="fab fa-twitter"></i>&nbsp;&nbsp;&nbsp;<a href="http://twitter.com" target="_blank">{personData.info.contacts.twitter}</a></li>
                                            </ul>
                                        )

                                        }
                                    </div>
                                    <div
                                        className="tab-pane fade person-message"
                                        id="message"
                                        role="tabpanel"
                                        aria-labelledby="message-tab"
                                    >
                                        <div className='person-message-wrapper'>
                                            <p>You can leave me a message. I`ll respond ASAP.</p>
                                            <form className='msgForm' onSubmit={messageHandler}>
                                                <textarea name="msgArea" id="msgArea" cols="40" rows="5"></textarea>
                                                <button type="btn btn-submit" className='btn  btn-primary'>Send</button>
                                            </form>

                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade person-comments"
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


