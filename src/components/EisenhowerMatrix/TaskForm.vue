<template>
    <div
        class="group cursor-pointer select-none items-center border-b-[1px] border-gray-200 px-4 py-2 transition duration-200 hover:bg-gray-500 hover:bg-opacity-10"
    >
        <form @submit.prevent.stop="addTask">
            <input
                v-model="taskTitle"
                ref="taskTitleInput"
                type="text"
                placeholder="Type your task here"
                class="w-full bg-transparent px-2 py-1 font-semibold focus:outline-none"
                maxlength="100"
                required
            />
            <textarea
                v-model="taskDescription"
                ref="taskDescriptionTextarea"
                placeholder="Description (optional)"
                class="w-full resize-none bg-transparent px-2 py-1 text-[12px] text-gray-500 focus:outline-none"
                maxlength="1024"
                rows="1"
            ></textarea>
            <div class="flex justify-end gap-1">
                <button
                    type="submit"
                    class="rounded-md px-2 py-1 text-blue-600 hover:bg-blue-300 hover:bg-opacity-20 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Add Task"
                >
                    ✓ Add Task
                </button>
                <button
                    type="button"
                    @click="closeForm"
                    class="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-400 hover:bg-opacity-20 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    title="Cancel"
                >
                    ✕ Cancel
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import {
    ref,
    defineEmits,
    defineProps,
    onMounted,
    onUnmounted,
    nextTick,
} from "vue";
import { useTaskStore } from "@/stores/taskStore";

const emit = defineEmits(["close"]);
const taskStore = useTaskStore();
const taskTitle = ref("");
const taskDescription = ref("");
const priority = ref(0);
const isCompleted = ref(false);
const props = defineProps({
    quadrant: {
        type: String,
        required: true,
    },
    isOpen: {
        type: Boolean,
        required: false,
    },

});

const addTask = () => {
    if (!taskTitle.value.trim()) {
        alert("Task title is required");
        taskTitleInput.value?.focus();
        return;
    }

    const priorityMatch = taskTitle.value.trim().match(/\bp(\d+)\b/);
    priority.value = priorityMatch ? parseInt(priorityMatch[1]) : 0;
    const task = {
        title: taskTitle.value,
        description: taskDescription.value,
        quadrant: props.quadrant,
        priority: priority.value,
        isCompleted: isCompleted.value,
    };
    taskStore.addTask(task, props.quadrant);
    resetForm();
};

const handleEscape = (e) => {
    if (e.key === "Escape") {
        closeForm();
    }
};

const taskTitleInput = ref(null);
const taskDescriptionTextarea = ref(null);

onMounted(() => {
    document.addEventListener("keydown", handleEscape);
    nextTick(() => {
        taskTitleInput.value?.focus();
    });
});

const closeForm = () => {
    resetForm();
    emit("close");
};

const resetForm = () => {
    taskTitle.value = "";
    taskDescription.value = "";
};

onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
});
</script>

<style scoped>
/* Custom minimal styles */
input,
textarea {
    outline: none; /* Remove default outline */
}
</style>
