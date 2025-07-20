import React from "react";
import "./style.css";
import Syma from "../../assets/images/Syma.jpg"
import saiful from "../../assets/images/saiful.JPG"
import shajal from "../../assets/images/SM.jpg"
import aboutBack from "../../assets/images/aboutBack.jpg" // Import the CSS file

const AboutPage = () => {
  const believersData = [
    { id: 1, name: "S.M.Shazzad hossion Shajal", image: `${shajal}` },
    { id: 2, name: "Saiful Islam", image: `${saiful}` },
    { id: 3, name: "Syma jahan Urmi", image:`${Syma}`  },
  ];


  return (
    <div className="about-page ">
      {/* About Section */}
      <section className="about-section container">
        <div className="about-content">
          <div className="about-text">
            <h1>About</h1>
            <p>
            Combining image recognition, distinctive traits, and symptom analysis, snake detection
            <br/>
          revolutionizes species identification and enhances swift medical intervention.
            </p>
          </div>
          <div className="about-image">
            <img
              src={aboutBack}
              alt="Abstract Globe"
              className="about-globe"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <div className="mission-paragraphs">
              <p>
              Our mission is to develop an advanced system integrating image recognition,trait analysis, and symptom evaluation to accurately identify snake species. This approach ensures precise identification, promoting safety and effective medical intervention.
              </p>
              <p>
              By merging technology with biology, we aim to save lives, reduce snakebite-related fatalities, and foster awareness about snake species and their ecological importance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="backed-by-best-section">
        <h3>Backed by the Best</h3>
        <div className="backed-logos">
          {["Binance", "Pantera", "Mark Cuban", "Jump"].map((name, index) => (
            <div className="logo-card" key={index}>
              <p>{name}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Believers Section */}
     
        <section className="believers-section">
        <h2>Our Believers</h2>
        <div className="believers-container">
          {believersData.map((believer) => (
            <div className="believer" key={believer.id}>
              <img src={believer.image} alt={believer.name} />
              <p>{believer.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
