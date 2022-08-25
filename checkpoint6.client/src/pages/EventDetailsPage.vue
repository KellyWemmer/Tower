<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 image-fluid">
                <img src="https://thiscatdoesnotexist.com" alt="">
            </div>
            <div class="col-8 description">
                <p>does this show up?</p>
                <button class="btn btn-secondary" @click="buyTicket">Buy Ticket</button>            
            </div>
        </div>
        <div class="row">
            <div class="col-12 ticket-profile p-3">
                <img class="img-fluid elevation-2" src="https://thiscatdoesnotexist.com" alt="">
            </div>
        </div>
        <div class="row comments p-2">
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <p>put comments here</p>
        </div>

    </div>
</template>
<script>

import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import { ticketsService} from '../services/TicketsService'
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';


export default {
    setup() {
        const route = useRoute()
        
        // async function getEventById() {
        //     try {
        //         await eventsService.getEventById(route.params.eventId)
        //     } catch (error) {
        //         logger.error(['Getting Event', error])
        //         Pop.error(error)
        //     }
        // }
        // onMounted(() => {
        //     getEventById()
        // })
        return {
            async buyTicket() {
                try {
                  let newTicket = {
                        eventId: route.params.eventId,//Needs to match in router!
                    }
                    logger.log("Creating new ticket", newTicket)
                    await ticketsService.create(newTicket)
                } catch (error) {
                  logger.error(error)
                  Pop.toast(error.message, 'error')
                }
            }
        };
    },    
};
</script>
<style>
.ticket-profile img{
    border-radius: 50px;
    height: 40px;
    object-fit: cover;
    object-position: center;
};


</style>