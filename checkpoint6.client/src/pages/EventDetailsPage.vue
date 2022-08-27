<template>
    <div class="container-fluid">
        <div class="row bg-dark">
            <div class="col-4">
                <img class="img-fluid rounded mb-3" :src="event.coverImg" alt="">
            </div>
            <!-- Throw v-if that checks event capacity -->
            <div v-if="event.capacity <= 0" class="col-8">
                <h4>{{event.name}}</h4>
                <p>{{event.description}}</p>
                <p class="text-danger"><b>Sold Out</b></p>
            </div>
            <div v-else class="col-8 description ">                
                <h4>{{event.name}}</h4>
                <p>{{event.description}}</p>
                <p>Remaining Capacity: {{event.capacity}}</p>
                <button v-if="!hasTicket" class="btn btn-secondary" @click="buyTicket">Buy Ticket</button> 
                <button v-else class="btn btn-secondary" @click="cancelTicket">Cancel Ticket</button>                
            </div>  
            <div>
                <div v-if="user.id == event.creatorId && event.isCanceled == false">
                    <button class="btn btn-danger m-3" @click="cancelEvent">Cancel Event</button>
                </div>
                <div v-if="event.isCanceled == true">
                    <h4 class="text-danger p-2">This Event Has Been Cancelled</h4>
                </div>
            </div>         
        </div>

        <div class="row">
            <div class="col-12 ticket-profile p-3">
                <img class="img-fluid elevation-2" src="https://thiscatdoesnotexist.com" alt="">
            </div>
        </div>
        <div>
            <CommentForm/>
        </div>        
        <div v-for="(c, i) in comments" :key="c.id">
            <CommentCard :comment="c"/>
        </div> 
    </div>
</template>
<script>

import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import { ticketsService} from '../services/TicketsService'
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';
import { eventsService } from '../services/EventsService';
import { onMounted, popScopeId } from 'vue';
import CommentCard from '../components/CommentCard.vue';

export default {
    setup() {
        const route = useRoute();
        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId);
            }
            catch (error) {
                logger.error(error);
                Pop.toast(error.message, "error");
            }
        }

        async function getCommentsByEventId(){
            try {
              await eventsService.getCommentsByEventId(route.params.eventId)
            } catch (error) {
              logger.error(error)
              Pop.toast(error.message, 'error')
            }
        }

        async function getTicketProfiles() {
            try {
                await ticketsService.getTicketProfilesByEvent(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        onMounted(() => {
            getEventById();
            getCommentsByEventId();
            getTicketProfiles();            
        });

        return {
            event: computed(() => AppState.activeEvent),
            comments: computed(() => AppState.comments),
            user: computed(() => AppState.user),//loads user info from AppState to local property
            hasTicket: computed(() => {
                if (AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)) {
                    return true;
                }
                return false;
            }),

            async buyTicket() {
                try {
                    let newTicket = {
                        eventId: route.params.eventId, //Needs to match in router!
                        // make sure to also send the accountId....appstate.account.......
                    };
                    logger.log("Creating new ticket", newTicket);
                    await ticketsService.create(newTicket);
                    this.event.capacity--
                }
                catch (error) {
                    logger.error(error);
                    Pop.toast(error.message, "error");
                }
            },

            async cancelTicket() {
                try {
                    let ticketToRemove = AppState.ticketProfiles.find(t => t.accountId == AppState.account.id);
                    await ticketsService.deleteTicket(ticketToRemove.id);
                }
                catch (error) {
                    logger.error(error);
                    Pop.error(error);
                }
            },

            async cancelEvent() {
                try {
                    await eventsService.cancelEvent(this.event.id)
                    this.event.isCanceled == true
                } catch (error) {
                    logger.error('cancel event', error)
                }
            }
        };
    },
    components: { CommentCard }
};
</script>
<style>

.ticket-profile img{
    border-radius: 50px;
    height: 40px;
    width: 40px;
    object-fit: cover;
    object-position: center;
};


</style>