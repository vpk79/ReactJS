import * as request from '../lib/request'
import * as url from '../const/const'

export async function uploadComment(comment) {

    try {
        const data = await request.post(`${url.COMMENTS}`, comment );
        return data;
    } catch (error) {
        throw new Error(error.message);
    }

}

export async function editComment(commentId, comment){
    try {
        const data = await request.patch(`${url.COMMENTS}/${commentId}`,);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteComment(commentId) {
    try {
        console.log(commentId);
        const data = await request.remove(`${url.COMMENTS}/${commentId}`);
        
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const loadComments = async (personId) => {
    try {
        let data = await request.get(`${url.COMMENTS}`);
        const getPersonObject = data.filter(x => x.personId == personId);
        return getPersonObject;
    } catch (error) {
        throw new Error(error.message);
    }
}


export function commentValidator(userName, comment) {
    if (userName == '') {
        throw new Error('Username is required!')
    }
    if (comment == '') {
        throw new Error('Comment must not be empty!')
    }

    return true;
}

export function createNewComment(userName, comment, date, postId, personId, userId) {

    return {
        postId: postId,
        personId,
        userId,
        userName,
        comment,
        Likes: 0,
        Dislikes: 0,
        likedByUser: false,
        dislikedByUser: false,
        date: date.formattedDate,
        hour: date.formattedTime,
    }
}