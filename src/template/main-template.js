import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SideBar from '../components/side-bar/side-bar'
import "./main-template.css"
import Spacer from "../components/spacer/spacer"

const MainTemplate = ( {children}) => {
  return (
    <Container fluid className="main-template">
        <Row>
            <Col lg={3} className= 'sidebar sticky-top'>
                <SideBar/>
            </Col>
            <Col lg={9} className='p-5'>
                <Spacer/>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default MainTemplate













