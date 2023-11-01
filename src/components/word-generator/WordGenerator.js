import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

function processAccusations(accusations) {
    const lowercaseValues = ["sendika", "dernek", "sohbetlere katılma", "sohbet yapma", "gazete aboneliği", "tanık ifadesi", "1 dolar"];
    return accusations.map(value => {
        if (lowercaseValues.includes(value.toLowerCase())) {
            return value.toLowerCase();
        }
        return value;
    });
}

const getTemplateName = (fileStatus, detentionStatus) => {
    switch (fileStatus) {
        case "onama":
        case "aym":
        case "aihm": return ["onama.docx"];
        case "savcilik":
            if (detentionStatus === "Tutukluyum") {
                return ["savcilik.docx", "savcilikNobetci.docx"];
            } else {
                return ["savcilik.docx"];
            }
        case "acm": return ["acm.docx"];
        case "bam": return ["bam.docx"];
        case "yargitaySav":
        case "yargitayda": return ["yargitay.docx"];
        default: return [];
    }
};

const getDownloadName = (fileStatus) => {
    switch (fileStatus) {
        case "onama":
        case "aym":
        case "aihm": return ["YARGILAMANIN İADESİ BAŞVURUSU - AĞIR CEZA MAHKEMESİ.docx"];
        case "savcilik": return ["TAKİPSİZLİK VE/VEYA TAHLİYE TALEBİ - CUMHURİYET SAVCILIĞI.docx", "TAHLİYE TALEBİ - SULH CEZA HAKİMLİĞİ.docx"];
        case "acm": return ["BERAAT VE/VEYA TAHLİYE TALEBİ - AĞIR CEZA MAHKEMESİ.docx"];
        case "bam": return ["BERAAT VE/VEYA TAHLİYE TALEBİ - BÖLGE ADLİYE MAHKEMESİ.docx"];
        case "yargitaySav":
        case "yargitayda": return ["BERAAT VE/VEYA TAHLİYE TALEBİ - YARGITAY.docx"];
        default: return [];
    }
};

export const handleGenerateDocument = (data) => {
  const templateNames = getTemplateName(data.fileStatus, data.detentionStatus);
  const downloadNames = getDownloadName(data.fileStatus);

  templateNames.forEach((templateName, index) => {
      fetch(process.env.PUBLIC_URL + `/${templateName}`)
          .then(response => response.blob())
          .then(blob => blob.arrayBuffer())
          .then(arrayBuffer => {
              const zip = new PizZip(arrayBuffer);
              const doc = new Docxtemplater(zip);

      console.log("Original Accusations:", data.otherAccusations);
      const processedAccusations = Array.isArray(data.otherAccusations) 
    ? processAccusations(data.otherAccusations) 
    : (data.otherAccusations ? processAccusations(data.otherAccusations.split(", ")) : []);

      console.log("Processed Accusations:", processedAccusations);
      



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
      
        prosecutionStatementText = `Soruşturma kapsamında, ${processedAccusations.join(", ")} nedenleri gerekçe gösterilerek hakkımda soruşturma yürütülmektedir.`;
      }

      if (
       data.fileStatus === "savcilik" && data.detentionStatus === "Tutukluydum ama tahliye edildim"
      ) {
      
        prosecutionOtherAccusations = `Soruşturma kapsamında, ${processedAccusations.join(", ")} nedenleri gerekçe gösterilerek hakkımda soruşturma yürütülmektedir.`;
      }

      if (
        (data.fileStatus === "savcilik" && data.detentionStatus === "Tutukluyum") 
       ) {
       
         prosecutionOtherAccusations2 = `Soruşturma kapsamında, ${processedAccusations.join(", ")} nedenleri gerekçe gösterilerek hakkımda soruşturma yürütülmektedir.`;
         prosecutionText = "Soruşturma kapsamında tutuklandım. ";
         prosecutionStatus=" ve Serbest Bırakma";
       }

      doc.setData({
        courtCity: data.courtCity,
        convictionDate:data.formattedConvictionDate,
     //   otherAccusations: data.otherAccusations,
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
        otherAccusations: processedAccusations.join(", "),
        queryDate: data.formattedQueryDate,
      });

      try {
        doc.render();
      } catch (error) {
        console.error(error);
      }

      const output = doc.getZip().generate({ type: "blob", mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

                const link = document.createElement("a");
                link.href = URL.createObjectURL(output);
                link.download = downloadNames[index]; 
                setTimeout(() => {
                  link.click();
              
                  // Clean up the created object URL after the file starts downloading
                  setTimeout(() => {
                      URL.revokeObjectURL(link.href);
                  }, 100);
              }, 50);

            });
    });
};