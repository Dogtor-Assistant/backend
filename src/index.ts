import { authenticationRequired, router as auth } from 'authentication';
import cors from 'cors';
import express from 'express';

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
app.get('/secret', authenticationRequired, (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = req.authenticated!.id;
    return res.send(`Secret for user ${id}: 42`);
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
