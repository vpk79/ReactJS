import { useContext, useEffect, useRef, useState } from 'react';
import './ContactInfo.css'
import AuthContext from '../../../contexts/authContext';
import sendSound from '../../../media/sendMsg.mp3'
import receiveSound from '../../../media/receiveMsg.mp3'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../../Toasts/toastsMsg';
import * as utils from '../../../utils/utils';
import * as commentsService from '../../../services/commentsService';
import * as request from '../../../lib/request';
import * as url from '../../../const/const'
import { ConfirmToast } from 'react-confirm-toast'
import { LoadSpinner } from '../../../assets/Spinners/LoadSpinner';
import { checkLikes } from '../../../services/services';


export default function ContactInfo({ data }) {
    // console.log(data);

    const { isAuthenticated, email, userId, username } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('about'); // Default tab
    const [personData, setPersonData] = useState(data);
    const [chat, setChat] = useState([]);
    const [moreInfoCounter, setMoreInfoCounter] = useState(5);
    const [doctorCounter, setDoctorCounter] = useState(0);
    const [msgHeader, setMsgHeader] = useState(false);
    const [posting, setPosting] = useState(false);
    const [commentHeader, setCommentHeader] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentId, setCommentId] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(null);

    const [showAnimation1, setShowAnimation1] = useState(false);
    const [showAnimation2, setShowAnimation2] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [editPost, setEditPost] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false)
    const [text, setText] = useState('');
    const MAX_CHAR_COUNT = 250;
    const [remainingChars, setRemainingChars] = useState(MAX_CHAR_COUNT);
    const [showArrow, setShowArrow] = useState(false);
    const [spinner, setSpinner] = useState(true);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    const msgAreaRef = useRef(null);
    const commentRef = useRef(null);
    const userNameRef = useRef(null);
    const timeoutRef = useRef(null);
    const listRef = useRef(null);
    const formMsgRef = useRef(null);
    const modalRef = useRef(null);
    const timeoutIdRef = useRef(null);

    let userName = 'Patient';
    let personName = 'Dr.'

    if (username) userName = username;
    if (personData.hasOwnProperty('name')) personName = personData.name.split(' ')[0]; // create Doctor username for chat

    useEffect(() => {
        setPersonData((state) => ({ ...state, ...data }));
        (async () => {
            try {
                await checkLikes(data, userId);
            } catch (error) {
                console.log();
                setLiked(true);
            }
        })();

        return (() => {
            setPersonData({});
            setLiked(false);
        });
    }, [data])

    useEffect(() => {
        if (comments.length == 0) {
            setShowAnimation1(true);
        }
        else {
            setShowAnimation1(false);
            setShowAnimation2(false);
        }
    }, [comments]);


    const focusLastItem = () => {
        if (listRef.current) {
            const listItems = listRef.current.children;
            if (listItems.length > 0) {
                // console.log('focus');
                listItems[listItems.length - 1].focus();
                listItems[listItems.length - 1].scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }
    };

    const handleMouseEnter = (commentId) => {
        clearTimeout(timeoutRef.current);
        setSelectedCommentId(commentId);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setSelectedCommentId(null);
            // console.log('out');
        }, 30000);
    };

    // focus last or first item on sorting comments
    function sortHandler(e) {
        e.preventDefault();
        const command = e.target.id;
        let result = [];
        // console.log(e.target.id);
        switch (command) {
            case "most-liked": result = comments.sort((a, b) => a.Likes - b.Likes); break;
            case "most-disliked": result = comments.sort((a, b) => a.Dislikes - b.Dislikes); break;
            case "most-recent": result = comments.sort((a, b) => a._createdOn - b._createdOn); break;
        }
        // console.log(result);
        setComments(result.slice());
    }

    useEffect(() => {
        focusLastItem();
    }, [comments]);

    // loading all comments
    const loadComments = async () => {
        try {
            const data = await commentsService.loadComments(personData._id);
            if (data.length > 0) {

                // console.log(data);
                const addLikesDislikes = await Promise.all(data.map(async (comment) => {
                    const likesData = await request.get(`${url.LIKES}?where=postId%3D%22${comment.postId}%22&count`);
                    const dislikesData = await request.get(`${url.DISLIKES}?where=postId%3D%22${comment.postId}%22&count`);
                    // console.log('liked--->', likesData);
                    // console.log('disliked--->', dislikesData);
                    return {
                        ...comment,
                        Likes: likesData,
                        Dislikes: dislikesData,
                    };
                }));
                setComments(addLikesDislikes);
            } else {
                await utils.delay(50);
                setShowAnimation1(true);
            }

        } catch (error) {
            showErrorToast(`Error loading comments: ${error}`, { toastId: 'commenstError' });
        }
    };


    /*---------- TABS HANDLER ---------*/

    const handleTabClick = (tabId) => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }

        if (tabId == 'message') {
            setMsgHeader(true);
            setCommentHeader(false);
            setDoctorCounter(0);
            setPosting(false);
            setShowArrow(false)
            setTimeout(() => {
                if (msgAreaRef.current) {
                    msgAreaRef.current.focus();
                }
            }, 100);
        } else if (tabId == 'comments') {
            setEditPost(false);
            userNameRef.current.value = '';
            setRemainingChars(MAX_CHAR_COUNT);
            setText('');

            loadComments();

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
        };
        userNameRef.current.value = '';
        commentRef.current.value = '';

    };

    /* ---------------- COMMENTS HANDLER ----------------- */

    async function commentHandler(e) {
        try {
            e.preventDefault();
            const btnText = e.target.innerText.split('\n')[2];
            // console.log(btnText);
            const userName = userNameRef.current.value;
            const validatePost = commentsService.commentValidator(userName, text);
            if (isAuthenticated) {

                if (btnText.includes('Edit')) {
                    if (validatePost) {
                        const index = comments.findIndex(x => x._id == commentId);
                        const edited = comments.slice();
                        edited[index].comment = text;
                        // setComments((prevComments) => ([...prevComments, edited]));
                        commentsService.editComment(commentId, edited);
                        setEditPost(false);
                        userNameRef.current.value = '';
                        setText('');
                        setRemainingChars(MAX_CHAR_COUNT);
                    }

                    showSuccessToast('Comment Edited Successfully!', { toastId: 'editSuccess' });
                    return;
                } else {

                    if (validatePost) {
                        const comment = text;
                        userNameRef.current.value = '';
                        setText('');
                        setRemainingChars(MAX_CHAR_COUNT);
                        // commentRef.current.value = '';
                        if (comments.length === 0) {
                            setShowAnimation1(false);
                            setShowAnimation2(true);

                            await utils.delay(3000);
                            setShowAnimation2(false);
                        }
                        const date = utils.getCurrentDate();
                        const getNewId = utils.generateUID();
                        const personId = personData._id;

                        const newComment = commentsService.createNewComment(userName, comment, date, getNewId, personId, userId);
                        const postData = await commentsService.uploadComment(newComment);

                        setComments((prevComments) => ([...prevComments, postData]));

                    }
                }
            } else {
                showErrorToast('You are not logged in!', { toastId: 'notLogged' });
                return;
            }
        } catch (error) {
            showErrorToast(error.message, { toastId: error.message })
        }

    }


    /* ----------- EDIT AND DELETE COMMENTS --------------- */

    const editPostHandler = (event, commentId, userName, comment) => {
        userNameRef.current.value = userName;
        setText(comment);
        setEditPost(true);
        setCommentId(commentId);
        setRemainingChars(MAX_CHAR_COUNT - comment.length)
        clearTimeout(timeoutRef.current);
        setSelectedCommentId(null);
    };

    const deletePostHandler = async (event, commentId) => {
        try {
            const deletePost = await commentsService.deleteComment(commentId);
            const edited = comments.filter(x => x._id !== commentId);
            setComments(edited);
            showSuccessToast('Delete completed', { toastId: 'deleteSuccess' });

        } catch (error) {
            throw showErrorToast(error.message, { toastId: 'deleteComment' });
        }
    };


    /*------------- LIKES AND DISLIKES HANDLER ---------------- */

    async function likesHandle(event, postId) {
        if (event.target.textContent.trim() === 'Like:') {
            try {
                const getLikedPost = await request.get(`${url.LIKES}?where=postId%3D%22${postId}%22&select=userId%3D%22${userId}%22`)
                // console.log(getLikedPost);

                if (getLikedPost.length > 0) {
                    // console.log('enter');
                    const entryId = getLikedPost[0]._id;
                    await request.remove(`${url.LIKES}/${entryId}`);
                    setComments(prevComments =>
                        prevComments.map(comment => {
                            if (comment.postId === postId) {
                                if (comment.dislikedByUser) {
                                    return {
                                        ...comment,
                                        Dislikes: Math.max(comment.Dislikes - 1, 0),
                                        dislikedByUser: false
                                    };
                                }

                                if (comment.likedByUser) {
                                    return {
                                        ...comment,
                                        Likes: Math.max(comment.Likes - 1, 0),
                                        likedByUser: false,
                                    };
                                }
                            }

                            return comment;
                        })
                    );
                    // return;

                } else {
                    const newLike = {
                        postId,
                        userId,
                        likedByUser: true,
                        dislikedByUser: false
                    }

                    const likePost = await request.post(url.LIKES, newLike);
                    // const getDisLikes = await request.get(`${url.DISLIKES}?where=userId%3D%22${userId}%22`);
                    const getDislikedPost = await request.get(`${url.DISLIKES}?where=postId%3D%22${postId}%22&select=userId%3D%22${userId}%22`);
                    // const getDislikedPost = getDisLikes.filter((x) => x.postId === postId);
                    if (getDislikedPost.length > 0) {
                        const entryId = getDislikedPost[0]._id;
                        const deleteEntry = await request.remove(`${url.DISLIKES}/${entryId}`);
                        // console.log(deleteEntry);
                    }
                    setComments(prevComments =>
                        prevComments.map(comment => {
                            if (comment.postId === postId) {
                                if (!comment.likedByUser && !comment.dislikedByUser) {
                                    return {
                                        ...comment,
                                        Likes: comment.Likes + 1,
                                        likedByUser: true
                                    };
                                }

                                if (comment.likedByUser) {
                                    return {
                                        ...comment,
                                        Likes: Math.max(comment.Likes - 1, 0),
                                        likedByUser: false
                                    };
                                }

                                if (comment.dislikedByUser) {
                                    return {
                                        ...comment,
                                        Likes: comment.Likes + 1,
                                        Dislikes: Math.max(comment.Dislikes - 1, 0),
                                        likedByUser: true,
                                        dislikedByUser: false
                                    };
                                }
                            }
                            // console.log(comment._id);
                            // request.patch(`${url.COMMENTS}/${comment._id}`, comment);
                            return comment;
                        })
                    );

                }
            } catch (error) {
                showErrorToast(error.message, { toastId: 'errorLike' })
            }


        } else {

            try {
                const getDislikedPost = await request.get(`${url.DISLIKES}?where=postId%3D%22${postId}%22&select=userId%3D%22${userId}%22`);
                // const getDislikedPost = getDisLikes.filter((x) => x.postId === postId);
                if (getDislikedPost.length > 0) {
                    // console.log(getDislikedPost);
                    const entryId = getDislikedPost[0]._id;
                    // console.log(entryId);
                    await request.remove(`${url.DISLIKES}/${entryId}`);
                    setComments(prevComments =>
                        prevComments.map(comment => {
                            if (comment.postId === postId) {
                                if (comment.dislikedByUser) {
                                    return {
                                        ...comment,
                                        Dislikes: Math.max(comment.Dislikes - 1, 0),
                                        dislikedByUser: false
                                    };
                                }

                                if (comment.likedByUser) {
                                    return {
                                        ...comment,
                                        Likes: Math.max(comment.Likes - 1, 0),
                                        likedByUser: false,
                                    };
                                }
                            }
                            return comment;
                        })
                    );
                    // return;

                } else {
                    const newDislike = {
                        postId,
                        userId,
                        dislikedByUser: true,
                        likedByUser: false
                    }

                    const dislikePost = await request.post(url.DISLIKES, newDislike);
                    const getLikedPost = await request.get(`${url.LIKES}?where=postId%3D%22${postId}%22&select=userId%3D%22${userId}%22`);
                    // console.log(getLikedPost);
                    if (getLikedPost.length > 0) {
                        const entryId = getLikedPost[0]._id;
                        const deleteEntry = await request.remove(`${url.LIKES}/${entryId}`);
                    }
                    setComments(prevComments =>
                        prevComments.map(comment => {
                            if (comment.postId === postId) {
                                if (!comment.likedByUser && !comment.dislikedByUser) {
                                    return {
                                        ...comment,
                                        Dislikes: comment.Dislikes + 1,
                                        dislikedByUser: true
                                    };
                                }

                                if (comment.dislikedByUser) {
                                    return {
                                        ...comment,
                                        Dislikes: Math.max(comment.Dislikes - 1, 0),
                                        dislikedByUser: false
                                    };
                                }

                                if (comment.likedByUser) {
                                    return {
                                        ...comment,
                                        Likes: Math.max(comment.Likes - 1, 0),
                                        Dislikes: comment.Dislikes + 1,
                                        likedByUser: false,
                                        dislikedByUser: true
                                    };
                                }
                            }
                            return comment;
                        })
                    );
                }
            } catch (error) {
                showErrorToast(error.message, { toastId: 'errorDisLike' })
            }

        }

        loadComments();

    }

    /*----------- INITIATE NEW CHAT ---------------- */
    function initiateChat() {
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
            utils.playSound(receiveSound);
            setDoctorCounter((state) => state + 1);
            setLoading(false);
            setLoadingMessage(null);
        }, 2200);
    }


    function userChatMsg(e) {
        e.preventDefault();
        setPosting(true);
        if (isAuthenticated) {
            let textarea = e.target.value || e.target.elements.msgArea.value;
            const name = userName;
            const msg = textarea.trim();
            if (msg === '') {
                showErrorToast('Message cannot be empty!', { toastId: "messageError" });
                setPosting(false);
                return;
            }
            // console.log(msg);
            const newMsg = {
                name: name,
                message: msg,
                user: 'user'
            }

            setChat([...chat, newMsg]);
            utils.playSound(sendSound);
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
        // console.log(doctorCounter);

        const newMsg = {
            name: personName,
            message: response,
            user: 'doctor'
        }

        setLoading(true);
        setLoadingMessage({ name: personName, message: '', user: 'doctor' });

        timeoutIdRef.current = setTimeout(() => {
            setChat((chat) => [...chat, newMsg]);
            utils.playSound(receiveSound);
            setDoctorCounter((state) => state + 1);
            setLoading(false);
            setLoadingMessage(null);
            setPosting(false);
            utils.delay(1000);
            if (doctorCounter == 2 && response.includes('appointment')) {
                // console.log('enter');
                setShowArrow(true);
            }
            if (doctorCounter >= 3) {
                setShowArrow(false);
            }
            setTimeout(() => {
                if (msgAreaRef.current) {
                    msgAreaRef.current.focus();
                }
            }, 100);
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

        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }
        // setPersonData({});
        setActiveTab('about');
        setMsgHeader(false);
        setCommentHeader(false);
        setDoctorCounter(0);
        setMoreInfoCounter(5);
        setComments([]);
        setPosting(false);
        setEditPost(false);
        setShowArrow(false);
        setRemainingChars(MAX_CHAR_COUNT)
        setText('');
        userNameRef.current.value = '';

    };

    const handleMessageChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        setRemainingChars(MAX_CHAR_COUNT - newText.length);

    };

    const navigateHandler = (path) => {
        clearForm();
        navigate(`/${path}`);
    }


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


    const favoritesHandler = async (data) => {
        console.log(data);

        try {
            if (await checkLikes(data, userId)) {
                const addLike = await request.post(url.FAVORITES, data);
                setLiked(true);
                showSuccessToast('User added to your favorite list.', { toasId: 'succesFavorites' })
            }
        } catch (error) {
            showErrorToast(error.message, { toastId: 'errorFavorites' });
            return;
        }
    }

    return (
        <>
            {personData && (
                <div className="modal fade" ref={modalRef} id="contactInfoModal" tabIndex="-1" aria-labelledby="contactInfoModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            {msgHeader && (
                                <div className="message-section modal-header with-form">
                                    <div className="image-section">
                                        <div className="image-wrapper">
                                            <img src={personData.imageUrl} alt=""></img>
                                        </div>
                                        <p className='person-name'>{personData.name}&nbsp;{personData.title}</p>
                                        <p className='person-department'>{personData.department}</p>
                                        <div className='left-btn-container'>
                                            <button onClick={() => favoritesHandler(personData)} type="button" className="btn btn-primary btn-sm add-to-favorities" disabled={liked}>{liked ? 'Already added' : 'Add to favorites'}</button>
                                            <button onClick={() => navigateHandler('Appointment')} type="button" data-bs-dismiss="modal" className={`btn btn-primary btn-sm appointment ${showArrow ? 'pressed' : ''}`}>Appointment</button>
                                            {showArrow && <div className='arrow-wrapper'>
                                                <img src="../../../../public/img/arrow.gif" alt="" />
                                            </div>}
                                        </div>
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
                                        <button type="button" id="btnClose" onClick={clearForm} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                            <button onClick={() => favoritesHandler(personData)} type="button" className="btn btn-primary btn-sm add-to-favorities" disabled={liked}>{liked ? 'Already added' : 'Add to favorites'}</button>
                                            <button onClick={() => navigateHandler('Appointment')} type="button" className="btn btn-primary btn-sm appointment" data-bs-dismiss="modal">Appointment</button>
                                        </div>

                                        <div className="comments-wrapper">
                                            <div className='displayComments'>
                                                <ul className='comments-list' ref={listRef}>
                                                    {showAnimation1 && (
                                                        // <li className='no-comments wave-text'>NO COMMENTS YET</li>
                                                        <li className='no-comments wave-text'><span>N</span><span>O</span>  <span>C</span><span>O</span><span>M</span><span>M</span><span>E</span><span>N</span><span>T</span><span>S</span> <span>Y</span><span>E</span><span>T</span></li>
                                                    )}

                                                    {showAnimation2 && (
                                                        <li className='no-comments wave-text explosion-text'><span>N</span><span>O</span>  <span>C</span><span>O</span><span>M</span><span>M</span><span>E</span><span>N</span><span>T</span><span>S</span> <span>Y</span><span>E</span><span>T</span></li>
                                                    )}

                                                    {comments.length > 0 && !showAnimation1 && !showAnimation2 && comments.map(data => (
                                                        <li className='comments-row' key={data._id} id={data._id}>

                                                            <span className='userName'>{data.userName} wrote:</span>
                                                            <span id={data.postId} className='userComment' onMouseOver={() => handleMouseEnter(data.postId)} onMouseLeave={handleMouseLeave}>
                                                                {data.comment}
                                                            </span>
                                                            <span className='like-comment'><button onClick={() => likesHandle(event, data.postId)} className=' btn-like'>Like: <i className="fas fa-thumbs-up"></i></button><span>{data.Likes}</span></span>
                                                            <span className='dislike-comment'><button onClick={() => likesHandle(event, data.postId)} className=' btn-dislike'>Dislike: <i className="fas fa-thumbs-down"></i></button><span>{data.Dislikes}</span></span>
                                                            <div className='comments-footer'>
                                                                <span className='timeStamp'>{data.date} | {data.hour}</span>
                                                                {data._ownerId === userId && selectedCommentId === data.postId && !editPost && (
                                                                    <>
                                                                        <span className='btn-wrapper'>
                                                                            <button className='edit-btn' onClick={() => editPostHandler(event, data._id, data.userName, data.comment)}>Edit</button>
                                                                            <button className='delete-btn'
                                                                                onClick={() => setShowConfirm(true)}
                                                                            >Delete</button>
                                                                        </span>
                                                                        {showConfirm && <ConfirmToast
                                                                            asModal='true'
                                                                            className='custom-confirm-toast-theme'
                                                                            position='top-center'
                                                                            buttonNoText='No'
                                                                            buttonYesText='Yes'
                                                                            customFunction={() => deletePostHandler(event, data._id)}
                                                                            setShowConfirmToast={setShowConfirm}
                                                                            showConfirmToast={showConfirm}
                                                                            // theme='light'
                                                                            toastText='Are you sure?'
                                                                        />}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>
                                            <div className='sort-btn-wrapper'>
                                                <button className='btn  btn-sm' id="most-liked" onClick={sortHandler}>Most liked</button>
                                                <button className='btn  btn-sm' id="most-disliked" onClick={sortHandler}>Most Disliked</button>
                                                <button className='btn  btn-sm' id="most-recent" onClick={sortHandler}>Most Recent</button>
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
                                                <button onClick={() => favoritesHandler(personData)} type="button" className="btn btn-primary btn-sm add-to-favorities" disabled={liked}>{liked ? 'Already added' : 'Add to favorites'}</button>
                                                <button onClick={() => navigateHandler('Appointment')} type="button" data-bs-dismiss="modal" className="btn btn-primary btn-sm add-to-favorities">Make Appointment</button>
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
                                            onClick={() => { handleTabClick('message'); initiateChat() }}
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
                                            <p>You can send me a message. I`ll respond ASAP.</p>
                                            <form ref={formMsgRef} className='msgForm' onSubmit={userChatMsg}>
                                                <textarea ref={msgAreaRef} className="msgArea" name="msgArea" id="msgArea" disabled={posting} cols="40" rows="5" onKeyPress={() => submitOnEnter(event)}></textarea>
                                                <button type="btn btn-submit" className='btn  btn-primary' disabled={posting}>Send</button>
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
                                                    <label htmlFor="userName" >*Username:</label>
                                                    <input ref={userNameRef} disabled={editPost} style={editPost ? { 'backgroundColor': 'lightgrey' } : { 'backgroundColor': 'white' }} type="text" className="userName" name='userName' id="userName"></input>
                                                </div>

                                                <textarea
                                                    ref={commentRef}
                                                    name="commentArea"
                                                    id="commentArea" cols="40" rows="5"
                                                    placeholder="Enter your message..."
                                                    value={text}
                                                    maxLength={MAX_CHAR_COUNT}
                                                    onChange={handleMessageChange}>
                                                </textarea>
                                                <div>Max chars: {remainingChars}</div>
                                                <button type="btn submit" className='btn  btn-primary'>{editPost ? 'Edit' : 'Post'}</button>
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


