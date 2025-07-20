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
          <Container className="About-header">
            <Helmet>
              <meta charSet="utf-8" />
              <title> Portfolio | {meta.title} </title>{" "}
              <meta name="description" content={meta.description} />
            </Helmet>
            <Row className="mb-5 mt-3 pt-md-3">
              <Col lg="8">
                <h1 className="display-4 mb-4"> Questioniar Based Detection </h1>{" "}
                <hr className="t_border my-4 ml-0 text-left" />
              </Col>
            </Row>
            <Row className="mb-5 mt-3 pt-md-3">
              <Col lg="8">
    
              <div>
          <div className="intro_btn-action pb-5">
                            <h1>Could you describe Snake</h1>
                           <Link to="/SnakeDescribe" className="text_2">
                             <div id="button_p" className="ac_btn btn ">
                              Yes
                               <div className="ring one"></div>
                               <div className="ring two"></div>
                               <div className="ring three"></div>
                             </div>
                           </Link>
                           <Link to="/SymptomDescribe">
                             <div id="button_h" className="ac_btn btn">
                               No
                               <div className="ring one"></div>
                               <div className="ring two"></div>
                               <div className="ring three"></div>
                             </div>
                           </Link>
                         </div>
    
              </div>
    
              
              </Col>
            </Row>
            
           
          </Container>
        </HelmetProvider>
      );
};
