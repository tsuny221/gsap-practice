import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollSmoother } from "gsap/ScrollSmoother.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

require("scroll-restoration-polyfill");
require("babel-polyfill");

require("lazysizes");
require("lazysizes/plugins/unveilhooks/ls.unveilhooks");
require("lazysizes/plugins/aspectratio/ls.aspectratio");

window.jQuery = require("jquery");
window.$ = window.jQuery;

require("jquery.easing");
// require('velocity-animate')
require("imagesloaded");

require("../libs/requestAFrame.js");
require("../libs/jquery.bez.js");
// require('../libs/jquery.mScroll.js')
// require('../libs/jquery.mShare.js')
// require('../libs/jquery.inview.js')
// require('../libs/jquery.mLazy.js')
// require('../libs/jquery.mScrollManager.js')
// require('../libs/jquery.mSlider.js')
// require('../libs/jquery.mParallax.js')
// require('../libs/jquery.mModal.js')
// require('../libs/jquery.cookie.js') // use LocalStorage
// require('../libs/jquery.mFadeIn.js')

import Util from "../modules/common/Util";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

window.gsap = gsap
window.ScrollTrigger = ScrollTrigger;
import SmoothScroll from '../modules/common/SmoothScroll'
import Modal from "../modules/common/Modal";


$(() => {
  window.util = new Util();
  if (util.mode === "tablet") {
    $('meta[name="viewport"]').attr("content", "width=1280");
  }

  // let smoother = ScrollSmoother.create({
  //   smooth: 0.8, // how long (in seconds) it takes to "catch up" to the native scroll position
  //   smoothTouch: 0.1,
  // });

  //ループさせてみる

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onLeave: () => {
      gsap.to(window, { duration: 0.5, ease: "none", scrollTo: util.winH });
    },
  });
      
  ScrollTrigger.create({
    trigger: ".mv",
    start: "top -1%",
    end: "bottom 1%",
    onEnter: () => {
      gsap.to(window, { duration: 0.2, scrollTo: util.winH });
    },
    onEnterBack: () => {
      gsap.to(window, { duration: 0.2, scrollTo: 0 });
    },
  });

  new SmoothScroll({
    selector: ".mScroll",
    duration: 0.77,
    ease: "expo.out",
    delay: 0.03,
    jump: util.winH / 2,
  });

  new Modal({
    type: "fade",
    scroll_top: true,
    duration: 0.34,
    easing: "power3.easeOut",

    before_open: () => {},
    after_open: () => {
      $(".modal__item").each((i) => {
        ScrollTrigger.create({
          scroller: $(".modal")[0],
          trigger: $(".modal__item")[i],
          start: "top 80%", //左：要素の上部　右：windowの上から80%
          toggleClass: {
            targets: $(".modal__item")[i],
            className: "inview--enter",
          }, //クラスの付け替え
          once: true, //一度だけ発火
        });
      });

      ScrollTrigger.create({
        scroller: $(".modal")[0],
        trigger: $(".modal__cont")[0],
        start: 0,
        end: "99%",
        onLeave: () => {
          $(".modalClose").eq(0).trigger("click")
        },
      });
    },
    before_close: () => {},
    after_close: () => {
      $(".modal__item").removeClass("inview--enter");
    },

    modal_classname: ".modal",
    open_classname: ".modalOpen",
    close_classname: ".modalClose",
    modal_cont_classname: ".modal__cont",
    opened_classname: ".modal--opened",
  });

  // let navLinks = document.querySelectorAll(".mScroll");
  // navLinks.forEach((navLink) => {

  //   navLink.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     smootherを入れている場合有効
  //     smoother.scrollTo($(e.currentTarget).attr("href"), true)
  //
  // })

  ScrollTrigger.create({
    trigger: ".orange",
    start: "bottom bottom",
    end: "bottom+=" + util.winH + " bottom",
    scrub: true,
    pin: true,
    pinSpacing: false,
  });

  ScrollTrigger.create({
    trigger: ".purple",
    start: "bottom bottom",
    end: "bottom+=" + util.winH + " bottom",
    scrub: true,
    pin: true,
    pinSpacing: false,
  });

  $(".border").each((e) => {
    gsap.to($(".border")[e], {
      scale: 1,
      scrollTrigger: {
        trigger: $(".cont")[e],
        start: "top top",
        end: "top+=300 top",
        scrub: true,
      },
    });
  });

  $(".inview").each((e) => {
    ScrollTrigger.create({
      trigger: $(".inview")[e],
      start: "top 80%", //左：要素の上部　右：windowの上から80%
      toggleClass: { targets: $(".inview")[e], className: "inview--enter" }, //クラスの付け替え
      once: true, //一度だけ発火
    });
  });
});
