import { createSoloPagePhotographers } from "./functions/create-photographers.js";
import { createMedias } from "./functions/create-media.js";
import { makeRequest } from "./functions/httpRequest.js";
import { Media } from "./classes/medias.js";

let params = new URL(document.location).searchParams;
let phId = params.get("id");
console.log(phId);

makeRequest("get", "src/bdd/photographers.json").then((r) => {
  let thePhotographer = r.photographers.filter((phot) => phot.id == phId);
  let mainOrSolo = "solo";
  createSoloPagePhotographers(thePhotographer, mainOrSolo);
});

makeRequest("get", "src/bdd/photos.json").then((r) => {
  console.log(r);
  let filteredMedias = r.media.filter((med) => med.photographerId == phId);
  let sortMediasbyPopularity = filteredMedias.sort((a, b) => a.likes - b.likes);

  console.log(filteredMedias);
  createMedias(sortMediasbyPopularity);
});

let sortMenu = document.getElementById("sortMenu");
sortMenu.addEventListener("input", function (e) {
  let sortParam = e.target.value;
  makeRequest("get", "src/bdd/photos.json").then((r) => {
    console.log(r);
    let filteredMedias = r.media.filter((med) => med.photographerId == phId);
    let sortMedias = [];
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
            name: Media.getMediaName(media.image ? media.image : media.video),
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

const formModal = document.getElementById("formModal");
const formDiv = document.getElementById("formDiv")
const closeModal = document.getElementById("closeModal");
const artistFormTitle = document.getElementById("artistFormTitle");
const contactMe = document.getElementById("contactMe");

contactMe.addEventListener("click", function () {
  
    makeRequest("get", "src/bdd/photographers.json")
    .then((r) => {
      console.log(r);
      let name = r.photographers.filter((person) => person.id == phId)[0].name;
      formDiv.setAttribute("aria-label", "Contact Me " + name)
      artistFormTitle.innerHTML = "Contactez-moi <br>" + name;

    })
  formModal.style.display = "flex";
});

closeModal.addEventListener("click", function () {
  formModal.style.display = "none";
});



  
   

