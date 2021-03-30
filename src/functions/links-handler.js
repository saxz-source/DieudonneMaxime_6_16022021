import { createPhotographers } from "./create-photographers.js";

/**
 * For each tag links, set an eventListener,in order to filter the array of photographer
 * and display those who correspond with the tag link content.
 * Init the concerned div before it creates new relevant portraits
 * @param  arrayOfPhotographers array of photographers where tag links are
 */
export function handleTagLinks(arrayOfPhotographers) {
    let index = document.getElementById("index");
    let tagLinks = document.querySelectorAll(".tagLinks");
    tagLinks.forEach((tag) => {
        tag.addEventListener("click", (e) => {
            let tagName = tag.innerText.substr(1).toLowerCase();
            index.innerText = "";
            createPhotographers(
                arrayOfPhotographers.filter((ph) => ph.tags.includes(tagName)),
                "main"
            );
            handleTagLinks(arrayOfPhotographers);
        });
        tag.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                let tagName = tag.innerText.substr(1).toLowerCase();
                index.innerText = "";
                createPhotographers(
                    arrayOfPhotographers.filter((ph) =>
                        ph.tags.includes(tagName)
                    ),
                    "main"
                );
                handleTagLinks(arrayOfPhotographers);
            } else {
                return;
            }
        });
    });
}
