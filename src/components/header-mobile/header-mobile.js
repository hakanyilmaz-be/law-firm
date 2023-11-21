import React from "react";
import "./header-mobile.css";
import { Col, Container, Row } from "react-bootstrap";

import {
  BsFill1CircleFill,
  BsFill2CircleFill,
  BsFill3CircleFill,
} from "react-icons/bs";
import Spacer from "../spacer/spacer";

const HeaderMobile = () => {
  return (
    <Container
      fluid
      className="mobile-bar"
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <Row>
        <Col md={12}>
         {/*  <img src={logo} alt="" className="img-fluid" /> */}
          <div className="toolbar mt-3">
            <h3>Yapmanız Gerekenler</h3>
            <div className="title-border mt-3"></div>
            <div className="step">
              <div>
                <BsFill1CircleFill />
              </div>
              <div className="desc-main">
                Formdaki soruları cevaplayarak, durumunuza uygun hazırlanan
                dilekçeyi indiriniz.
              </div>
            </div>

            <div className="step">
              <div>
                <BsFill2CircleFill />
              </div>
              <div className="desc-main">
                Dilekçeyi indirdikten sonra (adınız, dosya no) gibi sarıya
                boyalı bölümleri doldurunuz.
              </div>
            </div>

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
          <Spacer/>
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderMobile;
