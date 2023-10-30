import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SideBar from '../components/side-bar/side-bar'
import "./main-template.css"
import Spacer from "../components/spacer/spacer"
import Footer from '../components/footer/footer'
import HeaderMobile from '../components/header-mobile/header-mobile'
import FooterMobile from '../components/footer-mobile/footer-mobile'

const MainTemplate = ( {children}) => {
  return (
    <Container fluid className="main-template">
        <Row>
            <Col  lg={3} className= 'sidebar'>
                <SideBar/>
            </Col>
            <Col  lg={3} className= 'header-mobile'>
                <HeaderMobile/>
            </Col>
            <Col lg={9} className='p-5'>
                <Spacer/>
                {children}
            </Col>
        </Row>
        <Row className='desktop-footer'>
        <Footer/>
        </Row>
        <Row className='mobile-footer'>
          <FooterMobile/>
        </Row>
    </Container>
  )
}

export default MainTemplate