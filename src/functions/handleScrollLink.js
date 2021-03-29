export function handleScrollLink() {
    // Handle the display of the top link
    let scrollLink = document.querySelector(".goContent");
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 50) {
            scrollLink.style.display = "initial";
        } else {
            scrollLink.style.display = "none";
        }
    });

    // Handle the scroll when click on the top link
    scrollLink.addEventListener("click", function () {
        document.documentElement.scrollTop = 0;
    });
}
