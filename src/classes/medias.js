import { makeRequest } from "../functions/httpRequest.js";
import { prepareLightBox } from "../functions/create-media.js";

export class Media {
  constructor(
    id,
    photographerId,
    image,
    video,
    tags,
    likes,
    date,
    price,
    totalLikes,
    order
  ) {
    this.id = id;
    this.photographerId = photographerId;
    this.image = image;
    this.video = video;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.name = this.getName();
    this.totalLikes = totalLikes;
    this.globalObject = this.globalObject;
    this.order = order;
  }

  static getMediaName(image) {
    let mediaName = image.split("_").splice(1).join(" ").split(".")[0];
    let formattedName =
      mediaName.split("")[0].toUpperCase() + mediaName.substr(1);
    return formattedName;
  }

  async getName(photId) {
    let nana;
    await makeRequest("get", "src/bdd/photographers.json")
      .then((r) => {
        let name = r.photographers.filter(
          (ph) => ph.id === (photId ? photId : this.photographerId)
        )[0].name;
        nana = name;
      })
      .catch((er) => console.log(er + "yo"));
    return nana;
  }

  getPhotoUrl(artistName, photoId) {
    let media;
    if (photoId) media = photoId;
    if (!photoId) media = this.image ? this.image : this.video;
    return `style/images/sample_photo/${artistName.replace(/ /g, "")}/${media}`;
  }


  async createMediaView() {
    let name = await this.getName();
    let gotPhotoName = Media.getMediaName(
      this.image ? this.image : this.video
    );

    let photoFeed = document.getElementById("photoFeed");

    let onePhoto = document.createElement("article");
    onePhoto.classList.add("onePhoto");
    photoFeed.appendChild(onePhoto);

    let thePhoto;
    if (this.image) {
      thePhoto = document.createElement("div");
      thePhoto.id = this.id;
      thePhoto.classList.add("thePhoto");
      onePhoto.appendChild(thePhoto);
      thePhoto.style.backgroundImage = `url("${this.getPhotoUrl(name)}")`;
      thePhoto.setAttribute("aria-label", gotPhotoName)
    } else if (this.video) {
      thePhoto = document.createElement("video");
      thePhoto.classList.add("thePhoto");
      onePhoto.appendChild(thePhoto);

      let videoSource = document.createElement("source");
      thePhoto.id = this.id;

      videoSource.setAttribute("src", `${this.getPhotoUrl(name)}`);
      videoSource.setAttribute("type", `video/mp4`);
      thePhoto.appendChild(videoSource);
    } else {
      return;
    }

    let photoInfos = document.createElement("div");
    photoInfos.classList.add("photoInfos");
    onePhoto.appendChild(photoInfos);

    let photoName = document.createElement("div");
    photoName.classList.add("photoName");
    photoInfos.appendChild(photoName);

    let photoStats = document.createElement("div");
    photoStats.classList.add("photoStats");
    photoInfos.appendChild(photoStats);

    let photoPrice = document.createElement("div");
    photoPrice.classList.add("photoPrice");
    photoStats.appendChild(photoPrice);

    let photoLikes = document.createElement("div");
    photoLikes.classList.add("photoLikes");
    photoStats.appendChild(photoLikes);

    let photoHeart = document.createElement("img");
    photoHeart.setAttribute("src", "./style/images/heart.svg");
    photoHeart.setAttribute("aria-label", "likes");
    photoHeart.classList.add("heart");
    photoStats.appendChild(photoHeart);

    photoName.innerHTML = gotPhotoName
    photoPrice.innerHTML = this.price + " €";
    photoLikes.innerHTML = this.likes;

    photoHeart.addEventListener("click", (e) => {
      this.likes++;
      this.totalLikes++;
      photoLikes.innerHTML = this.likes;
      document.getElementById("totalLikes").innerHTML = this.totalLikes;
    });

    document.getElementById("totalLikes").innerHTML = this.totalLikes;

    thePhoto.addEventListener("click", (e) => {
      let mediaId = e.target.id;
      let lightMediaDisplayed = prepareLightBox.filter((i) => i.id == mediaId);
      let lightLength = prepareLightBox.length;
      this.createLightMedia(lightMediaDisplayed[0], lightLength);
    });
  }

  async fillLightMedia(lightMediaObject) {
    const lightImgName = Media.getMediaName(
      lightMediaObject.image ? lightMediaObject.image : lightMediaObject.video
    );
    const lightImg = document.getElementById("lightImg");
    lightImg.setAttribute(
      "src",
      `${this.getPhotoUrl(
        await this.getName(lightMediaObject.photographerId),
        lightMediaObject.image ? lightMediaObject.image : lightMediaObject.video
      )}`
    );
    lightImg.setAttribute("alt", lightImgName);
    const lightName = document.getElementById("lightName");
    lightName.textContent = lightImgName;
  }

  createLightMedia(lightMedia, lightLength) {
    let actualMediaOrder = lightMedia.order;

    this.fillLightMedia(lightMedia);
    //get and create elements of light box
    const lightBox = document.getElementById("lightBox");
    const closeLightBox = document.getElementById("closeLightBox");
    const leftSpan = document.getElementById("leftSpan");
    const rightSpan = document.getElementById("rightSpan");
    this.handleArrows(lightLength, actualMediaOrder);

    lightBox.style.display = "flex";
    closeLightBox.addEventListener("click", () => {
      lightBox.style.display = "none";
    });

    //set left click
    leftSpan.addEventListener("click", () => {
      actualMediaOrder--;
      console.log(actualMediaOrder);
      let lightMediaDisplayed = prepareLightBox.filter(
        (i) => parseInt(i.order) === actualMediaOrder
      );

      this.fillLightMedia(lightMediaDisplayed[0]);
      this.handleArrows(lightLength, actualMediaOrder);
    });

    //set right click
    rightSpan.addEventListener("click", () => {
      actualMediaOrder++;
      let lightMediaDisplayed = prepareLightBox.filter(
        (i) => parseInt(i.order) === actualMediaOrder
      );

      this.fillLightMedia(lightMediaDisplayed[0]);
      this.handleArrows(lightLength, actualMediaOrder);
    });

    console.log(lightMedia.photographerId);
  }

  handleArrows(lightLength, mediaOrder) {
    if (mediaOrder === lightLength - 1) rightSpan.style.display = "none";
    if (mediaOrder < lightLength - 1) rightSpan.style.display = "block";
    if (mediaOrder === 0) leftSpan.style.display = "none";
    if (mediaOrder > 0) leftSpan.style.display = "block";
  }
}
