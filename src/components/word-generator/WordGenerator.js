import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

const getTemplateName = (fileStatus) => {
  switch (fileStatus) {
    case "onama":
      return "onama.docx";
    case "aym":
      return "onama.docx";
    case "aihm":
      return "onama.docx";
    case "savcilik":
      return "savcilik.docx";
    case "acm":
      return "acm.docx";
    case "bam":
      return "bam.docx";
    case "yargitaySav":
      return "yargitay.docx";
    case "yargitayda":
      return "yargitay.docx";
      default:
      return "";
  }
};

const getDownloadName = (fileStatus) => {
  switch (fileStatus) {
    case "onama":
      return "YARGILAMANIN İADESİ BAŞVURUSU - AĞIR CEZA MAHKEMESİ.docx";
    case "aym":
      return "YARGILAMANIN İADESİ BAŞVURUSU - AĞIR CEZA MAHKEMESİ.docx";
    case "aihm":
      return "YARGILAMANIN İADESİ BAŞVURUSU - AĞIR CEZA MAHKEMESİ.docx";
    case "savcilik":
      return "TAKİPSİZLİK VE/VEYA TAHLİYE TALEBİ - CUMHURİYET SAVCILIĞI.docx";
    case "acm":
      return "BERAAT VE/VEYA TAHLİYE TALEBİ - AĞIR CEZA MAHKEMESİ.docx";
    case "bam":
      return "BERAAT VE/VEYA TAHLİYE TALEBİ - BÖLGE ADLİYE MAHKEMESİ.docx";
    case "yargitaySav":
      return "BERAAT VE/VEYA TAHLİYE TALEBİ - YARGITAY.docx";
    case "yargitayda":
      return "BERAAT VE/VEYA TAHLİYE TALEBİ - YARGITAY.docx";
      default:
      return "";
  }
};

export const handleGenerateDocument = (data) => {
  const templateName = getTemplateName(data.fileStatus);

  fetch(process.env.PUBLIC_URL + `/${templateName}`)
    .then((response) => response.blob())
    .then((blob) => blob.arrayBuffer())
    .then((arrayBuffer) => {
      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip);

      let prisonSentenceString;

      if (data.isLifeSentence) {
        prisonSentenceString = "Müebbet";
      } else {
        prisonSentenceString = data.formattedPrisonDuration;
      }

      let tahliyeText = "";
      let tutuklulukText = "";

      if (
        (data.fileStatus === "yargitayda" || data.fileStatus === "yargitaySav") && data.currentStatusSupCourt === "Tutukluyum"
      ) {
        tahliyeText = "TAHLİYE ve ";
        tutuklulukText = `Bu suçlama gerekçe gösterilerek de ${data.formattedConvictionDateSupCourt} tarihinde tutuklandım ve halen tutukluluğum devam ediyor.`;
      }

      doc.setData({
        courtCity: data.courtCity,
        otherAccusations: data.otherAccusations,
        mainAccusation: data.mainAccusation,
        prisonSentence: prisonSentenceString,
        confirmationDecisionDate: data.formattedConfirmationDecisionDate,
        adli: data.currentStatus,
        currentStatusSupCourt: data.currentStatusSupCourt,
        convictionDateSupCourt: data.formattedConvictionDateSupCourt,
        // ... other data fields
        tahliyeStatus: tahliyeText,
        tutuklulukStatus: tutuklulukText
      });

      try {
        doc.render();
      } catch (error) {
        console.error(error);
      }

      const output = doc.getZip().generate({ type: "blob" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(output);
      link.download = getDownloadName(data.fileStatus); 
      link.click();
    });
};
