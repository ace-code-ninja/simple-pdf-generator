document.getElementById('convertBtn').addEventListener('click', convertToPDF);

function convertToPDF() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        var fileName = file.name.split('.').slice(0, -1).join('.');

        reader.onload = function(event) {
            var text = event.target.result;
            console.log("text", text)
            generatePDF(text, fileName);
        };

        reader.readAsText(file);
    } else {
        alert('Please select a file');
    }
}

function generatePDF(text, fileName) {
    // Construct PDF content
    var pdfContent = '%PDF-1.3\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 55 >>\nstream\nBT\n/F1 12 Tf\n72 712 Td\n(' + text + ') Tj\nET\nendstream\nendobj\n5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj\n8 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-BoldOblique >>\nendobj\n9 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>\nendobj\n10 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>\nendobj\n11 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic >>\nendobj\n12 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Times-BoldItalic >>\nendobj\n13 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>\nendobj\n14 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold >>\nendobj\n15 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Oblique >>\nendobj\n16 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier-BoldOblique >>\nendobj\n17 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Symbol >>\nendobj\n18 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>\nendobj\n19 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /ZapfDingbats >>\nendobj\nxref\n0 20\n0000000000 65535 f \n0000000010 00000 n \n0000000078 00000 n \n0000000138 00000 n \n0000000186 00000 n \n0000000306 00000 n \n0000000458 00000 n \n0000000566 00000 n \n0000000892 00000 n \n0000000995 00000 n \n0000001188 00000 n \n0000001365 00000 n \n0000001789 00000 n \n0000001886 00000 n \n0000002081 00000 n \n0000002295 00000 n \n0000002476 00000 n \n0000002770 00000 n \n0000003047 00000 n \n0000003125 00000 n \ntrailer\n<< /Root 1 0 R /Size 20 >>\nstartxref\n3211\n%%EOF\n';
    
    // Create a Blob from the PDF content
    var blob = new Blob([pdfContent], { type: 'application/pdf' });

    // Create a temporary <a> element to trigger the download
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${fileName}.pdf`; // Set the default name for the downloaded file
     // Prompt the user to save the file in a specific location
    a.setAttribute('style', 'display: none;');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}
