import React, { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export const EmpruntContext = createContext();

export const EmpruntProvider = ({ children }) => {
    const [emprunts, setEmprunts] = useState([]);
    const [livres, setLivres] = useState([]); 

    const EmpruntLivre = (livre) => {
        if (!emprunts.some((e) => e.id === livre.id)) {
            setEmprunts((prev) => [...prev, livre]); 
            toast.success('Livre emprunté avec succès.');
        } else {
            toast.error('Ce livre est déjà emprunté.');
        }
    };

    const returnLivre = (id) => {
        const livreIndex = emprunts.findIndex((l) => l.id === id); 
        if (livreIndex !== -1) {
            setEmprunts((prev) => prev.filter((l) => l.id !== id));
            setLivres((prev) =>
                prev.map((l) => 
                    l.id === id ? { ...l, disponible: true } : l
                )
            );
            toast.success('Livre rendu avec succès.');
        }
    };

    return (
        <EmpruntContext.Provider value={{ emprunts, EmpruntLivre, returnLivre, livres }}>
            {children}
        </EmpruntContext.Provider>
    );
};
