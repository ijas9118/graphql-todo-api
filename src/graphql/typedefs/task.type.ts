export const taskTypedef = `#graphql 
    type Task {
        id: ID!
        title: String!
        completed: Boolean!
    }

    type Query {
        getTasks: [Task!]!,
        getTask(id: ID!): Task
    }

    type Mutation {
        addTask(task: AddTaskInput!): Task!
        updateTask(id: ID!, data: UpdateTaskInput): Task
        deleteTask(id: ID!): Task
    }

    input AddTaskInput {
        title: String!
    }
    
    input UpdateTaskInput {
        title: String
        completed: Boolean
    }
`;
