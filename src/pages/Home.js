import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleGenerateDocument } from "../components/word-generator/WordGenerator.js";
import { Col, Container, Form } from "react-bootstrap";
import "./home-page.css";
import { Button } from "react-bootstrap";
import Spacer from "../components/spacer/spacer";
import cities from "../assets/data/cities.json";
import bamlist from "../assets/data/bam.json"
import ConditionOnama from "../components/conditions/condition-onama.js";
import ConditionSavcilik from "../components/conditions/condition-savcilik.js";
import Acm from "../components/conditions/acm.js";
import Bam from "../components/conditions/bam.js";
import Yargitay from "../components/conditions/yargitay.js";

const Home = () => {
  const handleButtonClick = (type) => {
    formik.setFieldValue("fileType", type);
  };

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
  };

  const validationSchema = Yup.object({
    fileType: Yup.string()
      .required("Lütfen dosya türünü seçiniz")
      .oneOf(["primary", "dark"], "Geçersiz dosya türü seçildi"),
    fileStatus: Yup.string().required("Bu alanın doldurulması zorunludur"),
    confirmData: Yup.bool().oneOf([true], "Onaylamalısınız"),
    currentStatus: Yup.string().test('courtCity-required', 'Bu alanın doldurulması zorunludur', function(value) {
      const fileStatus = this.parent.fileStatus;
      if ( (fileStatus === 'onama' || fileStatus === 'aym' || fileStatus === 'aihm' || fileStatus === 'acm' || fileStatus === 'bam') && !value) {
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
      if ( (fileStatus === 'onama' || fileStatus === 'aym' || fileStatus === 'aihm' || fileStatus === 'bam') && !value) {
        return false;
      }
      return true;
    }), 
    
    mainAccusation: Yup.string().required("Bu alanın doldurulması zorunludur"),
    otherAccusations: Yup.array().min(1, "En az bir suçlama seçmelisiniz"),
    prisonDuration: Yup.object().test(
      "prison-duration-validation",
      "You must specify a duration or select life sentence",
      function(value) {
        const fileStatus = this.parent.fileStatus;
        if (fileStatus === 'acm' || fileStatus === 'savcilik') {
          return true;  // always valid if fileStatus is 'acm' or 'savcilik'
        }
    
        const isLifeSentence = this.parent.isLifeSentence;
        if (isLifeSentence) {
          return true;  // valid if life sentence is checked
        }
    
        return value.days || value.months || value.years;  // otherwise, at least one value should be present
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

  const onSubmit = (values) => {
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

    // Format otherAccusations
    if (
      processedValues.otherAccusations &&
      Array.isArray(processedValues.otherAccusations)
    ) {
      processedValues.otherAccusations =
        processedValues.otherAccusations.join(", ");
    }

    // Format the date value
    processedValues.formattedConfirmationDecisionDate = formatDate(
      processedValues.confirmationDecisionDate
    );
    processedValues.formattedConvictionDateSupCourt = formatDate(
      processedValues.convictionDateSupCourt
    );

    console.log(processedValues);
    handleGenerateDocument(processedValues);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleLifeSentenceChange = (e) => {
    const checked = e.target.checked;
    formik.setFieldValue("isLifeSentence", checked);
    if (checked) {
      formik.setFieldValue("prisonDuration", {
        days: "",
        months: "",
        years: "",
      });
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
        <h3>
        AİHM Yalçınkaya Kararı Kapsamında Dilekçe Örnekleri
        </h3>
        <div className="title-border mt-3"></div>
        <p className="text-muted mt-3">
          Değerli ziyaretçiler, AİHM Büyük Daire'nin Yalçınkaya Kararı (Başvuru No. 15669/20)
          sonrası, mağduriyet yaşayanlar için örnek dilekçeler oluşturma
          platformunu hazırladık. Sadece birkaç soruyu cevaplayarak kısa sürede dilekçe
          hazırlamanızı kolaylaştırmayı amaçlıyoruz.
        </p>
      </div>

      <Spacer />
      <Form noValidate onSubmit={formik.handleSubmit}>
        <div className="file-type mb-4">
          <Form.Group as={Col} md={12} lg={12} className="mb-4">
            <Form.Label>
              <b>1- Dosya türünü seçiniz:</b>
            </Form.Label>
            <div>
              <Button
                variant="outline-primary"
                className={formik.values.fileType === "primary" ? "active" : ""}
                onClick={() => handleButtonClick("primary")}
              >
                Adli
              </Button>

              <Button
                variant="outline-dark"
                className={formik.values.fileType === "dark" ? "active" : ""}
                onClick={() => handleButtonClick("dark")}
              >
                İdari
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

            {["onama", "aym", "aihm"].includes(formik.values.fileStatus) && (
              <ConditionOnama
                formik={formik}
                cities={cities}
                handleLifeSentenceChange={handleLifeSentenceChange}
              />
            )}

            {["savcilik"].includes(
              formik.values.fileStatus
            ) && (
              <ConditionSavcilik
                formik={formik}
                cities={cities}
              />
            )}

            {["acm"].includes(
              formik.values.fileStatus
            ) && (
              <Acm
                formik={formik}
                cities={cities}
              />
            )}

            {["bam"].includes(
              formik.values.fileStatus
            ) && (
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

        <Form.Group as={Col} md={12} lg={12} className="mb-5">
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

        {/* Word belgesini oluşturmak ve indirmek için bir düğme ekleyin */}
        <Button type="submit">Word Belgesini İndir</Button>
      </Form>
    </Container>
  );
};

export default Home;
