<template>
    <div
        class="task-form-container sticky top-0 z-20 bg-white shadow-md"
        ref="formContainer"
    >
        <form
            @submit.prevent.stop="addTask"
            class="group cursor-pointer select-none border-b-[1px] border-gray-200 px-4 py-2 transition duration-200 hover:bg-gray-500 hover:bg-opacity-10"
        >
            <input
                v-model="taskTitle"
                ref="taskTitleInput"
                type="text"
                placeholder="Type your task here"
                class="task-title-input w-full bg-transparent px-2 py-1 font-semibold focus:outline-none"
                maxlength="100"
                required
            />
            <textarea
                v-model="taskDescription"
                ref="taskDescriptionTextarea"
                placeholder="Description (optional)"
                class="task-description-textarea w-full resize-none bg-transparent px-2 py-1 text-[12px] text-gray-500 focus:outline-none"
                maxlength="1024"
                rows="1"
            ></textarea>
            <div class="task-form-actions flex justify-end gap-1">
                <button
                    type="submit"
                    class="add-task-button rounded-md px-2 py-1 text-blue-600 hover:bg-blue-300 hover:bg-opacity-20 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Add Task"
                >
                    ✓ Add Task
                </button>
                <button
                    type="button"
                    @click="closeForm"
                    class="cancel-task-button rounded-md px-2 py-1 text-gray-500 hover:bg-gray-400 hover:bg-opacity-20 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    title="Cancel"
                >
                    ✕ Cancel
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useTaskStore } from "@/stores/taskStore";

const emit = defineEmits(["close", "taskAdded"]);
const taskStore = useTaskStore();
const taskTitle = ref("");
const taskDescription = ref("");
const priority = ref(0);
const formContainer = ref<HTMLElement | null>(null);

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
    if (taskTitle.value.trim()) {
        const priorityMatch = taskTitle.value.trim().match(/\bp(\d+)\b/);
        priority.value = priorityMatch ? parseInt(priorityMatch[1]) : 0;
        const task = {
            id: generateUniqueId(),
            title: taskTitle.value,
            description: taskDescription.value,
            quadrant: props.quadrant,
            priority: priority.value,
            isCompleted: false,
            dateCompleted: null,
            dateCreated: new Date(),
            isDeleted: false,
        };
        taskStore.addTask(task);
        // emit("taskAdded", task.id);
        resetForm();
    }
};

const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

const handleEscape = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "Escape") {
        closeForm();
    }
};

const taskTitleInput = ref<HTMLInputElement | null>(null);
const taskDescriptionTextarea = ref<HTMLTextAreaElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
    if (
        formContainer.value &&
        !formContainer.value.contains(event.target as Node)
    ) {
        addTask();
        closeForm();
    }
};

onMounted(() => {
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
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
    document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<style scoped>
/* Custom minimal styles */
input,
textarea {
    outline: none; /* Remove default outline */
}

.task-form-container {
    position: sticky;
    top: 0;
    z-index: 20;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
