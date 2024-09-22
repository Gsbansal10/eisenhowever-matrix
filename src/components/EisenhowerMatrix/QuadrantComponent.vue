<template>
    <div :class="bgColor" class="quadrant">
        <h3 class="mt-2 px-4 text-base font-bold text-gray-600 md:hidden">
            {{ title }}
        </h3>
        <TaskSortingControls
            :initial-sort-by="sortBy"
            :initial-sort-order="sortOrder"
            @update:sortBy="sortBy = $event"
            @update:sortOrder="sortOrder = $event"
        />
        <AddTaskButton :quadrant="quadrant" />
        <div>
            <TaskList
                :quadrant="quadrant"
                :sortBy="sortBy"
                :sortOrder="sortOrder"
                class="tasklist"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import TaskList from "./TaskList.vue";
import AddTaskButton from "./AddTaskButton.vue";
import TaskSortingControls from "./TaskSortingControls.vue";

defineProps({
    title: String,
    bgColor: String,
    quadrant: String,
});

const sortBy = ref("dateCreated");
const sortOrder = ref("desc");
</script>

<style scoped>
.quadrant {
    max-height: 400px;
    /* min-height: 300px; */
    overflow-y: auto;
}

.tasklist {
    max-height: 300px;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overflow-y: scroll;
    /* padding-bottom: 30px; */
}
</style>
