import { dbContext } from "../db/DbContext"
class CommentsService {
    async create(commentData) {
        let eventComment = await dbContext.Comments.create(commentData)
        await eventComment.populate('user', 'name picture')
        return eventComment
    }
}

export const commentsService = new CommentsService()