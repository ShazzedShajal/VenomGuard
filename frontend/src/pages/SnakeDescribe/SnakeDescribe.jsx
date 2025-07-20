// File Path: Snake Anti venom\project_v_3\Frontend\src\pages\SnakeDescribe\SnakeDescribe.jsx

import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import snakeData from '../../snake_database.json'; // Verify this path
import "./style.css"; 

const characteristicQuestions = [
  // ... (Your refined questions go here) ...
  { id: 'head_shape', question: "What was the shape of the snake’s head? (সাপের মাথার আকৃতি কেমন?)", name: 'head_shape', options: ['Triangular', 'Oval', 'Hood'] },
  { id: 'pattern', question: "What was the main pattern on the snake's body? (সাপের গায়ে প্রধান প্যাটার্ন কী ছিল?)", name: 'pattern', options: ['Bands', 'Diamonds, Ovals, Chain-like', 'Checkered', 'Solid / Plain'] },
  { id: 'time', question: "What time of day did you see the snake? (আপনি সাপটি কখন দেখেছেন?)", name: 'time', options: ['Day', 'Night'] },
  { id: 'location', question: "Where was the snake found? (সাপটি কোথায় পাওয়া গেছে?)", name: 'location', options: ['Near water', 'Trees, Bushes', 'Field, Grassland, Farmland', 'Near Homes, Fields, Cracks in floors'] }
];

function SnakeDescribe() {
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
    const questionJustAnswered = characteristicQuestions[currentQuestion];
    const answerGiven = answers[questionJustAnswered.name];

    if (answerGiven) {
      const newScores = scores.map(scoreEntry => {
        const snake = snakeData.find(dbSnake => dbSnake.scientific_name === scoreEntry.scientific_name);
        let currentScore = scoreEntry.score;
        const dbKey = `characteristic_${questionJustAnswered.id}`;
        const snakeCharacteristic = snake[dbKey];
        if (snakeCharacteristic && snakeCharacteristic.includes(answerGiven)) {
          currentScore += 10;
        } else {
          currentScore -= 2;
        }
        return { ...scoreEntry, score: currentScore };
      });
      setScores(newScores);
    }
    
    if (currentQuestion < characteristicQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Show results inline instead of navigating
      console.log("Final 'See Results' button clicked!");

      const topScoring = scores.sort((a, b) => b.score - a.score)[0];
      console.log("Top scoring snake is:", topScoring);

      const foundSnake = snakeData.find(s => s.scientific_name === topScoring.scientific_name);
      console.log("Found snake data:", foundSnake);

      setResultData(foundSnake);
      setShowResults(true);
    }
  };

  const renderQuestion = () => {
    const q = characteristicQuestions[currentQuestion];
    return (
      <Container>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Snake Characteristics</h1>
            <hr className="t_border my-4 ml-0 text-left" />
            <p className="text-muted">Question {currentQuestion + 1} of {characteristicQuestions.length}</p>
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
              <h1 className="display-4 mb-3">🐍 Snake Identification Result</h1>
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
              {currentQuestion < characteristicQuestions.length - 1 ? 'Next' : 'See Results'}
            </button>
          </div>
          <br />
        </>
      )}
    </div>
  );
}

export default SnakeDescribe;