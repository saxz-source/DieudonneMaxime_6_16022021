import { Media } from "./medias.js";

export class LightBox extends Media {
    constructor(lightBoxArray) {
        super()
        this.name = this.getArtistName()
        this.LightBoxArray = lightBoxArray;
        this.lightBox = document.getElementById("lightBox");
        this.closeLightBox = document.getElementById("closeLightBox");
        this.leftSpan = document.getElementById("leftSpan");
        this.rightSpan = document.getElementById("rightSpan");
    }

createLightBox(){
    console.log(this.lightBoxArray)
}
    
}
