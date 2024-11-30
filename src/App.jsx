import React from 'react';
import ListLivre from './components/ListLivre';
import Message from './components/Message';
import { EmpruntProvider } from './context/EmpruntContext';

const App = () => {
    return (
        <EmpruntProvider>
            <div>
                <h1 className="text-4xl font-bold mb-6 text-center mt-10">Bibliothèque</h1>
                <Message />
                <ListLivre />
                
            </div>
        </EmpruntProvider>
    );
};

export default App;
