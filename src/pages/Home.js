import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleGenerateDocument } from "../components/word-generator/WordGenerator.js";
import { Col, Container, Form, Row } from "react-bootstrap";
import "./home-page.css";
import { Button } from "react-bootstrap";
import Spacer from "../components/spacer/spacer";
import cities from "../assets/data/cities.json";

const Home = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  const initialValues = {
    fileStatus: "",
    currentStatus: "",
    courtCity: "",
    convictionDate: "",
    mainAccusation: "",
    otherAccusations: [],
    prisonDuration: {
      days: "",
      months: "",
      years: "",
    },
    confirmationDecisionDate: "",
    confirmData: false,
    isLifeSentence: false,
  };

  const validationSchema = Yup.object()
    .shape({
      fileStatus: Yup.string().required("Bu alanın doldurulması zorunludur"),
      currentStatus: Yup.string().required("Bu alanın doldurulması zorunludur"),
      courtCity: Yup.string().required("Bu alanın doldurulması zorunludur"),
      convictionDate: Yup.date().required("Bu alanın doldurulması zorunludur"),
      mainAccusation: Yup.string().required("Bu alanın doldurulması zorunludur"),
      otherAccusations: Yup.array().min(1, "En az bir suçlama seçmelisiniz"),
      prisonDuration: Yup.object().test(
        'prison-duration-validation',
        'You must specify a duration or select life sentence',
        function(value) {
          const isLifeSentence = this.parent.isLifeSentence;

          // If life sentence is checked, then the validation should pass
          if (isLifeSentence) {
            return true;
          }

          // Otherwise, check if at least one of the fields in prisonDuration has a value
          return value.days || value.months || value.years;
        }
      ),
      confirmationDecisionDate: Yup.date().required("Bu alanın doldurulması zorunludur"),
      confirmData: Yup.bool().oneOf([true], "Verileri onaylamalısınız"),
    })
    .when("fileStatus", {
      is: "Yargıtay Onama kararı verdi",
      then: (schema) =>
        schema.shape({
          currentStatus: Yup.string().required("Bu alanın doldurulması zorunludur"),
          courtCity: Yup.string().required("Bu alanın doldurulması zorunludur"),
          convictionDate: Yup.date().required("Bu alanın doldurulması zorunludur"),
          mainAccusation: Yup.string().required("Bu alanın doldurulması zorunludur"),
          otherAccusations: Yup.array().min(1, "En az bir suçlama seçmelisiniz"),
          confirmationDecisionDate: Yup.date().required("Bu alanın doldurulması zorunludur"),
        }),
    });


  const onSubmit = (values) => {
    if (Object.keys(formik.errors).length === 0) {
      handleGenerateDocument(values);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleLifeSentenceChange = (e) => {
    const checked = e.target.checked;
    formik.setFieldValue('isLifeSentence', checked);
    if (checked) {
      formik.setFieldValue('prisonDuration', { days: '', months: '', years: '' });
    }
  };
  

  const fileStatusOptions = [
    {
      value: "Savcılık soruşturması devam ediyor",
      label: "Savcılık soruşturması devam ediyor",
    },
    {
      value: "Ağır Ceza Mahkemesi'nde yargılama devam ediyor",
      label: "Ağır Ceza Mahkemesi'nde yargılama devam ediyor",
    },
    {
      value: "Dosyam Bölge Adliye Mahkemesi'nde",
      label: "Dosyam Bölge Adliye Mahkemesi'nde",
    },
    {
      value: "Dosyam Yargıtay Savcılığı'nda",
      label: "Dosyam Yargıtay Savcılığı'nda",
    },
    {
      value: "Dosyam Yargıtay 3.Ceza Dairesi'nde",
      label: "Dosyam Yargıtay 3.Ceza Dairesi'nde",
    },
    {
      value: "Yargıtay Onama kararı verdi",
      label: "Yargıtay Onama kararı verdi",
    },
    {
      value: "AYM'ye Bireysel Başvurusu yapıldı",
      label: "AYM'ye Bireysel Başvurusu yapıldı",
    },
    { value: "AİHM Başvurusu yapıldı", label: "AİHM Başvurusu yapıldı" },
  ];

  return (
    <Container>
      <div className="desc">
        <h3>
          AİHM'in Yalçınkaya kararına istinaden sunulabilecek dilekçe örnekleri
        </h3>
        <div className="title-border mt-3"></div>
        <p className="text-muted mt-3">
          Appspery is a beautifully crafted, clean &amp; minimal designed
          landing template for corporate business, professional website,
          personal portfolios, and many more.
        </p>
      </div>

      <Spacer />
      <Form noValidate onSubmit={formik.handleSubmit}>
        <div className="file-type mb-5">
          <p>
            <b>1- Dosya türünü seçiniz:</b>
          </p>
          <Button
            variant="outline-primary"
            className={activeButton === "primary" ? "active" : ""}
            onClick={() => handleButtonClick("primary")}
          >
            Adli
          </Button>
          <Button
            variant="outline-dark"
            className={activeButton === "dark" ? "active" : ""}
            onClick={() => handleButtonClick("dark")}
          >
            İdari
          </Button>
        </div>

        {activeButton === "primary" && (
          <>
            <Form.Group as={Col} md={12} lg={12} className="mb-5">
              <Form.Label>
                <b>2- Dosyanız hangi aşamada?</b>
              </Form.Label>
              <div className="mb-3">
                {fileStatusOptions.map((option, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    label={option.label}
                    name="fileStatus"
                    id={`file-status-${option.value}`}
                    value={option.value}
                    checked={formik.values.fileStatus === option.value}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.fileStatus && !!formik.errors.fileStatus
                    }
                  />
                ))}
              </div>
              <Form.Control.Feedback type="invalid">
                {formik.errors.fileStatus}
              </Form.Control.Feedback>
            </Form.Group>

            {formik.values.fileStatus === "Yargıtay Onama kararı verdi" && (
              <div>
                <Form.Group as={Col}>
                  <Form.Label>
                    <b>3- Güncel durumunuz?</b>
                  </Form.Label>
                  <Form.Check
                    type="radio"
                    label="Cezaevindeyim"
                    name="currentStatus"
                    value="Cezaevindeyim"
                    checked={formik.values.currentStatus === "Cezaevindeyim"}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.currentStatus &&
                      !!formik.errors.currentStatus
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
                      formik.touched.currentStatus &&
                      !!formik.errors.currentStatus
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.currentStatus}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>
                    <b>
                      4- Hangi ilin Ağır Ceza Mahkemesi mahkumiyet kararı verdi?
                    </b>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="courtCity"
                    value={formik.values.courtCity}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.courtCity && !!formik.errors.courtCity
                    }
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

                <Form.Group as={Col}>
                  <Form.Label>
                    <b>
                      5- Ağır Ceza Mahkemesi'nin verdiği mahkumiyet karar
                      tarihini giriniz
                    </b>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="convictionDate"
                    value={formik.values.convictionDate}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.convictionDate &&
                      !!formik.errors.convictionDate
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.convictionDate}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>
                    <b>6- Hakkinizdaki temel suçlama</b>
                  </Form.Label>
                  <Form.Check
                    type="radio"
                    label="Terör örgütü üyeliği"
                    name="mainAccusation"
                    value="Terör örgütü üyeliği"
                    checked={
                      formik.values.mainAccusation === "Terör örgütü üyeliği"
                    }
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.mainAccusation &&
                      !!formik.errors.mainAccusation
                    }
                  />
                  <Form.Check
                    type="radio"
                    label="Terör örgütü yöneticiliği"
                    name="mainAccusation"
                    value="Terör örgütü yöneticiliği"
                    checked={
                      formik.values.mainAccusation ===
                      "Terör örgütü yöneticiliği"
                    }
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.mainAccusation &&
                      !!formik.errors.mainAccusation
                    }
                  />
                  <Form.Check
                    type="radio"
                    label="Terör örgütüne yardım"
                    name="mainAccusation"
                    value="Terör örgütüne yardım"
                    checked={
                      formik.values.mainAccusation === "Terör örgütüne yardım"
                    }
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.mainAccusation &&
                      !!formik.errors.mainAccusation
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.mainAccusation}
                  </Form.Control.Feedback>
                </Form.Group>
                <div>
                  <Form.Group as={Col}>
                    <Form.Label>
                      <b>
                        7- Mahkumiyet kararına konu olan suçlamalar nelerdir?
                      </b>
                    </Form.Label>
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
                        type="checkbox"
                        label={accusation}
                        name="otherAccusations"
                        value={accusation}
                        checked={formik.values.otherAccusations.includes(
                          accusation
                        )}
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

                <Form.Group as={Col}>
                  <Form.Label>
                    <b>
                      8- Hakkinizda verilen hapis cezasının süresini giriniz
                    </b>
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
                        isInvalid={
                          formik.touched.prisonDuration?.years &&
                          !!formik.errors.prisonDuration?.years
                        }
                      >
                        <option value="">Yıl Seçiniz</option>
                        {[...Array(100).keys()].map((year, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1} Yıl
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.prisonDuration?.years}
                      </Form.Control.Feedback>
                    </Col>

                    {/* Ay için seçenek */}
                    <Col>
                      <Form.Control
                        as="select"
                        disabled={formik.values.isLifeSentence}
                        name="prisonDuration.months"
                        value={formik.values.prisonDuration?.months}
                        onChange={formik.handleChange}
                        isInvalid={
                          formik.touched.prisonDuration?.months &&
                          !!formik.errors.prisonDuration?.months
                        }
                      >
                        <option value="">Ay Seçiniz</option>
                        {[...Array(12).keys()].map((month, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1} Ay
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.prisonDuration?.months}
                      </Form.Control.Feedback>
                    </Col>

                    {/* Gün için seçenek */}
                    <Col>
                      <Form.Control
                        as="select"
                        disabled={formik.values.isLifeSentence}
                        name="prisonDuration.days"
                        value={formik.values.prisonDuration?.days}
                        onChange={formik.handleChange}
                        isInvalid={
                          formik.touched.prisonDuration?.days &&
                          !!formik.errors.prisonDuration?.days
                        }
                      >
                        <option value="">Gün Seçiniz</option>
                        {[...Array(29).keys()].map((day) => (
                          <option key={day} value={day}>
                            {day} Gün
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.prisonDuration?.days}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>

                  {/* Müebbet Hapis Cezası seçeneği */}
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Müebbet Hapis Cezası"
                      name="isLifeSentence"
                      checked={formik.values.isLifeSentence}
                      onChange={handleLifeSentenceChange}
                    />
                  </div>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>
                    <b>9- Yargıtay Onama kararı tarihini giriniz</b>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="confirmationDecisionDate"
                    value={formik.values.confirmationDecisionDate}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.confirmationDecisionDate &&
                      !!formik.errors.confirmationDecisionDate
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmationDecisionDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            )}
            {/* Diğer soru gruplarını burada ekleyebilirsiniz. */}
          </>
        )}

        {/* Diğer Adli dosya sorularını buraya ekleyin */}

        <Form.Group as={Col} md={12} lg={12} className="mb-5">
          <Form.Check
            type="checkbox"
            label="Verileri kontrol ettim ve onaylıyorum."
            name="confirmData"
            id="confirmData"
            checked={formik.values.confirmData}
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.confirmData && !!formik.errors.confirmData
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.confirmData}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Word belgesini oluşturmak ve indirmek için bir düğme ekleyin */}
        <Button type="submit">Word Belgesini İndir</Button>
      </Form>
    </Container>
  );
};

export default Home;
