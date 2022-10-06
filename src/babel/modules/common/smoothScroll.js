class SmoothScroll {

  eventHandler(el,i) {
    
    el.addEventListener("click", (e) => {
      //ターゲットの指定
      this.target = el.getAttribute("href");
      //トップからの現在地
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // ~は即時関数、定義と同時に実行
      if (~this.target.indexOf("#")) {
        //イベント停止
        e.preventDefault(), e.stopPropagation();
        //#のみならトップへ
        if (this.target === "#") this.target_position = 0;
        //数字ならその数字の位置へ
        else if (typeof this.target === "number")
          this.target_position = this.target;
        //その他ならIDの位置へ
        else
          this.target_position = this.offset(
            document.getElementById(this.target.slice(1))
          );

        //スクロール中のイベント停止
        this.addlistner();

        //スクロールバーの高さ超えたら
        if (this.target_position > this.max) this.target_position = this.max;

        //スクロール位置と現在地が同じかどうか
        if (this.target_position !== this.scrollTop) {
          setTimeout(() => {
            //ジャンプ
            if (this.params.jump) {
              if (
                Math.abs(this.target_position - this.scrollTop) >
                this.params.jump
              ) {
                if (this.target_position > this.scrollTop)
                  window.scrollTo(0, this.target_position - this.params.jump);
                else
                  window.scrollTo(0, this.target_position + this.params.jump);
              }
            }

            //スクロールアニメーション
            gsap.to(this.params.container, {
              scrollTo: {
                y: this.target_position,
              },
              duration: this.params.duration,
              ease: this.params.ease,
              delay: this.params.delay,
              onComplete: (_) => {
                //スクロール中のイベント停止解除
                this.removelistner();

                //スクロール完了後のイベント
                if (typeof this.params.complete === "function")
                  this.params.complete();
              },
            });
          }, this.params.jump_delay);

        } else {
          //スクロール中のイベント停止解除
          this.removelistner();

          //スクロール完了後のイベント
          if (typeof this.params.complete === "function")
            this.params.complete();
        }
      }
    });

  }
  constructor(params) {
    //デフォルトのパラメータ
    this.default_params = {
      container: window,
      duration: false,
      ease: false,
      delay: 0,
      jump: false,
      jump_delay: 0,
      complete: undefined,
    };

    this.target_position = 0;
    this.params = Object.assign({}, this.default_params, params);

    // スクロールバーの高さ
    this.max =
      document.body.clientHeight - document.documentElement.clientHeight;

    //ターゲット位置の取得メソッド
    this.offset = (elm) => {
      let targetElm
      if (elm.parentElement.className === "pin-spacer") {
        targetElm = elm.parentElement;
      } else {
        targetElm = elm;
      }
      let rect = targetElm.getBoundingClientRect();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return rect.top + scrollTop;
    };

    this.handler = (e) => e.preventDefault();

    //スクロール中のイベント停止リスナー
    this.addlistner = (_) => {
      window.addEventListener("mousewheel", this.handler, { passive: false });
      window.addEventListener("touchstart", this.handler, { passive: false });
      window.addEventListener("keydown", this.handler, { passive: false });
    };

    //スクロール中のイベント停止解除リスナー
    this.removelistner = (_) => {
      window.removeEventListener("mousewheel", this.handler, {
        passive: false,
      });
      window.removeEventListener("touchstart", this.handler, {
        passive: false,
      });
      window.removeEventListener("keydown", this.handler, { passive: false });
    };

    document.querySelectorAll(this.params.selector).forEach((el, i) => {
      this.eventHandler(el, i);
    });
  }
  
}

export default SmoothScroll