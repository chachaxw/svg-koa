import Vue from 'vue';
import Icon from 'vue-awesome';

global.Vue = Vue;
Vue.config.productionTip = false;

Vue.component('icon', Icon);

require('../global');
require('../vendor');

import 'minireset.css';
import '../styles/index.scss';

// if (APPSTATE.isMockAPI) {
//     require('../mock');
// }

import * as filters from '../filters';

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
