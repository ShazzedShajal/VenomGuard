import React, { useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import snakeDatabase from "../../snake_database.json";
import "./style.css";

// Snake blog data with detailed information
const snakeBlogData = {
  "Daboia-russelii": {
    subtitle: "The Chain Viper - Asia's Most Feared Serpent",
    readTime: "8 min read",
    category: "Venomous",
    content: `Russell's Viper, scientifically known as Daboia russelii, stands as one of Asia's most formidable and medically significant venomous snakes. Named after Patrick Russell, an 18th-century Scottish herpetologist, this species has earned a fearsome reputation across its range.

**Physical Characteristics:**
The Russell's Viper is easily recognizable by its distinctive chain-like pattern of dark brown ovals or diamonds running along its back. These markings, which give it the common name "Chain Viper," are bordered by white or yellow edges, creating a striking visual pattern. Adults typically reach lengths of 1-1.5 meters, with a robust, heavy body that reflects their terrestrial lifestyle.

**Habitat and Distribution:**
These adaptable serpents thrive in a variety of habitats including grasslands, scrublands, agricultural areas, and even urban peripheries. They are particularly common in rice fields and sugarcane plantations, where they hunt for rodents. Their distribution spans across the Indian subcontinent, Southeast Asia, and parts of China.

**Behavior and Hunting:**
Russell's Vipers are primarily nocturnal hunters, though they may be active during cooler parts of the day. They are ambush predators, lying motionless for hours waiting for unsuspecting prey. Their diet consists mainly of rodents, making them both beneficial for pest control and dangerous due to their proximity to human settlements.

**Medical Significance:**
The venom of Russell's Viper is highly potent, containing a complex mixture of enzymes and toxins that cause severe coagulopathy (blood clotting disorders), tissue necrosis, and systemic effects. Bites from this species account for a significant percentage of snakebite fatalities in Asia, making immediate medical attention crucial.

**Conservation Status:**
While not currently endangered, Russell's Vipers face threats from habitat destruction and human persecution. Their ecological role as rodent controllers makes them valuable allies in agricultural settings, despite the risks they pose.`
  },
  "Bungarus-caeruleus": {
    subtitle: "The Silent Killer - Master of Stealth",
    readTime: "7 min read",
    category: "Highly Venomous",
    content: `The Common Krait (Bungarus caeruleus) represents one of nature's most efficient and deadly predators. Known locally as "Karait" in many parts of India, this snake has earned its reputation as a silent killer due to its painless bite and potent neurotoxic venom.

**Physical Appearance:**
Common Kraits display a sleek, glossy appearance with distinctive black and white banding patterns. Their scales have a mirror-like quality that reflects light beautifully. Adults typically measure 90-120 cm in length, with a relatively slender build that belies their deadly nature.

**Nocturnal Lifestyle:**
These serpents are strictly nocturnal, becoming active only after sunset. During daylight hours, they seek shelter under rocks, logs, or in abandoned burrows. This nocturnal behavior often brings them into contact with sleeping humans, leading to tragic encounters.

**Hunting and Diet:**
Kraits are ophiophagous, meaning they primarily feed on other snakes, including their own species. They also consume lizards, frogs, and small mammals. Their hunting strategy involves using their potent venom to quickly subdue prey, which they then swallow whole.

**Venom and Medical Impact:**
The venom of the Common Krait is predominantly neurotoxic, affecting the nervous system and causing respiratory paralysis. What makes krait bites particularly dangerous is their painless nature - victims often don't realize they've been bitten until symptoms appear hours later.

**Reproduction and Life Cycle:**
Female kraits lay 6-14 eggs in termite mounds or loose soil during the monsoon season. The eggs incubate for about 60 days, and hatchlings are independent from birth, measuring about 25-30 cm in length.

**Cultural Significance:**
In Hindu mythology, kraits are associated with Lord Shiva, who is often depicted wearing snakes as ornaments. Despite their deadly nature, they hold a place of respect in many traditional belief systems.`
  },
  "Naja-naja": {
    subtitle: "The Spectacled Cobra - Icon of Indian Wildlife",
    readTime: "9 min read",
    category: "Venomous",
    content: `The Indian Cobra (Naja naja), also known as the Spectacled Cobra, stands as one of the most iconic and culturally significant snakes in the world. Revered in Hindu mythology and feared for its potent venom, this magnificent serpent embodies the complex relationship between humans and wildlife in the Indian subcontinent.

**The Spectacular Hood:**
The most distinctive feature of the Indian Cobra is its impressive hood, which it spreads when threatened or excited. The hood displays the characteristic "spectacle" marking - a pattern resembling eyeglasses that gives the species its common name. This defensive display, combined with the cobra's upright posture, creates one of nature's most recognizable threat displays.

**Physical Characteristics:**
Indian Cobras exhibit considerable color variation, ranging from light brown to black, with some individuals showing beautiful patterns of bands or spots. Adults typically reach lengths of 1-2 meters, with exceptional specimens growing even larger. Their robust build and muscular body reflect their terrestrial lifestyle.

**Habitat and Behavior:**
These adaptable serpents inhabit a wide range of environments, from dense forests to agricultural areas and even urban settings. They are excellent swimmers and climbers, though they spend most of their time on the ground. Indian Cobras are primarily crepuscular, being most active during dawn and dusk.

**Diet and Hunting:**
Indian Cobras are opportunistic feeders with a varied diet including rodents, birds, eggs, lizards, and other snakes. They are known to raid poultry farms, bringing them into conflict with humans. Their hunting strategy combines stealth with the lightning-fast strike characteristic of elapid snakes.

**Venom and Medical Significance:**
The venom of the Indian Cobra is primarily neurotoxic, causing paralysis and respiratory failure. However, it also contains cardiotoxic and cytotoxic components that can cause heart problems and tissue damage. Despite the availability of effective antivenoms, cobra bites remain a significant medical emergency.

**Cultural and Religious Importance:**
In Hindu tradition, cobras are associated with various deities, particularly Lord Shiva and Lord Vishnu. The festival of Nag Panchami celebrates snakes, and cobras hold a special place in Indian art, literature, and folklore. This cultural reverence has contributed to their protection in many areas.

**Conservation Challenges:**
While not currently endangered, Indian Cobras face threats from habitat loss, human persecution, and the illegal wildlife trade. Their ecological importance as predators of rodents and other pests makes their conservation crucial for maintaining ecological balance.`
  }
  // Add more snake blog data as needed
};

const SnakeBlogCard = ({ snake, onClick }) => {
  const blogData = snakeBlogData[snake.scientific_name] || {
    subtitle: "Fascinating serpent of the wild",
    readTime: "5 min read",
    category: snake.is_venomous ? "Venomous" : "Non-Venomous"
  };

  return (
    <Card className="snake-blog-card h-100" onClick={() => onClick(snake)}>
      <div className="blog-image-container">
        <Card.Img
          variant="top"
          src={snake.image_url}
          alt={snake.common_name}
          className="blog-card-image"
          onError={(e) => {
            e.target.src = '/images/placeholder-snake.jpg';
          }}
        />
        <div className="blog-overlay">
          <Badge
            bg={snake.is_venomous ? "danger" : "success"}
            className="venom-badge"
          >
            {blogData.category}
          </Badge>
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="blog-meta mb-2">
          <small className="text-muted">{blogData.readTime}</small>
        </div>
        <Card.Title className="blog-title">{snake.common_name}</Card.Title>
        <Card.Subtitle className="mb-3 blog-subtitle">
          {blogData.subtitle}
        </Card.Subtitle>
        <Card.Text className="blog-excerpt">
          {snake.distinguishing_feature}
        </Card.Text>
        <div className="mt-auto">
          <div className="blog-footer">
            <small className="text-muted">
              Scientific: <em>{snake.scientific_name}</em>
            </small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const BlogApp = () => {
  const [selectedSnake, setSelectedSnake] = useState(null);
  const navigate = useNavigate();

  const handleSnakeClick = (snake) => {
    setSelectedSnake(snake);
  };

  const handleBackToList = () => {
    setSelectedSnake(null);
  };

  if (selectedSnake) {
    const blogData = snakeBlogData[selectedSnake.scientific_name] || {
      subtitle: "Fascinating serpent of the wild",
      readTime: "5 min read",
      category: selectedSnake.is_venomous ? "Venomous" : "Non-Venomous",
      content: `${selectedSnake.common_name} is a fascinating species found in various habitats. This ${selectedSnake.is_venomous ? 'venomous' : 'non-venomous'} snake is known for its distinctive features: ${selectedSnake.distinguishing_feature}.

**Habitat and Distribution:**
This species can be found in ${selectedSnake.characteristic_location}, where it plays an important role in the ecosystem.

**Behavior:**
Most active during ${selectedSnake.characteristic_time}, this snake exhibits interesting behavioral patterns that make it unique among serpents.

**Medical Significance:**
${selectedSnake.is_venomous ? `This venomous species requires immediate medical attention if encountered. The recommended antivenom is: ${selectedSnake.antivenom}. ${selectedSnake.antivenom_notes}` : 'This non-venomous species poses no significant threat to humans, though any snake bite should be treated with appropriate first aid.'}

**Conservation:**
Like many snake species, conservation efforts are important to maintain healthy populations and ecological balance.`
    };

    return (
      <div className="blog-detail-container">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="blog-detail-header">
                <button
                  className="back-button mb-4"
                  onClick={handleBackToList}
                >
                  ← Back to Snake Encyclopedia
                </button>

                <div className="blog-detail-meta mb-3">
                  <Badge
                    bg={selectedSnake.is_venomous ? "danger" : "success"}
                    className="me-2"
                  >
                    {blogData.category}
                  </Badge>
                  <span className="text-muted">{blogData.readTime}</span>
                </div>

                <h1 className="blog-detail-title">{selectedSnake.common_name}</h1>
                <h2 className="blog-detail-subtitle">{blogData.subtitle}</h2>

                <div className="blog-detail-image-container mb-4">
                  <img
                    src={selectedSnake.image_url}
                    alt={selectedSnake.common_name}
                    className="blog-detail-image"
                    onError={(e) => {
                      e.target.src = '/images/placeholder-snake.jpg';
                    }}
                  />
                </div>
              </div>

              <div className="blog-detail-content">
                {blogData.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="blog-section-title">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  return (
                    <p key={index} className="blog-paragraph">
                      {paragraph.split('**').map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </p>
                  );
                })}
              </div>

              <div className="blog-detail-footer mt-5">
                <div className="snake-quick-facts">
                  <h4>Quick Facts</h4>
                  <Row>
                    <Col md={6}>
                      <p><strong>Scientific Name:</strong> <em>{selectedSnake.scientific_name}</em></p>
                      <p><strong>Local Name:</strong> {selectedSnake.local_name}</p>
                      <p><strong>Venom Status:</strong> {selectedSnake.venom_status_text}</p>
                    </Col>
                    <Col md={6}>
                      <p><strong>Habitat:</strong> {selectedSnake.characteristic_location}</p>
                      <p><strong>Activity Time:</strong> {selectedSnake.characteristic_time}</p>
                      <p><strong>Pain Level:</strong> {selectedSnake.symptom_local_pain}</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <Container>
        <div className="blog-header text-center mb-5">
          <h1 className="blog-main-title">🐍 Snake Encyclopedia</h1>
          <p className="blog-main-subtitle">
            Discover the fascinating world of snakes through our comprehensive guide
          </p>
        </div>

        <Row>
          {snakeDatabase.map((snake, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <SnakeBlogCard snake={snake} onClick={handleSnakeClick} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BlogApp;
