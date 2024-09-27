<template>
    <div
        class="task-list drop-zone flex h-full min-h-[300px] min-w-[300px] snap-y snap-mandatory flex-col overflow-y-auto"
        :class="{
            'active-dropzone': isDraggedOver && dragSourceQuadrant !== quadrant,
        }"
        tabindex="0"
        @drop="onDrop($event, quadrant)"
        @dragover.prevent="onDragOver"
        @dragenter.prevent="onDragEnter"
        @dragleave="onDragLeave"
        ref="taskListContainer"
    >
        <transition-group name="fade" tag="div" mode="out-in">
            <TaskItem
                v-for="(task, index) in sortedTasks"
                :key="task.id"
                :task="task"
                :index="index"
                @toggleCompletion="toggleTaskCompletion"
                class="drag-el"
                :class="{ dragging: draggedTaskId === task.id }"
                draggable="true"
                @dragstart="startDrag($event, task)"
                @dragend="endDrag"
            />
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore";
import TaskItem from "./TaskItem.vue";
import { computed, ref, watch, nextTick } from "vue";
import { storeToRefs } from "pinia";
import type { Task } from "@/stores/dummyTasks";

const props = defineProps({
    quadrant: {
        type: String,
        required: true,
    },
    sortBy: {
        type: String,
        required: false,
        default: "dateCreated",
    },
    sortOrder: {
        type: String,
        required: false,
        default: "desc",
    },
});

const taskStore = useTaskStore();
const { tasksByQuadrant } = storeToRefs(taskStore);
const tasks = computed(() => tasksByQuadrant.value[props.quadrant]);

const isDraggedOver = ref(false);
const draggedTaskId = ref<string | null>(null);
const dragCounter = ref(0);
const dragSourceQuadrant = ref<string | null>(null);

const taskListContainer = ref<HTMLElement | null>(null);
const lastAddedTaskId = ref<string | null>(null);

const toggleTaskCompletion = (taskId: string) => {
    taskStore.toggleTaskCompletion(taskId);
};

const sortedTasks = computed(() => {
    const sortedTasks = tasks.value.slice();
    sortedTasks.sort((a, b) => {
        if (props.sortBy === "dateCreated") {
            return props.sortOrder === "asc"
                ? a.dateCreated - b.dateCreated
                : b.dateCreated - a.dateCreated;
        } else if (props.sortBy === "priority") {
            return props.sortOrder === "asc"
                ? a.priority - b.priority
                : b.priority - a.priority;
        }
        return 0;
    });
    return sortedTasks;
});

const startDrag = (event: DragEvent, item: Task) => {
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("taskId", item.id);
        draggedTaskId.value = item.id;
        dragSourceQuadrant.value = props.quadrant;
    }
};

const endDrag = () => {
    draggedTaskId.value = null;
    dragSourceQuadrant.value = null;
};

const onDragOver = (event: DragEvent) => {
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
    }
};

const onDragEnter = (event: DragEvent) => {
    event.preventDefault();
    dragCounter.value++;
    if (dragSourceQuadrant.value !== props.quadrant) {
        isDraggedOver.value = true;
    }
};

const onDragLeave = (event: DragEvent) => {
    event.preventDefault();
    dragCounter.value--;
    if (dragCounter.value === 0) {
        isDraggedOver.value = false;
    }
};

const onDrop = (event: DragEvent, quadrant: string) => {
    const taskId = event.dataTransfer?.getData("taskId");
    const task = taskStore.activeTasks.find((t) => t.id === taskId);
    if (task) {
        taskStore.moveTask(task, quadrant);
        nextTick(() => {
            scrollToTask(task.id);
        });
    }
    isDraggedOver.value = false;
    dragCounter.value = 0;
    dragSourceQuadrant.value = null;
};

// Watch for changes in the tasks array
watch(
    () => tasks.value,
    (newTasks, oldTasks) => {
        if (newTasks.length > oldTasks.length) {
            // A new task was added or moved to this quadrant
            const addedTask = newTasks.find(
                (task) => !oldTasks.some((oldTask) => oldTask.id === task.id),
            );
            if (addedTask) {
                lastAddedTaskId.value = addedTask.id;
                nextTick(() => {
                    scrollToTask(addedTask.id);
                });
            }
        }
    },
    { deep: true },
);

const scrollToTask = (taskId: string) => {
    if (taskListContainer.value) {
        const taskElement = taskListContainer.value.querySelector(
            `[data-task-id="${taskId}"]`,
        );
        if (taskElement) {
            const taskFormHeight =
                document.querySelector(".task-form-container")?.clientHeight ||
                0;
            const scrollOffset =
                taskElement.getBoundingClientRect().top +
                taskListContainer.value.scrollTop -
                taskListContainer.value.getBoundingClientRect().top -
                taskFormHeight -
                10; // 10px extra padding

            taskListContainer.value.scrollTo({
                top: scrollOffset,
                behavior: "smooth",
            });
        }
    }
};
</script>

<style scoped>
div {
    outline: none;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}
.fade-move {
    transition: transform 0.5s;
}
.fade-leave-active {
    position: absolute;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateX(50px);
}
.active-dropzone {
    background-color: rgba(0, 0, 0, 0.04);
    border: 2px dashed #007bff;
    transition: all 0.1s;
}

.dragging {
    opacity: 0.5;
    transform: scale(0.95);
    transition:
        opacity 0.3s,
        transform 0.3s;
}
</style>
