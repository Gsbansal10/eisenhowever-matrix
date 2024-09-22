<template>
    <div
        class="flex items-center justify-between space-x-4 border-b border-gray-400 bg-slate-200 bg-opacity-50 px-4 py-2 text-gray-500"
    >
        <!-- Sort by -->
        <div class="flex items-center space-x-2">
            <span class="text-sm">Sort by:</span>
            <div class="btn-group" role="group">
                <button
                    @click="updateSortBy('dateCreated')"
                    title="Date Created"
                    type="button"
                    class="border-r border-gray-300 px-2 hover:bg-blue-50"
                    :class="{
                        'active bg-blue-100 font-medium text-blue-500':
                            sortBy === 'dateCreated',
                    }"
                >
                    <CalendarIcon class="h-4 w-4" />
                </button>
                <button
                    @click="updateSortBy('priority')"
                    type="button"
                    title="Priority"
                    class="px-2 hover:bg-blue-50"
                    :class="{
                        'active bg-blue-100 font-bold text-blue-500':
                            sortBy === 'priority',
                    }"
                >
                    <span class="text-xs">#p</span>
                </button>
            </div>
        </div>
        <!-- Order -->
        <div class="flex items-center space-x-2">
            <span class="text-sm">Order:</span>
            <div class="btn-group" role="group">
                <button
                    @click="updateSortOrder('asc')"
                    type="button"
                    title="Ascending"
                    class="border-r border-gray-300 px-2 hover:bg-blue-50"
                    :class="{
                        'active bg-blue-100 font-medium text-blue-500':
                            sortOrder === 'asc',
                    }"
                >
                    <ArrowUpIcon class="h-4 w-4" />
                </button>
                <button
                    @click="updateSortOrder('desc')"
                    type="button"
                    title="Descending"
                    class="px-1 py-1 hover:bg-blue-50"
                    :class="{
                        'active bg-blue-100 font-medium text-blue-500':
                            sortOrder === 'desc',
                    }"
                >
                    <ArrowDownIcon class="h-4 w-4" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
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

const updateSortBy = (newSortBy) => {
    sortBy.value = newSortBy;
    emit("update:sortBy", newSortBy);
};

const updateSortOrder = (newSortOrder) => {
    sortOrder.value = newSortOrder;
    emit("update:sortOrder", newSortOrder);
};
</script>

<style scoped>
.btn-group {
    display: inline-flex;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    overflow: hidden;
}

.btn-group button {
    border: none;
    border-radius: 0;
    background-color: transparent;
}

.btn-group button:not(:last-child) {
    border-right: 1px solid #d1d5db;
}

.btn-group button.active {
    background-color: #e5e7eb;
    color: #3b82f6;
}

.btn-group button:hover:not(.active) {
    background-color: #f3f4f6;
}
</style>
