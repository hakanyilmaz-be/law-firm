import React from "react";
import { Form, Col } from "react-bootstrap"; 

const Acm = ({ formik, cities }) => {
    return (
        <div>
          <Form.Group as={Col} className="mb-4">
            <Form.Label>
              <b>Dosyanız hangi İl Ağır Ceza Mahkemesince yürütülüyor? Seçiniz</b>
            </Form.Label>
            <Form.Control
              as="select"
              name="courtCity"
              style={{ width: "220px" }}
              value={formik.values.courtCity}
              onChange={formik.handleChange}
              isInvalid={formik.touched.courtCity && !!formik.errors.courtCity}
            >
              <option value="">İl Seçiniz</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.courtCity}
            </Form.Control.Feedback>
          </Form.Group>
    
          <Form.Group as={Col} className="mb-4">
        <Form.Label>
          <b>Tutukluluk durumunuzu seçiniz</b>
        </Form.Label>
        <Form.Check
          type="radio"
          label="Tutukluyum"
          name="currentStatusAcm"
          value="Tutukluyum"
          checked={formik.values.currentStatusAcm === "Tutukluyum"}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.currentStatusAcm && !!formik.errors.currentStatusAcm
          }
        />

        <Form.Check
          type="radio"
          label="Serbestim"
          name="currentStatusAcm"
          value="Serbestim"
          checked={formik.values.currentStatusAcm === "Serbestim"}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.currentStatusAcm && !!formik.errors.currentStatusAcm
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.currentStatusAcm}
        </Form.Control.Feedback>
      </Form.Group>
      {formik.values.currentStatusAcm === "Tutukluyum" && <>
      <Form.Group as={Col} className="mb-4">
        <Form.Label>
          <b>Tutuklanma tarihiniz?</b>
        </Form.Label>
        <Form.Control
          type="date"
          name="convictionDateAcm"
          style={{ width: "220px" }}
          value={formik.values.convictionDateAcm}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.convictionDateAcm && !!formik.errors.convictionDateAcm
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.convictionDateAcm}
        </Form.Control.Feedback>
      </Form.Group>
      </>}

          <Form.Group as={Col} className="mb-4">
            <Form.Label>
              <b>Hakkınızdaki temel suçlama</b>
            </Form.Label>
            <Form.Check
              type="radio"
              label="Terör örgütü üyeliği"
              name="mainAccusation"
              value="terör örgütü üyeliği"
              checked={formik.values.mainAccusation === "terör örgütü üyeliği"}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.mainAccusation && !!formik.errors.mainAccusation
              }
            />
            <Form.Check
              type="radio"
              label="Terör örgütü yöneticiliği"
              name="mainAccusation"
              value="terör örgütü yöneticiliği"
              checked={formik.values.mainAccusation === "terör örgütü yöneticiliği"}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.mainAccusation && !!formik.errors.mainAccusation
              }
            />
            <Form.Check
              type="radio"
              label="Terör örgütüne yardım"
              name="mainAccusation"
              value="terör örgütüne yardım"
              checked={formik.values.mainAccusation === "terör örgütüne yardım"}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.mainAccusation && !!formik.errors.mainAccusation
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.mainAccusation}
            </Form.Control.Feedback>
          </Form.Group>
    
          <Form.Group as={Col} className="mb-4">
              <div>
                <Form.Label>
                  <b>
                    Soruşturma kapsamında yöneltilen suçlamalar nelerdir? Birden
                fazla seçebilirsiniz, eğer bunlardan farklı iddialar varsa
                dilekçe örneğini indirdikten sonra ekleyebilirsiniz
                  </b>
                </Form.Label>
              </div>
              {[
                "Bylock",
                "Bank Asya",
                "Sendika",
                "Dernek",
                "Sohbetlere katılma",
                "Sohbet yapma",
                "Gazete aboneliği",
                "Dijitürk iptali",
                "Tanık ifadesi",
                "1 Dolar",
                "Kimse Yok Mu",
              ].map((accusation, index) => (
                <Form.Check
                  key={index}
                  inline
                  type="checkbox"
                  style={{ marginRight: "40px" }}
                  label={accusation}
                  name="otherAccusations"
                  value={accusation}
                  checked={formik.values.otherAccusations.includes(accusation)}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.otherAccusations &&
                    !!formik.errors.otherAccusations
                  }
                />
              ))}
              <Form.Control.Feedback type="invalid">
                {formik.errors.otherAccusations}
              </Form.Control.Feedback>
            </Form.Group>
        </div>
      );
}

export default Acm