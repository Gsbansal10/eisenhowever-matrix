<template>
    <div class="add-task-button-container flex flex-col">
        <p
            class="add-task-button inline-flex select-none items-center rounded px-2 text-blue-500 hover:cursor-pointer hover:bg-blue-400 hover:bg-opacity-10 hover:text-blue-800 active:scale-95 active:ring-1 active:ring-blue-500"
            @click="$emit('openTaskForm')"
        >
            <span class="add-task-icon mr-1 text-xl hover:text-blue-800">
                +
            </span>
            <span class="add-task-text text-blue-500 hover:text-blue-800"
                >Add Task</span
            >
        </p>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
span {
    outline: none;
}
</style>
