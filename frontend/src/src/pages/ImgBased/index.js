import {React,useState} from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {  meta } from "../../content_option";

export const ImgBased = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitted(true); // Update state to show the thank-you message
  };
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Image Based Detection </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">

          <div>
     
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Provide Image</h2>
          <label>
          <input type="file" id="myfile"className="file-input" name="myfile" required />
          </label>
          <br />
          <br />
          <button className="btn btn-outline btn-success"type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Thank You!</h2>
          <p>Your Image is processing</p>
        </div>
      )}
    </div>
    
          </Col>
        </Row>
        
       
      </Container>
    </HelmetProvider>
  );
};
