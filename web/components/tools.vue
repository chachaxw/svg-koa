<template>
    <div id="tools-panel">
        <div class="tools-group">
            <button @click="addText"><icon name="pen"></icon></button>
            <button @click="addRect"><icon name="vector-square"></icon></button>
            <button @click="addPolygon"><icon name="draw-polygon"></icon></button>
            <button @click="addCircle"><icon name="circle"></icon></button>
            <button @click="onDraw"><icon name="pen-nib"></icon></button>
            <button @click="onGroup"><icon name="object-group"></icon></button>
            <button @click="onUngroup"><icon name="object-ungroup"></icon></button>
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
    import test from '../mock/test.svg';

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
                    fill: this.$data.colorValue || '#FFFFFF',
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

            onGroup() {
                const canvas = this.$props.canvas;
                if (!canvas.getActiveObject()) {
                    return;
                }
                if (canvas.getActiveObject().type !== 'activeSelection') {
                    return;
                }
                canvas.getActiveObject().toGroup();
                canvas.requestRenderAll();
            },

            onUngroup() {
                const canvas = this.$props.canvas;
                if (!canvas.getActiveObject()) {
                    return;
                }
                if (canvas.getActiveObject().type !== 'group') {
                    return;
                }
                canvas.getActiveObject().toActiveSelection();
                canvas.requestRenderAll();
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

            setActiveObjectsColor(color) {
                const canvas = this.$props.canvas;
                const activeObjects = canvas.getActiveObjects();
                if (!activeObjects) {
                    return;
                }
                activeObjects.forEach((obj) => {
                    obj.set('fill', color);
                });
                canvas.requestRenderAll();
            },

        },
        watch: {
            'color'(newVal, oldVal) {
                if (newVal) {
                    this.$data.colorValue = newVal.hex;
                    this.setActiveObjectsColor(newVal.hex);
                }
            },
        },
        created() {
            document.onkeydown = (ev) => {
                const keyCode = ev.keyCode || ev.which;

                if ((ev.shiftKey && ev.ctrlCode && keyCode === 8) || (ev.shiftKey && ev.metaKey && keyCode === 8)) {
                    this.onClear();
                    ev.preventDefault();
                }

                if ((ev.ctrlCode && keyCode === 67) || (ev.metaKey && keyCode === 67)) {
                    this.onCopy();
                    ev.preventDefault();
                }

                if ((ev.ctrlCode && keyCode === 8) || (ev.metaKey && keyCode === 8)) {
                    this.onRemove();
                    ev.preventDefault();
                }
            };
        },
        mounted() {
            console.log(this.fabric)
            this.fabric.loadSVGFromURL(test, (objects, options) => {
                objects.forEach(item => {
                    switch (item.type) {
                        // case 'path':
                        //     const path = new this.fabric.Path(item.oCoords, {
                        //         ...item
                        //     });
                        //     this.$props.canvas.add(path);
                        //     break;
                        case 'circle':
                            const circle = new this.fabric.Circle({...item});
                            this.$props.canvas.add(circle);
                            break;
                        case 'rect':
                            const rect = new this.fabric.Rect({...item});
                            this.$props.canvas.add(rect);
                            break;
                        case 'polygon':
                            const polygon = new this.fabric.Polygon(item.oCoords, {...item});
                            this.$props.canvas.add(polygon);
                            break;
                        case 'text':
                            const iText = new this.fabric.IText(item.text, {
                                fill: item.fill,
                                fontSize: item.fontSize,
                                fontFamily: item.fontFamily,
                                aCoords: item.aCoords,
                                oCoords: item.oCoords,
                                top: item.top,
                                left: item.left,
                                originX: 'left',
                                originY: 'top',
                            });
                            this.$props.canvas.add(iText);
                            break;
                        case 'ellipse':
                            const ellipse = new this.fabric.Ellipse({...item});
                            this.$props.canvas.add(ellipse);
                            break;
                        default:
                            this.$props.canvas.add(item);
                            break;
                    }
                });
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