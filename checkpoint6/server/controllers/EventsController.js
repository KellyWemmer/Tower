import { Auth0Provider } from "@bcwdev/auth0provider"
import { eventsService } from "../services/EventsService.js"
import BaseController from "../utils/BaseController.js"
import { ticketsService } from "../services/TicketsService.js"

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:eventId', this.getByEventId)
            .get('/:eventId/tickets', this.getTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.archiveEvent)
            
    }    
    
    async getAll(req, res, next) {
        try {
            const events = await eventsService.getAll()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    
    async getByEventId(req, res, next) {
        try {
            const event = await eventsService.getByEventId(req.params.eventId)
            return res.send(event)
        } catch (error) {
            next(error)            
        }        
    }
    async getTickets(req, res, next) {
        try {
            const tickets = await ticketsService.getByEventId(req.params.eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.create(req.body)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            let eventData = req.body //is data from client, usually a form
            let event = await eventsService.editEvent(req.params.eventId, eventData)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }    
    async archiveEvent(req, res, next) {
        try {
            const message = await eventsService.archiveEvent(req.params.eventId, req.userInfo.id)//Parameters need to match in Services!!!
        return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}