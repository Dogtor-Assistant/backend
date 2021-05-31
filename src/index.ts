import type { Request } from 'express';
import type { ExecutionArgs } from 'graphql';

import { authenticationOptional, router as auth } from 'authentication';
import { context } from 'context';
import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { execute } from 'graphql';
import Schema from 'schema';

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
);

app.get('/', (_, res) => res.send('Hello World'));
app.use('/auth', auth);

app.use(
    '/graphql',
    authenticationOptional,
    graphqlHTTP(
        {
            customExecuteFn(args) {
                const request = args.contextValue as Request;
                const newArgs: ExecutionArgs = { ...args, contextValue: context(request) };
                return execute(newArgs);
            },
            graphiql: false,
            rootValue: {},
            schema: Schema,
        },
    ),
);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
