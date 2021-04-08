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
        description,
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
        this.description = description;
        this.name = this.getArtistName();
        this.totalLikes = totalLikes;
        this.globalObject = this.globalObject;
        this.order = order;
    }

    /**
     * Create medias in the photographer's page
     */
    async createMediaView() {

        // set variables et get main elements
        let name = await this.getArtistName();
        let gotPhotoName = Media.getMediaName(
            this.image ? this.image : this.video
        );

        let photoFeed = document.getElementById("photoFeed");
        let onePhoto = document.createElement("article");
        onePhoto.classList.add("onePhoto");
        photoFeed.appendChild(onePhoto);

        // fill the content
        this.setPhotoContent(onePhoto, name, gotPhotoName);
        this.setPhotoInfos(onePhoto, gotPhotoName);
    }

    /**
     *
     * @param image the image or video filed of the media object
     * @returns the media name, formatted and ready to display
     */
    static getMediaName(image) {
        let mediaName = image.split("_").splice(1).join(" ").split(".")[0];
        let formattedName =
            mediaName.split("")[0].toUpperCase() + mediaName.substr(1);
        return formattedName;
    }

    /**
     *
     * @param photId the photographer's id
     * @returns the name of the photographer
     */
    async getArtistName(photId) {
        let nana;
        await makeRequest("get", "src/bdd/photographers.json")
            .then((r) => {
                let name = r.photographers.filter(
                    (ph) => ph.id === (photId ? photId : this.photographerId)
                )[0].name;
                nana = name;
            })
            .catch((er) => console.log(er));
        return nana;
    }

    /**
     *
     * @param artistName the photographer's name
     * @param photoId the media id
     * @returns the url of the media
     */
    getPhotoUrl(artistName, photoId) {
        let media;
        if (photoId) media = photoId;
        if (!photoId) media = this.image ? this.image : this.video;
        return `style/images/sample_photo/${artistName.replace(
            / /g,
            ""
        )}/${media}`;
    }

    /**
     *
     * @param onePhoto the container (html element)
     * @param  gotPhotoName the media name
     * @returns
     */

    setPhotoInfos(onePhoto, gotPhotoName) {
        // Display the informations below the media
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

        let photoLikesAndHeart = document.createElement("div");
        photoStats.appendChild(photoLikesAndHeart);
        photoLikesAndHeart.setAttribute("tabindex", "0");
        photoLikesAndHeart.classList.add("photoLikesandH");

        let photoLikes = document.createElement("div");
        photoLikes.classList.add("photoLikes");
        photoLikesAndHeart.appendChild(photoLikes);

        // Fill the informations's fields
        let photoHeart = document.createElement("img");
        photoHeart.setAttribute("src", "./style/images/heart.svg");
        photoHeart.setAttribute("aria-label", "likes");
        photoHeart.classList.add("heart");
        photoLikesAndHeart.appendChild(photoHeart);

        photoName.innerHTML = gotPhotoName;
        photoPrice.innerHTML = this.price + " €";
        photoLikes.innerHTML = this.likes;

        // Increase or decrease the amounts of local and global likes
        photoHeart.addEventListener("click", (e) => {
            this.likes++;
            this.totalLikes++;
            photoLikes.innerHTML = this.likes;
            document.getElementById("totalLikes").innerHTML = this.totalLikes;
        });

        photoLikesAndHeart.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.likes++;
                this.totalLikes++;
                photoLikes.innerHTML = this.likes;
                document.getElementById(
                    "totalLikes"
                ).innerHTML = this.totalLikes;
            }
        });
    }

    /**
     *
     * @param onePhoto the container (html element)
     * @param  name the artist's Name
     * @param  gotPhotoName the media name
     * @returns
     */
    setPhotoContent(onePhoto, name) {
        // Display the image whether it's a photo or a video
        let thePhoto;
        if (this.image) {
            thePhoto = document.createElement("div");
            thePhoto.id = this.id;
            thePhoto.classList.add("thePhoto");
            onePhoto.appendChild(thePhoto);
            thePhoto.style.backgroundImage = `url("${this.getPhotoUrl(name)}")`;
            thePhoto.setAttribute("aria-label", this.description);
        } else if (this.video) {
            thePhoto = document.createElement("video");
            thePhoto.classList.add("thePhoto");
            onePhoto.appendChild(thePhoto);
            thePhoto.setAttribute(
                "aria-label",
                "vidéo. " + this.description
            );
            let videoSource = document.createElement("source");
            thePhoto.id = this.id;
            videoSource.setAttribute("src", `${this.getPhotoUrl(name)}`);
            thePhoto.appendChild(videoSource);
        } else {
            return;
        }
        thePhoto.setAttribute("tabindex", "0");

        thePhoto.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                let mediaId = e.target.id;
                let lightMediaDisplayed = prepareLightBox.filter(
                    (i) => i.id == mediaId
                );
                this.createLightMedia(lightMediaDisplayed[0]);
            }
        });
        // prepare the display of the lightBox after a click
        thePhoto.addEventListener("click", (e) => {
            let mediaId = e.target.id;
            let lightMediaDisplayed = prepareLightBox.filter(
                (i) => i.id == mediaId
            );
            this.createLightMedia(lightMediaDisplayed[0]);
        });
    }


    /*************************Light media section*********************/
    /**
     *
     * @param  lightMedia the lightMEdiaArray
     * @param  lightLength the length of the lightMediaArray
     */
    createLightMedia(lightMedia) {
        let photographerPageMainWrapper = document.getElementById(
            "photographerPageMainWrapper"
        );
        let actualMediaOrder = lightMedia.order;
        let lightLength = prepareLightBox.length;

        // display the media on screen
        this.fillLightMedia(lightMedia);

        //get and create elements of light box
        const lightBox = document.getElementById("lightBox");
        const closeLightBox = document.getElementById("closeLightBox");
        const leftSpan = document.getElementById("leftSpan");
        const rightSpan = document.getElementById("rightSpan");

        // handle the arrow buttons
        this.handleArrows(lightLength, actualMediaOrder);

        // open the lighbox
        photographerPageMainWrapper.setAttribute("aria-hidden", "true");
        lightBox.style.display = "flex";
        closeLightBox.focus();

        // set close the lightbox
        closeLightBox.addEventListener("click", () => {
            this.onCloseLightBox();
        });

        //set left click
        leftSpan.addEventListener("click", () => {
            actualMediaOrder = this.lightDirection(
                actualMediaOrder,
                lightLength,
                "left"
            );
        });

        //set right click
        rightSpan.addEventListener("click", () => {
            actualMediaOrder = this.lightDirection(
                actualMediaOrder,
                lightLength,
                "right"
            );
        });

        //set accessibility keys
        lightBox.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    e.preventDefault();

                    actualMediaOrder = this.lightDirection(
                        actualMediaOrder,
                        lightLength,
                        "left"
                    );
                    break;
                case "ArrowRight":
                    actualMediaOrder = this.lightDirection(
                        actualMediaOrder,
                        lightLength,
                        "right"
                    );
                    e.preventDefault();
                    break;
                case "Enter":
                    e.preventDefault();

                    if (leftSpan === document.activeElement) {
                        e.preventDefault();
                        actualMediaOrder = this.lightDirection(
                            actualMediaOrder,
                            lightLength,
                            "left"
                        );
                    }
                    if (rightSpan === document.activeElement)
                        actualMediaOrder = this.lightDirection(
                            actualMediaOrder,
                            lightLength,
                            "right"
                        );
                    if (closeLightBox === document.activeElement)
                        this.onCloseLightBox();
                    break;
                case "Escape":
                    e.preventDefault();

                    this.onCloseLightBox();
                case "Tab":
                    if (e.shiftKey) {
                        // if shift key pressed for shift + tab combination
                        if (document.activeElement === closeLightBox) {
                            rightSpan && rightSpan.focus();
                            e.preventDefault();
                        }
                    } else {
                        // if tab key is pressed
                        if (document.activeElement === rightSpan) {
                            // if focused has reached to last focusable element then focus first focusable element after pressing tab
                            closeLightBox && closeLightBox.focus();
                            e.preventDefault();
                        }
                    }
                    break;
                default:
                    return;
            }
            return;
        });

        console.log(lightMedia.photographerId);
    }

    /**
     * Close the lightBox and focus on the sortMenu
     */
    onCloseLightBox() {
        photographerPageMainWrapper.setAttribute("aria-hidden", "false");
        lightBox.style.display = "none";
        document.getElementById("sortMenu").focus();
    }

    /**
     * Fill the lightMedia with an image and a name
     * @param  lightMediaObject An object with lightMedia informations
     */
    async fillLightMedia(lightMediaObject) {
       // console.log(lightMediaObject);
        const lightImg = document.getElementById("lightImg");
        const lightVideo = document.getElementById("lightVideo");

        // Get the name of the media
        const lightImgName = Media.getMediaName(
            lightMediaObject.image
                ? lightMediaObject.image
                : lightMediaObject.video
        );

        // Case : it is an image
        if (lightMediaObject.image) {
            
            lightVideo.style.display = "none";
            lightImg.style.display = "initial";
            lightImg.setAttribute(
                "src",
                `${this.getPhotoUrl(
                    await this.getArtistName(lightMediaObject.photographerId),
                    lightMediaObject.image
                )}`
            );
            lightImg.setAttribute("alt", lightMediaObject.description);
            lightImg.setAttribute("tabindex", "0")

            // Case : it is a video
        } else if (lightMediaObject.video) {
            lightImg.style.display = "none";
            const lightVideoSource = document.createElement("source");
            lightVideoSource.setAttribute(
                "src",
                `${this.getPhotoUrl(
                    await this.getArtistName(lightMediaObject.photographerId),
                    lightMediaObject.video
                )}`
            );

            lightVideo.appendChild(lightVideoSource);
            lightVideo.setAttribute("type", "video/mp4");
            lightVideo.setAttribute("tabindex", "0")
            lightVideo.style.display = "block";
        }

        // Display the media name
        const lightName = document.getElementById("lightName");
        lightName.textContent = lightImgName;
    }

    /**
     * Manage the position in the array of the light box images and display the good one.
     * @param {*} actualMediaOrder the actual media order in the array
     * @param {*} lightLength the length of the array
     * @param {*} direction the direction of the navigation in the lightbox
     * @returns
     */
    lightDirection(actualMediaOrder, lightLength, direction) {
        if (actualMediaOrder === lightLength - 1 && direction === "right")
            return actualMediaOrder;
        if (actualMediaOrder === 0 && direction === "left")
            return actualMediaOrder;

        if (direction === "right") actualMediaOrder++;
        if (direction === "left") actualMediaOrder--;

        let lightMediaDisplayed = prepareLightBox.filter(
            (i) => parseInt(i.order) === actualMediaOrder
        );
        this.fillLightMedia(lightMediaDisplayed[0]);
        this.handleArrows(lightLength, actualMediaOrder);
        return actualMediaOrder;
    }

    /**
     * Handle the visible of the arrows
     * @param {*} lightLength array lenght
     * @param {*} mediaOrder the actual media order
     */
    handleArrows(lightLength, mediaOrder) {
        if (mediaOrder === lightLength - 1) rightSpan.style.display = "none";
        if (mediaOrder < lightLength - 1) rightSpan.style.display = "block";
        if (mediaOrder === 0) leftSpan.style.display = "none";
        if (mediaOrder > 0) leftSpan.style.display = "block";
    }
}
