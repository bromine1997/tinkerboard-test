export default {
  install(app) {
    // Reactive 상태 관리
    const rtlStore = {
      isRTL: false,
      getDocClasses() {
        return document.body.classList;
      },
      enableRTL() {
        this.isRTL = true;
        this.getDocClasses().add('rtl');
        this.getDocClasses().add('menu-on-right');
        this.toggleBootstrapRTL(true);
      },
      disableRTL() {
        this.isRTL = false;
        this.getDocClasses().remove('rtl');
        this.getDocClasses().remove('menu-on-right');
        this.toggleBootstrapRTL(false);
      },
      toggleBootstrapRTL(value) {
        for (let i = 0; i < document.styleSheets.length; i++) {
          let styleSheet = document.styleSheets[i];
          let { href } = styleSheet;
          if (href && href.endsWith('bootstrap-rtl.css')) {
            styleSheet.disabled = !value;
          }
        }
      },
    };

    // Vue 3의 글로벌 속성에 등록
    app.config.globalProperties.$rtl = rtlStore;
  },
};
