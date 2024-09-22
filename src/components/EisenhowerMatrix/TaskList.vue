<template>
    <div
        class="flex h-full snap-y snap-mandatory flex-col overflow-y-auto"
        tabindex="0"
        @keydown.stop="handleKeyDown"
    >
        <transition-group name="fade" tag="div" mode="out-in">
            <TaskItem
                v-for="task in sortedTasks"
                :key="task.id"
                :task="task"
                @toggleCompletion="toggleTaskCompletion"
                @toggleSelectedTask="toggleSelectedTask"
                :isSelected="task.isSelected"
            />
        </transition-group>
    </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/taskStore";
import TaskItem from "./TaskItem.vue";
import { computed, ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
    quadrant: {
        type: String,
        required: true,
    },
    sortBy: {
        type: String,
        required: true,
    },
    sortOrder: {
        type: String,
        required: true,
    },
});

const taskStore = useTaskStore();
const tasks = computed(() => taskStore.tasksByQuadrant[props.quadrant]);

const toggleTaskCompletion = (taskId) => {
    taskStore.toggleTaskCompletion(taskId);
};

const selectedTask = ref(null);

const toggleSelectedTask = (task) => {
    if (task.isSelected) {
        task.isSelected = false;
        selectedTask.value = null;
    } else {
        taskStore.tasks.forEach((t) => {
            t.isSelected = false;
        });
        task.isSelected = true;
        selectedTask.value = task;
    }
};

const handleKeyDown = (event) => {
    event.preventDefault();
    if (!selectedTask.value || !event.metaKey) return;

    const currentQuadrant = selectedTask.value.quadrant;
    let newQuadrant = currentQuadrant;

    switch (event.key) {
        case "ArrowUp":
            if (currentQuadrant === "three") newQuadrant = "one";
            if (currentQuadrant === "four") newQuadrant = "two";
            break;
        case "ArrowDown":
            if (currentQuadrant === "one") newQuadrant = "three";
            if (currentQuadrant === "two") newQuadrant = "four";
            break;
        case "ArrowLeft":
            if (currentQuadrant === "two") newQuadrant = "one";
            if (currentQuadrant === "four") newQuadrant = "three";
            break;
        case "ArrowRight":
            if (currentQuadrant === "one") newQuadrant = "two";
            if (currentQuadrant === "three") newQuadrant = "four";
            break;
    }

    if (newQuadrant !== currentQuadrant) {
        taskStore.moveTask(selectedTask.value.id, newQuadrant);
        selectedTask.value.quadrant = newQuadrant;
    }

    if (event.key === "Backspace") {
        const quadrant = selectedTask.value.quadrant;
        const tasksInSameQuadrant = taskStore.tasks.filter(
            (t) => t.quadrant === quadrant,
        );
        const currentIndex = tasksInSameQuadrant.findIndex(
            (t) => t.id === selectedTask.value.id,
        );

        taskStore.deleteTask(selectedTask.value.id);

        if (currentIndex < tasksInSameQuadrant.length - 1) {
            selectedTask.value = tasksInSameQuadrant[currentIndex + 1];
        } else if (currentIndex > 0) {
            selectedTask.value = tasksInSameQuadrant[currentIndex - 1];
        }

        if (selectedTask.value) {
            selectedTask.value.isSelected = true;
        }
    }
};

onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
});

const sortedTasks = computed(() => {
    const sortedTasks = tasks.value.slice();
    sortedTasks.sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
        }
        if (a.isCompleted && b.isCompleted) {
            return b.dateCompleted - a.dateCompleted;
        }
        if (props.sortBy === "dateCreated") {
            return props.sortOrder === "asc"
                ? a.dateCreated - b.dateCreated
                : b.dateCreated - a.dateCreated;
        } else if (props.sortBy === "priority") {
            return props.sortOrder === "asc"
                ? a.priority - b.priority
                : b.priority - a.priority;
        }
    });
    return sortedTasks;
});
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
</style>
