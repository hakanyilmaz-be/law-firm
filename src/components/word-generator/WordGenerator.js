import { Document, Packer, Paragraph } from "docx";

export const handleGenerateDocument = (data) => {
    fetch(process.env.PUBLIC_URL + '/template.txt')
        .then(response => response.text())
        .then(text => {
            const updatedText = text
                .replace('{{adli}}', data.currentStatus)
                .replace('{{dosyaDurumu}}', data.courtCity)
                // Add other replacements as necessary...

            const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: [new Paragraph(updatedText)]
                    }
                ]
            });

            Packer.toBlob(doc).then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'guncellenmis-belge.docx';
                link.click();
            });
        });
};
