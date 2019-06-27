// !!!!!!!! scroll time for arrow not funging xd !!!!!!!!!!!!!!
const myDOM = {
  // header and others sections
  header: document.querySelector(".header"),
  // products sections
  bbq: document.querySelector(".product__describe--first"),
  boat: document.querySelector(".main__product--second"),
  // other sections
  videos: document.querySelector(".product__describe--thirt"),
  about: document.querySelector(".main__wrapper--lightWood"),

  // products
  productDescribeFirst: document.querySelector(".product__describe--first"),
  productDescribeSecond: document.querySelector(".product__describe--second"),

  // menu
  menuLang: document.querySelector(".header__nav--languages"),
  menuLangList: document.querySelector(".languages__list"),
  menuHamb: document.querySelector(".header__nav--hamb"),
  menuHambList: document.querySelector(".hamb__list"),
  // main menu options
  menusOptions: document.querySelectorAll(".menu__option, .hamb__option"),
  // arrow
  arrow: document.querySelector(".arrow"),

  // videos
  videosContainers: document.querySelectorAll(".video__wrapper"),
  // videoIframes: document.querySelectorAll(".iframe"),

  toggleProducts: () => {
    if (window.scrollY > (mySize.headerHeight * 0.75) / 3) {
      myDOM.bbq.style.animation = "goInRight 1s forwards";
    } else {
      myDOM.bbq.style.animation = "none";
    }

    if (window.scrollY > mySize.headerHeight * 0.75 * 1.3) {
      myDOM.productDescribeSecond.style.animation = "goInRight 1s forwards";
    } else {
      myDOM.productDescribeSecond.style.animation = "none";
    }
  },
  scrollTo: (target = myDOM.header, duration = 200) => {
    const targetPosition = target; //top of target
    const startPosition = window.pageYOffset; //window se

    const distance = targetPosition - startPosition;
    let startTime = null;

    ease = (time, start, distance, duration) => {
      time /= duration / 2;
      if (time < 1) return (distance / 2) * time * time + start;
      time--;
      return (-distance / 2) * (time * (time - 2) - 1) + start;
    };

    animation = currentTime => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const newPosition = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, newPosition);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        // finish animation
      }
    };
    requestAnimationFrame(animation);
  },

  listen: () => {
    addEventListener("resize", mySize.resize);

    addEventListener("scroll", () => {
      myDOM.toggleProducts();
    });

    myDOM.menuLang.addEventListener("click", () => {
      myDOM.menuLangList.classList.toggle("displayNone");
    });
    myDOM.menuHamb.addEventListener("click", () => {
      myDOM.menuHambList.classList.toggle("displayNone");
    });

    myDOM.menusOptions.forEach(option => {
      option.addEventListener("click", () => {
        let destiny;

        switch (option.innerHTML) {
          case "bbq":
            destiny = myDOM["header"].offsetHeight;
            break;
          case "boat":
            destiny = myDOM["header"].offsetHeight + myDOM["bbq"].offsetHeight;

            break;
          case "videos":
            destiny =
              myDOM["header"].offsetHeight +
              myDOM["bbq"].offsetHeight +
              myDOM["boat"].offsetHeight +
              myDOM["videos"].offsetHeight;
            break;
          case "about":
            destiny = myDOM[option.innerHTML].offsetTop;
            break;
        }
        const scrollTime = destiny / 3;

        myDOM.scrollTo(destiny, scrollTime);
      });
    });

    myDOM.arrow.addEventListener("click", () => {
      const scrollTime = Math.abs(window.pageYOffset / 3);
      console.log(scrollTime, window.pageYOffset);
      myDOM.scrollTo(myDOM.header, scrollTime);
    });

    myDOM.videosContainers.forEach(container => {
      container.addEventListener("click", () => {
        const videoWrapper = this.childNodes[1];
        const video = videoWrapper.childNodes[1];
        if (video.paused) {
          video.requestFullscreen();
          video.play();
          function listener() {
            // console.log(video);
            video.webkitExitFullScreen();
            video.pause();
            video.removeEventListener("click", listener);
          }
          video.addEventListener("click", listener);
        } else {
          video.pause();
        }
      });
    });
  }
};

let mySize = {
  headerHeight: myDOM.header.offsetHeight,
  descrbieFirstTop: myDOM.bbq.offsetTop,

  resize: () => {
    mySize.headerHeight = myDOM.header.offsetHeight;
    mySize.descrbieFirstTop = myDOM.bbq.offsetTop;
    //   console.log("resize", mySize.descrbieFirstTop);
  }
};

(init = () => {
  myDOM.listen();
  mySize.resize();
})();

// klasa kropki swiecacej w header "counter__dot--selected"
