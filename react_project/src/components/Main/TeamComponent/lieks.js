import React, { useState } from 'react';

const CommentComponent = () => {
    const initialComments = [
        {
            _id: '1',
            personId: '1',
            userId: '1',
            userName: 'User1',
            comment: 'This is a comment',
            date: '2024-07-25',
            hour: '10:00',
            Likes: 0,
            Dislikes: 0
        },
        // Добавете още коментари според нуждите си
    ];

    const [comments, setComments] = useState(initialComments);

    const handleLike = (id) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment._id === id ? { ...comment, Likes: comment.Likes + 1 } : comment
            )
        );
    };

    const handleDislike = (id) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment._id === id ? { ...comment, Dislikes: comment.Dislikes + 1 } : comment
            )
        );
    };

    return (
        <ul>
            {comments.map(data => (
                <li className='comments-row' key={data._id}>
                    <span className='userName'>{data.userName} says:</span>
                    <span className='userComment'>
                        {data.comment}
                    </span>
                    <span className='like-comment'>
                        <button className='btn btn-sm btn-like' onClick={() => handleLike(data._id)}>
                            Like: <i className="fas fa-thumbs-up"></i>
                        </button>
                        <span>{data.Likes}</span>
                    </span>
                    <span className='dislike-comment'>
                        <button className='btn btn-sm btn-dislike' onClick={() => handleDislike(data._id)}>
                            Dislike: <i className="fas fa-thumbs-down"></i>
                        </button>
                        <span>{data.Dislikes}</span>
                    </span>
                    <span className='timeStamp'>{data.date} | {data.hour}</span>
                    <span className='btn-wrapper'>
                        <button className='btn edit-btn'>Edit</button>
                        <button className='btn delete-btn'>Delete</button>
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default CommentComponent;
