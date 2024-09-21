<template>
    <div>
        <div
            class="group grid cursor-pointer select-none grid-cols-[20px_1fr_10px] items-center gap-x-2 border-b border-gray-200 px-4 py-1 transition duration-200 hover:bg-gray-600 hover:bg-opacity-10"
            @click="toggleCompletion"
        >
            <button
                class="mr-2 h-4 w-4 cursor-pointer rounded-full border-[1px] border-blue-500 focus:outline-none"
                :class="{ 'bg-blue-600': task.isCompleted }"
            >
                <span class="sr-only">{{
                    task.isCompleted ? "Undo" : "Complete"
                }}</span>
            </button>
            <h4
                class="cursor-pointer text-black"
                :class="{
                    'leading-4 text-gray-500 line-through': task.isCompleted,
                }"
            >
                {{ task.title }}
            </h4>
            <transition name="slide" mode="out-in">
                <p
                    v-if="task.description && !task.isCompleted"
                    class="col-start-2 text-[12px] text-gray-500"
                >
                    {{ task.description }}
                </p>
            </transition>
            <p class="align-end col-start-3 row-span-2 row-start-1 text-lg">
                ⠿
            </p>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    task: Object,
});

const emit = defineEmits(["toggleCompletion"]);

const toggleCompletion = () => {
    emit("toggleCompletion", props.task.id);
};
</script>

<style scoped>
/* Custom minimal styles */
button {
    outline: none; /* Remove default outline */
}
</style>
