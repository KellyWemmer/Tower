import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class EventsService {
    async getAll(){
        const res = await api.get('api/events')
        logger.log("Got events", res.data)//Successful
        AppState.events = res.data        
    }

    async getEventById(eventId){
        const res = await api.get('api/events/' + eventId)
        logger.log('Get event by Id',res.data)
        AppState.activeEvent = res.data
      }
}

export const eventsService = new EventsService()
