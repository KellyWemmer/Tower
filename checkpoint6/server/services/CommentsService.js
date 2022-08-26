import { dbContext } from "../db/DbContext"
class CommentsService {
        
    async create(commentData) {
        const eventComment = await dbContext.Comments.create(commentData)
        await eventComment.populate('creator', 'name picture')
        return eventComment
    }

    async getAll(query = {}) {
        const comment = await dbContext.Comments.find(query).populate('creator', 'name picture')
        return comment
    }

    async remove(commentId) {
        const comment = await this.remove(commentId)
        return comment        
    }
}

export const commentsService = new CommentsService()