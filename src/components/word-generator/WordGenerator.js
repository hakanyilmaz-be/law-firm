// WordGenerator.js

export const handleGenerateDocument = (data) => {
    fetch('/template.txt')
        .then(response => response.text())
        .then(text => {
            const updatedText = text
                .replace('{{adli}}', data.activeButton)
                .replace('{{dosyaDurumu}}', data.fileStatus)
                // Diğer değişiklikler...

            const blob = new Blob([updatedText], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'guncellenmis-belge.docx';
            link.click();
        });
}
