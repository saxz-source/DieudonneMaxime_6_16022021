import { createHomePagePhotographers } from "./create-photographers.js"

export function handleTagLinks(arrayOfPhotographers) {
    let index = document.getElementById("index")
    let tagLinks = document.querySelectorAll(".tagLinks")
    tagLinks.forEach((tag) => {
        tag.addEventListener("click", e => {
            let tagName = tag.innerText.substr(1).toLowerCase()
            index.innerText = ""
            createHomePagePhotographers(arrayOfPhotographers.filter(ph => ph.tags.includes(tagName)))
            handleTagLinks(arrayOfPhotographers)
        })
    })
}

