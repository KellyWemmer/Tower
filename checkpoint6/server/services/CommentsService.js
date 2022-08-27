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
        const comment = await dbContext.Comments.findById(commentId)
        // am i the creator of this comment???
        // check the creator id against the id of the user logged in
        // @ts-ignore
        await comment.remove()
        return comment        
    }
}
export const commentsService = new CommentsService()