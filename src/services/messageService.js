import apiUtil from '../utils/api';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
};

export default {
    async getAllChatRooms () {
        try {
            const response = await apiUtil.get(buildUrl('/chat_room'));
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    },
    async getOne(idChatRoom) {
        try {
            const response = await apiUtil.get(buildUrl(`/chat_room/${idChatRoom}`));
            return response.data;
        } catch(err) {
            console.log(err);
        }
    },
    async create (newChatRoom) {
        const response = await apiUtil.post(buildUrl('/chat_room'), newChatRoom);
        return response.data;
    },
    async updateCompletionStatus (idChatRoom, isCompleted) {
        const response = await apiUtil.update(buildUrl(`/chat_room/${idChatRoom}`),
            isCompleted,
        );
        return response.data;
    }
}