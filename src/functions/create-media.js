import { Media } from "../classes/medias.js";

function createMedias(mediaArray) {
  let i = 0
  let prepareLightBox = [];
  let totalLikes = 0;
  for (let media of mediaArray) {
    totalLikes = totalLikes + parseInt(media.likes);
  }
  let photoFeed = document.getElementById("photoFeed");
  photoFeed.innerHTML = "";
  for (let media of mediaArray) {
    media = new Media(
      media.id,
      media.photographerId,
      media.image ? media.image : null,
      media.video ? media.video : null,
      media.tags,
      media.likes,
      media.date,
      media.price,
      totalLikes
    );
    media.createMediaView();
    let mediaToLightBox = {
      order : i,
      id: media.id,
      image: media.image ? media.image : null,
      video: media.video ? media.video : null,
    };
    prepareLightBox.push(mediaToLightBox);
    i++
    
  }
  Media.setLightBox(prepareLightBox)
}

export { createMedias };
