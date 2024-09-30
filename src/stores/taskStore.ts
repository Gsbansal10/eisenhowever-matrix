import { defineStore } from "pinia";
import { computed, ref } from "vue";
// import { useLocalStorage } from "@vueuse/core";
// import { dummyTasks } from "./dummyTasks";
// import { dummyTasksEmptyDescriptions } from "./dummyTasks";
import type { Task } from "./dummyTasks";
import { useNotificationStore } from "./notificationStore";

// export interface Task {
//     id: string;
//     title: string;
//     description: string;
//     dateCreated: Date;
//     dateCompleted: Date | null;
//     quadrant: string;
//     priority: number;
//     isCompleted: boolean;
//     isDeleted: boolean;
// }

export const useTaskStore = defineStore("task", () => {
    const allTasks = ref<Task[]>([]);
    // const allTasks = ref<Task[]>(dummyTasks);
    // const allTasks = ref<Task[]>(dummyTasksEmptyDescriptions);
    const notificationStore = useNotificationStore();

    const activeTasks = computed(() =>
        allTasks.value.filter((task) => !task.isDeleted),
    );
    // const deletedTasks = computed(() => allTasks.value.filter(task => task.isDeleted));

    const addTask = (task: Task) => {
        allTasks.value.push(task);
        notificationStore.showNotification(
            "success",
            "Task has been added to the list",
        );
    };

    const updateTask = (updatedTask: Task) => {
        if (!updatedTask.title) {
            notificationStore.showNotification(
                "error",
                "Task must have a title",
            );
            return;
        }

        const index = allTasks.value.findIndex(
            (task) => task.id === updatedTask.id,
        );
        if (index !== -1) {
            const oldTask = allTasks.value[index];
            if (
                oldTask.title !== updatedTask.title ||
                oldTask.description !== updatedTask.description
            ) {
                allTasks.value[index] = updatedTask;
                notificationStore.showNotification(
                    "success",
                    "Task has been updated",
                );
            }
        }
    };

    const deleteTask = (taskId: string) => {
        const task = allTasks.value.find((task) => task.id === taskId);
        if (task) {
            task.isDeleted = true;
            notificationStore.showNotification(
                "success",
                "Task has been moved to trash",
            );
        }
    };

    const moveTask = (task: Task, newQuadrant: string) => {
        task.quadrant = newQuadrant;
        notificationStore.showNotification(
            "success",
            "Task has been moved to the new quadrant",
        );
    };

    const toggleTaskCompletion = (taskId: string) => {
        const task = allTasks.value.find((task) => task.id === taskId);
        if (task) {
            task.isCompleted = !task.isCompleted;
            task.dateCompleted = task.isCompleted ? new Date() : null;
        }
    };

    const tasksByQuadrant = computed(() => {
        return {
            one: activeTasks.value.filter((task) => task.quadrant === "one"),
            two: activeTasks.value.filter((task) => task.quadrant === "two"),
            three: activeTasks.value.filter(
                (task) => task.quadrant === "three",
            ),
            four: activeTasks.value.filter((task) => task.quadrant === "four"),
        };
    });

    const deleteAllTasks = () => {
        allTasks.value.forEach((task) => (task.isDeleted = true));
        notificationStore.showNotification(
            "success",
            "All tasks have been moved to trash",
        );
    };

    const permanentlyDeleteTask = (taskId: string) => {
        allTasks.value = allTasks.value.filter((task) => task.id !== taskId);
        notificationStore.showNotification(
            "success",
            "Task has been permanently deleted",
        );
    };

    const restoreTask = (taskId: string) => {
        const task = allTasks.value.find((task) => task.id === taskId);
        if (task) {
            task.isDeleted = false;
            notificationStore.showNotification(
                "success",
                "Task has been restored",
            );
        }
    };

    return {
        activeTasks,
        tasksByQuadrant,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        toggleTaskCompletion,
        deleteAllTasks,
        permanentlyDeleteTask,
        restoreTask,
    };
});
