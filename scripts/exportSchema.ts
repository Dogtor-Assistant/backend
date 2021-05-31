
import Schema from '../src/schema';

import fs from 'fs';
import { printSchema } from 'graphql';

const sdl = printSchema(Schema);

fs.writeFileSync('schema.graphql', sdl);
