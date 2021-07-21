
import 'utils/extensions';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import { authenticationOptional, router as auth } from 'authentication';
import { context } from 'context';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import mongoose from 'mongoose';
import resolvers from 'resolvers';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { typeDefs } from 'typeDefs';

dotenv.config();

const app = express();
const PORT = process.env.PORT != null ? parseInt(process.env.PORT, 10) : 8000;

app.set('trust proxy', true);

const allowedOrigins = [
    'http://localhost:3000',
    'https://dogtor.xyz',
];
app.use(
    cors(
        {
            origin: allowedOrigins,
        },
    ),
    authenticationOptional,
);

app.get('/', (_, res) => res.send('Hello World'));
app.use('/auth', auth);

const apollo = new ApolloServer(
    {
        context: ({ req }) => {
            return context(req);
        },
        introspection: true,
        playground: true,
        resolvers,
        typeDefs,
        uploads: false,
    },
);

apollo.applyMiddleware({
    app,
    path: '/graphql',
});

const server = createServer(app);
const schema = makeExecutableSchema({ resolvers, typeDefs });
 
// database connection
const dbURI = process.env.MONGO_URI != null ? process.env.MONGO_URI : '';
mongoose.connect(dbURI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log(err);
        console.log('💾[database]: An error occured while trying to connect');
    }
    else {
        console.log('💾[database]: Connected to database successfully');
        
        server.listen(PORT, () => {
            new SubscriptionServer({
                execute,
                schema,
                subscribe,
            }, {
                path: '/subscriptions',
                server: server,
            });
            console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
        });
    }
});
