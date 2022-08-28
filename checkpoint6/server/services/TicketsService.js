import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"
class TicketsService{
  async getByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile','name picture').populate('event')
    return tickets
  }
  async create(body) {
    const tEvent = await dbContext.Events.findById(body.eventId)
    // @ts-ignore
    if (tEvent.capacity <= 0) {
      throw new BadRequest('Event is sold out')
    }
    const ticket = await dbContext.Tickets.create(body)
    await ticket.populate('event')
    await ticket.populate('profile', 'name picture')
    // @ts-ignore
    tEvent.capacity -=1
    // @ts-ignore
    await tEvent.save()
    return ticket
  }
  async getByAccountId(accountId) {
    let tickets = await dbContext.Tickets.find({accountId: accountId}).populate('event')
    return tickets
  }
  async remove(id, userId) {
    const ticket = await dbContext.Tickets.findById(id)
    if(!ticket){
      throw new BadRequest('No ticket by that ID')
    }
      const tEvent = await eventsService.getByEventId(ticket.eventId)


      // @ts-ignore
      if(ticket.accountId.toString() != userId){
        throw new Forbidden('You cannot remove that')
      }
      
      // @ts-ignore
      tEvent.capacity += 1
      // @ts-ignore
      await tEvent.save()
       await ticket.remove()
      return 'ticket removed'
  }
}
export const ticketsService = new TicketsService()