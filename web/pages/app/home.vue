<template>
    <div id="home-app">
        <div class="page-header">
            PPT-KOA
        </div>
        <div class="container">
            <tools></tools>
            <canvas id="fabricCanvas"></canvas>
        </div>
        <back-to-top></back-to-top>
    </div>
</template>
<script>
    import { fabric } from 'fabric';
    import backToTop from '../../components/back-to-top';
    import tools from '../../components/tools';

    export default {
        data() {
            return {

            };
        },
        components: {
            tools,
            backToTop,
        },
        methods: {
            
        },
        watch: {

        },
        mounted() {
            console.log(fabric);
            // create a wrapper around native canvas element
            const canvas = new fabric.Canvas('fabricCanvas', {
                width: 1066,
                height: 600,
            });
            // create a rectangle object
            const rect = new fabric.Rect({
                left: 100,
                top: 100,
                fill: '#FFBCFE',
                width: 200,
                height: 200
            });

            // "add" rectangle onto canvas
            canvas.add(rect);
        },
    }
</script>
<style lang="scss">
    #home-app {
        height: 100%;
    }

    .page-header {
        text-align: center;
        font-size: 18px;
        margin: 0;
        height: 64px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        box-shadow: 1px 5px 40px rgba(0, 0, 0, .08);
    }

    .container {
        width: 100%;
        padding: 0;
        position: relative;
        height: calc(100% - 74px);
    }

    .canvas-container {
        margin-top: 50px;
        left: 50%;
        transform: translateX(-50%);
    }

    #fabricCanvas {
        width: 1066px;
        height: 600px;
        box-shadow: 1px 5px 8px rgba(0, 0, 0, .08);
        background-color: #ffffff;
    }

    .upload {
        display: flex;
        flex-direction: column;
        width: 50%;
        height: 120px;
        margin: 0 auto;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        border: 2px dashed #dddddd;

        &.drop-active {
            border-color: rgb(41, 154, 230);
        }

        .file-uploads {
            display: flex;
            width: 180px;
            height: 40px;
            color: #fff;
            cursor: pointer;
            justify-content: center;
            align-items: center;
            border-radius: 3px;
            background-color: rgb(41, 154, 230);

            &:hover {
                background-color: rgba(41, 154, 230, .8);
            }
        }
    }

    .upload-tips {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: 0;
        position: fixed;
        display: flex;
        z-index: 9999;
        color: #f2f2f2;
        font-size: 16px;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, .5);
    }

    .file-list {
        width: 50%;
        text-align: center;
        margin: 20px auto;

        li {
            color: #fff;
            position: relative;
            background-color: #d6d6d6;
            border-radius: 4px;
            padding: 5px 8px;
            margin-bottom: 5px;
            overflow: hidden;
        }

        .progress {
            width: 0;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 0;
            border-radius: 4px;
            background-color: #d6d6d6;
        }

        .file-info {
            position: relative;
            z-index: 1;
        }
    }
</style>
