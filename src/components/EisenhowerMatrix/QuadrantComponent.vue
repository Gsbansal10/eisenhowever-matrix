<template>
    <div :class="bgColor" class="quadrant-component quadrant relative">
        <h3
            class="quadrant-title mt-2 px-4 text-base font-bold text-gray-600 md:hidden"
        >
            {{ quadrantTitle }}
        </h3>
        <div
            class="quadrant-controls sticky top-0 z-10 flex items-center justify-between bg-slate-50 bg-opacity-50 px-4 py-2 shadow-md"
            :class="{
                'border-b-[1px] border-t-4 border-red-500': quadrant === 'one',
                'border-b-[1px] border-t-4 border-green-500':
                    quadrant === 'two',
                'border-b-[1px] border-t-4 border-yellow-500':
                    quadrant === 'three',
                'border-b-[1px] border-t-4 border-gray-500':
                    quadrant === 'four',
            }"
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
        <div class="quadrant-content">
            <transition name="fade">
                <TaskForm
                    v-if="isTaskFormOpen"
                    :quadrant="quadrant"
                    @close="closeTaskForm"
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

<script setup lang="ts">
import { ref } from "vue";
import TaskList from "./TaskList.vue";
import AddTaskButton from "./AddTaskButton.vue";
import TaskSortingControls from "./TaskSortingControls.vue";
import TaskForm from "./TaskForm.vue";

defineProps({
    quadrantTitle: String,
    bgColor: String,
    quadrant: {
        type: String,
        required: true,
    },
});

const isTaskFormOpen = ref(false);
const closeTaskForm = () => {
    isTaskFormOpen.value = false;
};
const sortBy = ref("dateCreated");
const sortOrder = ref("desc");
</script>

<style scoped>
.quadrant-component {
    display: flex;
    flex-direction: column;
    height: 400px;
}

.quadrant-content {
    flex-grow: 1;
    overflow-y: auto;
}

.tasklist {
    height: 100%;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overflow-y: scroll;
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
