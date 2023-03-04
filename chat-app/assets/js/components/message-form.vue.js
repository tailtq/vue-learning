export default {
    methods: {
        submitMessage(e) {
            e.preventDefault();

            if (this.message) {
                this.$store.dispatch('sendMessage', this.message);
                this.message = '';
            }
        }
    },
    data() {
        return {
            message: '',
        };
    },
    template: `
        <div class="message-form">
            <form class="d-flex align-items-center" @submit="submitMessage">
                <div class="input-group">
                    <input type="text" class="form-control rounded-pill" v-model="message">
                </div>
        
                <button type="submit" class="btn btn-light rounded-pill">Submit</button>
            </form>
        </div>
    `,
};
