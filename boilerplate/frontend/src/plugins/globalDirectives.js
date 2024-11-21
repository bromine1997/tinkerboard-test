import clickOutside from '../directives/click-ouside.js';

const GlobalDirectives = {
  install(app) {
    app.directive('click-outside', clickOutside);
  },
};

export default GlobalDirectives;
