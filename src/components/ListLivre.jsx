import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Ban, Book, BookOpen, Loader } from 'lucide-react';
import { fetchLivres } from '../service/api';
import { EmpruntContext } from '../context/EmpruntContext';
import LivresEmpruntes from './LivresEmpruntes';

const ListLivre = () => {
    const [livres, setLivres] = useState([]);
    const [loading, setLoading] = useState(true);
    const { emprunts, EmpruntLivre, returnLivre } = useContext(EmpruntContext);

    useEffect(() => {
        const loadLivres = async () => {
            const data = await fetchLivres();
            setLivres(data);
            setLoading(false);
        };
        loadLivres();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Liste des Livres</h1>
            <div className="flex flex-col md:flex-row md:space-x-4">
                <motion.ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {livres.map((livre) => (
                        <motion.li
                            key={livre.id}
                            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-xl font-semibold mb-2">{livre.titre}</h2>
                            <p className="text-gray-600 mb-4">par {livre.auteur}</p>
                            {livre.disponible ? (
                                <button
                                    onClick={() => EmpruntLivre(livre)}
                                    disabled={emprunts.some((e) => e.id === livre.id)}
                                    className={`flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 ${emprunts.some((e) => e.id === livre.id) ? 'cursor-not-allowed opacity-50' : ''}`}
                                >
                                    <Book className="w-5 h-5 mr-2" />
                                    Emprunter
                                </button>
                            ) : (
                                <div
                                    
                                    
                                    className="flex items-center justify-center w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
                                >
                                    <Ban className="w-5 h-5 mr-2" />
                                    Non Disponible
                                </div>
                            )}
                        </motion.li>
                    ))}
                </motion.ul>
                <LivresEmpruntes />
            </div>
        </div>
    );
};

export default ListLivre;
