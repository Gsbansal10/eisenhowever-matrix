<template>
    <div class="task-sorting-controls flex items-center space-x-1">
        <!-- Sorting controls -->
        <span class="text-sm">Sort by:</span>
        <!-- date created -->
        <button
            @click="toggleSort('dateCreated')"
            title="Date Created"
            type="button"
            class="date-created-sort-button flex items-center space-x-1 rounded px-2 py-1 transition-all duration-300 hover:bg-blue-100"
            :class="{
                'font-medium text-blue-500 ring-1 ring-blue-500':
                    sortBy === 'dateCreated',
            }"
        >
            <CalendarIcon class="h-4 w-4" />
            <ArrowUpIcon
                v-if="sortBy === 'dateCreated' && sortOrder === 'asc'"
                class="h-3 w-3"
            />
            <ArrowDownIcon
                v-if="sortBy === 'dateCreated' && sortOrder === 'desc'"
                class="h-3 w-3"
            />
        </button>
        <!-- priority -->
        <button
            @click="toggleSort('priority')"
            type="button"
            title="Priority"
            class="priority-sort-button flex items-center space-x-1 rounded px-2 py-1 transition-all duration-300 hover:bg-blue-100"
            :class="{
                'font-medium text-blue-500 ring-1 ring-blue-500':
                    sortBy === 'priority',
            }"
        >
            <span class="text-xs font-bold">#p</span>
            <ArrowUpIcon
                v-if="sortBy === 'priority' && sortOrder === 'asc'"
                class="h-3 w-3"
            />
            <ArrowDownIcon
                v-if="sortBy === 'priority' && sortOrder === 'desc'"
                class="h-3 w-3"
            />
        </button>
        <!-- completed -->
        <button
            @click="toggleSort('completed')"
            type="button"
            title="Completed"
            class="completed-sort-button flex items-center space-x-1 rounded px-2 py-1 transition-all duration-300 hover:bg-blue-100"
            :class="{
                'font-medium text-blue-500 ring-1 ring-blue-500':
                    sortBy === 'completed',
            }"
        >
            <span class="text-sm font-bold">☑︎</span>
            <ArrowUpIcon
                v-if="sortBy === 'completed' && sortOrder === 'asc'"
                class="h-3 w-3"
            />
            <ArrowDownIcon
                v-if="sortBy === 'completed' && sortOrder === 'desc'"
                class="h-3 w-3"
            />
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
    ArrowUpIcon,
    ArrowDownIcon,
    CalendarIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
    initialSortBy: {
        type: String,
        default: "dateCreated",
    },
    initialSortOrder: {
        type: String,
        default: "desc",
    },
});

const emit = defineEmits(["update:sortBy", "update:sortOrder"]);

const sortBy = ref(props.initialSortBy);
const sortOrder = ref(props.initialSortOrder);

const toggleSort = (newSortBy) => {
    if (sortBy.value === newSortBy) {
        // Toggle sort order if the same sort type is clicked
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
        // Set new sort type and default to descending order
        sortBy.value = newSortBy;
        sortOrder.value = "desc";
    }
    emit("update:sortBy", sortBy.value);
    emit("update:sortOrder", sortOrder.value);
};
</script>

<style scoped>
button {
    transition: all 0.2s ease-in-out;
}

button:hover {
    transform: scale(1.05);
}
</style>
