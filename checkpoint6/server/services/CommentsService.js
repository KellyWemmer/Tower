import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors.js"
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

    async remove(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        // @ts-ignore
        if(comment.creatorId.toString() != userId) {
            throw new Forbidden("You don't have permission to edit that")
        }
        // @ts-ignore
        await comment.remove()
        return comment        
    }
}
export const commentsService = new CommentsService()