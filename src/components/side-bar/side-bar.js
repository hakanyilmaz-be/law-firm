import React from "react";
import "./side-bar.css";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/img/logo/logo.png";
import {
  BsArrowDown,
  BsFill1CircleFill,
  BsFill2CircleFill,
  BsFill3CircleFill,
} from "react-icons/bs";
import Spacer from "../spacer/spacer";

const SideBar = () => {
  return (
    <Container
      fluid
      className="side-bar"
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <Row>
        <Col md={12}>
          <img src={logo} alt="TRVLCar" className="img-fluid" />
          <div className="toolbar">
            <h3>Yapmanız Gerekenler</h3>
            <Spacer />
            <div className="step">
              <div>
                <BsFill1CircleFill />
              </div>
              <div className="desc-main">
                Formdaki soruları cevaplayarak, durumunuza uygun hazırlanan
                dilekçeyi indiriniz.
              </div>
            </div>
            <Spacer />
            <div className="arrow">
              <BsArrowDown />
            </div>
            <Spacer />
            <div className="step">
              <div>
                <BsFill2CircleFill />
              </div>
              <div className="desc-main">
                Dilekçeyi indirdikten sonra (adınız, dosya no) gibi sarıya
                boyalı bölümleri doldurunuz.
              </div>
            </div>
            <Spacer />

            <div className="arrow">
              <BsArrowDown />
            </div>
            <Spacer />
            <div className="step">
              <div>
                <BsFill3CircleFill />
              </div>
              <div className="desc-main">
                Dilekçenizi kontrol ediniz ve imzalayarak, ek(ler)i ile birlikte
                ilgili makama teslim ediniz.
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SideBar;
