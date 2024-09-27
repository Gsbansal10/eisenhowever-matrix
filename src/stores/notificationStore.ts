// Import necessary functions and types from Vue and Pinia
import { defineStore } from "pinia";
import { ref, nextTick, type Ref } from "vue";

// Define and export the notification store using Pinia
export const useNotificationStore = defineStore("notification", () => {
    // Define reactive references for notification state
    const isVisible: Ref<boolean> = ref(false);
    const result: Ref<string> = ref("success");
    const message: Ref<string> = ref("");
    // Variable to store the timeout ID
    let timeoutId: number | null = null;

    /**
     * Shows a notification with the given result and message for the specified duration.
     *
     * @param newResult - The result to display in the notification.
     * @param newMessage - The message to display in the notification.
     * @param duration - The duration in milliseconds to display the notification. Defaults to 1500 ms.
     */
    function showNotification(
        newResult: string,
        newMessage: string,
        duration: number = 1500,
    ): void {
        // Clear any previous timeouts to prevent overlapping notifications
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        // Hide the current notification
        isVisible.value = false;

        // Use nextTick to ensure DOM updates before showing the new notification
        nextTick(() => {
            // Update notification content
            result.value = newResult;
            message.value = newMessage;
            // Show the notification
            isVisible.value = true;
        });

        // Set a new timeout to hide the notification after the specified duration
        timeoutId = window.setTimeout(() => {
            isVisible.value = false;
            timeoutId = null;
        }, duration);
    }

    // Return the public interface of the store
    return { isVisible, result, message, showNotification };
});

// Export the type of the notification store for use in other components
export type NotificationStore = ReturnType<typeof useNotificationStore>;
