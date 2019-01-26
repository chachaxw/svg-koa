<template>
    <div class="back-to-top" @click="toTop" v-show="isShow">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-up"></use>
        </svg>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isShow: false
            }
        },
        name: 'backToTop',
        props: {
            toBottom: {
                type: Number,
                default: 0
            }
        },
        methods: {
            toTop() {
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            }
        },
        mounted() {
            let that = this;
            let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            function touch() {
                var scrollTop = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop;
                that.isShow = scrollTop > height;
            }

            document.addEventListener('scroll', touch, false);
        }
    }
</script>
<style scoped>
    .back-to-top {
        font-size: 32px;
        position: fixed;
        bottom: 20px;
        right: 10px;
    }

    img {
        width: 40px;
        height: 40px;
    }
</style>
