const scriptURL = 'https://script.google.com/macros/s/AKfycbxhIx64rIYH_LA4y6sZ6ZY1lSMXof3A-K07qoL4mJdVqWp9yOndN5Tf6lhtips_LWxs6w/exec';
const form = document.getElementById('internForm');
const btn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerText = "Uploading Application...";

    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];

    // If there is a photo, convert it to a string first
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const base64Data = reader.result.split(',')[1];
            const formData = new FormData(form);
            formData.set('photo', base64Data); // Swap file for text
            sendData(formData);
        };
        reader.readAsDataURL(file);
    } else {
        sendData(new FormData(form));
    }
});

function sendData(data) {
    fetch(scriptURL, { method: 'POST', body: data })
        .then(response => {
            alert("Application Submitted to bputnotes.in!");
            form.reset();
            btn.disabled = false;
            btn.innerText = "Submit Application";
        })
        .catch(error => {
            console.error('Error!', error.message);
            btn.disabled = false;
        });
}
