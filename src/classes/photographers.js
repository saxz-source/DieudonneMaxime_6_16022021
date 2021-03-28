export class PhotographerClass {
    constructor(name, id, city, country, tags, tagline, price, portrait) {
        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
        this.photoUrl = this.getIdPhotoUrl();
    }

    /**
     *  Make the portraits on homePage
     */
    createAView() {
        let index = document.getElementById("index");
        // Create the article container
        let article = document.createElement("article");
        article.classList.add("homeView");
        index.appendChild(article);

        // Create the portrait link, made with a photo and the name (h2)
        let divPortrait = document.createElement("a");
        divPortrait.setAttribute("href", `photographer.html?id=${this.id}`);
        divPortrait.setAttribute("aria-label", `${this.name}`);
        divPortrait.classList.add("divPortrait");
        article.appendChild(divPortrait);
        let nameNode = document.createElement("h2");
        nameNode.innerHTML = this.name;
        let portraitNode = document.createElement("div");
        portraitNode.classList.add("homePhotoImg");
        portraitNode.style.backgroundImage = `url(${this.getIdPhotoUrl()})`;
        portraitNode.setAttribute("alt", "");
        portraitNode.setAttribute("role", "img");

        divPortrait.appendChild(portraitNode);
        divPortrait.appendChild(nameNode);

        // Create the informations below the portrait
        let staticTextDiv = document.createElement("div");
        staticTextDiv.classList.add("staticTextDiv");
        article.appendChild(staticTextDiv);
        let fromNode = document.createElement("p");
        staticTextDiv.appendChild(fromNode);
        fromNode.innerHTML = this.city + ", " + this.country;
        let sentenceNode = document.createElement("p");
        sentenceNode.classList.add("sentence");
        let priceNode = document.createElement("p");
        priceNode.classList.add("price");
        staticTextDiv.appendChild(sentenceNode);
        staticTextDiv.appendChild(priceNode);
        sentenceNode.innerHTML = this.tagline;
        priceNode.innerHTML = this.price + "€/jour";

        //Display tags
        let tagsLinksDiv = document.createElement("ul");
        article.appendChild(tagsLinksDiv);
        tagsLinksDiv.classList.add("tagUl");
        for (let tag of this.tags) {
            let divTag = document.createElement("li");
            divTag.classList.add("tagLinks");
            divTag.setAttribute("aria-label", "Tag");
            divTag.setAttribute("role", "link");
            divTag.innerHTML = "#" + tag;
            tagsLinksDiv.appendChild(divTag);
        }
    }

    /**
     * Create the "banner" for the photographer's page
     */
    createPhotographerBanner() {
        //Display the banner
        let phName = document.getElementById("phName");
        phName.textContent = this.name;
        let phFrom = document.getElementById("phFrom");
        phFrom.textContent = this.city + ", " + this.country;
        let phSentence = document.getElementById("phSentence");
        phSentence.textContent = this.tagline;
        let photographerImg = document.getElementById("photographerImg");
        photographerImg.style.backgroundImage = `url(${this.getIdPhotoUrl()})`;
        photographerImg.setAttribute("aria-label", `${this.name}`);

        // Display tags
        let phUlTags = document.getElementById("phUlTags");
        for (let tag of this.tags) {
            let divTag = document.createElement("li");
            divTag.classList.add("tagLinks");
            divTag.setAttribute("aria-label", tag);
            divTag.innerHTML = "#" + tag;
            phUlTags.appendChild(divTag);
        }
        // Display its cost in the bottom-right div
        let globalPrice = document.getElementById("globalPrice");
        globalPrice.textContent = this.price + " € / jour";
    }

    /**
     *
     * @returns the photograper's photo url
     */
    getIdPhotoUrl() {
        return `style/images/sample_photo/photographers_id_photos/${this.name.replace(
            / /g,
            ""
        )}.jpg`;
    }
}
