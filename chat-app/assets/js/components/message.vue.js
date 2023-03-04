export default {
    props: {
        direction: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String,
            default: './assets/images/blank_avatar.jpeg'
        }
    },
    template: `
        <div class="message" :class="direction === 'right' ? 'message__right' : 'message__left'">
            <img :src="avatarUrl" alt="" class="message__avatar rounded-circle">
            
            <div class="d-flex">
                <p class="message__content align-self-end m-0">{{ message }}</p>
            </div>
        </div>
    `
};
