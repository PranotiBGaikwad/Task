document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const photoFile = document.getElementById('photo').files[0];
    const rank = document.getElementById('rank').value;
    const idNumber = document.getElementById('idNumber').value;

    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('pdfPhoto').src = e.target.result;
            generatePDF(name, e.target.result, rank, idNumber);
            displayCongratsMessage(name, rank);
        }
        reader.readAsDataURL(photoFile);
    }
});

function generatePDF(name, photo, rank, idNumber) {
    document.getElementById('pdfName').textContent = name;
    document.getElementById('pdfRank').textContent = rank;
    document.getElementById('pdfIdNumber').textContent = idNumber;
    
    const pdfContent = document.getElementById('pdfContent');
    pdfContent.classList.remove('hidden');

    html2canvas(pdfContent).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('user_info.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
    });
}

function displayCongratsMessage(name, rank) {
    const message = `Congratulations ${name}! You have secured ${rank}.`;
    const congratsMessageDiv = document.getElementById('congratsMessage');
    congratsMessageDiv.textContent = message;
    congratsMessageDiv.classList.remove('hidden');
}
