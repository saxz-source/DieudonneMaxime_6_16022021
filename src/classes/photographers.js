export class Photographer {


    constructor(name, id, city, country, tags, tagline, price, portrait) {
        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait

    }

    createAView() {
        let index = document.getElementById("index")
        let article = document.createElement('article')
        article.classList.add("homeView")
        index.appendChild(article)
        let divPortrait = document.createElement("div")
        article.appendChild(divPortrait)
        let nameNode = document.createElement("h2")
        nameNode.innerHTML = this.name
        let portraitNode = document.createElement("img")
        portraitNode.setAttribute("src", "#")
        let fromNode = document.createElement("p")
        fromNode.innerHTML = this.city + ", " + this.country
        divPortrait.appendChild(portraitNode)
        divPortrait.appendChild(nameNode)
        divPortrait.appendChild(fromNode)
        let staticTextDiv = document.createElement("div")
        article.appendChild(staticTextDiv)
        let sentenceNode = document.createElement("p")
        let priceNode = document.createElement("p")
        staticTextDiv.appendChild(sentenceNode)
        staticTextDiv.appendChild(priceNode)
        sentenceNode.innerHTML = this.tagline
        priceNode.innerHTML = this.price + '€/jour'

        let tagsLinksDiv = document.createElement("ul")
        article.appendChild(tagsLinksDiv)
        tagsLinksDiv.classList.add("tagUl")

        for (let tag of this.tags) {
            let divTag = document.createElement("li")
            divTag.classList.add("tagLinks")
            divTag.innerHTML = "#" + tag
            tagsLinksDiv.appendChild(divTag)
        }
    }


}