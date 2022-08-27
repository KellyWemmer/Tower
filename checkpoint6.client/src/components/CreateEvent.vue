<template>
    <div class="event-form container-fluid">
        <form @submit.prevent="handleSubmit">
            <h3>Post an Event</h3>             
            <div>
                <label class="form-label col-4" for="name">Name</label>
                <input class="form-control" type="text" minlength="3" id="name" name="name" v-model="editable.name">
            </div>
            <div>
                <label class="form-label" for="description">Description</label>
                <input class="form-control" type="text" minlength="3" id="description" name="description" v-model="editable.description">
            </div>
            <div>
                <label class="form-label" for="coverImg">Image</label>
                <input class="form-control" type="text" id="coverImg" name="coverImg" v-model="editable.coverImg"> 
            </div>
            <div>
                <label class="form-label" for="location">Location</label>
                <input class="form-control" type="text" id="location" name="location" v-model="editable.location"> 
            </div>
            <div>
                <label class="form-label" for="capacity">Capacity</label>
                <input class="form-control" type="number" id="capacity" name="capacity" v-model="editable.capacity"> 
            </div>
            <div>
                <label class="form-label" for="start-date">Start Date</label>
                <input class="form-control" type="date" id="date" name="date" v-model="editable.date"> 
            </div>
            <select class="form-select m-2" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
            </select>            
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({})
        return {
            editable,
            async handleSubmit() {
                try {
                  logger.log('creating event', editable.value)
                  await eventsService.createEvent(editable.value)
                  Pop.toast("Event has been created!")
                } catch (error) {
                  logger.error(error)
                  Pop.error(error)
                }
            }
        };
    },
};
</script>

<style>
</style>