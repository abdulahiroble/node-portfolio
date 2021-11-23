function sendContactMessage() {
    fetch("/api/contact", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            name: document.getElementById("message").value,
        })
    }).then(response => {
        if (response.status === 200) {
            response.redirect("/contact")
        } else {
            console.log("Error sending the contact message", response.status);
        }
    });
}


document.getElementById("contact-button").addEventListener("click", sendContactMessage);

// document.getElementById("contact-button").addEventListener("click", function () {


//     // toastr.success('Message sent!')

//     toastr.options = {
//         "closeButton": false,
//         "debug": false,
//         "newestOnTop": false,
//         "progressBar": true,
//         "positionClass": "toast-top-center",
//         "preventDuplicates": true,
//         "onclick": null,
//         "showDuration": "100",
//         "hideDuration": "1000",
//         "timeOut": "5000",
//         "extendedTimeOut": "1000",
//         "showEasing": "swing",
//         "hideEasing": "linear",
//         "showMethod": "show",
//         "hideMethod": "hide"
//     };
// });