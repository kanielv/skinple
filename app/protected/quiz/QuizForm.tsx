"use client";
import React from 'react';
import { submitQuiz } from './actions';
import './quiz.css';

interface Allergy {
  allergy_id: number;
  name: string;
}

interface QuizFormProps {
  userId: string;
  allergies: Allergy[];
}

export default function QuizForm({ userId, allergies }: QuizFormProps) {
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

            <label htmlFor="priceMin">Minimum Price:</label>
            <input type="number" id="priceMin" name="priceMin" min="0" step="1" />

            <label htmlFor="priceMax">Maximum Price:</label>
            <input type="number" id="priceMax" name="priceMax" min="0" step="1" />
            <br />

            
            <label>Do you have any allergies?</label>
            <div>
                {allergies.map(allergy => (
                    <div key={allergy.allergy_id}>
                        <input
                            type="checkbox"
                            id={`allergy-${allergy.allergy_id}`}
                            name="allergies"
                            value={allergy.allergy_id}
                        />
                        <label htmlFor={`allergy-${allergy.allergy_id}`}>{allergy.name}</label>
                    </div>
                ))}
            </div>

            <button type="submit">Submit Quiz</button>
        </form>
    );
}
