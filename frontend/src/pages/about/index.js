import { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Card, Badge, ProgressBar } from "react-bootstrap";
import { meta } from "../../content_option";
import Syma from "../../assets/images/Syma.jpg"
import saiful from "../../assets/images/saiful.JPG"
import shajal from "../../assets/images/SM.jpg"
import snakeDatabase from "../../snake_database.json";

const AboutPage = () => {
  const [stats, setStats] = useState({
    totalSnakes: 0,
    venomousCount: 0,
    nonVenomousCount: 0,
    accuracy: 95.5
  });

  const teamMembers = [
    {
      id: 1,
      name: "S.M. Shazzad Hossain Shajal",
      image: shajal,
      role: "Lead Developer & AI Specialist",
      expertise: "Machine Learning, Computer Vision",
      contribution: "AI Model Development & Training"
    },
    {
      id: 2,
      name: "Saiful Islam",
      image: saiful,
      role: "Backend Developer & Data Scientist",
      expertise: "Python, Django, Data Analysis",
      contribution: "Backend Architecture & Database Design"
    },
    {
      id: 3,
      name: "Syma Jahan Urmi",
      image: Syma,
      role: "Frontend Developer & UI/UX Designer",
      expertise: "React, UI/UX Design, User Research",
      contribution: "Frontend Development & User Experience"
    },
  ];

  const technologies = [
    { name: "Computer Vision", progress: 95, icon: "👁️" },
    { name: "Machine Learning", progress: 92, icon: "🤖" },
    { name: "Deep Learning", progress: 88, icon: "🧠" },
    { name: "Image Processing", progress: 90, icon: "📸" },
    { name: "Medical AI", progress: 85, icon: "🏥" },
    { name: "Data Science", progress: 93, icon: "📊" }
  ];

  const projectFeatures = [
    {
      icon: "🔍",
      title: "Multi-Modal Identification",
      description: "Three distinct identification methods: image analysis, visual characteristics, and symptom evaluation for comprehensive snake identification."
    },
    {
      icon: "⚡",
      title: "Real-Time Processing",
      description: "Instant AI-powered analysis providing immediate results when every second counts in emergency situations."
    },
    {
      icon: "💊",
      title: "Antivenom Database",
      description: "Comprehensive database of antivenoms with detailed medical protocols and treatment recommendations."
    },
    {
      icon: "🌍",
      title: "Regional Expertise",
      description: "Specialized for Bangladesh and South Asian snake species with local medical practices and available treatments."
    },
    {
      icon: "📱",
      title: "Accessible Design",
      description: "User-friendly interface designed for both medical professionals and general public in emergency situations."
    },
    {
      icon: "🔬",
      title: "Research-Based",
      description: "Built on extensive research and validated medical data to ensure accuracy and reliability in critical situations."
    }
  ];

  useEffect(() => {
    // Calculate stats from snake database
    const venomous = snakeDatabase.filter(snake => snake.is_venomous).length;
    const nonVenomous = snakeDatabase.length - venomous;

    setStats({
      totalSnakes: snakeDatabase.length,
      venomousCount: venomous,
      nonVenomousCount: nonVenomous,
      accuracy: 95.5
    });
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About - {meta.title}</title>
        <meta name="description" content="Learn about VenomGuard - Advanced AI-powered snake identification system for Bangladesh and South Asia. Our mission, technology, and team." />
      </Helmet>

      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-background">
            <div className="hero-pattern"></div>
          </div>
          <Container>
            <Row className="align-items-center min-vh-100">
              <Col lg={6}>
                <div className="hero-content">
                  <div className="hero-badge">
                    <span>🐍 About VenomGuard</span>
                  </div>
                  <h1 className="hero-title">
                    Revolutionizing Snake Bite Emergency Response
                  </h1>
                  <p className="hero-description">
                    VenomGuard is an advanced AI-powered snake identification system designed to save lives
                    through instant species recognition, comprehensive medical guidance, and critical antivenom
                    recommendations for Bangladesh and South Asia.
                  </p>
                  <div className="hero-stats">
                    <div className="stat-item">
                      <div className="stat-number">{stats.totalSnakes}</div>
                      <div className="stat-label">Snake Species</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">{stats.accuracy}%</div>
                      <div className="stat-label">AI Accuracy</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">3</div>
                      <div className="stat-label">ID Methods</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="hero-visual">
                  <div className="visual-card">
                    <div className="card-icon">🔬</div>
                    <h3>CSE Final Year Project</h3>
                    <p>Computer Science & Engineering</p>
                    <div className="project-year">2024</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Mission & Vision */}
        <section className="mission-vision">
          <Container>
            <Row>
              <Col lg={6} className="mb-4">
                <Card className="mission-card h-100">
                  <Card.Body>
                    <div className="card-icon mission">🎯</div>
                    <Card.Title>Our Mission</Card.Title>
                    <Card.Text>
                      To develop an advanced AI system that integrates image recognition, trait analysis,
                      and symptom evaluation to accurately identify snake species, ensuring precise
                      identification and promoting safety through effective medical intervention.
                    </Card.Text>
                    <Card.Text>
                      By merging cutting-edge technology with biological expertise, we aim to save lives,
                      reduce snakebite-related fatalities, and foster awareness about snake species and
                      their ecological importance.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6} className="mb-4">
                <Card className="vision-card h-100">
                  <Card.Body>
                    <div className="card-icon vision">🌟</div>
                    <Card.Title>Our Vision</Card.Title>
                    <Card.Text>
                      To create a world where no life is lost due to delayed or incorrect snake identification.
                      We envision VenomGuard as the global standard for emergency snake identification,
                      accessible to everyone from rural communities to urban hospitals.
                    </Card.Text>
                    <Card.Text>
                      Our vision extends beyond technology - we aim to build a comprehensive ecosystem
                      that empowers healthcare professionals, educates communities, and bridges the gap
                      between traditional knowledge and modern AI capabilities.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Project Features */}
        <section className="project-features">
          <Container>
            <div className="section-header text-center">
              <h2>Key Features & Capabilities</h2>
              <p>Advanced technology designed for life-saving medical applications</p>
            </div>
            <Row>
              {projectFeatures.map((feature, index) => (
                <Col lg={4} md={6} className="mb-4" key={index}>
                  <Card className="feature-card h-100">
                    <Card.Body className="text-center">
                      <div className="feature-icon">{feature.icon}</div>
                      <Card.Title>{feature.title}</Card.Title>
                      <Card.Text>{feature.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Technology Stack */}
        <section className="technology-stack">
          <Container>
            <div className="section-header text-center">
              <h2>Technology & Expertise</h2>
              <p>Cutting-edge technologies powering our AI system</p>
            </div>
            <Row>
              {technologies.map((tech, index) => (
                <Col lg={4} md={6} className="mb-4" key={index}>
                  <Card className="tech-card">
                    <Card.Body>
                      <div className="tech-header">
                        <span className="tech-icon">{tech.icon}</span>
                        <Card.Title>{tech.name}</Card.Title>
                      </div>
                      <div className="progress-container">
                        <ProgressBar
                          now={tech.progress}
                          label={`${tech.progress}%`}
                          className="custom-progress"
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Impact & Statistics */}
        <section className="impact-stats">
          <Container>
            <div className="section-header text-center">
              <h2>Project Impact</h2>
              <p>Making a difference in emergency medical response</p>
            </div>
            <Row className="text-center">
              <Col lg={3} md={6} className="mb-4">
                <div className="impact-item">
                  <div className="impact-number">{stats.totalSnakes}</div>
                  <div className="impact-label">Snake Species Covered</div>
                  <div className="impact-description">Comprehensive database of regional species</div>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <div className="impact-item">
                  <div className="impact-number">{stats.venomousCount}</div>
                  <div className="impact-label">Venomous Species</div>
                  <div className="impact-description">Critical identification for emergency care</div>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <div className="impact-item">
                  <div className="impact-number">95.5%</div>
                  <div className="impact-label">AI Accuracy</div>
                  <div className="impact-description">High-precision identification system</div>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <div className="impact-item">
                  <div className="impact-number">24/7</div>
                  <div className="impact-label">Availability</div>
                  <div className="impact-description">Always ready for emergency situations</div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <Container>
            <div className="section-header text-center">
              <h2>Meet Our Team</h2>
              <p>Dedicated Computer Science & Engineering students passionate about saving lives through technology</p>
            </div>
            <Row>
              {teamMembers.map((member) => (
                <Col lg={4} md={6} className="mb-4" key={member.id}>
                  <Card className="team-card h-100">
                    <div className="team-image-container">
                      <img src={member.image} alt={member.name} className="team-image" />
                    </div>
                    <Card.Body className="text-center">
                      <Card.Title className="member-name">{member.name}</Card.Title>
                      <Badge bg="primary" className="role-badge">{member.role}</Badge>
                      <Card.Text className="expertise">
                        <strong>Expertise:</strong> {member.expertise}
                      </Card.Text>
                      <Card.Text className="contribution">
                        <strong>Contribution:</strong> {member.contribution}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Methodology */}
        <section className="methodology">
          <Container>
            <div className="section-header text-center">
              <h2>Our Methodology</h2>
              <p>Three-pronged approach to comprehensive snake identification</p>
            </div>
            <Row>
              <Col lg={4} className="mb-4">
                <Card className="methodology-card">
                  <Card.Body className="text-center">
                    <div className="method-number">1</div>
                    <div className="method-icon">📸</div>
                    <Card.Title>Image Recognition</Card.Title>
                    <Card.Text>
                      Advanced computer vision algorithms trained on thousands of snake images
                      to provide instant species identification with high accuracy.
                    </Card.Text>
                    <div className="method-features">
                      <span className="feature-tag">Deep Learning</span>
                      <span className="feature-tag">CNN Models</span>
                      <span className="feature-tag">95%+ Accuracy</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} className="mb-4">
                <Card className="methodology-card">
                  <Card.Body className="text-center">
                    <div className="method-number">2</div>
                    <div className="method-icon">👁️</div>
                    <Card.Title>Visual Characteristics</Card.Title>
                    <Card.Text>
                      Interactive questionnaire system that guides users through key visual
                      features and behavioral traits for accurate identification.
                    </Card.Text>
                    <div className="method-features">
                      <span className="feature-tag">Expert System</span>
                      <span className="feature-tag">Decision Trees</span>
                      <span className="feature-tag">User-Friendly</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} className="mb-4">
                <Card className="methodology-card">
                  <Card.Body className="text-center">
                    <div className="method-number">3</div>
                    <div className="method-icon">🩺</div>
                    <Card.Title>Symptom Analysis</Card.Title>
                    <Card.Text>
                      Medical symptom evaluation system that correlates patient symptoms
                      with snake species and provides immediate treatment guidance.
                    </Card.Text>
                    <div className="method-features">
                      <span className="feature-tag">Medical AI</span>
                      <span className="feature-tag">Symptom Mapping</span>
                      <span className="feature-tag">Emergency Ready</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <Container>
            <div className="cta-content text-center">
              <h2>Ready to Experience VenomGuard?</h2>
              <p>Try our AI-powered snake identification system and see how technology can save lives</p>
              <div className="cta-buttons">
                <a href="/ImgBased" className="btn btn-primary btn-lg me-3">
                  <i className="fas fa-camera me-2"></i>
                  Start Image Analysis
                </a>
                <a href="/Questioniar" className="btn btn-outline-primary btn-lg">
                  <i className="fas fa-clipboard-list me-2"></i>
                  Try Questionnaire
                </a>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </HelmetProvider>
  );
};

export default AboutPage;
