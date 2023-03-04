import store from './store/index.js';
import Message from './components/message.vue.js';
import MessageForm from './components/message-form.vue.js';
import NameModal from './components/name-modal.vue.js';

const app = Vue.createApp({
    mounted() {
        let tabId = sessionStorage.getItem('tabId');
        const name = sessionStorage.getItem('name');
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');

        if (!tabId) {
            tabId = Math.round(Math.random() * 1000000).toString();
        }

        this.$store.dispatch('saveTabId', tabId);
        this.$store.dispatch('saveName', name);
        this.$store.dispatch('loadMessages', messages);
        this.listenToStorageChanges();
        this.listenToScrollEvent();
    },
    methods: {
        listenToStorageChanges() {
            // multi-tab chatting
            addEventListener('storage', (event) => {
                const messages = JSON.parse(localStorage.getItem('messages') || '[]');
                this.$store.dispatch('loadMessages', messages);
            });
        },
        listenToScrollEvent(e) {
            // load more messages
            const $el = this.$el.ownerDocument.getElementsByClassName('message-container');

            $el[0].addEventListener('scroll', (event) => {
                if ($el[0].scrollTop < 200 && this.$store.getters.canLoadMoreMessage) {
                    this.$store.dispatch('loadMoreMessages');
                }
            });
        },
        scrollToBottom() {
            const $els = this.$el.ownerDocument.getElementsByClassName('message');

            if ($els.length) {
                $els[$els.length - 1].scrollIntoView();
            }
        },
    },
    watch: {
        '$store.state.messages': {
            handler(value) {
                // scroll to bottom whenever new messages are sent
                setTimeout(() => this.scrollToBottom(), 1);
            },
            deep: true,
        },
        '$store.state.totalRenderedMessages'(value, oldValue) {
            // Only update the position of the scroller when loading more messages
            if (value - oldValue === 1) return;

            const $el = this.$el.ownerDocument.getElementsByClassName('message');

            if ($el.length > value - oldValue) {
                $el[value - oldValue].scrollIntoView();
            }
        },
    }
});
app.component('message', Message);
app.component('message-form', MessageForm);
app.component('name-modal', NameModal);
app.use(store);
app.mount('#app');
