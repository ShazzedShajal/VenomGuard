// File Path: /src/pages/SymptomDescribe/SymptomDescribe.jsx

import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import snakeData from '../../data/snake_database.json'; // IMPORTANT: Verify this path is correct
import "./style.css"; // Make sure you have this style file or remove the import

// --- REFINED, CLINICALLY-RELEVANT QUESTIONS for Symptoms ---
const symptomQuestions = [
  { 
    id: 'local_pain', 
    text: "At the bite site, is there SEVERE pain and swelling? (কামড়ের স্থানে কি তীব্র ব্যথা এবং ফোলা আছে?)",
    name: 'local_pain',
    maps_to: 'symptom_local_pain', // This links to the "symptom_local_pain" key in the JSON
    options: ['Yes', 'No'] 
  },
  { 
    id: 'hemo',
    text: "Is the patient bleeding from the gums, nose, or in their urine? (রোগীর কি মাড়ি বা নাক থেকে রক্তক্ষরণ হচ্ছে?)",
    name: 'hemo',
    maps_to: 'syndrome_hemo', // This links to the "syndrome_hemo" key
    options: ['Yes', 'No']
  },
  { 
    id: 'neuro',
    text: "Is the patient experiencing drooping eyelids, difficulty speaking, or trouble breathing? (রোগীর কি চোখের পাতা ঝুলে পড়ছে, কথা বলতে বা শ্বাস নিতে কষ্ট হচ্ছে?)",
    name: 'neuro',
    maps_to: 'syndrome_neuro', // This links to the "syndrome_neuro" key
    options: ['Yes', 'No']
  },
  {
    id: 'cyto',
    text: "Is there blistering or blackening of the skin around the bite? (কামড়ের চারপাশে কি ফোসকা বা ত্বক কালো হয়ে যাচ্ছে?)",
    name: 'cyto',
    maps_to: 'syndrome_cyto', // This links to the "syndrome_cyto" key
    options: ['Yes', 'No']
  }
];

function SymptomDescribe() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState(snakeData.map(s => ({ scientific_name: s.scientific_name, score: 0 })));
  const navigate = useNavigate();

  const handleAnswer = (event) => {
    const { name, value } = event.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // --- SCORING LOGIC ENGINE ---
    const questionJustAnswered = symptomQuestions[currentQuestion];
    const answerGiven = answers[questionJustAnswered.name];

    if (answerGiven) {
      const newScores = scores.map(scoreEntry => {
        const snake = snakeData.find(dbSnake => dbSnake.scientific_name === scoreEntry.scientific_name);
        let currentScore = scoreEntry.score;
        const dbKey = questionJustAnswered.maps_to; // e.g., 'syndrome_neuro'
        const answerIsYes = answerGiven === 'Yes';

        // Logic for boolean syndrome flags (true/false in the JSON)
        if (typeof snake[dbKey] === 'boolean') {
          if (snake[dbKey] === answerIsYes) {
            currentScore += 15; // Strong reward for a correct syndrome match
          } else {
            currentScore -= 5; // Penalty if the syndrome does not match
          }
        }
        // Specific logic for the text-based local pain symptom
        else if (dbKey === 'symptom_local_pain') {
            const isSevereInDB = snake[dbKey] === 'Severe';
            if (isSevereInDB === answerIsYes) {
                currentScore += 10; // Reward for matching pain level
            }
        }
        return { ...scoreEntry, score: currentScore };
      });
      setScores(newScores);
    }
    
    // --- NAVIGATION LOGIC ---
    if (currentQuestion < symptomQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Last question was answered, so now we find the result
      const topScoring = scores.sort((a, b) => b.score - a.score)[0];
      const resultData = snakeData.find(s => s.scientific_name === topScoring.scientific_name);
      
      console.log("Final Symptom Scores:", scores.sort((a, b) => b.score - a.score));
      console.log("Top Snake from Symptoms:", resultData);
      
      navigate('/result', { state: { resultData, source: 'symptoms' } });
    }
  };

  const renderQuestion = () => {
    const q = symptomQuestions[currentQuestion];
    return (
      <Container>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Symptom Based Detection</h1>
            <hr className="t_border my-4 ml-0 text-left" />
            <p className="text-muted">Question {currentQuestion + 1} of {symptomQuestions.length}</p>
          </Col>
        </Row>
        <div className="container">
          <label className='labelCheck radio-label form-check-label'>{q.question}</label>
          {q.options.map((option) => (
            <div key={option}>
              <br />
              <input
                type="radio"
                className='radio-input'
                name={q.name}
                value={option}
                checked={answers[q.name] === option}
                onChange={handleAnswer}
              />
              <span className='label'>{option}</span>
            </div>
          ))}
        </div>
      </Container>
    );
  };

  return (
    <div>
      {renderQuestion()}
      <br />
      <div className="container text-start">
        <button type="button" className="mx-0 px-5 btnn" onClick={handleNext}>
          {currentQuestion < symptomQuestions.length - 1 ? 'Next' : 'See Results'}
        </button>
      </div>
      <br />
    </div>
  );
}

export default SymptomDescribe;