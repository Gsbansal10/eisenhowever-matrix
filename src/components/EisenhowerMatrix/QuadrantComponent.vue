<template>
    <div :class="bgColor" class="quadrant">
        <h3 class="mt-2 px-4 text-base font-bold text-gray-600 md:hidden">
            {{ title }}
        </h3>
        <div
            class="flex items-center justify-between border-b border-gray-400 bg-slate-200 bg-opacity-50 px-4 py-2 text-gray-500"
        >
            <TaskSortingControls
                :initial-sort-by="sortBy"
                :initial-sort-order="sortOrder"
                @update:sortBy="sortBy = $event"
                @update:sortOrder="sortOrder = $event"
            />
            <AddTaskButton
                :quadrant="quadrant"
                @openTaskForm="isTaskFormOpen = true"
            />
        </div>
        <div>
            <transition name="fade">
                <TaskForm
                    v-if="isTaskFormOpen"
                    @close="closeTaskForm"
                    @add-task="addTask"
                    :quadrant="quadrant"
                />
            </transition>
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
import TaskForm from "./TaskForm.vue";

defineProps({
    title: String,
    bgColor: String,
    quadrant: String,
});

const isTaskFormOpen = ref(false);

const closeTaskForm = () => {
    isTaskFormOpen.value = false;
};

const addTask = (task) => {
    console.log("Task added:", task);
};
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
