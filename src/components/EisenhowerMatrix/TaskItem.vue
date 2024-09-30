<template>
    <div :data-task-id="task.id" class="task-item snap-start">
        <div
            class="task-item-content group grid select-none grid-cols-[auto_1fr_auto] items-center gap-x-2 border-b-[0px] border-gray-200 px-4 py-2 transition duration-200 hover:bg-gray-300 hover:bg-opacity-20 hover:shadow"
            :class="{
                'bg-slate-50': task.isCompleted,
            }"
        >
            <!-- Completion button -->
            <button
                class="task-completion-button mr-2 mt-1 flex h-4 w-4 cursor-pointer items-center justify-start self-start focus:outline-none"
                :class="{
                    'rounded-[3px] border-[1px] border-blue-500':
                        !task.isCompleted,
                }"
                @click.stop="toggleCompletion"
            >
                <span v-if="task.isCompleted" class="text-xl text-gray-400"
                    >☑︎</span
                >
                <span v-else class="sr-only">Complete</span>
                <span v-if="task.isCompleted" class="sr-only">Undo</span>
            </button>

            <!-- Task title and description -->
            <div class="flex flex-col" @click.stop="startEditing">
                <div
                    ref="titleRef"
                    :contenteditable="isEditing && editingField === 'title'"
                    class="task-title flex cursor-text items-center text-black outline-none"
                    :class="{
                        'text-slate-400': task.isCompleted,
                        'cursor-auto rounded':
                            isEditing && editingField === 'title',
                    }"
                    @keydown.enter.prevent="finishEditing"
                    @keydown.tab.prevent="switchEditingField"
                    @keydown.esc="cancelEditing"
                >
                    {{ task.title }}
                </div>
                <div
                    v-if="
                        task.description ||
                        (isEditing && editingField === 'description')
                    "
                    ref="descriptionRef"
                    :contenteditable="
                        isEditing && editingField === 'description'
                    "
                    class="task-description col-span-1 col-start-2 cursor-text text-[12px] outline-none"
                    :class="{
                        'text-slate-400': task.isCompleted,
                        'cursor-auto rounded':
                            isEditing && editingField === 'description',
                    }"
                    @keydown.enter.prevent="finishEditing"
                    @keydown.tab.prevent="switchEditingField"
                    @keydown.esc="cancelEditing"
                >
                    {{ task.description }}
                </div>
            </div>
            <!-- Grab handle -->
            <div
                class="task-grab-handle col-span-1 col-start-3 hidden cursor-grab group-hover:block"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
                <span class="sr-only">Drag to reorder</span>
            </div>
            <!-- metadata -->
            <div
                class="task-metadata col-span-2 col-start-2 mt-1 hidden gap-1 justify-self-end text-[12px] text-gray-500 group-hover:flex"
                :class="{ 'text-gray-400': task.isCompleted }"
            >
                <span
                    class="task-priority mr-2 rounded px-[2px] font-medium"
                    :class="{
                        'text-red-500': task.priority === 1,
                        'text-blue-500': task.priority === 2,
                        'text-green-500': task.priority === 3,
                    }"
                    >#p{{ task.priority }}</span
                >
                <span class="date-created mr-2 flex items-center">
                    <CalendarIcon class="mr-1 h-4 w-4" />
                    {{
                        task.dateCreated.toLocaleDateString("en-GB", {
                            month: "short",
                            day: "2-digit",
                        })
                    }}
                </span>
                <span
                    @click.stop="deleteTask"
                    class="task-delete cursor-pointer text-gray-400 hover:text-red-500"
                    title="Delete Task"
                >
                    <TrashIcon class="h-4 w-4" />
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { TrashIcon, CalendarIcon } from "@heroicons/vue/24/outline";
import { useTaskStore } from "@/stores/taskStore";
import type { Task } from "@/stores/dummyTasks";
import { useNotificationStore } from "@/stores/notificationStore";

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const props = defineProps<{ task: Task }>();

const isEditing = ref(false);
const editingField = ref<"title" | "description" | null>(null);
const titleRef = ref<HTMLDivElement | null>(null);
const descriptionRef = ref<HTMLDivElement | null>(null);

const toggleCompletion = () => {
    taskStore.toggleTaskCompletion(props.task.id);
};

const deleteTask = () => {
    taskStore.deleteTask(props.task.id);
};

const startEditing = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("task-title")) {
        editingField.value = "title";
        focusElement(titleRef.value);
    } else if (target.classList.contains("task-description")) {
        editingField.value = "description";
        focusElement(descriptionRef.value);
    }
    isEditing.value = true;
};

const focusElement = (element: HTMLElement | null) => {
    if (element) {
        setTimeout(() => {
            element.focus();
            const range = document.createRange();
            range.selectNodeContents(element);
            range.collapse(false);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
        }, 0);
    }
};

const finishEditing = () => {
    if (!isEditing.value) return;

    const newTitle = titleRef.value?.textContent?.trim() || "";
    const newDescription = descriptionRef.value?.textContent?.trim() || "";

    if (!newTitle) {
        notificationStore.showNotification("error", "Task must have a title");
        if (titleRef.value) {
            titleRef.value.textContent = props.task.title;
            focusElement(titleRef.value);
        }
        return;
    }

    taskStore.updateTask({
        ...props.task,
        title: newTitle,
        description: newDescription,
    });

    isEditing.value = false;
    editingField.value = null;
};

const cancelEditing = () => {
    isEditing.value = false;
    editingField.value = null;
    if (titleRef.value) titleRef.value.textContent = props.task.title;
    if (descriptionRef.value)
        descriptionRef.value.textContent = props.task.description;
};

const switchEditingField = () => {
    if (editingField.value === "title") {
        editingField.value = "description";
        focusElement(descriptionRef.value);
    } else {
        editingField.value = "title";
        focusElement(titleRef.value);
    }
};

const handleOutsideClick = (event: MouseEvent) => {
    if (!event.target) return;

    const isClickInside =
        titleRef.value?.contains(event.target as Node) ||
        descriptionRef.value?.contains(event.target as Node);

    if (!isClickInside && isEditing.value) {
        finishEditing();
    }
};

onMounted(() => {
    document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleOutsideClick);
});
</script>

<style scoped>
button {
    outline: none;
}

.task-completion-button {
    position: relative;
    z-index: 1;
}

.task-completion-button::before {
    content: "";
    position: absolute;
    top: -10px;
    right: -10px;
    bottom: -20px;
    left: -10px;
    cursor: pointer;
    z-index: -1;
}
</style>
