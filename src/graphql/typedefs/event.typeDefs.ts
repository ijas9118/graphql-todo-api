export const eventTypedef = `#graphql
    interface BaseEntity {
        id: ID!
        createdAt: String!
        updatedAt: String!
    }

    type Event implements BaseEntity {
        id: ID!
        title: String!
        description: String
        category: String!
        completed: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    union SearchResult = Event | Task

    input CreateEventInput {
        title: String!
        description: String
        category: String!
    }


    type Query {
        getEvent(id: ID!): Event
        searchItems(query: String!): [SearchResult!]!
    }

    type Mutation {
        createEvent(input: CreateEventInput!): Event!
    }
`;
