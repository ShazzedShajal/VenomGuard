import React, { useState } from "react";
import * as emailjs from "emailjs-com";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig } from "../../content_option";
import { Link } from "react-router-dom";

export const Questioniar = () => {
  return(
    <HelmetProvider>
      <div className="questionnaire-container">
        <Container>
          <Helmet>
            <meta charSet="utf-8" />
            <title>VenomGuard | Questionnaire Detection</title>
            <meta name="description" content="Snake identification through questionnaire-based detection system" />
          </Helmet>

          {/* Header Section */}
          <Row className="justify-content-center text-center mb-4">
            <Col lg="10">
              <div className="page-header">
                <h1 className="display-4 mb-3 questionnaire-title">
                  Questionnaire Based Detection
                </h1>
              </div>
            </Col>
          </Row>

          {/* Main Question Section */}
          <Row className="justify-content-center">
            <Col lg="8" md="10">
              <div className="question-card">
                <div className="question-icon">
                  🤔
                </div>
                <h2 className="question-text">
                  Could you describe the Snake?
                </h2>

                <div className="options-container">
                  <Link to="/SnakeDescribe" className="option-link">
                    <div className="option-card option-yes">
                      <div className="option-icon">✅</div>
                      <h3>Yes, I can describe it</h3>
                      <p>I saw the snake and can describe its physical characteristics</p>
                      <div className="option-arrow">→</div>
                    </div>
                  </Link>

                  <Link to="/SymptomDescribe" className="option-link">
                    <div className="option-card option-no">
                      <div className="option-icon">🩺</div>
                      <h3>No, but I have symptoms</h3>
                      <p>I was bitten and want to describe the symptoms</p>
                      <div className="option-arrow">→</div>
                    </div>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>


        </Container>
      </div>
    </HelmetProvider>
  );
};
