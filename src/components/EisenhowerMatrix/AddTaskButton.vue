<template>
    <div class="flex flex-col py-4">
        <p
            class="inline-flex items-center px-4 py-1 hover:cursor-pointer hover:bg-blue-50 hover:text-blue-700"
            @click="isTaskFormOpen = true"
        >
            <span class="hover:bg-blue-50 hover:text-blue-700 p-2">
                <PlusCircleIcon class="mr-2 h-5 w-5" />
            </span>
            <span>Add Task</span>
        </p>
        <TaskForm
            :isOpen="isTaskFormOpen"
            @close="isTaskFormOpen = false"
            :quadrant="quadrant"
        />
    </div>
</template>

<script setup>
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
</script>

<style scoped>
/* Custom minimal styles */
span {
    outline: none; /* Remove default outline */
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
