import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{
    async create(newComment){
        const res = await api.post('api/comments', newComment)
        logger.log('Created Comment', res.data)
        AppState.comments.push(res.data)
    }

    async deleteComment(id){
        let url = `api/comments/${id}`
        await api.delete(url)
        logger.log('deleting ID', id)
        AppState.comments = AppState.comments.filter(c => c.id != id)
    }
}
export const commentsService = new CommentsService()