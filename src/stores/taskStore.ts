import { defineStore } from "pinia";
import { computed, ref } from "vue";
// import { useLocalStorage } from "@vueuse/core";
import { dummyTasks, type Task } from "./dummyTasks";
import { dummyTasksEmptyDescriptions } from "./dummyTasksEmptyDescriptions";

// interface Task {
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
    // const tasks = ref<Task[]>(dummyTasks);
    const tasks = ref<Task[]>(dummyTasksEmptyDescriptions);
    const addTask = (
        task: Omit<Task, "id" | "dateCreated" | "quadrant">,
        quadrant: string = "four",
    ) => {
        const newTask: Task = {
            ...task,
            id: generateUniqueId(),
            dateCreated: new Date(),
            quadrant: quadrant,
        };
        tasks.value.push(newTask);
    };

    const updateTask = (updatedTask: Task) => {
        const index = tasks.value.findIndex(
            (task) => task.id === updatedTask.id,
        );
        if (index !== -1) {
            tasks.value[index] = updatedTask;
        }
    };

    const deleteTask = (taskId: string) => {
        tasks.value = tasks.value.filter((task) => task.id !== taskId);
    };

    const moveTask = (taskId: string, newQuadrant: string) => {
        const task = tasks.value.find((task) => task.id === taskId);
        if (task) {
            task.quadrant = newQuadrant;
        }
    };

    const toggleTaskCompletion = (taskId: string) => {
        const task = tasks.value.find((task) => task.id === taskId);
        if (task) {
            task.isCompleted = !task.isCompleted;
            task.dateCompleted = task.isCompleted ? new Date() : null;
        }
    };

    const tasksByQuadrant = computed(() => {
        return {
            one: tasks.value.filter((task) => task.quadrant === "one"),
            two: tasks.value.filter((task) => task.quadrant === "two"),
            three: tasks.value.filter((task) => task.quadrant === "three"),
            four: tasks.value.filter((task) => task.quadrant === "four"),
        };
    });

    const generateUniqueId = () => {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    };

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
