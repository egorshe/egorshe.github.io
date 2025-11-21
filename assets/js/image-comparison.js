document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll(".image-comparison");

  containers.forEach((container) => {
    const slider = container.querySelector(".comparison-slider");
    const beforeImage = container.querySelector(".comparison-before");
    const beforeImg = beforeImage.querySelector("img");
    const afterImg = container.querySelector(".comparison-after img");

    // Set before image width to match after image
    function setImageWidth() {
      const width = afterImg.offsetWidth;
      beforeImg.style.width = width + "px";
    }

    setImageWidth();
    window.addEventListener("resize", setImageWidth);

    let isActive = false;

    // Mouse events
    slider.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isActive = true;
    });

    document.addEventListener("mouseup", () => {
      isActive = false;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isActive) return;
      e.preventDefault();
      updateSlider(e.pageX);
    });

    // Touch events - improved for mobile
    slider.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        isActive = true;
      },
      { passive: false },
    );

    document.addEventListener("touchend", () => {
      isActive = false;
    });

    document.addEventListener(
      "touchmove",
      (e) => {
        if (!isActive) return;
        e.preventDefault();
        const touch = e.touches[0];
        updateSlider(touch.pageX);
      },
      { passive: false },
    );

    // Also allow clicking/tapping anywhere on the container
    container.addEventListener("click", (e) => {
      updateSlider(e.pageX);
    });

    container.addEventListener("touchend", (e) => {
      if (e.changedTouches.length > 0) {
        updateSlider(e.changedTouches[0].pageX);
      }
    });

    function updateSlider(x) {
      const containerRect = container.getBoundingClientRect();
      const position = ((x - containerRect.left) / containerRect.width) * 100;

      if (position >= 0 && position <= 100) {
        beforeImage.style.width = position + "%";
        slider.style.left = position + "%";
      }
    }
  });
});
