import { FAVORITES } from "../const/const";
import * as request from "../lib/request";


export const checkLikes = async (data, userId) => {
    try {
        const id = data._id;
        data.liked_id = id;
        const checkLikes = await request.get(`${FAVORITES}?where=liked_id%3D%22${id}%22&select=_ownerId%3D%22${userId}%22`);
        if (checkLikes.length > 0) {
           throw new Error('User already added!');
        } else {
            return true;
        }
    } catch (error) {
        throw error;
    }
}