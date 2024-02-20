import React, { useState, useEffect } from 'react';
import { GET } from './services/fetcher';

interface AppProps {}

const App: React.FC<AppProps> = () => {
    const [data, setBooks] = useState('');

    useEffect(() => {
        GET('/api/books').then(setBooks);
    }, []);

    return (
        <div className="mx-auto mt-5 w-25">
            <div className="alert alert-info text-center">Hello {data}</div>
        </div>
    );
};

export default App;