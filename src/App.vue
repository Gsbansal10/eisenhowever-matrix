<template>
    <div class="mx-auto mt-10 max-w-[800px]">
        <button
            class="rounded-md bg-red-500 p-2 text-white hover:bg-red-400 active:bg-red-700"
            @click="deleteAllTasks"
        >
            Delete All Tasks
        </button>

        <div
            class="mx-auto grid max-h-[80dvh] max-w-[800px] grid-cols-1 gap-4 md:grid-cols-[30px_1fr_1fr]"
        >
            <h3
                class="col-start-2 hidden text-center text-2xl font-bold uppercase md:block"
            >
                Urgent
            </h3>
            <h3
                class="col-start-3 hidden text-center text-2xl font-bold uppercase md:block"
            >
                Not Urgent
            </h3>
            <h3
                class="vertical-text row-start-2 hidden text-center text-2xl font-bold uppercase tracking-widest md:block"
            >
                Important
            </h3>
            <h3
                class="vertical-text row-start-3 hidden cursor-vertical-text text-center text-2xl font-bold uppercase tracking-widest md:block"
            >
                Not Important
            </h3>
            <!-- 1. Urgent & Important -->
            <QuadrantComponent
                title="Urgent & Important"
                bgColor="bg-red-100 bg-opacity-50"
                class="md:col-start-2"
                quadrant="one"
            />
            <!-- 2. Not Urgent & Important -->
            <QuadrantComponent
                title="Important but Not Urgent"
                bgColor="bg-green-100 bg-opacity-50"
                quadrant="two"
            />
            <!-- 3. Urgent & Not Important -->
            <QuadrantComponent
                title="Urgent but Not Important"
                bgColor="bg-yellow-100 bg-opacity-50"
                class="md:col-start-2"
                quadrant="three"
            />
            <!-- 4. Not Urgent & Not Important -->
            <QuadrantComponent
                title="Not Urgent & Not Important"
                bgColor="bg-gray-100 bg-opacity-50"
                quadrant="four"
            />
        </div>
    </div>
</template>

<script setup>
import QuadrantComponent from "./components/EisenhowerMatrix/QuadrantComponent.vue";
import { useTaskStore } from "@/stores/taskStore";

const taskStore = useTaskStore();

const deleteAllTasks = () => {
    taskStore.deleteAllTasks(); // Call the function to delete all tasks
};
</script>

<style>
.vertical-text {
    writing-mode: vertical-rl; /* sets the text direction */
    transform: rotate(180deg);
}
</style>
