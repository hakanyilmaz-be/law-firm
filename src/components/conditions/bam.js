import React from "react";
import { Form, Col, Row } from "react-bootstrap"; 

const Bam = ({ formik, bamlist, handleLifeSentenceChange }) => {
  return (
    <div>
      <Form.Group as={Col} className="mb-4">
        <Form.Label>
          <b>Dosyanız hangi Bölge Adliye Mahkemesi'nde? Seçiniz</b>
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
          {bamlist.map((bamitem, index) => (
            <option key={index} value={bamitem}>
              {bamitem}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {formik.errors.courtCity}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} className="mb-4">
        <Form.Label>
          <b>Hakkınızda verilen hapis cezasının süresini giriniz</b>
        </Form.Label>

        <Row>
          {/* Yıl için seçenek */}
          <Col>
            <Form.Control
              as="select"
              disabled={formik.values.isLifeSentence}
              name="prisonDuration.years"
              value={formik.values.prisonDuration?.years}
              onChange={formik.handleChange}
            >
              <option value="">Yıl Seçiniz</option>
              {[...Array(100).keys()].map((year, index) => (
                <option key={index} value={index + 1}>
                  {index + 1} yıl
                </option>
              ))}
            </Form.Control>
          </Col>

          {/* Ay için seçenek */}
          <Col>
            <Form.Control
              as="select"
              disabled={formik.values.isLifeSentence}
              name="prisonDuration.months"
              value={formik.values.prisonDuration?.months}
              onChange={formik.handleChange}
            >
              <option value="">Ay Seçiniz</option>
              {[...Array(12).keys()].map((month, index) => (
                <option key={index} value={month}>
                  {month} ay
                </option>
              ))}
            </Form.Control>
          </Col>

          {/* Gün için seçenek */}
          <Col>
            <Form.Control
              as="select"
              disabled={formik.values.isLifeSentence}
              name="prisonDuration.days"
              value={formik.values.prisonDuration?.days}
              onChange={formik.handleChange}
            >
              <option value="">Gün Seçiniz</option>
              {[...Array(29).keys()].map((day) => (
                <option key={day} value={day}>
                  {day} gün
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>

        {/* Error message for prisonDuration */}
        {formik.touched.prisonDuration &&
          typeof formik.errors.prisonDuration === "string" && (
            <div className="mt-2 text-danger">
              {formik.errors.prisonDuration}
            </div>
          )}

        {/* Müebbet Hapis Cezası seçeneği */}
        <div className="mb-3">
          <Form.Check
            type="checkbox"
            label="Müebbet"
            name="isLifeSentence"
            checked={formik.values.isLifeSentence}
            onChange={handleLifeSentenceChange}
          />
        </div>
      </Form.Group>

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
            <b>Soruşturma kapsamında yöneltilen suçlamalar nelerdir? Birden
                fazla seçebilirsiniz, eğer bunlardan farklı iddialar varsa
                dilekçe örneğini indirdikten sonra ekleyebilirsiniz</b>
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

      <Form.Group as={Col} className="mb-4">
        <Form.Label>
          <b>Tutukluluk durumunuzu seçiniz</b>
        </Form.Label>
        <Form.Check
          type="radio"
          label="Tutukluyum"
          name="currentStatusBam"
          value="Tutukluyum"
          checked={formik.values.currentStatusBam === "Tutukluyum"}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.currentStatusBam && !!formik.errors.currentStatusBam
          }
        />

        <Form.Check
          type="radio"
          label="Serbestim"
          name="currentStatusBam"
          value="Serbestim"
          checked={formik.values.currentStatusBam === "Serbestim"}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.currentStatusBam && !!formik.errors.currentStatusBam
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.currentStatusBam}
        </Form.Control.Feedback>
      </Form.Group>
      {formik.values.currentStatusBam === "Tutukluyum" && <>
      <Form.Group as={Col} className="mb-4">
        <Form.Label>
          <b>Tutuklanma tarihiniz?</b>
        </Form.Label>
        <Form.Control
          type="date"
          name="convictionDateBam"
          style={{ width: "220px" }}
          value={formik.values.convictionDateBam}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.convictionDateBam && !!formik.errors.convictionDateBam
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.convictionDateBam}
        </Form.Control.Feedback>
      </Form.Group>
      </>}
    </div>
  );
};

export default Bam;
