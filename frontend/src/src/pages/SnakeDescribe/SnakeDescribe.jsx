import React, { useState } from 'react';
import { Container, Row, Col, Alert } from "react-bootstrap";
import "./style.css";


function SnakeDescribe() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      setIsSubmitted(true); // Update state to show the thank-you message
    };
  const questions = [
    { id: 1, question: "What is the dominant color of the snake?(সাপের প্রধান রঙ কী?)", type: 'radio', name: 'color',options:['Black (কালো)',' Green (সবুজ)','Brown (বাদামী)','Yellow (হলুদ)','Red (লাল)','white (সাদা)','Gray (ধূসর)','Blue(নীল)'] },
    { id: 2, question: "Does the snake have any distinct patterns?(সাপের গায়ে কোনো নির্দিষ্ট প্যাটার্ন আছে কি?)", type: 'radio', name: 'pattern',options:['Stripes (দাগ বা ফিতা)','Bands (ব্যান্ড)',' Blotches (চিহ্ন বা বিন্দু)','Solid color (একরঙা)','Other (অন্য কিছু)'] },
    { id: 3, question: "What is the shape of the snake’s head? (সাপের মাথার আকৃতি কেমন?)", type: 'radio', name: 'head', options: ['Oval (ডিম্বাকৃতি)', 'Triangular ( ত্রিভুজাকার)','Flat (সমতল)'] },
    { id: 4, question: "What type of pupil does the snake have? (সাপের চোখের মনি কেমন?)", type: 'radio', name: 'pupil',options:['Round (গোলাকার)','Elliptical (ডিম্বাকৃতি)','Unable to see (দেখা যায়নি)'] },
    { id: 5, question: "What is the approximate size of the snake? (সাপের আনুমানিক আকার কত?)", type: 'radio', name: 'pupil',options:['Small (<1m) (ছোট (<১ মিটার))','Medium (মাঝারি (১-২ মিটার))','Large (বড় (>২ মিটার))'] },
    { id: 7, question: "Did the snake take any defensive posture? (সাপ কি কোনো প্রতিরক্ষামূলক ভঙ্গি গ্রহণ করেছে?)", type: 'radio', name: 'posture',options:['Raised head (মাথা উঁচু করা)',' Coiled body (দেহ কুণ্ডলী পাকানো)','Flattened neck (গলার অংশ চওড়া করা)','None ( কিছুই নয়)'] },
    { id: 8, question: "Where was the snake found? (সাপটি কোথায় পাওয়া গেছে?)", type: 'radio', name: 'region',options:['Forest (জঙ্গল)','Grassland (ঘাস জমি)','Desert (মরুভূমি)','Near water (পানির কাছাকাছি)','Desert(শহুরে এলাকা)'] },
    { id: 9, question: "What time of day did you observe the snake? (আপনি সাপটি দিন-রাতের কোন সময়ে দেখেছেন?)", type: 'radio', name: 'time',options:['Morning (সকাল)','Afternoon (দুপুর)','Evening (সন্ধ্যা)','Night (রাত)'] },
    { id: 10, question: "Does the snake have visible fangs? (সাপের কি দৃশ্যমান ফণা দেখা গেছে?)", type: 'radio', name: 'fangs',options:['Yes (হ্যাঁ)','No (না)','Unsure (নিশ্চিত নয়)'] },
    { id: 11, question: "Does the snake have any hood or neck expansion? (সাপের কি কোনো ফণা বা গলার অংশ চওড়া ছিল?)", type: 'radio', name: 'neckExpansion',options:['Yes (হ্যাঁ)','No (না)'] },
    { id: 12, question: "Does the snake have a rattle at the end of its tail? (সাপের লেজের শেষে কি কোনো ঝাঁঝরি ছিল)", type: 'radio', name: 'rattle',options:['Yes (হ্যাঁ)','No (না)'] },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question index
  const [answers, setAnswers] = useState({}); // Store answers

  const handleAnswer = (event) => {
    const { name, value } = event.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      alert('Thank you for completing the questionnaire!\n' + JSON.stringify(answers, null, 2));
      
    }
  };

  const renderQuestion = () => {
    const q = questions[currentQuestion];
    if (q.type === 'text' || q.type === 'number') {
      return (
        <div className='container'>
          <Row className="mb-5 mt-3 pt-md-3">
              <Col lg="8">
                <h1 className="display-4 mb-4"> Snake Characteristics Based Detection</h1>{" "}
                <hr className="t_border my-4 ml-0 text-left" />
              </Col>
            </Row>
            

        <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
                <div className='px-5'>
                    <div className="intro_btn-action pb-5 px-5 mx-auto container">

                    <label>{q.question}</label>
                    <br />
                        <input className="input-lg"
                            type={q.type}
                            name={q.name}
                            value={answers[q.name] || ''}
                            onChange={handleAnswer}
                        />
                    </div>
                </div>
         
            </Col>
        </Row>
        </div>
      );
    }
    if (q.type === 'radio') {
      return (
        <div className='container'>
          <Row className="mb-5 mt-3 pt-md-3">
              <Col lg="8">
                <h1 className="display-4 mb-4"> Snake Characteristics Based Detection</h1>{" "}
                <hr className="t_border my-4 ml-0 text-left" />
              </Col>
            </Row>
            <div className=""></div>
            <div className="container">
            <label className=' labelCheck radio-label form-check-label'>{q.question}</label>
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
          
        </div>
      );
    }
    if (q.type === 'textarea') {
      return (
        <div className="container">
          <Row className="mb-5 mt-3 pt-md-3">
              <Col lg="8">
                <h1 className="display-4 mb-4"> Snake Characteristics Based Detection</h1>{" "}
                <hr className="t_border my-4 ml-0 text-left" />
              </Col>
            </Row>
          <label>{q.question}</label>
          <textarea
            name={q.name}
            value={answers[q.name] || ''}
            onChange={handleAnswer}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
        {renderQuestion()}
        <br />
          <div className="container text-start">
            <button type="button"className="mx-0 px-5 btnn" onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? 'Next':
              <button type="submit"className="mx-0 px-5 sub">Submit</button>}
            </button>
          </div>
          <br />
                        
                    
      </form>
      ) : (
        <div className='container'>
          <Row className="mb-5 mt-3 pt-md-3">
              <Col lg="8">
                <h1 className="display-4 mb-4"> Snake Characteristics Based Detection</h1>{" "}
                <hr className="t_border my-4 ml-0 text-left" />
              </Col>
            </Row>
            <div >
            <h2>Thank You!</h2>
            <p>Your Answers are processing</p>
            </div>
          
        </div>
      )}
     

    </div>
  );
}

export default SnakeDescribe;
