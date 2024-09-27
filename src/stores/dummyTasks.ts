export interface Task {
    id: string;
    title: string;
    description: string;
    dateCreated: Date;
    dateCompleted: Date | null;
    quadrant: string;
    priority: number;
    isCompleted: boolean;
    isDeleted: boolean;
}

export const dummyTasks: Task[] = [
    // Quadrant 1: Urgent and Important
    {
        id: "1",
        title: "Finish project report",
        description: "Complete the final report for the project.",
        dateCreated: new Date(2023, 9, 1), // Unique date
        dateCompleted: null,
        quadrant: "one",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "2",
        title: "Prepare for presentation",
        description:
            "Prepare slides and practice for the upcoming presentation.",
        dateCreated: new Date(2023, 9, 2), // Unique date
        dateCompleted: null,
        quadrant: "one",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "3",
        title: "Submit tax documents",
        description:
            "Gather and submit all necessary tax documents before the deadline.",
        dateCreated: new Date(2023, 9, 3), // Unique date
        dateCompleted: null,
        quadrant: "one",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "4",
        title: "Respond to client emails",
        description: "Reply to urgent client emails regarding project updates.",
        dateCreated: new Date(2023, 9, 4), // Unique date
        dateCompleted: null,
        quadrant: "one",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "5",
        title: "Schedule team meeting",
        description:
            "Organize a meeting to discuss project progress and next steps.",
        dateCreated: new Date(2023, 9, 5), // Unique date
        dateCompleted: null,
        quadrant: "one",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },

    // Quadrant 2: Important but Not Urgent
    {
        id: "6",
        title: "Plan next quarter goals",
        description: "Set goals and objectives for the next quarter.",
        dateCreated: new Date(2023, 9, 6), // Unique date
        dateCompleted: null,
        quadrant: "two",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "7",
        title: "Attend professional development workshop",
        description: "Participate in a workshop to enhance skills.",
        dateCreated: new Date(2023, 9, 7), // Unique date
        dateCompleted: null,
        quadrant: "two",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "8",
        title: "Read industry-related book",
        description: "Read a book to gain insights into industry trends.",
        dateCreated: new Date(2023, 9, 8), // Unique date
        dateCompleted: null,
        quadrant: "two",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "9",
        title: "Network with industry professionals",
        description: "Reach out to professionals for networking opportunities.",
        dateCreated: new Date(2023, 9, 9), // Unique date
        dateCompleted: null,
        quadrant: "two",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "10",
        title: "Develop a personal brand strategy",
        description:
            "Create a strategy for personal branding and online presence.",
        dateCreated: new Date(2023, 9, 10), // Unique date
        dateCompleted: null,
        quadrant: "two",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },

    // Quadrant 3: Urgent but Not Important
    {
        id: "11",
        title: "Respond to non-urgent emails",
        description: "Reply to emails that are not time-sensitive.",
        dateCreated: new Date(2023, 9, 11), // Unique date
        dateCompleted: null,
        quadrant: "three",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "12",
        title: "Schedule routine maintenance",
        description: "Set up maintenance for office equipment.",
        dateCreated: new Date(2023, 9, 12), // Unique date
        dateCompleted: null,
        quadrant: "three",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "13",
        title: "Order office supplies",
        description: "Restock necessary office supplies before they run out.",
        dateCreated: new Date(2023, 9, 13), // Unique date
        dateCompleted: null,
        quadrant: "three",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "14",
        title: "Attend a webinar",
        description: "Join a webinar that is interesting but not critical.",
        dateCreated: new Date(2023, 9, 14), // Unique date
        dateCompleted: null,
        quadrant: "three",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "15",
        title: "Check social media updates",
        description: "Review and respond to social media interactions.",
        dateCreated: new Date(2023, 9, 15), // Unique date
        dateCompleted: null,
        quadrant: "three",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },

    // Quadrant 4: Not Urgent and Not Important
    {
        id: "16",
        title: "Watch a movie",
        description: "Enjoy a movie for relaxation.",
        dateCreated: new Date(2023, 9, 16), // Unique date
        dateCompleted: null,
        quadrant: "four",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "17",
        title: "Organize personal files",
        description: "Sort and organize personal documents and files.",
        dateCreated: new Date(2023, 9, 17), // Unique date
        dateCompleted: null,
        quadrant: "four",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "18",
        title: "Browse online shopping",
        description: "Look for items to purchase online.",
        dateCreated: new Date(2023, 9, 18), // Unique date
        dateCompleted: null,
        quadrant: "four",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "19",
        title: "Plan a weekend trip",
        description: "Research and plan a short trip for the weekend.",
        dateCreated: new Date(2023, 9, 19), // Unique date
        dateCompleted: null,
        quadrant: "four",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "20",
        title: "Try a new recipe",
        description: "Experiment with a new recipe for dinner.",
        dateCreated: new Date(2023, 9, 20), // Unique date
        dateCompleted: null,
        quadrant: "four",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },
];

