import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            dark: {
                primary: '#656D0B',
                accent: '#626326',
                secondary: '#4E5110',
                success: '#2B722E',
                info: '#1D5684',
                warning: '#BFD100',
                error: '#C10F0F',
                background: "#CCC"
            },
            light: {
                primary: '#E9FA2F',
                accent: '#98993E',
                secondary: '#D7DF33',
                success: '#43C448',
                info: '#3B88C7',
                warning: '#F1FF5F',
                error: '#F13333',
                background: "#FFF"
            }
        },
    },
});
