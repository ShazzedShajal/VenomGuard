// File Path: Frontend/src/pages/SymptomDescribe/SymptomDescribe.jsx

import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import snakeData from '../../snake_database.json'; // Fixed path
import "./style.css";

// --- REFINED, CLINICALLY-RELEVANT QUESTIONS for Symptoms ---
const symptomQuestions = [
  { 
    id: 'local_pain', 
    question: "At the bite site, is there SEVERE pain and swelling? (কামড়ের স্থানে কি তীব্র ব্যথা এবং ফোলা আছে?)",
    name: 'local_pain',
    maps_to: 'symptom_local_pain', // This links to the "symptom_local_pain" key in the JSON
    options: ['Yes', 'No'] 
  },
  { 
    id: 'hemo',
    question: "Is the patient bleeding from the gums, nose, or in their urine? (রোগীর কি মাড়ি বা নাক থেকে রক্তক্ষরণ হচ্ছে?)",
    name: 'hemo',
    maps_to: 'syndrome_hemo', // This links to the "syndrome_hemo" key
    options: ['Yes', 'No']
  },
  { 
    id: 'neuro',
    question: "Is the patient experiencing drooping eyelids, difficulty speaking, or trouble breathing? (রোগীর কি চোখের পাতা ঝুলে পড়ছে, কথা বলতে বা শ্বাস নিতে কষ্ট হচ্ছে?)",
    name: 'neuro',
    maps_to: 'syndrome_neuro', // This links to the "syndrome_neuro" key
    options: ['Yes', 'No']
  },
  {
    id: 'cyto',
    question: "Is there blistering or blackening of the skin around the bite? (কামড়ের চারপাশে কি ফোসকা বা ত্বক কালো হয়ে যাচ্ছে?)",
    name: 'cyto',
    maps_to: 'syndrome_cyto', // This links to the "syndrome_cyto" key
    options: ['Yes', 'No']
  }
];

function SymptomDescribe() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState(snakeData.map(s => ({ scientific_name: s.scientific_name, score: 0 })));
  const [showResults, setShowResults] = useState(false);
  const [resultData, setResultData] = useState(null);
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
      // Show results inline instead of navigating
      const topScoring = scores.sort((a, b) => b.score - a.score)[0];
      const foundSnake = snakeData.find(s => s.scientific_name === topScoring.scientific_name);
      
      console.log("Final Symptom Scores:", scores.sort((a, b) => b.score - a.score));
      console.log("Top Snake from Symptoms:", foundSnake);
      
      setResultData(foundSnake);
      setShowResults(true);
    }
  };

  const renderQuestion = () => {
    const q = symptomQuestions[currentQuestion];
    return (
      <Container>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">🩺 Symptom Based Detection</h1>
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

  const renderResults = () => {
    if (!resultData) return null;

    return (
      <Container>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="10" className="mx-auto">
            <div className="result-header text-center mb-4">
              <h1 className="display-4 mb-3">🩺 Symptom Analysis Result</h1>
              <hr className="t_border my-4 mx-auto" style={{width: '200px'}} />
            </div>

            <div className="result-card">
              <Row>
                <Col md="6" className="mb-4">
                  <div className="snake-image-container">
                    <img 
                      src={resultData.image_url} 
                      alt={resultData.common_name}
                      className="snake-result-image"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-snake.jpg';
                      }}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="snake-info">
                    <h2 className="snake-name">{resultData.common_name}</h2>
                    <p className="scientific-name">{resultData.scientific_name}</p>
                    <p className="local-name">{resultData.local_name}</p>
                    
                    <div className="venom-status mb-3">
                      <span className={`venom-badge ${resultData.is_venomous ? 'venomous' : 'non-venomous'}`}>
                        {resultData.venom_status_text}
                      </span>
                    </div>

                    <div className="snake-details">
                      <div className="detail-row">
                        <span className="detail-label">Key Feature</span>
                        <span className="detail-value">{resultData.distinguishing_feature}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Antivenom</span>
                        <span className="detail-value antivenom">{resultData.antivenom}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Notes</span>
                        <span className="detail-value">{resultData.antivenom_notes}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="result-actions text-center mt-4">
              <button 
                className="btnn mx-2" 
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setScores(snakeData.map(s => ({ scientific_name: s.scientific_name, score: 0 })));
                }}
              >
                Start Over
              </button>
              <button 
                className="btnn mx-2" 
                onClick={() => navigate('/home')}
              >
                Back to Home
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <div>
      {showResults ? (
        renderResults()
      ) : (
        <>
          {renderQuestion()}
          <br />
          <div className="container text-start">
            <button type="button" className="mx-0 px-5 btnn" onClick={handleNext}>
              {currentQuestion < symptomQuestions.length - 1 ? 'Next' : 'See Results'}
            </button>
          </div>
          <br />
        </>
      )}
    </div>
  );
}

export default SymptomDescribe;
