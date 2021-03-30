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
    }

    createFormModal() {
        this.setModalHeader();
        this.setDisplayAndFocus();
        this.listenOnCloseModal();
        this.listenKeyNavigation();
        this.listenKeyClose();
        this.submitForm();
    }

    submitForm() {
        sendForm.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Prénom : " + firstName.value);
            console.log("Nom : " + secondName.value);
            console.log("Email : " + email.value);
            console.log("Message : " + message.value);
        });
    }
    /**
     * Handling closing modal with keys
     */
    listenKeyClose() {
        formModal.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.onCloseModal();
            if (e.keyCode === 13 && document.activeElement === closeModal) {
                e.preventDefault();
                this.onCloseModal();
            }
        });
    }

    listenKeyNavigation() {
        document.addEventListener("keydown", function (e) {
            let isTabPressed = e.key === "Tab" || e.keyCode === 9;

            if (!isTabPressed) return;
            //  console.log(document.activeElement);
            console.log(e.key);

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

    setDisplayAndFocus() {
        formModal.style.display = "flex";
        closeModal.focus();
        // contactMe.setAttribute("tabindex", "4")
    }

    setModalHeader() {
        makeRequest("get", "src/bdd/photographers.json").then((r) => {
            console.log(r);

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
        console.log("set");
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
}
