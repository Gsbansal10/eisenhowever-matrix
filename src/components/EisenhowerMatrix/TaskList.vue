<template>
    <div class="flex max-h-96 flex-col overflow-y-auto">
        <TaskComponent
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @toggleCompletion="toggleTaskCompletion"
        />
       
    </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/taskStore";
import TaskComponent from "./TaskComponent.vue";
// import TaskForm from './TaskForm.vue';
import { computed } from "vue";
// import AddTaskButton from "./AddTaskButton.vue";

const props = defineProps({
    quadrant: {
        type: String,
        required: true,
    },
});

const taskStore = useTaskStore();
const tasks = computed(() => taskStore.tasksByQuadrant[props.quadrant]); // Get tasks from the store

const toggleTaskCompletion = (taskId) => {
    taskStore.toggleTaskCompletion(taskId); // Toggle task completion
};
</script>

<style scoped>
div {
    outline: none;
}
</style>
