import express from 'express';
import cors from 'cors';
import routes from './routes'; // You need to define your routes
import { tokenCheck } from './middlewares/tokenCheck'; // Import the tokenCheck middleware

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();

if (isDevelopment) {
    app.use(cors());
}

if (isProduction) {
    app.use(express.static('public'));
}

app.use(express.json());

// Apply the tokenCheck middleware to secure routes that require authentication
app.use('/api/secure', tokenCheck);

// Define your API routes
app.use('/api', routes);

app.get('/api/hello', (req, res) => {
    res.json({ message: 'World' });
});

if (isProduction) {
    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: 'public' });
    });
}

const PORT = process.env.PORT || 3000; // Use the original port 3000

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});
