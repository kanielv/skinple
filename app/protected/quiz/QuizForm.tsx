'use client';

import React, { useEffect, useState } from 'react';
import { submitQuiz } from './actions';

interface Ingredient {
ingredient_id: number;
name: string;
}

interface QuizFormProps {
userId: string;
}

export default function QuizForm({ userId }: QuizFormProps) {
const [ingredients, setIngredients] = useState<Ingredient[]>([]);
const [query, setQuery] = useState('');
const [selected, setSelected] = useState<Ingredient[]>([]);

useEffect(() => {
    fetch('/protected/api/ingredients')
    .then(res => res.json())
    .then(data => setIngredients(data));
}, []);

const filteredIngredients = ingredients.filter(
    i =>
    i.name.toLowerCase().includes(query.toLowerCase()) &&
    !selected.some(sel => sel.ingredient_id === i.ingredient_id)
);

const addIngredient = (ingredient: Ingredient) => {
    setSelected([...selected, ingredient]);
    setQuery('');
};

const removeIngredient = (id: number) => {
    setSelected(selected.filter(i => i.ingredient_id !== id));
};

return (
    <form action={submitQuiz}>
        <input type="hidden" name="userId" value={userId} />

        <label>Pick the option that best describes your skin:</label>
        <div>
            <input type="radio" id="oily" name="skinType" value="oily" />
            <label htmlFor="oily">My skin feels oily</label>
        </div>
        <div>
            <input type="radio" id="dry" name="skinType" value="dry" />
            <label htmlFor="dry">My skin feels dry</label>
        </div>
        <div>
            <input type="radio" id="itchy" name="skinType" value="combination" />
            <label htmlFor="itchy">My skin feels different in some spots than others</label>
        </div>
        <div>
            <input type="radio" id="sensitive" name="skinType" value="sensitive" />
            <label htmlFor="sensitive">My skin seems sensitive and/or reacts to products easily</label>
        </div>

        <label htmlFor="priceMin">Minimum Price (£):</label>
        <input type="number" name="priceMin" id="priceMin" step="1" min="0" />

        <label htmlFor="priceMax">Maximum Price (£):</label>
        <input type="number" name="priceMax" id="priceMax" step="1" min="0" />
            <br />
        <label htmlFor="allergy-search">Search for your allergies:</label>
        <input
            id="allergy-search"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Start typing an ingredient..."
        />

        {query && (
            <ul className="border max-h-40 overflow-y-auto bg-white">
            {filteredIngredients.slice(0, 10).map(ingredient => (
                <li
                key={ingredient.ingredient_id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => addIngredient(ingredient)}
                >
                {ingredient.name}
                </li>
            ))}
            {filteredIngredients.length === 0 && (
                <li className="p-2 text-gray-500">No matches found</li>
            )}
            </ul>
        )}

        {selected.length > 0 && (
            <div className="mt-4">
            <p>Selected allergies:</p>
            <ul className="flex flex-wrap gap-2">
                {selected.map(ingredient => (
                <li key={ingredient.ingredient_id} className="bg-gray-200 px-2 py-1 rounded">
                    {ingredient.name}
                    <button
                    type="button"
                    onClick={() => removeIngredient(ingredient.ingredient_id)}
                    className="ml-1 text-red-600"
                    >
                    ×
                    </button>
                    <input
                    type="hidden"
                    name="allergies"
                    value={ingredient.ingredient_id}
                    />
                </li>
                ))}
            </ul>
            </div>
        )}
        <br />
        <button type="submit" className="submit-btn mt-4">Submit Quiz</button>
    </form>
);
}
