export interface Task {
    id: string;
    title: string;
    description: string; // Description is kept as an empty string
    dateCreated: Date;
    dateCompleted: Date | null;
    quadrant: string;
    priority: number;
    isCompleted: boolean;
    isSelected: boolean; // Added isSelected property
}

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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
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
        isSelected: false, // Set isSelected to false
    },
];
