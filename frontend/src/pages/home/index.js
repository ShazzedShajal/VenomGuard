import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Badge } from "react-bootstrap";
import snakeDatabase from "../../snake_database.json";

export const Home = () => {
  const [currentSnake, setCurrentSnake] = useState(0);
  const [stats, setStats] = useState({
    totalSnakes: 0,
    venomousCount: 0,
    nonVenomousCount: 0
  });

  useEffect(() => {
    // Calculate stats from snake database
    const venomous = snakeDatabase.filter(snake => snake.is_venomous).length;
    const nonVenomous = snakeDatabase.length - venomous;
    
    setStats({
      totalSnakes: snakeDatabase.length,
      venomousCount: venomous,
      nonVenomousCount: nonVenomous
    });

    // Rotate featured snake every 5 seconds
    const interval = setInterval(() => {
      setCurrentSnake(prev => (prev + 1) % Math.min(6, snakeDatabase.length));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title} - AI Snake Identification System</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      {/* Modern Hero Section */}
      <section className="modern-hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        
        <Container className="hero-container">
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-content">
              <div className="hero-badge">
                <span>💉 Snake Antivenom Prediction</span>
              </div>
              
              <h1 className="hero-title">
                {introdata.title}
              </h1>
              
              <div className="hero-subtitle">
                <Typewriter
                  options={{
                    strings: [
                      "Instant Snake Identification to Save Lives",
                      "Life-Saving Antivenom Recommendations", 
                      "Protecting Lives Across Bangladesh"
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                    delay: 100,
                  }}
                />
              </div>
              
              <p className="hero-description">
                Get immediate, AI-powered snake identification, critical medical guidance, and recommended antivenom protocols for healthcare professionals and individuals.
              </p>
              
              <div className="hero-actions">
                <Link to="/ImgBased">
                  <Button className="primary-btn">
                    <span className="btn-icon">📸</span>
                    Start Identification
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline-primary" className="secondary-btn">
                    Learn More
                  </Button>
                </Link>
              </div>
              
              <div className="hero-stats">
                <div className="stat-card">
                  <div className="stat-number">{stats.totalSnakes}</div>
                  <div className="stat-label">Snake Species</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number stat-venomous">{stats.venomousCount}</div>
                  <div className="stat-label">Venomous</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number stat-non-venomous">{stats.nonVenomousCount}</div>
                  <div className="stat-label">Non-Venomous</div>
                </div>
              </div>
            </Col>
            
            <Col lg={6} className="hero-visual">
              <div className="snake-showcase">
                <div className="showcase-card">
                  {snakeDatabase.length > 0 && (
                    <>
                      <div className="snake-icon">
                        <div className="icon-circle">
                          🐍
                        </div>
                      </div>

                      <div className="snake-info">
                        <h3 className="snake-title">
                          {snakeDatabase[currentSnake]?.common_name?.split(',')[0]?.trim()}
                        </h3>
                        <p className="scientific-name">
                          {snakeDatabase[currentSnake]?.scientific_name}
                        </p>
                        <p className="local-name">
                          {snakeDatabase[currentSnake]?.local_name}
                        </p>

                        <div className="venom-status">
                          <span className={`status-badge ${snakeDatabase[currentSnake]?.is_venomous ? 'highly-venomous' : 'non-venomous'}`}>
                            {snakeDatabase[currentSnake]?.is_venomous ? '🔴 Highly Venomous' : '🟢 Non-Venomous'}
                          </span>
                        </div>

                        <div className="snake-details">
                          <div className="detail-row">
                            <span className="detail-label">Danger Level</span>
                            <span className={`detail-value ${snakeDatabase[currentSnake]?.is_venomous ? 'critical' : 'safe'}`}>
                              {snakeDatabase[currentSnake]?.is_venomous ? 'Critical' : 'Safe'}
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Region</span>
                            <span className="detail-value">South Asia</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Antivenom</span>
                            <span className="detail-value antivenom">{snakeDatabase[currentSnake]?.antivenom}</span>

                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    

      {/* Identification Methods */}
      <section className="identification-methods">
        <Container>
          <div className="section-header text-center">
            <h2>Three Ways to <span className="brand-highlight">Identify Snakes</span></h2>
            <p>Choose the identification method that works best for your situation</p>
          </div>

          <Row className="method-cards">
            <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mb-4">
              <div className="method-card image-method">
                <div className="method-icon-wrapper">
                  <div className="method-icon green">
                    <i className="fas fa-camera"></i>
                  </div>
                </div>

                <h4 className="method-title">Image Analysis</h4>
                <p className="method-subtitle">AI-Powered Snake Identification</p>

                <div className="method-badge green">
                  <span>Highest Accuracy</span>
                </div>

                <div className="method-details">
                  <div className="detail-row">
                    <span className="detail-label">Speed</span>
                    <span className="detail-value green">Instant</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Requirements</span>
                    <span className="detail-value">Photo Only</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Accuracy</span>
                    <span className="detail-value">65.5%+</span>
                  </div>
                </div>

                <Link to="/ImgBased">
                  <Button className="method-btn green">Start Image Analysis</Button>
                </Link>
              </div>
            </Col>

            <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mb-4">
              <div className="method-card features-method">
                <div className="method-icon-wrapper">
                  <div className="method-icon orange">
                    <i className="fas fa-eye"></i>
                  </div>
                </div>

                <h4 className="method-title">Visual Features</h4>
                <p className="method-subtitle">Feature-Based Identification</p>

                <div className="method-badge orange">
                  <span>Step-by-Step</span>
                </div>

                <div className="method-details">
                  <div className="detail-row">
                    <span className="detail-label">Speed</span>
                    <span className="detail-value orange">5-10 mins</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Requirements</span>
                    <span className="detail-value">No Photo</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Accuracy</span>
                    <span className="detail-value">High</span>
                  </div>
                </div>

                <Link to="/Questioniar">
                  <Button className="method-btn orange">Start Questionnaire</Button>
                </Link>
              </div>
            </Col>

            <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mb-4">
              <div className="method-card symptoms-method">
                <div className="method-icon-wrapper">
                  <div className="method-icon red">
                    <i className="fas fa-heartbeat"></i>
                  </div>
                </div>

                <h4 className="method-title">Medical Symptoms</h4>
                <p className="method-subtitle">Emergency Identification</p>

                <div className="method-badge red">
                  <span>Emergency</span>
                </div>

                <div className="method-details">
                  <div className="detail-row">
                    <span className="detail-label">Speed</span>
                    <span className="detail-value red">Urgent</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Requirements</span>
                    <span className="detail-value">Symptoms</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Treatment</span>
                    <span className="detail-value green">Included</span>
                  </div>
                </div>

                <Link to="/SymptomDescribe">
                  <Button className="method-btn red">Analyze Symptoms</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Key Features */}
      <section className="key-features">
        <Container>
          <div className="section-header text-center">
            <h2>Why Choose <span className="brand-highlight">VenomGuard</span>?</h2>
            <p>Advanced technology meets medical expertise for life-saving results</p>
          </div>
          
          <Row>
            <Col lg={3} md={6} className="mb-4">
              <div className="feature-item">
                <div className="feature-icon">🤖</div>
                <h5>AI-Powered</h5>
                <p>Trained on thousands of regional snake images to achieve high-precision identification.</p>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="feature-item">
                <div className="feature-icon">💊</div>
                <h5>Antivenom Database</h5>
                <p>A comprehensive, researched database of venom types and correct antivenom protocols.</p>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="feature-item">
                <div className="feature-icon">🌍</div>
                <h5>Local Expertise</h5>
                <p>Specialized for the snake species of Bangladesh and South Asia to provide context-aware results.</p>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h5>Instant Results</h5>
                <p>Get actionable identification and medical recommendations within seconds.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <Container>
          <div className="section-header text-center">
            <h2>How It Works</h2>
            <p>Simple steps to save lives</p>
          </div>

          <Row className="process-steps">
            <Col lg={3} md={6} sm={6} xs={12} className="mb-4">
              <div className="step-item">
                <div className="step-circle blue">
                  <span className="step-number">1</span>
                </div>
                <div className="step-content">
                  <h5><i className="fas fa-camera"></i> Capture</h5>
                  <p>Take a photo or describe features</p>
                </div>
              </div>
            </Col>

            <Col lg={3} md={6} sm={6} xs={12} className="mb-4">
              <div className="step-item">
                <div className="step-circle purple">
                  <span className="step-number">2</span>
                </div>
                <div className="step-content">
                  <h5><i className="fas fa-brain"></i> Analyze</h5>
                  <p>The system processes your input</p>
                </div>
              </div>
            </Col>

            <Col lg={3} md={6} sm={6} xs={12} className="mb-4">
              <div className="step-item">
                <div className="step-circle green">
                  <span className="step-number">3</span>
                </div>
                <div className="step-content">
                  <h5><i className="fas fa-clipboard-list"></i> Results</h5>
                  <p>Get detailed medical information</p>
                </div>
              </div>
            </Col>

            <Col lg={3} md={6} sm={6} xs={12} className="mb-4">
              <div className="step-item">
                <div className="step-circle red">
                  <span className="step-number">4</span>
                </div>
                <div className="step-content">
                  <h5><i className="fas fa-medkit"></i> Treatment</h5>
                  <p>Follow antivenom guidance</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

        {/* Emergency Alert */}
      <Alert variant="danger" className="emergency-banner">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <Alert.Heading className="mb-2">🚨 Snake Bite Emergency</Alert.Heading>
              <p className="mb-0">
                <strong>Immediate medical attention required!</strong> Call 999 (Bangladesh) or your local emergency services. <br/>
                After seeking help, use this system to assist medical professionals with identification. This subtly reinforces that the app is a support tool, and calling emergency services is the absolute first step.
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button variant="light" size="lg" className="emergency-btn">
                Emergency Guide
              </Button>
            </Col>
          </Row>
        </Container>
      </Alert>

      {/* Footer */}
      <footer className="main-footer">
        <Container>


          {/* Footer Bottom */}
          <Row className="footer-bottom">
            <Col md={6} className="mb-3">
              <div className="footer-brand">
                <h6 className="brand-name">🐍 VenomGuard</h6>
                <p className="brand-tagline">Saving Lives Through AI-Powered Snake Identification</p>
              </div>
            </Col>
            <Col md={6} className="mb-3">
              <div className="footer-links-section">
                <div className="footer-links">
                  <a href="#about" className="footer-link">About Project</a>
                  <a href="#methodology" className="footer-link">Methodology</a>
                  <a href="#accuracy" className="footer-link">Accuracy Report</a>
                  <a href="#contact" className="footer-link">Contact</a>
                </div>
                <div className="social-links mt-3">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub Repository">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="mailto:support@venomguard.com" className="social-link" title="Email Support">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </Col>
          </Row>

          {/* Copyright */}
          <Row className="footer-copyright">
            <Col className="text-center">
              <hr className="footer-divider" />
              <p className="copyright-text">
                © 2024 VenomGuard - Snake Antivenom Prediction System.
                Developed as CSE Final Year Project for Educational & Research Purposes.
              </p>
              <p className="university-text">
                Computer Science & Engineering | Final Year Project 2024
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </HelmetProvider>
  );
};
