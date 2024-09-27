import { defineStore } from "pinia";
import { computed, ref } from "vue";
// import { useLocalStorage } from "@vueuse/core";
import { dummyTasks } from "./dummyTasks";
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
// }

export const useTaskStore = defineStore("task", () => {
    // const tasks = useLocalStorage<Task[]>("eisenhower-tasks", dummyTasks);
    // const tasks = ref<Task[]>(dummyTasksEmptyDescriptions);
    const tasks = ref<Task[]>(dummyTasks);
    const notificationStore = useNotificationStore();

    const addTask = (task: Task) => {
        tasks.value.push(task);
        notificationStore.showNotification(
            "success",
            "Task has been added to the list",
        );
    };

    const updateTask = (updatedTask: Task) => {
        const index = tasks.value.findIndex(
            (task) => task.id === updatedTask.id,
        );
        if (index !== -1) {
            const oldTask = tasks.value[index];
            if (
                oldTask.title !== updatedTask.title ||
                oldTask.description !== updatedTask.description
            ) {
                tasks.value[index] = updatedTask;
                notificationStore.showNotification(
                    "success",
                    "Task has been updated",
                );
            }
        }
    };

    const deleteTask = (taskId: string) => {
        tasks.value = tasks.value.filter((task) => task.id !== taskId);
        notificationStore.showNotification("success", "Task has been deleted");
    };

    const moveTask = (task: Task, newQuadrant: string) => {
        task.quadrant = newQuadrant;
        notificationStore.showNotification(
            "success",
            "Task has been moved to the new quadrant",
        );
    };

    const toggleTaskCompletion = (taskId: string) => {
        const task = tasks.value.find((task) => task.id === taskId);
        if (task) {
            task.isCompleted = !task.isCompleted;
            task.dateCompleted = task.isCompleted ? new Date() : null;
        }
        notificationStore.showNotification(
            "success",
            "Task has been completed",
        );
    };

    const tasksByQuadrant = computed(() => {
        return {
            one: tasks.value.filter((task) => task.quadrant === "one"),
            two: tasks.value.filter((task) => task.quadrant === "two"),
            three: tasks.value.filter((task) => task.quadrant === "three"),
            four: tasks.value.filter((task) => task.quadrant === "four"),
        };
    });

    const deleteAllTasks = () => {
        console.log("Deleting all tasks");
        tasks.value = []; // Clear all tasks
    };

    return {
        tasks,
        tasksByQuadrant,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        toggleTaskCompletion,
        deleteAllTasks, // Expose the deleteAllTasks function
    };
});
