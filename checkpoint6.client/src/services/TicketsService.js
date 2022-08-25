import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
    async create(newTicket){
        const res = await api.post('api/tickets', newTicket)
        logger.log('Create Ticket from Service', res.data)
        AppState.ticketProfiles.push(res.data)
    }
}
export const ticketsService = new TicketsService()