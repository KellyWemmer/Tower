import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
    async create(newTicket){
        const res = await api.post('api/tickets', newTicket)
        logger.log('Create Ticket from Service', res.data)
        AppState.ticketProfiles.push(res.data)
    }

    async getTicketProfilesByEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('Getting Ticket Profiles', res.data)
        AppState.ticketProfiles = res.data
    }

    async getTicketByAccount(){
        const res = await api.get('account/tickets')
        logger.log("Getting Ticketed Events", res.data)
        AppState.ticketEvents = res.data
    }

    async deleteTicket(id) {
        const res = await api.delete('api/tickets/' + id)
        logger.log('remove ticket', res.data)
        AppState.ticketProfiles = AppState.ticketProfiles.filter(t => t.id != id)
        // AppState.collaboratorAlbums = AppState.collaboratorAlbums.filter(c => c.id != collabId)
    }
    
}
export const ticketsService = new TicketsService()