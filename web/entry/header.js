import Vue from 'vue';
import Icon from 'vue-awesome';
import VTooltip from 'v-tooltip';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

global.Vue = Vue;
Vue.config.productionTip = false;

Vue.component('icon', Icon);

Vue.use(VTooltip);
Vue.use(Antd);

require('../global');
require('../vendor');

import 'minireset.css';
import '../styles/index.scss';

// if (APPSTATE.isMockAPI) {
//   require('../mock');
// }
