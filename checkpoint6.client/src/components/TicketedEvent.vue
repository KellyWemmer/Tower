<template>
    <router-link :to="{ name: 'EventDetails', params: {eventId: event.event.id}}">
        <div class="card mt-3 mb-3" style="width: 18rem;">
            <div >
                <img class="card-img-top" :src="event.event.coverImg" alt="Card image cap">
            </div>
            <div class="card-body">
                <h5 class="card-name text-dark">{{event.event.name}}</h5>
                <!-- <a href="#" class="btn btn-primary">Event Details</a> -->
            </div>
        </div>
    </router-link>

</template>
<script>

export default {
   props: {
    event: {type: Object, required: true}
   },
    setup(props) {
        return {
            
        };
    },
};
</script>
<style>
</style>