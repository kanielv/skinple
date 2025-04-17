'use client';

import React, { useEffect, useState } from 'react';
import { submitQuiz } from './actions';
import './quiz.css';
import './../../../style.css';
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
        <hr></hr>

        <label>How would you describe your skin's natural moisture level?</label>
        <div>
            <input type="radio" id="oily" name="skinType" value="oily" />
            <label htmlFor="oily">My skin is generally shiny and oily.</label>
        </div>
        <div>
            <input type="radio" id="dry" name="skinType" value="dry" />
            <label htmlFor="dry">My skin feels dry and flaky.</label>
        </div>
        <div>
            <input type="radio" id="itchy" name="skinType" value="combination" />
            <label htmlFor="itchy">My skin is oily in some areas (like the T-zone) but dry in others.</label>
        </div>
        <div>
            <input type="radio" id="unsure" name="skinType" value="none" />
            <label htmlFor="unsure">I'm not sure.</label>
        </div>
        <hr></hr>

        <label>What is the typical climate or environment where you live?</label>
        <div>
            <input type="radio" id="humid" name="climate" value="humid" />
            <label htmlFor="humid">Very humid</label>
        </div>
        <div>
            <input type="radio" id="someHumid" name="climate" value="someHumid" />
            <label htmlFor="someHumid">Somewhat humid</label>
        </div>
        <div>
            <input type="radio" id="average" name="climate" value="average" />
            <label htmlFor="average">Average (neither very humid nor very dry)</label>
        </div>
        <div>
            <input type="radio" id="someDry" name="climate" value="someDry" />
            <label htmlFor="someDry">Somewhat dry</label>
        </div>
        <div>
            <input type="radio" id="dry" name="climate" value="dry" />
            <label htmlFor="dry">Very dry</label>
        </div>
        <hr></hr>

        <label>Have you ever experienced irritation or redness after using skincare products?</label>
        <div>
            <input type="radio" id="sensitive" name="sensitivity" value="true" />
            <label htmlFor="sensitive">Yes</label>
        </div>
        <div>
            <input type="radio" id="notsensitive" name="sensitivity" value="false" />
            <label htmlFor="notsensitive">No</label>
        </div>
        <hr></hr>

        <label>If yes, what type of reaction did you experience? (Select all that apply)</label>
        <div>
            <input type="checkbox" id="dum" name="dum" value="dum" />
            <label htmlFor="oily">Redness</label>
        </div>
        <div>
            <input type="checkbox" id="dum" name="dum" value="dum" />
            <label htmlFor="dry">Itchy</label>
        </div>
        <div>
            <input type="checkbox" id="dum" name="dum" value="dum" />
            <label htmlFor="itchy">Swelling</label>
        </div>
        <div>
            <input type="checkbox" id="dum" name="dum" value="dum" />
            <label htmlFor="unsure">Rash</label>
        </div>
        <div>
            <label htmlFor="reactionDetails">If other, please describe the reaction: </label>
            <input
            type="text"
            id="reactionDetails"
            name="reactionDetails"
            placeholder="Describe your reaction..."
            />
        </div>
        <hr></hr>
        <label htmlFor="allergy-search">Which skincare ingredients do you want to avoid due to allergies or sensitivities? (E.g. fragrances - eugenol, preservatives - parabens, etc.) </label>
        <input
            id="allergy-search"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Start typing an ingredient..."
        />
        
        <hr></hr>
        <label htmlFor="priceMin">Minimum Price ($): </label>
        <input type="number" name="priceMin" id="priceMin" step="1" min="0" placeholder="Start typing a price..."/>
        <hr></hr>

        <label htmlFor="priceMax">Maximum Price ($): </label>
        <input type="number" name="priceMax" id="priceMax" step="1" min="0" placeholder="Start typing a price..."/>
            <br />

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
        <button type="submit" className="submit-btn mt-4"><b>Submit Survey</b></button>
    </form>
);
}
