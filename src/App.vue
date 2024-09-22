<template>
    <div class="app-container mx-auto mt-2">
        <!-- <button
            class="rounded-md bg-red-500 p-2 text-white hover:bg-red-400 active:bg-red-700 my-2"
            @click="deleteAllTasks"
        >
            Delete All Tasks
        </button> -->

        <div
            class="s mx-auto grid max-h-[calc(100vh-40px)] max-w-[800px] grid-cols-1 gap-1 md:grid-cols-[30px_1fr_1fr]"
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
            <div
                class="quadrant-container grid grid-cols-1 gap-1 sm:col-span-2 sm:col-start-2 sm:row-span-2 sm:row-start-2 sm:grid-cols-2"
            >
                <!-- 1. Urgent & Important -->
                <QuadrantComponent
                    title="Urgent & Important"
                    bgColor="bg-red-100 bg-opacity-50 border-red-600 border rounded-[20px] sm:rounded-none sm:rounded-tl-[20px] overflow-hidden"
                    class="red"
                    quadrant="one"
                />
                <!-- 2. Not Urgent & Important -->
                <QuadrantComponent
                    title="Important but Not Urgent"
                    bgColor="bg-green-100 bg-opacity-50 border-green-600 border rounded-[20px] sm:rounded-none sm:rounded-tr-[20px] overflow-hidden"
                    class="blue"
                    quadrant="two"
                />
                <!-- 3. Urgent & Not Important -->
                <QuadrantComponent
                    title="Urgent but Not Important"
                    bgColor="bg-yellow-100 bg-opacity-50 border-yellow-600 border rounded-[20px] sm:rounded-none sm:rounded-bl-[20px] overflow-hidden"
                    class="green"
                    quadrant="three"
                />
                <!-- 4. Not Urgent & Not Important -->
                <QuadrantComponent
                    title="Not Urgent & Not Important"
                    bgColor="bg-gray-100 bg-opacity-50 border-gray-600 border rounded-[20px] sm:rounded-none sm:rounded-br-[20px] overflow-hidden"
                    class="golden"
                    quadrant="four"
                />
            </div>
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

.quadrant {
    background-size: cover;
    /* background-position: calc(-30px) calc(-30px); */
    background-repeat: no-repeat;
    position: relative; /* Establish a positioning context */
}

.quadrant::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: inherit; /* Use the same background image */
    background-color: inherit; /* Use the same background color */
    background-size: inherit; /* Use the same background size */
    background-position: inherit; /* Use the same background position */
    background-repeat: inherit; /* Use the same background repeat */
    filter: blur(10px); /*Apply blur effect to the background image*/
    z-index: 0; /* Send the blurred background behind the content */
}

.quadrant > * {
    position: relative; /* Ensure foreground content is above the blurred background */
    z-index: 1; /* Bring the content above the blurred background */
}

/* .red {
    background-image: url("./assets/red.jpeg");
}

.blue {
    background-image: url("./assets/blue.jpeg");
}

.green {
    background-image: url("./assets/green.jpeg");
}

.golden {
    background-image: url("./assets/golden.jpeg");
} */

.aspect-square {
    aspect-ratio: 1/1;
    overflow: hidden;
}
</style>
