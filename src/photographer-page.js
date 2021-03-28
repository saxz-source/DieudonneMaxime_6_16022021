import { createPhotographers } from "./functions/create-photographers.js";
import { createMedias } from "./functions/create-media.js";
import { makeRequest } from "./functions/httpRequest.js";
import { Media } from "./classes/medias.js";

// get url params to target the good photographer
let params = new URL(document.location).searchParams;
let phId = params.get("id");

/**
 * Request photographer and get the data of the one concerned from its id
 */
makeRequest("get", "src/bdd/photographers.json").then((r) => {
    let thePhotographer = r.photographers.filter((phot) => phot.id == phId);
    createPhotographers(thePhotographer, "solo");
});

/**
 * Request medias from "bdd" and filters them according to photographer's id,
 * Then, it triggers the creation of these medias
 */

makeRequest("get", "src/bdd/photos.json").then((r) => {
    let filteredMedias = r.media.filter((med) => med.photographerId == phId);
    let sortMediasbyPopularity = filteredMedias.sort(
        (a, b) => a.likes - b.likes
    );
    createMedias(sortMediasbyPopularity);
});

/**
 * handle the sort options
 */
let sortMenu = document.getElementById("sortMenu");
sortMenu.addEventListener("input", function (e) {
    let sortParam = e.target.value;
    // request medias and filter them according to the photographer's id
    makeRequest("get", "src/bdd/photos.json").then((r) => {
        console.log(r);
        let filteredMedias = r.media.filter(
            (med) => med.photographerId == phId
        );
        // init the array, that will receive sorted medias
        let sortMedias = [];
        // for each option, a way to sort media
        switch (sortParam) {
            case "popularity":
                sortMedias = filteredMedias.sort((a, b) => a.likes - b.likes);
                createMedias(sortMedias);
                break;
            case "date":
                sortMedias = filteredMedias.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                createMedias(sortMedias);
                break;
            case "title":
                let mediaWithNames = [];
                for (let media of filteredMedias) {
                    media = {
                        ...media,
                        name: Media.getMediaName(
                            media.image ? media.image : media.video
                        ),
                    };
                    mediaWithNames.push(media);
                }
                sortMedias = mediaWithNames.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                });
                createMedias(sortMedias);
        }
    });
});

// Form modal handling
const formModal = document.getElementById("formModal");
const formDiv = document.getElementById("formDiv");
const closeModal = document.getElementById("closeModal");
const artistFormTitle = document.getElementById("artistFormTitle");
const contactMe = document.getElementById("contactMe");
const photographerPageMainWrapper = document.getElementById(
    "photographerPageMainWrapper"
);

/**
 * Set form modal informations according to the photographer's id
 * Then it displays the form
 */
contactMe.addEventListener("click", function () {
    makeRequest("get", "src/bdd/photographers.json").then((r) => {
        console.log(r);
        let name = r.photographers.filter((person) => person.id == phId)[0]
            .name;
        formDiv.setAttribute("aria-label", "Contact Me " + name);
        artistFormTitle.innerHTML = "Contactez-moi <br>" + name;
    });
    photographerPageMainWrapper.setAttribute("aria-hidden", "true");
    // photographerPageMainWrapper.setAttribute("aria-disabled", "true");

    formModal.style.display = "flex";
    closeModal.focus();
});

/**
 * Handling closing modal
 */
closeModal.addEventListener("click", function () {
    onCloseModal();

    console.log(document.activeElement);
});

/**
 * Handling closing modal
 */
function onCloseModal() {
    photographerPageMainWrapper.setAttribute("aria-hidden", "false");
    //  contactMe.focus()

    formModal.style.display = "none";
    console.log(document.activeElement);
}

const sendForm = document.getElementById("sendForm");
const rightSpan = document.getElementById("rightSpan");
const leftSpan = document.getElementById("leftSpan");
const closeLightBox = document.getElementById("closeLightBox");
const lightBox = document.getElementById("lightBox");

document.addEventListener("keydown", function (e) {
    let isTabPressed = e.key === "Tab" || e.keyCode === 9;
    let isActivated = e.key === "Space";

    if(!isTabPressed) return
    //  console.log(document.activeElement);
    console.log(e.key);

    if (isTabPressed) {
        if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === closeModal ) {
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

formModal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") onCloseModal();
    if (e.key === "Enter" && closeModal === document.activeElement)
        onCloseModal();
});

/**
 * Handling closing modal
 */

let firstName = document.getElementById("firstName")
let secondName = document.getElementById("secondName")
let email = document.getElementById("email")
let message = document.getElementById("message")

sendForm.addEventListener("click", e=>{
    e.preventDefault()
    console.log("Prénom : " + firstName.value)
    console.log("Nom : " + secondName.value)
    console.log("Email : " + email.value)
    console.log("Message : " + message.value)

})