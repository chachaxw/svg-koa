<template>
    <div id="tools">
        <chrome v-model="colors" v-if="isShowPicker"></chrome>
    </div>
</template>

<script>
    import chrome from 'vue-color/src/components/Chrome';

    export default {
        data() {
            return {
                isShowPicker: false,
                colors: [],
            }
        },
        name: 'tools',
        props: {
            // show: {
            //     type: boolean,
            //     default: true,
            // }
        },
        components: {
            chrome,
        },
    }
</script>

<style scoped lang="scss">
    #tools {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 50px;
        margin-top: 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        // border-radius: 0 6px 6px 0;
        background-color: #ffffff;
        box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, .08);
    }
</style>