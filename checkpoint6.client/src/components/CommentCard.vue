<template>                                  
    <div class="card w-75 rounded m-2 container-fluid">
        <div class="card-body row">
            <div class="col-1">
                <img class="img-fluid elevation-2" :src="comment.creator.picture" alt="">
            </div>
            <div class="col=4">
                <h6 class="">{{comment.creator.name}}</h6>
            </div>            
            <p class="card-text">{{comment.body}}</p>
        </div>
        <div v-if="user.id == comment.creatorId">
            <button class="btn btn-danger" @click="deleteComment(comment)">Delete Comment</button>
        </div>
    </div>    
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    props: { comment: { type: Object, required: true}},
    setup() {
        return {
            user: computed(() => AppState.user),
            async deleteComment(comment) {
                logger.log('comment', comment)
                try {
                  const yes = await Pop.confirm('Are you sure you want to delete this?')
                  if(!yes) {return} 
                  await commentsService.deleteComment(comment.id)
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

.card-body img{
    border-radius: 50px;
    height: 40px;
    object-fit: cover;
    object-position: center;
};
</style>