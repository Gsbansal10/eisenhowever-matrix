<template>
    <div class="flex flex-col">
        <p
            class="inline-flex items-center rounded px-2 text-blue-500 hover:cursor-pointer hover:bg-blue-400 hover:bg-opacity-10 hover:text-blue-700"
            @click="$emit('openTaskForm')"
        >
            <span class="mr-1 text-xl hover:text-blue-700"> + </span>
            <span class="text-blue-500 hover:text-blue-800">Add Task</span>
        </p>
    </div>
</template>

<style scoped>
span {
    outline: none;
}
</style>
