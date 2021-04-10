import { makeRequest } from "../functions/httpRequest.js";

export class FormModal {
    constructor(photographerId) {
        this.photographerId = photographerId;
        this.formModal = document.getElementById("formModal");
        this.formDiv = document.getElementById("formDiv");
        this.closeModal = document.getElementById("closeModal");
        this.artistFormTitle = document.getElementById("artistFormTitle");
        this.contactMe = document.getElementById("contactMe");
        this.photographerPageMainWrapper = document.getElementById(
            "photographerPageMainWrapper"
        );
        this.sendForm = document.getElementById("sendForm");
        this.firstName = document.getElementById("firstName");
        this.secondName = document.getElementById("secondName");
        this.email = document.getElementById("email");
        this.message = document.getElementById("message");
        this.artistForm = document.getElementById("artistForm");
    }

    /**
     * Generate the form modal
     */
    createFormModal() {
        this.setModalHeader();
        this.setDisplayAndFocus();
        this.listenOnCloseModal();
        this.listenKeyNavigation();
        this.listenKeyClose();
        this.submitForm();
    }

    /**
     * Submit the if valid. Display values in console.
     */
    submitForm() {
        sendForm.addEventListener("click", (e) => {
            e.preventDefault();

            if (this.verifyingData() === false) {
                return;
            } else {
                console.log("Prénom : " + firstName.value);
                console.log("Nom : " + secondName.value);
                console.log("Email : " + email.value);
                console.log("Message : " + message.value);
                this.onCloseModal();
                this.artistForm.reset();
            }
        });
    }
    /**
     * Handling closing modal with keys (Escape and Enter)
     */
    listenKeyClose() {
        formModal.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                this.onCloseModal();
            }
            if (e.keyCode === 13 && document.activeElement === closeModal) {
                e.preventDefault();
                this.onCloseModal();
            }
        });
    }


    /**
     * Handle Tab Navigation
     */
    listenKeyNavigation() {
        document.addEventListener("keydown", function (e) {
            let isTabPressed = e.key === "Tab";
            if (!isTabPressed) return;
            if (isTabPressed) {
                if (e.shiftKey) {
                    // if shift key pressed for shift + tab combination
                    if (document.activeElement === closeModal) {
                        sendForm && sendForm.focus(); // add focus for the last focusable element
                        e.preventDefault();
                    }
                } else {
                    // if tab key is pressed
                    if (document.activeElement === sendForm) {
                        // if focused has reached to last focusable element then focus first focusable element after pressing tab
                        closeModal && closeModal.focus(); // add focus for the first focusable element
                        e.preventDefault();
                    }
                }
            }
        });
    }

    /**
     * Display the modal and focus the close cross
     */
    setDisplayAndFocus() {
        formModal.style.display = "flex";
        closeModal.focus();
    }

    // Get the name of the photographer and display it
    setModalHeader() {
        makeRequest("get", "src/bdd/photographers.json").then((r) => {
            let name = r.photographers.filter(
                (person) => person.id == this.photographerId
            )[0].name;
            formDiv.setAttribute("aria-label", "Contact Me " + name);
            artistFormTitle.innerHTML = "Contactez-moi <br>" + name;
        });
        photographerPageMainWrapper.setAttribute("aria-hidden", "true");
    }
    /**
     * Handling closing modal
     */
    listenOnCloseModal() {
        closeModal.addEventListener("click", (e) => {
            this.onCloseModal();
            console.log(document.activeElement);
        });
    }

    /**
     * Handling closing modal
     */
    onCloseModal() {
        photographerPageMainWrapper.setAttribute("aria-hidden", "false");
        formModal.style.display = "none";
        contactMe.focus();
    }

    // Verify the validity of the informations, based on html constraints
    // Display alerts on the wrong form fields
    verifyingData() {
        // Boolean that will be return : true if no error ; false if error
        let submitOk = true;
        var nameRegex = /[0-9,;:!~#{[|`^@\]}?./¤€§*$^%+µ£¨=)_("&)\\]/g;
        var mailRegex = /\S+@\S+\.\S+/;
        if (
            !firstName.validity.valid ||
            firstName.value.search(nameRegex) != -1
        ) {
            document.getElementById("firstInputError").style.display = "block";
            this.removeGreenBorderValidation(firstName);
            this.firstName.setAttribute("aria-invalid", "true");
            this.firstName.setAttribute("aria-describedby", "firstInputError");
            submitOk = false;
        } else {
            this.greenBorderValidation(firstName);
            this.firstName.removeAttribute("aria-invalid");
            this.firstName.setAttribute("aria-describedby", "first-describe");
            document.getElementById("firstInputError").style.display = "none";
        }

        if (
            !secondName.validity.valid ||
            secondName.value.search(nameRegex) != -1
        ) {
            document.getElementById("secondInputError").style.display = "block";
            this.removeGreenBorderValidation(secondName);
            this.secondName.setAttribute("aria-invalid", "true");
            this.secondName.setAttribute(
                "aria-describedby",
                "secondInputError"
            );
            submitOk = false;
        } else {
            this.greenBorderValidation(secondName);
            this.secondName.removeAttribute("aria-invalid");
            this.secondName.setAttribute("aria-describedby", "second-describe");
            document.getElementById("secondInputError").style.display = "none";
        }

        if (!email.validity.valid || !mailRegex.test(email.value)) {
            document.getElementById("emailInputError").style.display = "block";
            this.removeGreenBorderValidation(email);
            this.email.setAttribute("aria-invalid", "true");
            this.email.setAttribute("aria-describedby", "emailInputError");
            submitOk = false;
        } else {
            this.greenBorderValidation(email);
            this.email.removeAttribute("aria-invalid");
            this.email.setAttribute("aria-describedby", "mail-describe");
            document.getElementById("emailInputError").style.display = "none";
        }

        if (!message.validity.valid) {
            document.getElementById("messageInputError").style.display =
                "block";
            this.removeGreenBorderValidation(message);
            this.message.removeAttribute("aria-invalid");
            this.message.setAttribute("aria-describedby", "messageInputError");
            submitOk = false;
        } else {
            this.greenBorderValidation(message);
            this.message.setAttribute("aria-describedby", "message-describe");
            this.message.removeAttribute("aria-invalid");
            document.getElementById("messageInputError").style.display = "none";
        }

        return submitOk;
    }

    // Make the element input borders green
    greenBorderValidation(element) {
        element.style.border = "2px solid green";
    }

    // Make the element input borders red
    removeGreenBorderValidation(element) {
        element.style.border = "2px solid #95FFF9";
    }
}
