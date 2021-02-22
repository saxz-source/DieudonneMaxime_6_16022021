import {PhotographerClass} from "./photographers.js"


export class Media {

    constructor(id, photographerId, image, tags, likes, date, price) {
        this.id = id
        this.photographerId = photographerId
        this.image = image
        this.tags = tags
        this.likes = likes
        this.date = date
        this.price = price
    
    }

    createMediaView() {
        let thePhoto = document.getElementById("thePhoto")
        let photoName = document.getElementById("photoName")
        let photoPrice = document.getElementById("photoPrice")
        let photoLikes = document.getElementById("photoLikes")

       // photoName.innerHTML = this.name;
        photoPrice.innerHTML = this.price + " €"
        photoLikes.innerHTML = this.likes

    }

   


}