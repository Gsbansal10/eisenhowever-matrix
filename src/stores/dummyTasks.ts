export interface Task {
    id: string;
    title: string;
    description: string;
    dateCreated: Date;
    dateCompleted: Date | null;
    quadrant: string;
    priority: number;
    isCompleted: boolean;
}

export const dummyTasks: Task[] = [
    // Quadrant 1: Urgent and Important
    {
        id: "1",
        title: "Finish project report",
        description: "Complete the final report for the project.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "one",
        priority: 1,
        isCompleted: false,
    },
    {
        id: "2",
        title: "Prepare for presentation",
        description:
            "Prepare slides and practice for the upcoming presentation.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "one",
        priority: 1,
        isCompleted: false,
    },
    {
        id: "3",
        title: "Submit tax documents",
        description:
            "Gather and submit all necessary tax documents before the deadline.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "one",
        priority: 1,
        isCompleted: false,
    },
    {
        id: "4",
        title: "Respond to client emails",
        description: "Reply to urgent client emails regarding project updates.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "one",
        priority: 1,
        isCompleted: false,
    },
    {
        id: "5",
        title: "Schedule team meeting",
        description:
            "Organize a meeting to discuss project progress and next steps.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "one",
        priority: 1,
        isCompleted: false,
    },

    // Quadrant 2: Important but Not Urgent
    {
        id: "6",
        title: "Plan next quarter goals",
        description: "Set goals and objectives for the next quarter.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "two",
        priority: 2,
        isCompleted: false,
    },
    {
        id: "7",
        title: "Attend professional development workshop",
        description: "Participate in a workshop to enhance skills.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "two",
        priority: 2,
        isCompleted: false,
    },
    {
        id: "8",
        title: "Read industry-related book",
        description: "Read a book to gain insights into industry trends.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "two",
        priority: 2,
        isCompleted: false,
    },
    {
        id: "9",
        title: "Network with industry professionals",
        description: "Reach out to professionals for networking opportunities.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "two",
        priority: 2,
        isCompleted: false,
    },
    {
        id: "10",
        title: "Develop a personal brand strategy",
        description:
            "Create a strategy for personal branding and online presence.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "two",
        priority: 2,
        isCompleted: false,
    },

    // Quadrant 3: Urgent but Not Important
    {
        id: "11",
        title: "Respond to non-urgent emails",
        description: "Reply to emails that are not time-sensitive.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "three",
        priority: 3,
        isCompleted: false,
    },
    {
        id: "12",
        title: "Schedule routine maintenance",
        description: "Set up maintenance for office equipment.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "three",
        priority: 3,
        isCompleted: false,
    },
    {
        id: "13",
        title: "Order office supplies",
        description: "Restock necessary office supplies before they run out.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "three",
        priority: 3,
        isCompleted: false,
    },
    {
        id: "14",
        title: "Attend a webinar",
        description: "Join a webinar that is interesting but not critical.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "three",
        priority: 3,
        isCompleted: false,
    },
    {
        id: "15",
        title: "Check social media updates",
        description: "Review and respond to social media interactions.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "three",
        priority: 3,
        isCompleted: false,
    },

    // Quadrant 4: Not Urgent and Not Important
    {
        id: "16",
        title: "Watch a movie",
        description: "Enjoy a movie for relaxation.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "four",
        priority: 4,
        isCompleted: false,
    },
    {
        id: "17",
        title: "Organize personal files",
        description: "Sort and organize personal documents and files.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "four",
        priority: 4,
        isCompleted: false,
    },
    {
        id: "18",
        title: "Browse online shopping",
        description: "Look for items to purchase online.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "four",
        priority: 4,
        isCompleted: false,
    },
    {
        id: "19",
        title: "Plan a weekend trip",
        description: "Research and plan a short trip for the weekend.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "four",
        priority: 4,
        isCompleted: false,
    },
    {
        id: "20",
        title: "Try a new recipe",
        description: "Experiment with a new recipe for dinner.",
        dateCreated: new Date(),
        dateCompleted: null,
        quadrant: "four",
        priority: 4,
        isCompleted: false,
    },
];
