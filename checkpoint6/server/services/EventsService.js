import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {

    async getAll() {
        const events = await dbContext.Events.find().populate('creator', 'name picture')
        return events
    }
    async getByEventId(id) {
        const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest('no event by that id')
        }
        return event
    }

    async create(body) {
        const event = await dbContext.Events.create(body)
        await event.populate('creator', 'name picture')
        return event
    }
    async editEvent(eventId, eventData) {
        let event = await this.getByEventId(eventId)
        
        if (event.isCanceled) {
            throw new BadRequest("this event is already cancelled")
        }

        event.name = eventData.name || event.name
        event.description = eventData.description || event.description
        event.coverImg = eventData.coverImg || event.coverImg
        event.location = eventData.location || event.location
        event.capacity = eventData.capacity || event.capacity
        event.startDate = eventData.startDate || event.startDate
        event.type = eventData.type || event.type        

        await event.save()
        return event
    }
    async archiveEvent(eventId, userId) {//Params need to match in service!!!
        const event = await this.getByEventId(eventId)

        // @ts-ignore
        if (event.creatorId.toString() != userId) {
            throw new Forbidden("You don't have permission to cancel this")
        }

        event.isCanceled = true
        await event.save()
        return `event ${event.name} was cancelled!`
    }

    async getCurrentCapacity() {
        
    }
}
export const eventsService = new EventsService