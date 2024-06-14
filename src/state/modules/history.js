export const state = {
    dataHistory: sessionStorage.getItem("history") ? JSON.parse(sessionStorage.getItem("history")).slice(-3) : []
}
export const mutations = {
    dataHistory(state, data){
        state.dataHistory = data
    },
    removeItemFromHistory(state, id) {
        state.dataHistory = state.dataHistory.filter(item => item.id !== id);
        sessionStorage.setItem("history", JSON.stringify(state.dataHistory));
    }
}
export const actions = {
    handleHistory({commit}){
        commit('dataHistory', JSON.parse(sessionStorage.getItem("history")))
    },
    removeItem({ commit }, id) {
        commit('removeItemFromHistory', id);
        }
}
export default {
    state,
    mutations,
    actions,
    namespaced: true
}