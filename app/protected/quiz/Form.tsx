"use client";
import { useState } from 'react';
import { quizSubmitAction } from '@/app/protected/quiz/actions'
import './quiz.css';


export default function MyForm() {
    const [userName, setName] = useState("");
    
    // Check all checks to be an object
    const allChecks = [
      {name: "My skin feels oily",id:"oily", checked:false},
      {name: "My skin feels dry",id:"dry", checked:false},
      {name: "My skin feels different in some spots than others",id:"itchy", checked:false},
      {name: "My skin seems sensitive and/or reacts to products easily",id:"sensitive", checked:false},
      {name: "I am allergic",id:"latex", checked:false},
    ]

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // const formData = new FormData(event.g)
        quizSubmitAction();
        console.log("Name", userName);
        console.log("Results:", checks);
      
    }

    const Checkbox= ({ isChecked, label, checkHandler, index }: {isChecked:any, label:any, checkHandler:any, index:any}) => {
      return (
        <div>
          <input
            type="checkbox"
            id={`checkbox-${index}`}
            checked={isChecked}
            onChange={checkHandler}
          />
          <label htmlFor={`checkbox-${index}`}>{label}</label>
        </div>
      )
    }
    const[checks, setChecks] = useState(allChecks);
    const updateCheckStatus = (index: any) => {
      setChecks(checks.map((check, currentIndex) => currentIndex === index ? { ...check, checked: !check.checked } : check))
    }
    return (
        
        // TODO: change back to handleSubmit
        <form onSubmit={handleSubmit}>
        <label>Enter your name:
          <input type="text" value = {userName} onChange={(e) => setName(e.target.value)}/>
        </label>
        <br />
        <label> Check each box if you agree with the statement next to it:
        {checks.map((check, index) => (
        <Checkbox
          key={check.name}
          isChecked={check.checked}
          checkHandler={() => updateCheckStatus(index)}
          label={check.name}
          index={index}
        />
      ))}
      </label>
        <br />
        <input type="submit" />
      </form>
      
    );
  }