import { createPhotographers } from "./functions/create-photographers.js";
import { createMedias } from "./functions/create-media.js";
import { makeRequest } from "./functions/httpRequest.js";
import { Media } from "./classes/medias.js";
import { FormModal } from "./classes/formModal.js";

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

/**
 * Listener to create Form Modal
 */
contactMe.addEventListener("click", function () {
    console.log(phId);
    let newFormModal = new FormModal(phId);

    newFormModal.createFormModal();
});
