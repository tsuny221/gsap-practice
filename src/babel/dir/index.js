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
import SmoothScroll from '../modules/common/smoothScroll'


$(() => {
  window.util = new Util();
  if (util.mode === "tablet") {
    $('meta[name="viewport"]').attr("content", "width=1280");
  }

  // let smoother = ScrollSmoother.create({
  //   smooth: 0.8, // how long (in seconds) it takes to "catch up" to the native scroll position
  //   smoothTouch: 0.1,
  // });

   ScrollTrigger.create({
     trigger: ".mv",
     start: "top -10%",
     end: "bottom 10%",
     onEnter: () => {
      gsap.to(window, { duration: 0.2, scrollTo: util.winH });

     },
     onEnterBack: () => {
       gsap.to(window, { duration: 0.2, scrollTo: 0 });
     },
   });
  
    // new SmoothScroll({
    //   selector: ".mScroll",
    //   duration: 0.77,
    //   ease: "expo.out",
    //   delay: 0.03,
    //   jump: util.winH / 2,
    // });

  let navLinks = document.querySelectorAll(".mScroll");
  navLinks.forEach((navLink) => {
  
    navLink.addEventListener("click", (e) => {
      e.preventDefault();

      //smootherを入れている場合有効
      // smoother.scrollTo($(e.currentTarget).attr("href"), true)
      if ($(navLink.getAttribute("href")).parent().offset().top) {
        gsap.to(window, {
          duration: 0.2,
          scrollTo: $(navLink.getAttribute("href")).parent().offset().top,
        });
       
      } else {
        gsap.to(window, {
          duration: 0.2,
          scrollTo: $(navLink.getAttribute("href")).offset().top,
        });
      }
        
       
      
    });
  })
  
  ScrollTrigger.create({
    trigger: ".orange",
    start: "bottom bottom",
    end: "bottom+=" + util.winH + " bottom",
    scrub: true,
    pin: true,
    pinSpacing: false,
  });

  let scr1 = ScrollTrigger.create({
    trigger: ".purple",
    start: "bottom bottom",
    end: "bottom+=" + util.winH + " bottom",
    scrub: true,
    pin: true,
    pinSpacing: false,
  });

  $(".border").each((e) =>{
      gsap.to($(".border")[e], {
        scale: 1,
        scrollTrigger: {
          trigger: $(".cont")[e],
          start: "top top",
          end: "bottom bottom",
          scrub: true,
    
        },
      });
  })

  $(".inview").each((e) => {
    gsap.to($(".inview")[e], {
      scaleX: 1,
      scrollTrigger: {
        trigger: $(".inview")[e],
        start: "top center",
        toggleClass: { targets: $(".inview")[e], className: "inview--enter" }, //クラスの付け替え
        once: true, //一度だけ発火
  
      },
    });
  });
});
