<template>
    <div id="tools-panel">
        <div class="tools-group">
            <button @click="addText"><icon name="pen"></icon></button>
            <button @click="addRect"><icon name="vector-square"></icon></button>
            <button @click="addPolygon"><icon name="draw-polygon"></icon></button>
            <button @click="addCircle"><icon name="circle"></icon></button>
            <button @click="onDraw"><icon name="pen-nib"></icon></button>
            <button @click="onCopy"><icon name="copy"></icon></button>
            <button @click="isShowPicker = !isShowPicker">
                <icon name="palette"></icon>
            </button>
            <button><icon name="file"></icon></button>
            <button @click="onRemove">
                <icon name="times"></icon>
            </button>
            <button @click="onClear"><icon name="trash"></icon></button>
        </div>
        <transition name="slide-fade">
            <compact v-model="color" v-show="isShowPicker"></compact>
        </transition>
    </div>
</template>

<script>
    import compact from 'vue-color/src/components/Compact';
    import example from '../mock/example.svg';

    export default {
        data() {
            return {
                activeObject: {},
                isDrawingMode: false,
                isShowPicker: false,
                colors: [],
                color: {},
                colorValue: null,
            }
        },
        name: 'tools',
        props: {
            canvas: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        components: {
            compact,
        },
        methods: {
            addText() {
                const text = new this.fabric.IText('Type something', {
                    fill: 'red',
                    fontSize: 16,
                    fontFamily: 'Arial',
                });
                this.$props.canvas.add(text);
            },

            addRect() {
                const rect = new this.fabric.Rect({
                    left: 100,
                    top: 100,
                    width: 200,
                    height: 200,
                    fill: this.$data.colorValue || '#FFBCFE',
                });
                this.$props.canvas.add(rect);
            },

            addCircle() {
                const circle = new this.fabric.Circle({
                    left: 200,
                    top: 100,
                    radius: 40,
                    fill: this.$data.colorValue || '#73D8FF',
                });
                this.$props.canvas.add(circle);
            },

            addPolygon() {
                var path = new this.fabric.Path('M 0 0 L 300 100 L 200 300 z');
                path.set({ 
                    fill: this.$data.colorValue || 'red', 
                    stroke: 'green', 
                    opacity: 0.5
                });
                this.$props.canvas.add(path);
            },

            onDraw() {
                this.$props.canvas.isDrawingMode = !this.$data.isDrawingMode;
            },

            onRemove() {
                const activeObject = this.$props.canvas.getActiveObject();

                if (!activeObject) {
                    return;
                }
                this.$props.canvas.fxRemove(activeObject);
            },

            onClear() {
                this.$props.canvas.clear();
            },

            showPicker() {
                this.$props.isShowPicker = !this.$data.isShowPicker;
            },

            onCopy() {
                console.log('Copy Object');
            },

            getActiveObject() {
                return this.$props.canvas.getActiveObject();
            },
        },
        watch: {
            'color'(newVal, oldVal) {
                const activeObject = this.getActiveObject();
                console.log(newVal, activeObject);
                if (newVal) {
                    this.$data.colorValue = newVal.hex;
                }
            },
        },
        created() {
            document.onkeydown = (ev) => {
                console.log(ev);
                const keyCode = ev.keyCode || ev.which;

                if ((ev.ctrlCode && keyCode === 8) || (ev.metaKey && keyCode === 8)) {
                    console.log('Clear All');
                    this.onClear();
                }

                if ((ev.ctrlCode && keyCode === 67) || (ev.metaKey && keyCode === 67)) {
                    console.log('Copy');
                    this.onCopy();
                }

                if (keyCode === 8) {
                    console.log('Delete');
                    this.onRemove();
                }

                ev.preventDefault();
            };
        },
        mounted() {
            this.fabric.loadSVGFromURL(example, (objects, options) => {
                const obj = fabric.util.groupSVGElements(objects, options);
                console.log(objects, obj);
                const rect = new this.fabric.Rect({
                    left: objects[0].left + 300,
                    top: objects[0].top + 300,
                    width: objects[0].width,
                    height: objects[0].height,
                    fill: objects[0].fill,
                });
                const circle = new this.fabric.Circle({
                    left: objects[1].left + 300,
                    top: objects[1].top + 300,
                    radius: objects[1].radius,
                    fill: objects[1].fill,
                    width: objects[1].width,
                    height: objects[1].height,
                });
                const triangle = new this.fabric.Triangle({
                    left: objects[2].left + 300,
                    top: objects[2].top + 300,
                    points: objects[2].points,
                    fill: objects[2].fill,
                    width: objects[2].width,
                    height: objects[2].height,
                    pathOffset: objects[2].pathOffset,
                });
                const text = new this.fabric.IText(objects[3].text, {
                    left: objects[3].left + 300,
                    top: objects[3].top + 300,
                    fill: objects[3].fill,
                    fontSize: objects[3].fontSize,
                    fontWeight: objects[3].fontWeight,
                    fontFamily: objects[3].fontFamily,
                    textLines: objects[3].textLines,
                    textAlign: objects[3].textAlign,
                    fontStyle: objects[3].fontStyle,
                });
                this.$props.canvas.add(rect);
                this.$props.canvas.add(circle);
                this.$props.canvas.add(triangle);
                this.$props.canvas.add(text);
            });
        },
    }
</script>

<style scoped lang="scss">
    #tools-panel{
        position: relative;
        z-index: 1;
        width: 100%;
        height: 50px;
        margin-top: 1px;
        background-color: #ffffff;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, .08);
    }

    .tools-group {
        position: absolute;
        top: 50%;
        left: 50%;
        display: inline-flex;
        margin: 0 auto;
        align-items: center;
        justify-content: center;
        transform: translate(-50%, -50%);
    }

    button {
        margin: 0 5px;
        border: none;
        outline: none;
        width: 32px;
        height: 32px;
        color: #444444;
        cursor: pointer;
        background-color: transparent;
    }

    /* Color Picker Style */
    .vc-compact {
        position: absolute;
        padding: 10px;
        width: 260px;
        left: 50%;
        top: 60px;
        transform: translateX(-50%);
        box-shadow: 1px 5px 20px rgba(0, 0, 0, .08);
    }

    .slide-fade-enter-active {
        transition: all .3s ease-in-out;
    }
    .slide-fade-leave-active {
        transition: all .3s ease-in-out;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
        transform: translate(-50%, -20px);
    }

</style>