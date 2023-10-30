import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleGenerateDocument } from "../components/word-generator/WordGenerator.js";
import { Col, Container, Form, Spinner, Button, ListGroup, Badge, Card, Accordion, Row } from "react-bootstrap";
import "./home-page.css";
import { toast } from "react-toastify";
import {BsFillCloudDownloadFill} from "react-icons/bs";
import Spacer from "../components/spacer/spacer.js";
import cities from "../assets/data/cities.json";
import bamlist from "../assets/data/bam.json";
import ConditionOnama from "../components/conditions/condition-onama.js";
import ConditionSavcilik from "../components/conditions/condition-savcilik.js";
import Acm from "../components/conditions/acm.js";
import Bam from "../components/conditions/bam.js";
import Yargitay from "../components/conditions/yargitay.js";
import ek1 from "../assets/documents/Ek1.pdf"
import ek2 from "../assets/documents/Ek2.pdf"
import ek3 from "../assets/documents/Ek3.pdf"
import ek4 from "../assets/documents/Ek4.pdf"
import savcilikCase from "../assets/img/cases/1 Yalçınkaya Kararı Sonrası Ne Yapılabilir - Savcılık.png"
import acmCase from "../assets/img/cases/2 Yalçınkaya Kararı Sonrası Ne Yapılabilir - ACM.png"
import istinafCase from "../assets/img/cases/3 Yalçınkaya Kararı Sonrası Ne Yapılabilir - İstinaf.png"
import yargitayCase from "../assets/img/cases/4 Yalçınkaya Kararı Sonrası Ne Yapılabilir - Yargıtay.png"
import certainCase from "../assets/img/cases/5 Yalçınkaya Kararı Sonrası Ne Yapılabilir - Kesinleşme.png"
import ReactGA from 'react-ga';



