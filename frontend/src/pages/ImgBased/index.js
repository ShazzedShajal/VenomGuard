import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container, Row, Col, Card, Alert, Badge, Button, ProgressBar, Spinner } from 'react-bootstrap';
import { meta } from '../../content_option';
import { useNavigate } from 'react-router-dom';
import snakeDatabase from '../../snake_database.json';

export const ImgBased = () => {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [snakeResult, setSnakeResult] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFileSelection(selectedFile);
  };

  const handleFileSelection = (selectedFile) => {
    if (selectedFile) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please select a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setFile(selectedFile);
      setPredictions(null);
      setError(null);
      setImageSrc(URL.createObjectURL(selectedFile));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelection(droppedFile);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select an image file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowResults(false);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();
      setPredictions(data.predictions);

      // Process the prediction and find matching snake
      if (data.predictions && data.predictions.length > 0) {
        const topPrediction = data.predictions[0];
        setConfidence(topPrediction.confidence);

        // The AI returns class names like "Trimeresurus-albolabris"
        // But database has "Trimeresurus_albolabris"
        // Try multiple matching strategies
        const aiClassName = topPrediction.class;

        // Strategy 1: Direct match
        let foundSnake = snakeDatabase.find(snake =>
          snake.scientific_name.toLowerCase() === aiClassName.toLowerCase()
        );

        // Strategy 2: Replace hyphens with underscores
        if (!foundSnake) {
          const withUnderscores = aiClassName.replace(/-/g, '_');
          foundSnake = snakeDatabase.find(snake =>
            snake.scientific_name.toLowerCase() === withUnderscores.toLowerCase()
          );
        }

        // Strategy 3: Replace underscores with hyphens
        if (!foundSnake) {
          const withHyphens = aiClassName.replace(/_/g, '-');
          foundSnake = snakeDatabase.find(snake =>
            snake.scientific_name.toLowerCase() === withHyphens.toLowerCase()
          );
        }

        // Strategy 4: Partial match (genus and species)
        if (!foundSnake) {
          const parts = aiClassName.toLowerCase().split(/[-_]/);
          if (parts.length >= 2) {
            const genus = parts[0];
            const species = parts[1];
            foundSnake = snakeDatabase.find(snake => {
              const snakeParts = snake.scientific_name.toLowerCase().split(/[-_]/);
              return snakeParts.length >= 2 &&
                     snakeParts[0] === genus &&
                     snakeParts[1] === species;
            });
          }
        }

        if (foundSnake) {
          setSnakeResult(foundSnake);
          // Smooth transition to results
          setTimeout(() => {
            setShowResults(true);
          }, 500);
        } else {
          setError(`Snake species "${aiClassName}" not found in database. Please try the questionnaire method for identification.`);
        }
      } else {
        setError('No snake detected in the image. Please try with a clearer image of a snake.');
      }
    } catch (err) {
      clearInterval(progressInterval);
      setError('Failed to analyze image. Please check your connection and try again.');
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  // Draw image and bounding boxes
  useEffect(() => {
    if (imageSrc && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        if (predictions) {
          predictions.forEach((p) => {
            const x = p.x - p.width / 2;
            const y = p.y - p.height / 2;

            ctx.strokeStyle = '#00FF00';
            ctx.lineWidth = 4;
            ctx.strokeRect(x, y, p.width, p.height);

            ctx.fillStyle = '#00FF00';
            ctx.font = '20px Arial';
            ctx.fillText(
              `${p.class} (${(p.confidence * 100).toFixed(1)}%)`,
              x,
              y > 20 ? y - 8 : y + 20
            );
          });
        }
      };

      img.src = imageSrc;
    }
  }, [imageSrc, predictions]);

  const handleStartOver = () => {
    setFile(null);
    setImageSrc(null);
    setPredictions(null);
    setShowResults(false);
    setSnakeResult(null);
    setError(null);
    setConfidence(0);
  };

  const renderImmediateActionCard = () => {
    if (!snakeResult) return null;

    const isVenomous = snakeResult.is_venomous;
    const alertVariant = isVenomous ? 'danger' : 'success';
    const alertIcon = isVenomous ? '🚨' : '✅';
    const alertTitle = isVenomous ? 'DANGER - VENOMOUS SNAKE' : 'SAFE - NON-VENOMOUS SNAKE';
    const alertMessage = isVenomous
      ? 'Seek immediate medical attention at the nearest hospital!'
      : 'This snake is not dangerous. Please do not harm it.';

    return (
      <Alert variant={alertVariant} className="immediate-action-card text-center mb-4">
        <div className="alert-icon">{alertIcon}</div>
        <Alert.Heading className="alert-title">{alertTitle}</Alert.Heading>
        <p className="alert-message">{alertMessage}</p>
      </Alert>
    );
  };

  const renderAIConfirmationCard = () => {
    if (!predictions || !snakeResult) return null;

    return (
      <Card className="ai-confirmation-card mb-4">
        <Card.Header className="ai-card-header">
          <h5 className="mb-0">🤖 AI Image Analysis Result</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6} className="text-center">
              <h6 className="upload-title">Your Uploaded Image</h6>
              <div className="user-image-container">
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Uploaded snake"
                    className="user-uploaded-image"
                  />
                )}
                <div className="detection-overlay">
                  <Badge bg="success" className="detection-badge">
                    ✓ Snake Detected
                  </Badge>
                </div>
              </div>
            </Col>
            <Col md={6} className="prediction-details">
              <div className="prediction-info">
                <div className="ai-prediction-section">
                  <h6 className="prediction-label">AI Identification:</h6>
                  <h3 className="predicted-species-name">{snakeResult.common_name}</h3>
                  <p className="predicted-scientific-name">
                    <em>{snakeResult.scientific_name}</em>
                  </p>
                </div>

                <div className="analysis-status">
                  <div className="status-indicator success">
                    <span className="status-icon">✓</span>
                    <span className="status-text">Analysis Complete</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  const renderSnakeDetailsCard = () => {
    if (!snakeResult) return null;

    return (
      <Card className="snake-details-card mb-4">
        <Card.Header className="snake-details-header">
          <h5 className="mb-0">🐍 Snake Identification Details</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4} className="text-center">
              <div className="reference-image-container">
                <img
                  src={snakeResult.image_url}
                  alt={snakeResult.common_name}
                  className="reference-image"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-snake.jpg';
                  }}
                />
                <div className="image-label">Reference Photo</div>
              </div>
            </Col>
            <Col md={8}>
              <div className="snake-info">
                <h2 className="snake-common-name">{snakeResult.common_name}</h2>

                <div className="scientific-name-section mb-3">
                  <span className="scientific-label">Scientific Name:</span>
                  <span className="snake-scientific-name">{snakeResult.scientific_name}</span>
                </div>

                <div className="local-name-section mb-3">
                  <span className="local-label">Local Name:</span>
                  <span className="snake-local-name">{snakeResult.local_name}</span>
                </div>

                <div className="venom-status-display mb-4">
                  <Badge
                    bg={snakeResult.is_venomous ? "danger" : "success"}
                    className="venom-status-badge-enhanced"
                  >
                    {snakeResult.venom_status_text}
                  </Badge>
                </div>

                <div className="distinguishing-feature">
                  <h6 className="feature-title">Key Distinguishing Features:</h6>
                  <p className="feature-description">{snakeResult.distinguishing_feature}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  const renderMedicalCard = () => {
    if (!snakeResult || !snakeResult.is_venomous) return null;

    return (
      <Card className="medical-card mb-4" border="danger">
        <Card.Header className="medical-card-header bg-danger text-white">
          <h5 className="mb-0">🏥 For Medical Professionals</h5>
        </Card.Header>
        <Card.Body>
          <div className="medical-info">
            <div className="venom-characteristics-section mb-4">
              <h6 className="medical-section-title">Venom Characteristics:</h6>
              <div className="syndrome-grid">
                {(() => {
                  // Show only the primary venom effect (prioritize in order: neuro > hemo > cyto > myo)
                  if (snakeResult.syndrome_neuro) {
                    return (
                      <div className="syndrome-item neurotoxic">
                        <div className="syndrome-header">
                          <strong>NEUROTOXIC EFFECTS</strong>
                        </div>
                        <div className="syndrome-description">
                          Paralysis, ptosis, respiratory distress, muscle weakness
                        </div>
                      </div>
                    );
                  } else if (snakeResult.syndrome_hemo) {
                    return (
                      <div className="syndrome-item hemotoxic">
                        <div className="syndrome-header">
                          <strong>HEMOTOXIC EFFECTS</strong>
                        </div>
                        <div className="syndrome-description">
                          Bleeding disorders, coagulopathy, organ damage, hemorrhage
                        </div>
                      </div>
                    );
                  } else if (snakeResult.syndrome_cyto) {
                    return (
                      <div className="syndrome-item cytotoxic">
                        <div className="syndrome-header">
                          <strong>CYTOTOXIC EFFECTS</strong>
                        </div>
                        <div className="syndrome-description">
                          Severe local pain, swelling, tissue necrosis, blistering
                        </div>
                      </div>
                    );
                  } else if (snakeResult.syndrome_myo) {
                    return (
                      <div className="syndrome-item myotoxic">
                        <div className="syndrome-header">
                          <strong>MYOTOXIC EFFECTS</strong>
                        </div>
                        <div className="syndrome-description">
                          Muscle damage, rhabdomyolysis, kidney failure
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>

            <div className="antivenom-section">
              <h6 className="medical-section-title">RECOMMENDED ANTIVENOM:</h6>
              <div className="antivenom-prescription">
                <div className="antivenom-name-enhanced">{snakeResult.antivenom}</div>
                <div className="prescription-note">Administer as per standard protocol</div>
              </div>

              <Alert variant="info" className="clinical-considerations">
                <div className="considerations-header">
                  <strong>Clinical Considerations:</strong>
                </div>
                <div className="considerations-content">
                  {snakeResult.antivenom_notes}
                </div>
              </Alert>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderUploadSection = () => {
    return (
      <Card className="upload-card">
        <Card.Header className="upload-card-header">
          <div className="header-content">
            <div className="header-icon">📸</div>
            <div>
              <h4 className="header-title">AI-Powered Snake Detection</h4>
              <p className="header-subtitle">Upload a clear image of a snake for instant identification</p>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {!imageSrc ? (
            <div
              className={`drag-drop-zone ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
            >
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                className="file-input"
                ref={fileInputRef}
                style={{ display: 'none' }}
              />

              <div className="upload-icon">
                <i className="fas fa-cloud-upload-alt"></i>
              </div>

              <div className="upload-text">
                <h5>Drag & Drop your snake image here</h5>
                <p>or <span className="upload-link">click to browse</span></p>
                <div className="file-requirements">
                  <small>Supports: JPEG, PNG, WebP • Max size: 10MB</small>
                </div>
              </div>
            </div>
          ) : (
            <div className="image-preview-section">
              <div className="preview-container">
                <img src={imageSrc} alt="Snake preview" className="preview-image" />
                <div className="preview-overlay">
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={() => {
                      setImageSrc(null);
                      setFile(null);
                      setError(null);
                    }}
                    className="change-image-btn"
                  >
                    <i className="fas fa-times me-1"></i>
                    Change Image
                  </Button>
                </div>
              </div>

              <div className="image-info">
                <div className="file-details">
                  <h6 className="file-name">{file?.name}</h6>
                  <p className="file-size">{file ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : ''}</p>
                </div>

                {isLoading && (
                  <div className="analysis-progress">
                    <div className="progress-header">
                      <span>Analyzing Image...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <ProgressBar
                      now={uploadProgress}
                      className="custom-progress-bar"
                      animated={uploadProgress < 100}
                    />
                    <div className="progress-steps">
                      <div className={`step ${uploadProgress >= 25 ? 'active' : ''}`}>
                        <i className="fas fa-upload"></i>
                        <span>Uploading</span>
                      </div>
                      <div className={`step ${uploadProgress >= 50 ? 'active' : ''}`}>
                        <i className="fas fa-brain"></i>
                        <span>AI Processing</span>
                      </div>
                      <div className={`step ${uploadProgress >= 75 ? 'active' : ''}`}>
                        <i className="fas fa-search"></i>
                        <span>Identifying</span>
                      </div>
                      <div className={`step ${uploadProgress >= 100 ? 'active' : ''}`}>
                        <i className="fas fa-check"></i>
                        <span>Complete</span>
                      </div>
                    </div>
                  </div>
                )}

                {!isLoading && (
                  <Button
                    onClick={handleSubmit}
                    variant="primary"
                    size="lg"
                    className="analyze-btn"
                    disabled={!file}
                  >
                    <i className="fas fa-microscope me-2"></i>
                    Start AI Analysis
                  </Button>
                )}
              </div>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="error-alert">
              <div className="error-content">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <div>
                  <strong>Analysis Failed</strong>
                  <p className="mb-0">{error}</p>
                </div>
              </div>
            </Alert>
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <HelmetProvider>
      <div className="img-based-container">
        <Container>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Image Based Detection | {meta.title}</title>
            <meta name="description" content={meta.description} />
          </Helmet>

          <div className="page-header text-center mb-5">
            <div className="header-badge">
              <span>🐍 VenomGuard AI</span>
            </div>
            <h1 className="page-title">Snake Image Analysis</h1>
          </div>

          {!showResults ? (
            <Row className="justify-content-center">
              <Col lg={8}>
                {renderUploadSection()}
              </Col>
            </Row>
          ) : (
            <div className="results-section">
              {renderImmediateActionCard()}
              {renderAIConfirmationCard()}
              {renderSnakeDetailsCard()}
              {renderMedicalCard()}

              <div className="action-buttons text-center mt-5">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleStartOver}
                  className="primary-action-btn me-3"
                >
                  📸 Analyze Another Snake
                </Button>
                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={() => navigate('/home')}
                  className="secondary-action-btn"
                >
                  🏠 Back to Home
                </Button>
              </div>
            </div>
          )}
        </Container>
      </div>
    </HelmetProvider>
  );
};
