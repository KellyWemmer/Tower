<template>
    <div class="car-form container-fluid">
        <form>
            <h3>Post an Event</h3>
            <div>
                <div>
                    <label class="form-label" for="name">Name</label>
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
                <select class="form-select" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="concert">One</option>
                    <option value="convention">Two</option>
                    <option value="sport">Three</option>
                    <option value="digital">Three</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    setup() {
        return {};
    },
};
</script>

<style>
</style>