const Home = () => {
  const handleButtonClick = (type) => {
    formik.setFieldValue("fileType", type);
  };

  const [downloading, setDownloading] = useState(false);
  const [badgeDownloadStatus, setBadgeDownloadStatus] = useState({
    badge1: false,
    badge2: false,
    badge3: false,
    badge4: false
  });
  


  const initialValues = {
    fileType: "",
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
    prosecutionStatement: "",
    queryDate:"",
    detentionStatus:"",
    currentStatusSupCourt:"",
    convictionDateSupCourt:"",
    currentStatusBam:"",
    convictionDateBam:"",
    currentStatusAcm:"",
    convictionDateAcm:"",
  };

  const validationSchema = Yup.object({
    fileType: Yup.string()
      .required("Lütfen dosya türünü seçiniz")
      .oneOf(["primary", "dark"], "Geçersiz dosya türü seçildi"),
    fileStatus: Yup.string().required("Bu alanın doldurulması zorunludur"),
    confirmData: Yup.bool().oneOf([true], "Onaylamalısınız"),
    currentStatus: Yup.string().test('courtCity-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const fileStatus = this.parent.fileStatus;
      if ( (fileStatus === 'onama' || fileStatus === 'aym' || fileStatus === 'aihm') && !value) {
        return false;
      }
      return true;
    }),
    detentionStatus: Yup.string().test('detentionStatus-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const fileStatus = this.parent.fileStatus;
      if ( (fileStatus === 'savcilik') && !value) {
        return false;
      }
      return true;
    }),

    courtCity: Yup.string().test('courtCity-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const fileStatus = this.parent.fileStatus;
      if ( (fileStatus === 'onama' || fileStatus === 'aym' || fileStatus === 'aihm' || fileStatus === 'savcilik' || fileStatus === 'acm' || fileStatus === 'bam') && !value) {
        return false;
      }
      return true;
    }),
    convictionDate: Yup.date().test('convictionDate-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const fileStatus = this.parent.fileStatus;
      if ( (fileStatus === 'onama' || fileStatus === 'aym' || fileStatus === 'aihm') && !value) {
        return false;
      }
      return true;
    }), 
    mainAccusation: Yup.string().required("Bu alanın doldurulması zorunludur"),
    //otherAccusations: Yup.array().min(1, "En az bir suçlama seçmelisiniz"),
    otherAccusations: Yup.array().test(
      'otherAccusations-condition',
      "En az bir suçlama seçmelisiniz",
      function (value) {
          const { fileStatus, prosecutionStatement } = this.parent;
  
          // If the condition you specified is met, then the field isn't required.
          if (fileStatus === "savcilik" && prosecutionStatement === "Hic ifade vermedim") {
              return true; // validation passes
          }
  
          // Otherwise, ensure the array has at least one item.
          return value && value.length > 0;
      }
  ),  
  prisonDuration: Yup.object()
  .test(
    "prison-duration-validation",
    "Lütfen doldurunuz",
    function(value) {
      const fileStatus = this.parent.fileStatus;
      const detentionStatus = this.parent.detentionStatus;

      if (
        fileStatus === 'acm' ||
        (fileStatus === 'savcilik' && (detentionStatus === 'Tutukluydum ama tahliye edildim' || detentionStatus === 'Hic tutuklanmadim'))
      ) {
        return true; // always valid under these conditions
      }

      const isLifeSentence = this.parent.isLifeSentence;
      if (isLifeSentence) {
        return true;  // valid if life sentence is checked
      }

      // Check if any value exists in prisonDuration
      if (value) {
        return value.days || value.months || value.years;  // at least one value should be present
      } else {
        return false;  // if no value provided, return false to trigger validation error
      }
    }
  ),

    
    isLifeSentence: Yup.bool(),
    confirmationDecisionDate: Yup.date().test('confirmationDecisionDate-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const fileStatus = this.parent.fileStatus;
      if ( (fileStatus === 'onama' || fileStatus === 'aym' || fileStatus === 'aihm') && !value) {
        return false;
      }
      return true;
    }),
    prosecutionStatement:Yup.string().test('prosecutionStatement-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const detentionStatus = this.parent.detentionStatus;
      if (detentionStatus === 'Hic tutuklanmadim' && !value) {
        return false;
      }
      return true;
    }),
    queryDate:Yup.date().test('queryDate-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const detentionStatus = this.parent.detentionStatus;
      if ( (detentionStatus === 'Tutukluyum') && !value) {
        return false;
      }
      return true;
    }),
    currentStatusSupCourt:Yup.string().test('currentStatusSupCourt-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const fileStatus = this.parent.fileStatus;
      if ( (fileStatus === 'yargitayda' || fileStatus === 'yargitaySav') && !value) {
        return false;
      }
      return true;
    }),
    convictionDateSupCourt:Yup.date().test('convictionDateSupCourt-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const currentStatusSupCourt = this.parent.currentStatusSupCourt;
      if ( (currentStatusSupCourt === 'Tutukluyum') && !value) {
        return false;
      }
      return true;
    }),
    currentStatusBam:Yup.string().test('currentStatusBam-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const fileStatus = this.parent.fileStatus;
      if ( (fileStatus === 'bam') && !value) {
        return false;
      }
      return true;
    }),
    convictionDateBam:Yup.date().test('convictionDateBam-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const currentStatusBam = this.parent.currentStatusBam;
      if ( (currentStatusBam === 'Tutukluyum') && !value) {
        return false;
      }
      return true;
    }),
    currentStatusAcm:Yup.string().test('currentStatusAcm-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const fileStatus = this.parent.fileStatus;
      if ( (fileStatus === 'acm') && !value) {
        return false;
      }
      return true;
    }),
    convictionDateAcm:Yup.date().test('convictionDateAcm-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const currentStatusAcm = this.parent.currentStatusAcm;
      if ( (currentStatusAcm === 'Tutukluyum') && !value) {
        return false;
      }
      return true;
    }),
  });

  const formatPrisonDuration = (duration) => {
    let formattedDuration = [];

    if (duration.years) {
      formattedDuration.push(`${duration.years} yıl`);
    }

    if (duration.months) {
      formattedDuration.push(`${duration.months} ay`);
    }

    if (duration.days) {
      formattedDuration.push(`${duration.days} gün`);
    }

    return formattedDuration.join(" ");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0"); // Add leading 0s if needed
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed, add leading 0s if needed
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  const onSubmit = async (values) => {
      // Track the submit action with Google Analytics
      ReactGA.event({
        category: 'User',
        action: 'Form Submission',
        label: 'Submit Button Clicked'
      });
    setDownloading(true);
    const processedValues = { ...values };

    if (processedValues.prisonDuration.days === "0") {
      processedValues.prisonDuration.days = "";
    }

    if (processedValues.prisonDuration.months === "0") {
      processedValues.prisonDuration.months = "";
    }

    processedValues.formattedPrisonDuration = formatPrisonDuration(
      processedValues.prisonDuration
    );

    // Format the date value
    processedValues.formattedConfirmationDecisionDate = formatDate(
      processedValues.confirmationDecisionDate
    );
    processedValues.formattedConvictionDate = formatDate(
      processedValues.convictionDate
    );
    processedValues.formattedConvictionDateSupCourt = formatDate(
      processedValues.convictionDateSupCourt
    );
    processedValues.formattedConvictionDateBam = formatDate(
      processedValues.convictionDateBam
    );
    processedValues.formattedConvictionDateAcm = formatDate(
      processedValues.convictionDateAcm
    );

    processedValues.formattedQueryDate = formatDate(
      processedValues.queryDate
    );

    console.log(processedValues);
    try {
      await handleGenerateDocument(processedValues); 
      toast.success("Dilekçeniz başarıyla indirildi.");
    } catch (error) {
      console.error("Error generating document:", error);
    }

    setTimeout(() => {
      setDownloading(false);
    }, 1000);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleBadgeDownload = (badgeName) => {
    setBadgeDownloadStatus(prevState => ({ ...prevState, [badgeName]: true }));
  
    setTimeout(() => {
      setBadgeDownloadStatus(prevState => ({ ...prevState, [badgeName]: false }));
    }, 1000);
  };
  


  const handleLifeSentenceChange = (e) => {
    const checked = e.target.checked;
  
    // Update the Formik state for isLifeSentence
    formik.setFieldValue("isLifeSentence", checked);
  
    // If the checkbox is checked, reset the prisonDuration values and clear its error
    if (checked) {
      formik.setFieldValue("prisonDuration", {
        days: "",
        months: "",
        years: "",
      });
      formik.setFieldError("prisonDuration", undefined);
      formik.setFieldTouched("prisonDuration", false, false); // The third parameter false prevents validation
    }
  };
  

  const fileStatusOptions = [
    {
      value: "savcilik",
      label: "Savcılık soruşturması devam ediyor",
    },
    {
      value: "acm",
      label: "Ağır Ceza Mahkemesi'nde yargılama devam ediyor",
    },
    {
      value: "bam",
      label: "Dosyam Bölge Adliye Mahkemesi'nde",
    },
    {
      value: "yargitaySav",
      label: "Dosyam Yargıtay Savcılığı'nda",
    },
    {
      value: "yargitayda",
      label: "Dosyam Yargıtay 3.Ceza Dairesi'nde",
    },
    {
      value: "onama",
      label: "Yargıtay Onama kararı verdi",
    },
    {
      value: "aym",
      label: "AYM'ye Bireysel Başvurusu yapıldı",
    },
    { value: "aihm", label: "AİHM Başvurusu yapıldı" },
  ];

  return (
   
    <Container>
      <div className="desc">
        <h3>AİHM Yalçınkaya Kararı Kapsamında Dilekçe Örnekleri</h3>
        <div className="title-border mt-3"></div>
        <p className="text-muted mt-3">
          Değerli ziyaretçiler, AİHM Büyük Daire'nin Yalçınkaya Kararı (Başvuru
          No. 15669/20) sonrası, mağduriyet yaşayanlar için örnek dilekçeler
          oluşturma platformunu hazırladık. Sadece birkaç soruyu cevaplayarak
          kısa sürede dilekçe hazırlamanızı kolaylaştırmayı amaçlıyoruz.
        </p>
      </div>

      <Spacer />
      <Form noValidate onSubmit={formik.handleSubmit}>
        <div className="file-type mb-4">
          <Form.Group as={Col} md={12} lg={12} className="mb-4">
            <Form.Label>
              <b>Dosya türünü seçiniz:</b>
            </Form.Label>
            <div className="btn-file-type">
              <Button
                variant="outline-primary"
                className={formik.values.fileType === "primary" ? "active" : ""}
                onClick={() => handleButtonClick("primary")}
              >
                Ceza Yargılaması
              </Button>

              <Button
                variant="outline-dark"
                className={formik.values.fileType === "dark" ? "active" : ""}
                onClick={() => handleButtonClick("dark")}
              >
                KHK İhraç Yargılaması
              </Button>
            </div>
            {formik.touched.fileType && formik.errors.fileType ? (
              <div className="text-danger">{formik.errors.fileType}</div>
            ) : null}
          </Form.Group>
        </div>

        {formik.values.fileType === "primary" && (
          <>
            <Form.Group as={Col} md={12} lg={12} className="mb-4">
              <Form.Label>
                <b>Dosyanız hangi aşamada?</b>
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

            {["onama", "aym", "aihm"].includes(formik.values.fileStatus) && (
              <ConditionOnama
                formik={formik}
                cities={cities}
                handleLifeSentenceChange={handleLifeSentenceChange}
              />
            )}

            {["savcilik"].includes(formik.values.fileStatus) && (
              <ConditionSavcilik formik={formik} cities={cities} />
            )}

            {["acm"].includes(formik.values.fileStatus) && (
              <Acm formik={formik} cities={cities} />
            )}

            {["bam"].includes(formik.values.fileStatus) && (
              <Bam
                formik={formik}
                bamlist={bamlist}
                handleLifeSentenceChange={handleLifeSentenceChange}
              />
            )}

            {["yargitaySav", "yargitayda"].includes(
              formik.values.fileStatus
            ) && (
              <Yargitay
                formik={formik}
                handleLifeSentenceChange={handleLifeSentenceChange}
              />
            )}

            {/* Diğer soru gruplarını burada ekleyebilirsiniz. */}
          </>
        )}

        {/* Diğer Adli dosya sorularını buraya ekleyin */}

        <Form.Group as={Col} md={12} lg={12} className="mb-3">
          <Form.Check
            type="checkbox"
            label="Yanıtlarımı kontrol ettiğimi ve doğruluğundan emin olduğumu, kişisel bölümleri dilekçeyi indirdikten sonra doldurmam gerektiğini ve gerekli ekleri indirip dilekçemle birlikte sunmam gerektiğini anladım."
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

        <Button type="submit" disabled={downloading}>
          {downloading && (
            <Spinner animation="border" variant="light" size="sm" />
          )}{" "}
          Dava Dilekçesini İndir
        </Button>
      </Form>
      <Card className="mt-5 mb-5 dilekce" >
        <Card.Header
          as="h5"
          style={{ color: "white", backgroundColor: "var(--color2)" }}
        >
          Dava Dilekçesinin Ekleri
        </Card.Header>

        <ListGroup as="ol" className="attachments-wrapper">
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">EK-1</div>
              AİHM Yüksel Yalçınkaya v. Türkiye Kararı
            </div>
            <a
              href={ek1}
              download
              onClick={() => handleBadgeDownload("badge1")}
            >
              <Badge bg="success">
                {badgeDownloadStatus.badge1 ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  <BsFillCloudDownloadFill />
                )}{" "}
                İndir
              </Badge>
            </a>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">EK-2</div>
              AYM İbrahim Er ve Diğerleri Kararı
            </div>
            <a
              href={ek2}
              download
              onClick={() => handleBadgeDownload("badge2")}
            >
              <Badge bg="success">
                {badgeDownloadStatus.badge2 ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  <BsFillCloudDownloadFill />
                )}{" "}
                İndir
              </Badge>
            </a>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">EK-3</div>
              Prof. Dr. Doğan Soyaslan'ın Mütalaası
            </div>
            <a
              href={ek3}
              download
              onClick={() => handleBadgeDownload("badge3")}
            >
              <Badge bg="success">
                {badgeDownloadStatus.badge3 ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  <BsFillCloudDownloadFill />
                )}{" "}
                İndir
              </Badge>
            </a>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">EK-4</div>
              Prof. Dr. İzzet Özgenç'in Değerlendirmesi
            </div>
            <a
              href={ek4}
              download
              onClick={() => handleBadgeDownload("badge4")}
            >
              <Badge bg="success">
                {badgeDownloadStatus.badge4 ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  <BsFillCloudDownloadFill />
                )}{" "}
                İndir
              </Badge>
            </a>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      
      <div className="desc">
        <h3>Yalçınkaya Kararı Sonrası Ne Yapılabilir</h3>
        <div className="title-border mt-3"></div>
        <p className="text-muted mt-3">
          Dosyanız hangi aşamada ise buna göre yapabileceklerinizi aşağıdaki
          şemayı inceleyerek karar verebilirsiniz.
        </p>
      </div>
      <Card className="mb-5">
        <Card.Header
          as="h5"
          style={{ color: "white", backgroundColor: "var(--color2)" }}
        >
          Neler Yapılabilir?
        </Card.Header>
        <Card.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header
                style={{ backgroundColor: "var(--bs-accordion-active-bg)" }}
              >
                Dosyam Savcılık Aşamasında
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <img src={savcilikCase} alt="" className="img-fluid" />
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Dosyam Ağır Ceza Mahkemesinde</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <img src={acmCase} alt="" className="img-fluid" />
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Dosyam İstinafta</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <img src={istinafCase} alt="" className="img-fluid" />
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Dosyam Yargıtayda</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <img src={yargitayCase} alt="" className="img-fluid" />
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Dosyam Kesinleşti</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <img src={certainCase} alt="" className="img-fluid" />
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    </Container>
   
  );
};

export default Home;
