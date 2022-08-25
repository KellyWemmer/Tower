import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService";
export class CommentsController extends BaseController {
    constructor() {
        super('/api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
    }

    async create(req, res, next) {
        try {
            let commentData =  req.body
            commentData.userId = req.userInfo.id
            let newComment = await commentsService.create(commentData)
            return res.send(newComment)
        } catch (error) {
            next(error)
        }
    }
}