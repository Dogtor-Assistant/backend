
import { ApolloServer } from 'apollo-server-express';
import { authenticationOptional, router as auth } from 'authentication';
import { context } from 'context';
import cors from 'cors';
import express from 'express';
import resolvers from 'resolvers';
import { typeDefs } from 'typeDefs';

const app = express();
const PORT = process.env.PORT != null ? parseInt(process.env.PORT, 10) : 8000;

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
        resolvers,
        typeDefs,
    },
);

apollo.applyMiddleware({
    app,
    path: '/graphql',
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
