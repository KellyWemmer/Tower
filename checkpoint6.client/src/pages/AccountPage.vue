<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />    
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 ticketed-events">
        <div v-for="t in ticketEvents" :key="t.id">
          <TicketedEvent :event="t"/> 
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import EventCard from '../components/EventCard.vue';
import { ticketsService } from '../services/TicketsService';
import TicketedEvent from '../components/TicketedEvent.vue'

export default {
    name: "Account",
    setup() {

      async function getTicketEvents() {
        try {
          await ticketsService.getTicketByAccount()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }

      onMounted(() => {
        getTicketEvents()
      })

        return {
            account: computed(() => AppState.account),
            ticketEvents: computed(() => AppState.ticketEvents)
        };
    },
    components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
