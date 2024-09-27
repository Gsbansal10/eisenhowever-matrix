<template>
    <Transition name="slide">
        <div
            v-if="isVisible"
            class="notification-container fixed left-1/2 z-[9999] flex -translate-x-1/2 transform items-center rounded-lg bg-gray-100/50 p-3 shadow-md backdrop-blur-md transition-all duration-300"
            :class="[
                isSuccess
                    ? 'notification-success text-green-600'
                    : 'notification-error text-red-600',
                isVisible
                    ? 'notification-visible bottom-[50px]'
                    : 'notification-hidden -bottom-full',
            ]"
        >
            <component :is="icon" class="notification-icon mr-3 h-6 w-6" />
            <p
                class="notification-message m-0 whitespace-pre-wrap text-sm text-gray-800"
            >
                {{ message }}
            </p>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed, type Ref } from "vue";
import { storeToRefs } from "pinia";
import { useNotificationStore } from "@/stores/notificationStore";
import {
    CheckCircleIcon,
    XCircleIcon,
    CheckBadgeIcon,
} from "@heroicons/vue/24/outline";

const notificationStore = useNotificationStore();
const {
    isVisible,
    result,
    message,
}: {
    isVisible: Ref<boolean>;
    result: Ref<string>;
    message: Ref<string>;
} = storeToRefs(notificationStore);

const isSuccess = computed<boolean>(
    () => result.value.toLowerCase() === "success",
);
const icon = computed<typeof CheckCircleIcon | typeof XCircleIcon>(() =>
    isSuccess.value ? CheckBadgeIcon : XCircleIcon,
);
</script>

<style scoped>
.notification-container {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.4);
}

/* Fade transition animations */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
    opacity: 1;
}

.slide-enter-from,
.slide-leave-to {
    transform: translate(-50%, 100%);
    opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
    transform: translate(-50%, 0);
    opacity: 1;
}
</style>
