// ConditionalForm.js
import React from "react";
import { Form, Col, Row } from "react-bootstrap"; 

const ConditionSavcilik = ({ formik, cities }) => {
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
          name="detentionStatus"
          value="Tutukluyum"
          checked={formik.values.detentionStatus === "Tutukluyum"}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.detentionStatus && !!formik.errors.detentionStatus
          }
        />
        <Form.Check
          type="radio"
          label="Tutukluydum ama tahliye edildim"
          name="detentionStatus"
          value="Tutukluydum ama tahliye edildim"
          checked={
            formik.values.detentionStatus === "Tutukluydum ama tahliye edildim"
          }
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.detentionStatus && !!formik.errors.detentionStatus
          }
        />
        <Form.Check
          type="radio"
          label="Hiç tutuklanmadım"
          name="detentionStatus"
          value="Hic tutuklanmadim"
          checked={formik.values.detentionStatus === "Hic tutuklanmadim"}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.detentionStatus && !!formik.errors.detentionStatus
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.detentionStatus}
        </Form.Control.Feedback>
      </Form.Group>

      {formik.values.detentionStatus === "Tutukluyum" && (
      <>
      <Form.Group as={Col} className="mb-4">
        <Form.Label>
          <b>Sorgu tarihiniz?</b>
        </Form.Label>
        <Form.Control
          type="date"
          name="queryDate"
          style={{ width: "220px" }}
          value={formik.values.queryDate}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.queryDate && !!formik.errors.queryDate
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.queryDate}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} className="mb-4">
  <Form.Label>
    <b>Tutuklu kalınan süre</b>
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
  {formik.touched.prisonDuration && typeof formik.errors.prisonDuration === "string" && (
    <div className="mt-2 text-danger">{formik.errors.prisonDuration}</div>
  )}


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

      <p style={{color:"red"}}><i><b>Soruşturma sürecinde tutuklu olduğunuz için hem Cumhuriyet Başsavcılığına hem de Nöbetçi Sulh Ceza Hakimliğine dilekçe vermeniz gerekmektedir. İndir butonunu tıkladığınızda her 2 dilekçe de indirilecektir.</b></i></p>
      </>
    )}


    {formik.values.detentionStatus === "Tutukluydum ama tahliye edildim" && (
      <>
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
      </>
    )}

    {formik.values.detentionStatus === "Hic tutuklanmadim" && (
      <>
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
        <Form.Label>
          <b>Savcılık'ta veya emniyette ifade verdiniz mi?</b>
        </Form.Label>
        <Form.Check
          type="radio"
          label="İfade verdim"
          name="prosecutionStatement"
          value="İfade verdim"
          checked={formik.values.prosecutionStatement === "İfade verdim"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}

          isInvalid={
            formik.touched.prosecutionStatement &&
            !!formik.errors.prosecutionStatement
          }
        />
        <Form.Check
          type="radio"
          label="Hiç ifade vermedim"
          name="prosecutionStatement"
          value="Hic ifade vermedim"
          checked={formik.values.prosecutionStatement === "Hic ifade vermedim"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}

          isInvalid={
            formik.touched.prosecutionStatement &&
            !!formik.errors.prosecutionStatement
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.prosecutionStatement}
        </Form.Control.Feedback>
      </Form.Group>

      {formik.values.prosecutionStatement === "İfade verdim" && (
      <>
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
      </>
    )}

      </>
    )}
    </div>
  );
};

export default ConditionSavcilik;
