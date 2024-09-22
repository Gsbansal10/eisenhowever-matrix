<template>
    <div
        class="flex flex-col border-b-[1px] bg-blue-500 bg-opacity-10 hover:bg-opacity-20"
    >
        <p
            v-if="!isTaskFormOpen"
            class=":bg-gray-500 inline-flex items-center px-4 py-2 text-blue-700 hover:cursor-pointer hover:bg-opacity-10 hover:text-blue-700"
            @click="isTaskFormOpen = true"
        >
            <span class="mr-2 hover:text-blue-700">
                <PlusCircleIcon class="mr-2 h-5 w-5" />
            </span>
            <span class="text-blue-500 hover:text-blue-800">Add Task</span>
        </p>
        <TaskForm
            v-if="isTaskFormOpen"
            @close="closeTaskForm"
            @add-task="addTask"
            :quadrant="quadrant"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TaskForm from "./TaskForm.vue";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";

defineProps({
    quadrant: {
        type: String,
        required: true,
    },
});

const isTaskFormOpen = ref(false);

const closeTaskForm = () => {
    isTaskFormOpen.value = false;
};

const addTask = (task: { title: string; description: string }) => {
    // Here you would typically dispatch an action to add the task to your store
    console.log("Task added:", task);
    closeTaskForm();
};
</script>

<style scoped>
/* Custom minimal styles */
span {
    outline: none;
}
</style>
