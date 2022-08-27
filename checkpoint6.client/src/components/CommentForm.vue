<template>
    <div class="row comments p-2">
        <form @submit.prevent="handleSubmit" >
            <label class="form-label" for="comment"><b>Comment</b></label>
            <textarea class="w-75 form-control" name="body" id="body" rows="3" v-model="editable.body" style="resize:none"></textarea>
            <button class="m-3 btn btn-secondary">Submit</button>
        </form>        
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({})
        const route = useRoute()
        return {
            editable,
            async handleSubmit() {
                try {
                  editable.value.eventId = route.params.eventId
                  await commentsService.create(editable.value)
                  editable.value = {}
                  Pop.success('Comment Added')
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