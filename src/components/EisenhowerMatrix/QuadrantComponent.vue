<template>
    <div :class="bgColor" class="quadrant">
        <h3 class="mt-2 px-4 text-lg font-bold md:hidden">{{ title }}</h3>
        <div class="flex items-center justify-between px-4 py-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    @click="toggleSortOrder"
                    type="button"
                    class="rounded-l-lg border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                >
                    <ArrowUpIcon v-if="sortOrder === 'asc'" class="h-4 w-4" />
                    <ArrowDownIcon v-else class="h-4 w-4" />
                </button>
                <button
                    @click="cycleSortBy"
                    type="button"
                    class="rounded-r-lg border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                >
                    <CalendarIcon v-if="sortBy === 'date'" class="h-4 w-4" />
                    <LanguageIcon
                        v-else-if="sortBy === 'alphabetical'"
                        class="h-4 w-4"
                    />
                    <ExclamationTriangleIcon
                        v-else-if="sortBy === 'priority'"
                        class="h-4 w-4"
                    />
                    <AdjustmentsHorizontalIcon v-else class="h-4 w-4" />
                </button>
            </div>
        </div>
        <div>
            <TaskList
                :quadrant="quadrant"
                :sortBy="sortBy"
                :sortOrder="sortOrder"
            />
        </div>
        <AddTaskButton :quadrant="quadrant" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import TaskList from "./TaskList.vue";
import AddTaskButton from "./AddTaskButton.vue";
import {
    ArrowUpIcon,
    ArrowDownIcon,
    CalendarIcon,
    LanguageIcon,
    ExclamationTriangleIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/vue/24/outline";

defineProps({
    title: String,
    bgColor: String,
    quadrant: String,
});

const sortBy = ref("date");
const sortOrder = ref("asc");

const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};

const cycleSortBy = () => {
    const sortOptions = ["date", "alphabetical", "priority"];
    const currentIndex = sortOptions.indexOf(sortBy.value);
    sortBy.value = sortOptions[(currentIndex + 1) % sortOptions.length];
};
</script>

<style scoped>
.quadrant {
    max-height: 400px; /* Set a max height for the quadrant */
    overflow-y: auto; /* Enable vertical scrolling */
}
</style>
