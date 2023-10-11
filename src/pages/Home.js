import React, { useState } from "react";
import { Col, Container, Form } from "react-bootstrap";
import "./home-page.css";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import Select from "react-select";
import Spacer from "../components/spacer/spacer";

const Home = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [fileStatus, setFileStatus] = useState("");

  const handleButtonClick = (variant) => {
    setActiveButton(variant === activeButton ? null : variant);
  };

  const handleFileStatusChange = (e) => {
    setFileStatus(e.target.value);
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

  /*  const [dosyaAşaması, setDosyaAşaması] = useState("");
    const [güncelDurum, setGüncelDurum] = useState("");
    const [mahkumiyetKararıTarihi, setMahkumiyetKararıTarihi] = useState("");
  
    const dosyaAşamasıSeçenekleri = [
      { value: "Savcılık soruşturması devam ediyor", label: "Savcılık soruşturması devam ediyor" },
      { value: "Ağır Ceza Mahkemesi'nde yargılama devam ediyor", label: "Ağır Ceza Mahkemesi'nde yargılama devam ediyor" },
      { value: "Dosyam Bölge Adliye Mahkemesi'nde", label: "Dosyam Bölge Adliye Mahkemesi'nde" },
      { value: "Dosyam Yargıtay Savcılığı'nda", label: "Dosyam Yargıtay Savcılığı'nda" },
      { value: "Dosyam Yargıtay 3.Ceza Dairesi'nde", label: "Dosyam Yargıtay 3.Ceza Dairesi'nde" },
      { value: "Yargıtay Onama kararı verdi", label: "Yargıtay Onama kararı verdi" },
      { value: "AYM'ye Bireysel Başvurusu yapıldı", label: "AYM'ye Bireysel Başvurusu yapıldı" },
      { value: "AİHM Başvurusu yapıldı", label: "AİHM Başvurusu yapıldı" }
    ];
  
    const güncelDurumSeçenekleri = [
      { value: "Cezaevindeyim", label: "Cezaevindeyim" },
      { value: "Serbestim", label: "Serbestim" }
    ];
  
    const initialValues = {
      dosyaTürü: "",
      dosyaAşaması: "",
      güncelDurum: "",
      mahkumiyetKararıTarihi: ""
    };
  
    const validationSchema = Yup.object({
      dosyaTürü: Yup.string().required("Bu alan zorunludur."),
      dosyaAşaması: Yup.string().required("Bu alan zorunludur."),
      güncelDurum: Yup.string().required("Bu alan zorunludur."),
      mahkumiyetKararıTarihi: Yup.date().required("Bu alan zorunludur.")
    });
  
    const onSubmit = (values) => {
      // Burada form verilerini işleyebilirsiniz.
    }; */

  return (
    <Container>
      <div className="desc">
        <h3>
          AİHM'in Yalçınkaya kararına istinaden sunulabilecek dilekçe örnekleri
        </h3>
        <div class="title-border mt-3"></div>
        <p class="text-muted mt-3">
          Appspery is a beautifully crafted, clean &amp; minimal designed
          landing template for corporate business, professional website,
          personal portfolios, and many more.
        </p>
      </div>
      <Spacer />
      {/*  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <div className="form-group">
            <label htmlFor="dosyaTürü">Dosya türünü seçiniz:</label>
            <Field as="select" name="dosyaTürü">
              <option value="">Seçiniz</option>
              <option value="Adli">Adli</option>
              <option value="İdari">İdari</option>
            </Field>
            {formik.touched.dosyaTürü && formik.errors.dosyaTürü ? (
              <div className="alert alert-danger">{formik.errors.dosyaTürü}</div>
            ) : null}
          </div>

          {formik.values.dosyaTürü === "Adli" && (
            <>
              <div className="form-group">
                <label htmlFor="dosyaAşaması">Dosyanız hangi aşamada?</label>
                <Select
                  options={dosyaAşamasıSeçenekleri}
                  onChange={({ value }) => setDosyaAşaması(value)}
                  placeholder="Seçiniz"
                />
                {
                  dosyaAşaması === "Yargıtay Onama kararı verdi" && (
                    <>
                      <div className="form-group">
                        <label htmlFor="güncelDurum">Güncel durumunuz?</label>
                        <Select
                          options={güncelDurumSeçenekleri}
                          onChange={({ value }) => setGüncelDurum(value)}
                          placeholder="Seçiniz"
                        />
                      </div>

                      {güncelDurum && (
                        <div className="form-group">
                          <label htmlFor="mahkumiyetKararıTarihi">Ağır Ceza Mahkemesi'nin verdiği mahkumiyet karar tarihini giriniz:</label>
                          <Field type="date" name="mahkumiyetKararıTarihi" />
                          {formik.touched.mahkumiyetKararıTarihi && formik.errors.mahkumiyetKararıTarihi ? (
                            <div className="alert alert-danger">{formik.errors.mahkumiyetKararıTarihi}</div>
                          ) : null}
                        </div>
                      )}
                    </>
                  )
                }

              </div>

              {dosyaAşaması !== "" && (
                <Button variant="primary" type="submit">
                  Gönder
                </Button>
              )}
            </>
          )}

        </Form>
      )}
    </Formik> */}

      <div className="file-type mb-5">
        <p>1- Dosya türünü seçiniz:</p>
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

      {activeButton === 'primary' && (
      <Form>
        <Form.Group as={Col} md={12} lg={12} className="mb-5">
          <Form.Label>2- Dosyanız hangi aşamada?</Form.Label>

          <div className="mb-3">
            {fileStatusOptions.map((option, index) => (
              <Form.Check
                key={index}
                type="radio"
                label={option.label}
                name="file-status"
                id={`file-status-${option.value}`}
                value={option.value}
                checked={fileStatus === option.value}
                onChange={handleFileStatusChange}
              />
            ))}
          </div>
        </Form.Group>
      </Form>
      )}
    </Container>
  );
};

export default Home;
