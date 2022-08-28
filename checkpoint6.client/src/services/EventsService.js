import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class EventsService {
    async getAll(){
        const res = await api.get('api/events')
        logger.log("Got events", res.data)//Successful
        AppState.events = res.data        
    }

    async createEvent(newEvent) {
        const res = await api.post('api/events', newEvent)
        logger.log('creating event from service', res.data)
        AppState.events.unshift(res.data)
        AppState.lastCreatedEvent = res.data
    }
    async getEventById(eventId){
        const res = await api.get('api/events/' + eventId)
        logger.log('Get event by Id',res.data)
        AppState.activeEvent = res.data
      }

    async getCommentsByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('Getting Comments', res.data)
        AppState.comments = res.data
    }

    async cancelEvent(eventId) {
        const res = await api.delete(`api/events/${eventId}`)
        logger.log(res)
        const index = AppState.events.findIndex(e => e.id == eventId)
        let evnt = AppState.events.find(e => e.id == eventId)
        logger.log('logging event in services', evnt)
        evnt.isCanceled = true
        AppState.events = AppState.events.splice(index, 1, evnt)
        
    }
}

export const eventsService = new EventsService()
