import React from 'react';

const RandomThoughtsPage: React.FC = () => {
    const randomThoughts = [
        "Why do we dream?",
        "What if the universe is a simulation?",
        "Is time travel possible?",
        "What came first, the chicken or the egg?",
        "Do parallel universes exist?",
        "What is the meaning of life?",
        "Can we ever truly know reality?",
        "Why do we laugh?",
        "What if gravity stopped working?",
        "Are we alone in the universe?"
    ];

    const getRandomThought = () => {
        const index = Math.floor(Math.random() * randomThoughts.length);
        return randomThoughts[index];
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h1>Random Thought of the Moment</h1>
            <p style={{ fontSize: '1.5rem', marginTop: '20px' }}>{getRandomThought()}</p>
        </div>
    );
};

export default RandomThoughtsPage;