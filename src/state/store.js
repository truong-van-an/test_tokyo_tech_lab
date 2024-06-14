import { createStore } from 'vuex';
import history from './modules/history'

const store = createStore({
    modules:{
        history
    },
})
export default store