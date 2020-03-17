<template>
    <div class="wrapper">
        <div class="input-row" v-for="(layerName, i) in Object.keys(controller)" :key="i">
            <input type="checkbox" :id="layerName" :checked="controller[layerName]" @change="toggleLayer(layerName)" />
            <span>{{ layerName | humanize }}</span>
        </div>

    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    export default Vue.extend({
        props: {
            controller: { type: Object, required: true },
            toggleLayer: { type: Function, required: true }
        },
        filters: {
            humanize(text: string): string {
                const nonCameled: string = text.replace(/([a-z])([A-Z])/g, "$1 $2");
                return `${nonCameled[0].toUpperCase()}${nonCameled.substring(1).toLowerCase()}`;
            }
        }
    });
</script>

<style scoped>
    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        margin: 1rem;
        padding: 1rem .8rem 1rem .5rem;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 3px rgba(0,0,0,.3);
    }
    .input-row {
        display: flex;
        align-items: center;
    }
    input {
        margin-right: .5rem;
    }
</style>