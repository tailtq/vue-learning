// message: id, fromUserId, content

const store = Vuex.createStore({
    state: {
        tabId: null,
        name: '',
        messages: [],
        totalRenderedMessages: 25,
    },
    mutations: {
        saveName(state, name) {
            state.name = name;
        },
        saveTabId(state, tabId) {
            state.tabId = tabId;
        },
        loadMessages(state, messages) {
            state.messages = messages;
        },
        sendMessage(state, messageContent) {
            state.totalRenderedMessages += 1;
            state.messages.push({
                fromUserId: state.tabId,
                content: messageContent,
            });
        },
        loadMoreMessages(state) {
            if (state.totalRenderedMessages < state.messages.length) {
                const msgLength = state.messages.length;
                state.totalRenderedMessages = Math.min(state.totalRenderedMessages + 25, msgLength);
            }
        }
    },
    actions: {
        saveName({ commit }, name) {
            commit('saveName', name);
        },
        saveTabId({ commit }, tabId) {
            commit('saveTabId', tabId);
        },
        loadMessages({ commit }, messages) {
            commit('loadMessages', messages);
        },
        sendMessage({ commit }, messageContent) {
            commit('sendMessage', messageContent);
        },
        loadMoreMessages({ commit }) {
            commit('loadMoreMessages');
        },
    },
    getters: {
        messages(state) {
            const msgLength = state.messages.length;

            return state.messages
                .slice(msgLength - state.totalRenderedMessages, msgLength)
                .map(e => ({ ...e, sentByMe: e.fromUserId === state.tabId }));
        },
        canLoadMoreMessage(state) {
            return state.totalRenderedMessages < state.messages.length;
        }
    },
});
store.watch((state) => state.name, (name) => {
    if (name) {
        sessionStorage.setItem('name', name);
    }
});
store.watch((state) => state.tabId, (tabId) => sessionStorage.setItem('tabId', tabId));
store.watch((state) => state.messages, (messages) => {
    localStorage.setItem('messages', JSON.stringify(messages));
}, { deep: true });

export default store;
