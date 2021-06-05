
import { typeDefs } from '../src/typeDefs';

import fs from 'fs';
import { buildASTSchema, printSchema } from 'graphql';

const schema = buildASTSchema(typeDefs);
const sdl = printSchema(schema);

fs.writeFileSync('schema.graphql', sdl);
