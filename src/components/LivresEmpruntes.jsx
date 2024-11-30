import React, { useContext } from 'react';
import { EmpruntContext } from '../context/EmpruntContext';

const LivresEmpruntes = () => {
    const { emprunts, returnLivre } = useContext(EmpruntContext);

    if (emprunts.length === 0) {
        return <p className="text-center mt-4">Aucun livre emprunté pour le moment.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:h-[100px] md:w-[30%]">
            <h1 className="text-2xl font-bold mb-6 text-center">Livres Emprunté</h1>
            {emprunts.map((livre) => (
                <div
                    key={livre.id}
                    className="bg-white shadow-md rounded-md p-4 border border-gray-200 md:flex md:justify-between md:items-center"
                >
                    <div>
                        <h2 className="text-lg font-semibold">{livre.titre}</h2>
                        <p className="text-gray-600">Auteur: {livre.auteur}</p>
                    </div>

                    <button
                        onClick={() => returnLivre(livre.id)} 
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Rendre le Livre
                    </button>
                </div>
            ))}
        </div>
    );
};

export default LivresEmpruntes;
