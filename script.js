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
    btn.innerText = "Submitting...";
   
    // We use a clean object to avoid issues with FormData headers
    fetch(scriptURL, {
        method: 'POST',
        body: data,
        mode: 'no-cors' // This prevents most 'Error please try again' issues
    })
    .then(() => {
        // With no-cors, we can't always read the response body,
        // so we assume success if the request was sent.
        alert("Application Submitted Successfully to bputnotes.in!");
        form.reset();
        btn.disabled = false;
        btn.innerText = "Submit Application";
    })
    .catch(error => {
        console.error('Error!', error);
        alert("Submission failed. Check your internet or Script URL.");
        btn.disabled = false;
        btn.innerText = "Submit Application";
    });
}
