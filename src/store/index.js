import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import clothes from './modules/clothes';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    modules: {
        clothes
    },
    strict: process.env.NODE_ENV !== 'production'
})
