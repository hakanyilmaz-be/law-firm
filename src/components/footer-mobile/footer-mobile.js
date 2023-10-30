import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import "./footer-mobile.css";

const FooterMobile = () => {
    return (
        <div className="mobile-footer-wrapper">
          <Container>
            <Row>
              <Col md={12} className='g-3'>
                <p>KHK'lı Platformlar Birliği-2023 ©</p>
              </Col>
              <Col md={12}>
                <p>Soru ve iletişim için: bilgi@khkhukukiyardim.com</p>
              </Col>
             
            </Row>
          </Container>
        </div>
      );
}

export default FooterMobile