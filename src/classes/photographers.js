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

  // Make the portraits on homePage

  // <article class="homeView">
  //     <div class="divPortrait">

  //         <img />
  //         <h2></h2>
  //         <p></p>
  //     </div>
  //     <div class="staticTextDiv">
  //         <p class="sentence"></p>
  //         <p class="price"></p>
  //     </div>
  //     <ul class="tagUl">
  //         <li class="tagLinks"> </li>
  //         ...
  //     </ul>
  // </article>
  createAView() {
    let index = document.getElementById("index");
    let article = document.createElement("article");
    article.classList.add("homeView");
    index.appendChild(article);
    let divPortrait = document.createElement("a");
    divPortrait.setAttribute("href", `photographer.html?id=${this.id}`);
    divPortrait.setAttribute("aria-label", `${this.name}`)
    divPortrait.classList.add("divPortrait");
    article.appendChild(divPortrait);
    let nameNode = document.createElement("h2");
    nameNode.innerHTML = this.name;
    let portraitNode = document.createElement("div");
    portraitNode.classList.add("homePhotoImg");
    portraitNode.style.backgroundImage = `url(${this.getIdPhotoUrl()})`;
    portraitNode.setAttribute("alt", "")

    divPortrait.appendChild(portraitNode);
    divPortrait.appendChild(nameNode);
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

    let tagsLinksDiv = document.createElement("ul");
    article.appendChild(tagsLinksDiv);
    tagsLinksDiv.classList.add("tagUl");

    for (let tag of this.tags) {
      let divTag = document.createElement("li");
      divTag.classList.add("tagLinks");
      divTag.setAttribute("aria-label", "Tag");
      divTag.innerHTML = "#" + tag;
      tagsLinksDiv.appendChild(divTag);
    }
  }

  createPhotographerBanner() {
    let phName = document.getElementById("phName");
    phName.textContent = this.name;
    let phFrom = document.getElementById("phFrom");
    phFrom.textContent = this.city + ", " + this.country;
    let phSentence = document.getElementById("phSentence");
    phSentence.textContent = this.tagline;
    let photographerImg = document.getElementById("photographerImg");
    photographerImg.style.backgroundImage = `url(${this.getIdPhotoUrl()})`;
    photographerImg.setAttribute("aria-label", `${this.name}`)

    let phUlTags = document.getElementById("phUlTags");
    for (let tag of this.tags) {
      let divTag = document.createElement("li");
      divTag.classList.add("tagLinks");
      divTag.innerHTML = "#" + tag;
      phUlTags.appendChild(divTag);
    }

    let globalPrice = document.getElementById("globalPrice");
    globalPrice.textContent = this.price + " € / jour";
  }

  getIdPhotoUrl() {
    return `style/images/sample_photo/photographers_id_photos/${this.name.replace(
      / /g,
      ""
    )}.jpg`;
  }
}
