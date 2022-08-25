<template>
  <div class="container-fluid home-page">
    <!-- <div class="row cover-img">
      <div class="position-absolute" style="right:0">
      </div> 
      <div>
        <img src="https://unsplash.com/photos/NcdG9mK3PBY" alt="" height="120">
      </div>  
    </div> -->
    <!-- <CreateEvent/> -->

    <div class="row categories d-flex justify-content-center pt-3 pb-3">    
      <div class="col-2 btn btn-outline-dark rounded-pill">All</div>
      <div class="col-2 btn btn-outline-dark rounded-pill">Concert</div>
      <div class="col-2 btn btn-outline-dark rounded-pill">Convention</div>
      <div class="col-2 btn btn-outline-dark rounded-pill">Sport</div>
      <div class="col-2 btn btn-outline-dark rounded-pill">Digital</div>      
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
import { onMounted } from 'vue';
import { AppState } from '../AppState';
import EventCard from '../components/EventCard.vue';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';

export default {
    name: "Home",

    setup() {
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
        events: computed(() => AppState.events)
      };
    },
    components: { EventCard }
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