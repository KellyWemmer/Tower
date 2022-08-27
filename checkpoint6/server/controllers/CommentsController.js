import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService";
import { logger } from "../utils/Logger";
export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.remove)
    }

    async create(req, res, next) {
        try {
            let commentData =  req.body
            commentData.creatorId = req.userInfo.id
            let newComment = await commentsService.create(commentData)
            return res.send(newComment)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const commentId = req.params.id
            await commentsService.remove(commentId)  
            return res.send("This comment has been deleted")         
        } catch (error) {
            logger.log(error)
            next(error)
        }
    }
}