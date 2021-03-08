import { makeRequest } from "../functions/httpRequest.js";

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
    totalLikes
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
  }

  static getMediaName(image) {
    console.log(image);
    let mediaName = image.split("_").splice(1).join(" ").split(".")[0];
    let formattedName =
      mediaName.split("")[0].toUpperCase() + mediaName.substr(1);
    return formattedName;
  }

  async getName() {
    let nana;
    await makeRequest("get", "src/bdd/photographers.json")
      .then((r) => {
        let name = r.photographers.filter(
          (ph) => ph.id === this.photographerId
        )[0].name;
        nana = name;
      })
      .catch((er) => console.log(er + "yo"));
    return nana;
  }

  getPhotoUrl(nn) {
    let media = this.image ? this.image : this.video;
    return `style/images/sample_photo/${nn.replace(/ /g, "")}/${media}`;
  }

  async createMediaView() {
    let name = await this.getName();

    let photoFeed = document.getElementById("photoFeed");

    let onePhoto = document.createElement("article");
    onePhoto.classList.add("onePhoto");
    photoFeed.appendChild(onePhoto);

    if (this.image) {
      let thePhoto = document.createElement("div");
      thePhoto.classList.add("thePhoto");
      onePhoto.appendChild(thePhoto);
      thePhoto.style.backgroundImage = `url("${this.getPhotoUrl(name)}")`;
    } else if (this.video) {
      let thePhoto = document.createElement("video");
      thePhoto.classList.add("thePhoto");
      onePhoto.appendChild(thePhoto);

      let videoSource = document.createElement("source");
      videoSource.setAttribute("src", `${this.getPhotoUrl(name)}`);
      videoSource.setAttribute("type", `video/mp4`);
      thePhoto.appendChild(videoSource);
    } else {
      return;
    }

    // thePhoto.addEventListener('click', function(){

    //     this.createLightMedia(this.id)
    // })

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
    photoHeart.classList.add("heart");
    photoStats.appendChild(photoHeart);

    photoName.innerHTML = Media.getMediaName(
      this.image ? this.image : this.video
    );
    photoPrice.innerHTML = this.price + " €";
    photoLikes.innerHTML = this.likes;

    photoHeart.addEventListener("click", (e) => {
      this.likes++;
      this.totalLikes++;
      photoLikes.innerHTML = this.likes;
      document.getElementById("totalLikes").innerHTML = this.totalLikes;
    });

    document.getElementById("totalLikes").innerHTML = this.totalLikes;
  }

  static setLightBox(array) {
    console.log(array);
  }

  createLightMedia(arrayImg) {
    const lightImg = document.getElementById("lightImg");
  }
}
