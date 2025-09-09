const button = document.getElementById("send");
const progress = document.getElementById("progress");

function handleFileUpload(event) {
    event.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");

    xhr.upload.addEventListener('progress', function(event) {
        if (event.lengthComputable) {
            const percentComplete = event.loaded / event.total;
            progress.value = percentComplete;
        }
    });
    xhr.addEventListener('load', () => progress.value = "1.0");
    xhr.addEventListener('error', () => alert('Произошла ошибка при загрузке'));

    const fileData = new FormData(document.forms.form);
    xhr.send(fileData)
}

button.addEventListener("click", handleFileUpload);