class Modal {
  constructor(params) {
    this.default_params = {
      type: "fade",
      scroll_top: true,
      duration: 0.34,
      easing: "power3.easeOut",

      before_open: function (e) {},
      after_open: function (e) {},
      before_close: function (e) {},
      after_close: function (e) {},

      modal_classname: ".modal",
      open_classname: ".modalOpen",
      close_classname: ".modalClose",
      modal_cont_classname: ".modal__cont",
      opened_classname: ".modal--opened",
    };

    //パラメータの設定
    this.params = Object.assign({}, this.default_params, params);

    //各要素取得
    this.$modal = document.querySelectorAll(this.params.modal_classname)[0];
    this.$modalCont = document.querySelectorAll(
      this.params.modal_cont_classname
    )[0];
    this.$openBtn = document.querySelectorAll(this.params.open_classname);
    this.$closeBtn = document.querySelectorAll(this.params.close_classname);
    this.open_flag = false;
    this.click_pos = 0;

    this.evenHandler();
  }

  //クリックイベントの設定
  evenHandler() {
    this.$openBtn.forEach((e) => {
      e.addEventListener("click", (e) => {
        this.open(e);
      });
    });

    this.$closeBtn.forEach((e) => {
      e.addEventListener("click", (e) => {
        this.close(e);
      });
    });

    //コンテンツクリック時の親要素のイベント伝播停止
    this.$modalCont.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });

  }

  //ターゲット位置取得
  offset(elm) {
    let rect = elm.getBoundingClientRect();
    let scrollTop = this.$modal.pageYOffset || this.$modal.scrollTop;
    return rect.top + scrollTop;
  }

  //モダールを開いた時
  open(e) {
    e.preventDefault();

    if (this.open_flag) return;
    this.open_flag = true;

    //モダール要素表示
    this.$modal.style.display = "block";

    //bodyのスクロール停止
    document.body.style.overflow = "hidden";

    //ターゲットスクロールの準備
    let href = e.currentTarget.getAttribute("href");
    let target = document.getElementById(href.replace("#", ""));

    //アニメーション
    gsap.to(this.$modal, {
      opacity: 1,
      duration: this.params.duration,
      ease: this.params.easeing,
      onStart: () => {
        //モーダルをアクティブ
        this.$modal.classList.add("is-active");
        //ターゲット要素が存在すれば、そこへスクロール
        if (target) {
          this.$modal.scrollTo(0, this.offset(target));
        }
        //beforeイベント
        this.params.before_open();
      },
      onComplete: () => {
        //afterイベント
        this.params.after_open();
        
        this.open_flag = false;
      },
    });
  }

  //モダールを閉じた時
  close(e) {

    if (e) {
      e.preventDefault();
    }
    
    if (this.open_flag) return;
    this.open_flag = true;

    //アニメーション
    gsap.to(this.$modal, {
      opacity: 0,
      duration: this.params.duration,
      ease: this.params.easeing,
      onStart: () => {
        //beforeイベント
        this.params.before_close();

        //モーダルを非アクティブ
        this.$modal.classList.remove("is-active");
      },
      onComplete: () => {
        //afterイベント
        this.params.after_close();

        //モーダル要素非表示
        this.$modal.style.display = "none";

        //bodyのスクロール停止解除
        document.body.style.overflow = "";

        this.open_flag = false;
      },
    });
  }
}

export default Modal;
