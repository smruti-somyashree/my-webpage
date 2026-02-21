const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
const form = document.getElementById('internForm');
const btn = document.getElementById('submitBtn');
const msg = document.getElementById('responseMsg');

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerText = "Submitting...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Application Submitted Successfully!";
            msg.style.color = "green";
            form.reset();
            btn.disabled = false;
            btn.innerText = "Submit Application";
        })
        .catch(error => {
            msg.innerHTML = "Error! Please try again.";
            msg.style.color = "red";
            btn.disabled = false;
            btn.innerText = "Submit Application";
        });
});
