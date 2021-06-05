
import { ApolloServer } from 'apollo-server-express';
import { authenticationOptional, router as auth } from 'authentication';
import { context } from 'context';
import cors from 'cors';
import express from 'express';
import User from 'models/User';
import mongoose from 'mongoose';
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

app.get('/user/:id', async function(req, res) {
    const id = req.params.id;
    const user = await User.findOne({ 'firstName': `Dogtor${id}` });

    if (!user) {
        res.status(400).send("User doesn't exist");
    }
    else {
        res.status(200).json(user);
    }
});

const apollo = new ApolloServer(
    {
        context: ({ req }) => {
            return context(req);
        },
        introspection: true,
        playground: true,
        resolvers,
        typeDefs,
    },
);

apollo.applyMiddleware({
    app,
    path: '/graphql',
});

// database connection
const dbURI = 'mongodb://dogtorAdmin:DogtorFun!@snf-883170.vm.okeanos.grnet.gr:27017/dogtorDB';
mongoose.connect(dbURI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log(err);
        console.log('💾[database]: An error occured while trying to connect');
    }
    else {
        console.log('💾[database]: Connected to database successfully');
    }
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
