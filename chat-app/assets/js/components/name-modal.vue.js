export default {
    data() {
        return {
            nameInput: '',
            showError: false,
            modalEl: null,
        };
    },
    methods: {
        submitForm(e) {
            e.preventDefault();

            if (!this.nameInput) {
                this.showError = true;
                return;
            }
            this.$store.dispatch('saveName', this.nameInput);
            this.modalEl.hide();
        },
    },
    mounted() {
        this.modalEl = new bootstrap.Modal('#name-modal');
        this.modalEl.show();
        this.modalEl._element.addEventListener('hide.bs.modal', (event) => {
            if (!this.$store.state.name) {
                event.preventDefault();
            }
        });
    },
    watch: {
        '$store.state.name'(value) {
            if (value) {
                this.modalEl.hide();
            }
        }
    },
    template: `
        <div class="modal" tabindex="-1" id="name-modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Personal information</h5>
                    </div>
                    
                    <div class="modal-body">
                        <form @submit="submitForm">
                            <div class="mb-3">
                                <label for="nameInput" class="form-label">Name</label>
                                <input type="text" class="form-control" id="nameInput" v-model="nameInput">
                                <div
                                    class="form-text text-danger"
                                    v-if="showError">
                                    Please provide your name to proceed to the next step.
                                </div>
                            </div>
                            
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
};
