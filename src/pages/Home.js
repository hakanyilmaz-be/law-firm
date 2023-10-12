import React, { useState } from "react";
import { handleGenerateDocument } from "../components/word-generator/WordGenerator.js";
import { Col, Container, Form, Row } from "react-bootstrap";
import "./home-page.css";
import { Button } from "react-bootstrap";
import Spacer from "../components/spacer/spacer";
import cities from "../assets/data/cities.json";

const Home = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [fileStatus, setFileStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState(""); // Guncel durum
  const [courtCity, setCourtCity] = useState(""); // Hangi ilin Ağır Ceza Mahkemesi
  const [convictionDate, setConvictionDate] = useState(""); // Mahkumiyet tarihi
  const [mainAccusation, setMainAccusation] = useState(""); // Temel suçlama
  const [otherAccusations, setOtherAccusations] = useState([]); // Diğer suçlamalar
  const [prisonDuration, setPrisonDuration] = useState({
    days: "",
    months: "",
    years: ""
  }); // Hapis süresi
  const [confirmationDecisionDate, setConfirmationDecisionDate] = useState(""); // Yargıtay Onama kararı tarihi
  const [isLifeSentence, setIsLifeSentence] = useState(false);

  const handleLifeSentenceChange = (e) => {
    setIsLifeSentence(e.target.checked);

    if (e.target.checked) {
      setPrisonDuration({ days: "0", months: "0", years: "0" });
    }
  };

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

  // Kullanıcının seçtiği dosya türüne göre soruları ve seçenekleri tanımlayın-idari sectiginde, zaten adli secimi icin kodlar asagida yaziyor

  let questions = null;
  if (activeButton === "primary") {
    questions = (
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
                name="file-status"
                id={`file-status-${option.value}`}
                value={option.value}
                checked={fileStatus === option.value}
                onChange={handleFileStatusChange}
              />
            ))}
          </div>
        </Form.Group>

        {fileStatus === "Yargıtay Onama kararı verdi" && (
          <div>
            <Form.Group as={Col}>
              <Form.Label>
                <b>3- Güncel durumunuz?</b>
              </Form.Label>
              <Form.Check
                type="radio"
                label="Cezaevindeyim"
                name="current-status"
                value="Cezaevindeyim"
                checked={currentStatus === "Cezaevindeyim"}
                onChange={(e) => setCurrentStatus(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Serbestim"
                name="current-status"
                value="Serbestim"
                checked={currentStatus === "Serbestim"}
                onChange={(e) => setCurrentStatus(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                <b>
                  4- Hangi ilin Ağır Ceza Mahkemesi mahkumiyet kararı verdi?
                </b>
              </Form.Label>
              <Form.Control
                as="select"
                value={courtCity}
                onChange={(e) => setCourtCity(e.target.value)}
              >
                <option value="">İl Seçiniz</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                <b>
                  5- Ağır Ceza Mahkemesi'nin verdiği mahkumiyet karar tarihini
                  giriniz
                </b>
              </Form.Label>
              <Form.Control
                type="date"
                value={convictionDate}
                onChange={(e) => setConvictionDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                <b>6- Hakkinizdaki temel suçlama</b>
              </Form.Label>
              <Form.Check
                type="radio"
                label="Terör örgütü üyeliği"
                name="main-accusation"
                value="Terör örgütü üyeliği"
                checked={mainAccusation === "Terör örgütü üyeliği"}
                onChange={(e) => setMainAccusation(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Terör örgütü yöneticiliği"
                name="main-accusation"
                value="Terör örgütü yöneticiliği"
                checked={mainAccusation === "Terör örgütü yöneticiliği"}
                onChange={(e) => setMainAccusation(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Terör örgütüne yardım"
                name="main-accusation"
                value="Terör örgütüne yardım"
                checked={mainAccusation === "Terör örgütüne yardım"}
                onChange={(e) => setMainAccusation(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                <b>7- Mahkumiyet kararına konu olan suçlamalar nelerdir?</b>
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
                  value={accusation}
                  checked={otherAccusations.includes(accusation)}
                  onChange={() => {
                    if (otherAccusations.includes(accusation)) {
                      setOtherAccusations((prevState) =>
                        prevState.filter((a) => a !== accusation)
                      );
                    } else {
                      setOtherAccusations((prevState) => [
                        ...prevState,
                        accusation,
                      ]);
                    }
                  }}
                />
              ))}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                <b>8- Hakkinizda verilen hapis cezasının süresini giriniz</b>
              </Form.Label>

              <Row>
                {/* Yıl için seçenek */}
                <Col>
                  <Form.Control
                    as="select"
                    disabled={isLifeSentence}
                    value={prisonDuration.years}
                    onChange={(e) =>
                      setPrisonDuration({
                        ...prisonDuration,
                        years: e.target.value,
                      })
                    }
                  >
                    <option value="">Yıl Seçiniz</option>
                    {[...Array(100).keys()].map((year) => (
                      <option key={year} value={year}>
                        {year} Yıl
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                {/* Ay için seçenek */}
                <Col>
                  <Form.Control
                    as="select"
                    disabled={isLifeSentence}
                    value={prisonDuration.months}
                    onChange={(e) =>
                      setPrisonDuration({
                        ...prisonDuration,
                        months: e.target.value,
                      })
                    }
                  >
                    <option value="">Ay Seçiniz</option>
                    {[...Array(12).keys()].map((month, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1} Ay
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                {/* Gün için seçenek */}
                <Col>
                  <Form.Control
                    as="select"
                    disabled={isLifeSentence}
                    value={prisonDuration.days}
                    onChange={(e) =>
                      setPrisonDuration({
                        ...prisonDuration,
                        days: e.target.value,
                      })
                    }
                  >
                    <option value="">Gün Seçiniz</option>
                    {[...Array(31).keys()].map((day) => (
                      <option key={day} value={day}>
                        {day} Gün
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>

              {/* Müebbet Hapis Cezası seçeneği */}
              <div className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Müebbet Hapis Cezası"
                  checked={isLifeSentence}
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
                value={confirmationDecisionDate}
                onChange={(e) => setConfirmationDecisionDate(e.target.value)}
              />
            </Form.Group>
          </div>
        )}
        {/* Diğer soru gruplarını burada ekleyebilirsiniz. */}
      </>
    );
  }
  // eğer diğer buton "dark" için de benzer sorular veya başka sorular eklemek isterseniz:
  else if (activeButton === "dark") {
    // İdari dosya türü için sorular ve seçenekler
    // Örneğin: Soru 3, Soru 4 vb. burada tanımlanabilir
  }

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

      <Form>
        {questions}

        {/* Diğer Adli dosya sorularını buraya ekleyin */}

        <Form.Group as={Col} md={12} lg={12} className="mb-5">
          <Form.Check
            type="checkbox"
            label="Verileri kontrol ettim ve onaylıyorum."
            name="confirm-data"
            id="confirm-data"
          />
        </Form.Group>

        {/* Word belgesini oluşturmak ve indirmek için bir düğme ekleyin */}
        <Button
          onClick={() =>
            handleGenerateDocument({
              fileStatus,
              currentStatus,
              courtCity,
              convictionDate,
              mainAccusation,
              otherAccusations,
              prisonDuration,
              confirmationDecisionDate,
            })
          }
        >
          Word Belgesini İndir
        </Button>
      </Form>
    </Container>
  );
};

export default Home;
