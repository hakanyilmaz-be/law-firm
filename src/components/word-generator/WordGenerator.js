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

      let yargitayTahliyeText = "";
      let yargitayTutuklulukText = "";
      let bamTahliye = "";
      let bamTutuklulukText = "";
      let acmTahliye = "";
      let acmTutuklulukText = "";
      let prosecutionStatementText="";
      let prosecutionOtherAccusations="";
      let prosecutionOtherAccusations2="";
      let prosecutionText="";
      let prosecutionStatus="";


      if (
        (data.fileStatus === "yargitayda" || data.fileStatus === "yargitaySav") && data.currentStatusSupCourt === "Tutukluyum"
      ) {
        yargitayTahliyeText = "TAHLİYE ve ";
        yargitayTutuklulukText = `Bu suçlama gerekçe gösterilerek de ${data.formattedConvictionDateSupCourt} tarihinde tutuklandım ve halen tutukluluğum devam ediyor.`;
      }


      if (
        data.fileStatus === "bam" && data.currentStatusBam === "Tutukluyum"
      ) {
        bamTahliye = "TAHLİYE ve ";
        bamTutuklulukText = `Bu suçlama gerekçe gösterilerek de ${data.formattedConvictionDateBam} tarihinde tutuklandım ve halen tutukluluğum devam ediyor.`;
      }

      if (
        data.fileStatus === "acm" && data.currentStatusAcm === "Tutukluyum"
      ) {
        acmTahliye = "TAHLİYE ve ";
        acmTutuklulukText = `Bu suçlama gerekçe gösterilerek de ${data.formattedConvictionDateAcm} tarihinde tutuklandım ve halen tutukluluğum devam ediyor.`;
      }

      if (
        data.fileStatus === "savcilik" && data.prosecutionStatement === "İfade verdim"
      ) {
      
        prosecutionStatementText = `Soruşturma kapsamında, ${data.otherAccusations} nedenleri gerekçe gösterilerek hakkımda soruşturma yürütülmektedir.`;
      }

      if (
       data.fileStatus === "savcilik" && data.detentionStatus === "Tutukluydum ama tahliye edildim"
      ) {
      
        prosecutionOtherAccusations = `Soruşturma kapsamında, ${data.otherAccusations} nedenleri gerekçe gösterilerek hakkımda soruşturma yürütülmektedir.`;
      }

      if (
        (data.fileStatus === "savcilik" && data.detentionStatus === "Tutukluyum") || (data.fileStatus === "savcilik" && data.detentionStatus === "Tutukluydum ama tahliye edildim")
       ) {
       
         prosecutionOtherAccusations2 = `Soruşturma kapsamında, ${data.otherAccusations} nedenleri gerekçe gösterilerek hakkımda soruşturma yürütülmektedir.`;
         prosecutionText = "Soruşturma kapsamında tutuklandım. ";
         prosecutionStatus=" ve Serbest Bırakma";
       }

      doc.setData({
        courtCity: data.courtCity,
        convictionDate:data.formattedConvictionDate,
        otherAccusations: data.otherAccusations,
        mainAccusation: data.mainAccusation,
        prisonSentence: prisonSentenceString,
        confirmationDecisionDate: data.formattedConfirmationDecisionDate,
        adli: data.currentStatus,
        currentStatusSupCourt: data.currentStatusSupCourt,
        convictionDateSupCourt: data.formattedConvictionDateSupCourt,
        currentStatusBam:data.currentStatusBam,
        convictionDateBam:data.formattedConvictionDateBam,
        convictionDateAcm:data.formattedConvictionDateAcm,
      
        tahliyeStatus: yargitayTahliyeText,
        tutuklulukStatus: yargitayTutuklulukText,
        bamTahliyeStatus: bamTahliye,
        bamTutuklulukStatus: bamTutuklulukText,
        acmTahliyeStatus: acmTahliye,
        acmTutuklulukStatus: acmTutuklulukText,
        prosecutionStatementTextData:prosecutionStatementText,
        prosecutionOtherAccusationsData:prosecutionOtherAccusations,
        prosecutionOtherAccusations2Data:prosecutionOtherAccusations2,
        prosecutionTextData: prosecutionText,
        prosecutionStatusData: prosecutionStatus,
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
