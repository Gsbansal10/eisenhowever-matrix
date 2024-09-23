<template>
    <div
        class="snap-start"
        :class="{ 'rounded-lg border-2 border-blue-600': isSelected }"
        @click="toggleSelectedTask"
    >
        <div
            class="group grid cursor-pointer select-none grid-cols-[auto_1fr_auto] items-center gap-x-2 px-4 py-2 transition duration-200 hover:bg-gray-500 hover:bg-opacity-10"
            :class="{
                'border-b-[1px] border-gray-200': !isSelected,
            }"
        >
            <!-- circle radio -->
            <button
                class="mr-2 flex h-4 w-4 cursor-pointer items-center justify-center focus:outline-none"
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
            <!-- task title -->
            <h4
                class="cursor-pointer text-black"
                :class="{
                    'text-gray-400': task.isCompleted,
                }"
            >
                {{ index + 1 }}. {{ task.title }}
            </h4>
            <!-- task description -->
            <p
                v-if="task.description"
                class="col-start-2 text-[12px] text-gray-500"
                :class="{
                    'text-gray-400': task.isCompleted,
                }"
                tabindex="0"
            >
                {{ task.description }}
            </p>
            <!-- Grab handle -->
            <p
                class="align-end col-start-3 row-span-2 row-start-1 hidden text-lg group-hover:block"
            >
                ⠿
            </p>
            <!-- date created -->
            <p
                class="col-start-2 mt-1 hidden gap-1 justify-self-end text-[12px] text-gray-500 group-hover:flex"
                :class="{ 'text-gray-400': task.isCompleted }"
            >
                <span
                    class="mr-2 rounded px-[2px] font-medium"
                    :class="{
                        'text-red-500': task.priority === 1,
                        'text-blue-500': task.priority === 2,
                        'text-green-500': task.priority === 3,
                    }"
                    >#p{{ task.priority }}</span
                >
                <span>
                    {{
                        task.dateCreated.toLocaleDateString("en-GB", {
                            month: "short",
                            day: "2-digit",
                        })
                    }}

                    <!-- __ days ago -->
                    <!-- ({{
                        Math.floor(
                            (new Date() - task.dateCreated) /
                                (1000 * 60 * 60 * 24),
                        )
                    }}
                    days ago) -->
                </span>
                <span
                    @click.stop="deleteTask"
                    class="ml-2 cursor-pointer text-gray-400 hover:text-red-500"
                    title="Delete Task"
                >
                    <TrashIcon class="h-4 w-4" />
                </span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { TrashIcon } from "@heroicons/vue/24/outline";
import { useTaskStore } from "@/stores/taskStore";

const taskStore = useTaskStore();

const props = defineProps({
    task: Object,
    isSelected: Boolean,
    index: Number,
});

const emit = defineEmits(["toggleCompletion", "toggleSelectedTask"]);

const toggleCompletion = () => {
    emit("toggleCompletion", props.task.id);
};

const deleteTask = () => {
    taskStore.deleteTask(props.task.id);
};

const toggleSelectedTask = () => {
    emit("toggleSelectedTask", props.task);
};
</script>

<style scoped>
button {
    outline: none;
}
</style>
