import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express from 'express';
import cors from 'cors';
import { registerUser } from './register';
import { checkDuplicate } from './serarch';
import { generateCertificate } from './utils/certificate';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/register', checkDuplicate, registerUser);
app.post('/api/download-certificate', generateCertificate);
app.put('/api/download-certificate', generateCertificate);

app.listen(PORT, () => {   
  console.log(`Server is running on port ${PORT}`);
}
);