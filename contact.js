//Para que muestre el mensaje en pantalla y se reinicie.
const form = document.getElementById("contactForm");

form.addEventListener("submit", function(event){

    event.preventDefault();

    const name = document.getElementById("namein").value;
    const email = document.getElementById("emailin").value;
    const subject = document.getElementById("subjectin").value;
    const message = document.getElementById("messagein").value;

    if(name === "" || email === "" || subject === "" || message === ""){
        alert("Please complete all fields.");
        return;
    }

    alert("Thank you! Your message has been received.");

    form.reset();

});