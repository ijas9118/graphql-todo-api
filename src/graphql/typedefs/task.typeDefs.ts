export const taskTypedef = `#graphql 
    enum Priority {
        LOW
        MEDIUM
        HIGH
    }

    interface BaseEntity {
        id: ID!
        createdAt: String!
        updatedAt: String!
    }

    type Task implements BaseEntity {
        id: ID!
        title: String!
        description: String
        priority: Priority!
        completed: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    input CreateTaskInput {
        title: String!
        description: String
        priority: Priority
    }

    input UpdateTaskInput {
        title: String
        description: String
        priority: Priority
        completed: Boolean
    }

    type Query {
        getTasks: [Task!]!
        getTask(id: ID!): Task
    }

    type Mutation {
        createTask(input: CreateTaskInput!): Task!
        updateTask(id: ID!, input: UpdateTaskInput!): Task
        deleteTask(id: ID!): Boolean!
    }
`;
