<template>                                  
    <div class="card w-75">
        <div class="card-body">
            <img class="img-fluid elevation-2" src="https://thiscatdoesnotexist.com" alt="">
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
    </div>    
</template>

<script>
export default {
    props: { comment: { type: Object, required: true}},
    setup() {
        return {};
    },
};
</script>
<style>
</style>