<template>
  <div class="container-fluid home-page">
    <div>
      <CreateEvent/>
    </div>
    

    <div class="row categories d-flex justify-content-center pt-3 pb-3">    
      <div class="col-2 btn btn-outline-dark rounded-pill" @click="filterTerm = ''">All</div>
      <div class="col-2 btn btn-outline-dark rounded-pill" @click="filterTerm = 'concert'">Concert</div>
      <div class="col-2 btn btn-outline-dark rounded-pill" @click="filterTerm = 'convention'">Convention</div>
      <div class="col-2 btn btn-outline-dark rounded-pill" @click="filterTerm = 'sport'">Sport</div>
      <div class="col-2 btn btn-outline-dark rounded-pill" @click="filterTerm = 'digital'">Digital</div>      
    </div>
    
    <div class="row events masonry bg-dark">
      <div class="col-2" v-for="e in events" :key="e.id">
        <EventCard :event="e"/>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import EventCard from '../components/EventCard.vue';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';
import CreateEvent from '../components/CreateEvent.vue';

export default {
    name: "Home",

    setup() {
      const filterTerm = ref('')
      async function getEvents() {
        try {
          await eventsService.getAll();
        } catch (error) {
          Pop.error
        }
      }

      onMounted(() => {
        getEvents();
        
      })
      return {
        filterTerm,
        events: computed(() => AppState.events.filter(e => filterTerm.value ? e.type == filterTerm.value : true))
        
      };
    },
    components: { EventCard, CreateEvent }
};
</script>

<style>
.cover-img{
  height: 300px;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  display: grid;
  place-content: center;
  color: aliceblue;
  background-image: v-bind(cover);
}
</style>