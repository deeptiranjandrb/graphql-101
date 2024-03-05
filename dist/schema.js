const typeDefs = `#graphql
    type Game {
        id: ID!,
        title: String!,
        platform: [String!]!
        reviews:[Review!]
    }
    type Review {
        id:ID!
        rating: Int!
        content:String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query { #not optional
        reviews: [Review]
        games: [Game]
        authors: [Author]
        review(id: ID!):Review
        game(id:ID!):Game
        author(id:ID!):Author
    }
    type Mutation {
        deleteGame(id: ID!):[Game]
        addGame(game: AddGameInput):Game
        updateGame(id: ID!,edits: EditGameInput!): Game
    }
    input AddGameInput {
        title: String!
        platform: [String!]!
    }
    input EditGameInput {
        title: String
        platform: [String!]
    }
`;
export { typeDefs };
// int, float, string, boolean, ID - scalar types
