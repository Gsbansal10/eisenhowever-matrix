<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isOpen"
                class="fixed inset-0 z-50 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div
                    class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
                >
                    <!-- Background overlay -->
                    <div
                        class="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity"
                        aria-hidden="true"
                        @click="closeForm"
                    ></div>

                    <!-- Modal panel -->
                    <div
                        class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
                    >
                        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <h2
                                id="modal-title"
                                class="mb-2 text-base font-semibold  text-gray-900"
                            >
                                Add New Task
                            </h2>
                            <form
                                @submit.prevent="addTask"
                                class="flex flex-col rounded-lg border border-gray-300 p-2"
                            >
                                <input
                                    v-model="taskTitle"
                                    ref="taskTitleInput"
                                    type="text"
                                    placeholder="Type your task here"
                                    class="w-full rounded-md px-2 py-1 font-semibold focus:border-blue-500 focus:outline-none"
                                    maxlength="256"
                                    required
                                />
                                <textarea
                                    v-model="taskDescription"
                                    placeholder="Description (optional)"
                                    class="w-full resize-none rounded-md px-2 py-1 focus:border-blue-500 focus:outline-none"
                                    maxlength="1024"
                                    rows="2"
                                >
                                </textarea>
                                <div class="px-2 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        @click="addTask"
                                        class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                    >
                                        Add Task
                                    </button>
                                    <button
                                        type="button"
                                        @click="closeForm"
                                        class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import {
    ref,
    defineEmits,
    defineProps,
    onMounted,
    onUnmounted,
    watch,
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
        required: true,
    },
});

const addTask = () => {
    if (taskTitle.value.trim()) {
        console.log("Adding task");
        const task = {
            title: taskTitle.value,
            description: taskDescription.value,
            quadrant: props.quadrant,
            priority: priority.value,
            isCompleted: isCompleted.value,
        };
        taskStore.addTask(task, props.quadrant);
        taskTitle.value = "";
        taskDescription.value = "";
        closeForm();
    }
};

const closeForm = () => {
    // isOpen.value = false;
    emit("close");
};

const handleEscape = (e) => {
    if (e.key === "Escape") {
        console.log("Escape key pressed");
        closeForm();
    }
};

const taskTitleInput = ref(null);

onMounted(() => {
    window.addEventListener("keydown", handleEscape);
    if (props.isOpen) {
        // Focus the input when the component is mounted and isOpen is true
        nextTick(() => {
            taskTitleInput.value?.focus();
        });
    }
});

// Watch for changes in the isOpen prop
watch(
    () => props.isOpen,
    (newIsOpen) => {
        if (newIsOpen) {
            // Focus the input when isOpen becomes true
            nextTick(() => {
                taskTitleInput.value?.focus();
            });
        }
    },
);

onUnmounted(() => {
    window.removeEventListener("keydown", handleEscape);
});
</script>

<style scoped>
/* Custom minimal styles */
input,
textarea {
    outline: none; /* Remove default outline */
}
</style>
