import React from "react";
import "./footer.css";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <Container>
        <Row>
      
          <Col>
            <p>KHK'lı Platformlar Birliği-2023 ©</p>
          </Col>
          <Col lg={3}>
           
           </Col>
           <Col lg={1}>
           
           </Col>
          <Col>
            <p>Soru ve iletişim için: bilgi@khkhukukiyardim.com</p>
          </Col>
         
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
