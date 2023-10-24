import React from "react";
import { Form, Col } from "react-bootstrap"; 

const Acm = ({ formik, cities }) => {
    return (
        <div>
          <Form.Group as={Col} className="mb-4">
            <Form.Label>
              <b>Soruşturma hangi İl Savcılığında yürütülüyor? Seçiniz</b>
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
              name="currentStatus"
              value="Tutukluyum"
              checked={formik.values.currentStatus === "Tutukluyum"}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.currentStatus && !!formik.errors.currentStatus
              }
            />
            
            <Form.Check
              type="radio"
              label="Serbestim"
              name="currentStatus"
              value="Serbestim"
              checked={formik.values.currentStatus === "Serbestim"}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.currentStatus && !!formik.errors.currentStatus
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.currentStatus}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} className="mb-4">
            <Form.Label>
              <b>Hakkinizdaki temel suçlama</b>
            </Form.Label>
            <Form.Check
              type="radio"
              label="Terör örgütü üyeliği"
              name="mainAccusation"
              value="Terör örgütü üyeliği"
              checked={formik.values.mainAccusation === "Terör örgütü üyeliği"}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.mainAccusation && !!formik.errors.mainAccusation
              }
            />
            <Form.Check
              type="radio"
              label="Terör örgütü yöneticiliği"
              name="mainAccusation"
              value="Terör örgütü yöneticiliği"
              checked={formik.values.mainAccusation === "Terör örgütü yöneticiliği"}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.mainAccusation && !!formik.errors.mainAccusation
              }
            />
            <Form.Check
              type="radio"
              label="Terör örgütüne yardım"
              name="mainAccusation"
              value="Terör örgütüne yardım"
              checked={formik.values.mainAccusation === "Terör örgütüne yardım"}
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
                    Soruşturma kapsamında yöneltilen suçlamalar nelerdir?
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