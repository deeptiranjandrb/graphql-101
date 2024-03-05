import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// types
import { typeDefs } from "./schema.js";
import db from "./_db.js";
const books = [
    {
        title: "The Awakening",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
];
const resolvers = {
    Query: {
        games: () => db.games,
        reviews: () => {
            // console.log(db.reviews)
            return db.reviews;
        },
        authors: () => db.authors,
        review: (parent, args) => {
            return db.reviews.find((review) => review.id === args.id);
        },
        author: (parent, args) => {
            return db.authors.find((author) => author.id === args.id);
        },
        game: (parent, args) => {
            return db.games.find((game) => game.id === args.id);
        },
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id);
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id === parent.id);
        }
    },
    Review: {
        game(parent) {
            return db.games.find(game => game.id === parent.game_id);
        },
        author(parent) {
            return db.authors.find(author => author.id === parent.author_id);
        }
    },
    Mutation: {
        deleteGame: (parent, args) => {
            db.games = db.games.filter(game => game.id != args.id);
            return db.games;
        },
        addGame: (parent, args) => {
            let game = { ...args.game, id: Math.floor(Math.random() * 10000).toString() };
            db.games.push(game);
            return game;
        },
        updateGame: (parent, args) => {
            db.games = db.games.map(game => {
                if (game.id === args.id) {
                    return { ...game, ...args.edits };
                }
                return game;
            });
            return db.games.find(g => g.id === args.id);
        }
    }
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