export const dummyTasksEmptyDescriptions: Task[] = [
    // Quadrant 1: Urgent and Important
    {
        id: "1",
        title: "Finish project report",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 1), // Unique date
        dateCompleted: null,
        quadrant: "one",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "2",
        title: "Prepare for presentation",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 2), // Unique date
        dateCompleted: null,
        quadrant: "one",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "3",
        title: "Submit tax documents",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 3), // Unique date
        dateCompleted: null,
        quadrant: "one",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "4",
        title: "Respond to client emails",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 4), // Unique date
        dateCompleted: null,
        quadrant: "one",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "5",
        title: "Schedule team meeting",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 5), // Unique date
        dateCompleted: null,
        quadrant: "one",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },

    // Quadrant 2: Important but Not Urgent
    {
        id: "6",
        title: "Plan next quarter goals",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 6), // Unique date
        dateCompleted: null,
        quadrant: "two",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "7",
        title: "Attend professional development workshop",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 7), // Unique date
        dateCompleted: null,
        quadrant: "two",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "8",
        title: "Read industry-related book",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 8), // Unique date
        dateCompleted: null,
        quadrant: "two",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "9",
        title: "Network with industry professionals",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 9), // Unique date
        dateCompleted: null,
        quadrant: "two",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "10",
        title: "Develop a personal brand strategy",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 10), // Unique date
        dateCompleted: null,
        quadrant: "two",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },

    // Quadrant 3: Urgent but Not Important
    {
        id: "11",
        title: "Respond to non-urgent emails",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 11), // Unique date
        dateCompleted: null,
        quadrant: "three",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "12",
        title: "Schedule routine maintenance",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 12), // Unique date
        dateCompleted: null,
        quadrant: "three",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "13",
        title: "Order office supplies",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 13), // Unique date
        dateCompleted: null,
        quadrant: "three",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "14",
        title: "Attend a webinar",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 14), // Unique date
        dateCompleted: null,
        quadrant: "three",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "15",
        title: "Check social media updates",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 15), // Unique date
        dateCompleted: null,
        quadrant: "three",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },

    // Quadrant 4: Not Urgent and Not Important
    {
        id: "16",
        title: "Watch a movie",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 16), // Unique date
        dateCompleted: null,
        quadrant: "four",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "17",
        title: "Organize personal files",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 17), // Unique date
        dateCompleted: null,
        quadrant: "four",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "18",
        title: "Browse online shopping",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 18), // Unique date
        dateCompleted: null,
        quadrant: "four",
        priority: 1,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "19",
        title: "Plan a weekend trip",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 19), // Unique date
        dateCompleted: null,
        quadrant: "four",
        priority: 2,
        isCompleted: false,
        isDeleted: false,
    },
    {
        id: "20",
        title: "Try a new recipe",
        description: "", // Empty description
        dateCreated: new Date(2023, 9, 20), // Unique date
        dateCompleted: null,
        quadrant: "four",
        priority: 3,
        isCompleted: false,
        isDeleted: false,
    },
];
