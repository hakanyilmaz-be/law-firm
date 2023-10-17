import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

export const handleGenerateDocument = (data) => {
    fetch(process.env.PUBLIC_URL + '/template.docx')
        .then(response => response.blob())
        .then(blob => blob.arrayBuffer())
        .then(arrayBuffer => {
            const zip = new PizZip(arrayBuffer);
            const doc = new Docxtemplater(zip);

            doc.setData({
                adli: data.currentStatus,
                dosyaDurumu: data.courtCity,
                // ... other replacements
            });

            try {
                doc.render();
            } catch (error) {
                console.error(error);
            }

            const output = doc.getZip().generate({ type: "blob" });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(output);
            link.download = 'guncellenmis-belge.docx';
            link.click();
        });
};
