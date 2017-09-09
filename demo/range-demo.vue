<template>
    <div class="range-demo">
        <div>
            <span>Range Value:</span>
            <span>{{value}}</span>
        </div>
        <vf-range v-model="value" :step="1000" :min="1000" :max="10000"></vf-range>
        <br />
        <br />
    
        <vf-range v-model="value1" :min="0" :max="24" :format="format"></vf-range>
    </div>
</template>

<script>
import Range from '../src/components/Range'
console.log(Range)
export default {
    components: {
        [Range.name]: Range
    },
    data() {
        return {
            value: [2000, 5000],
            value1: [0, 10]
        }
    },
    methods: {
        // onChange(value) {
        //     console.dir(value)
        // },
        format(val) {
            return `${val}h`
        }
    }
}
</script>

<style>
.range-demo {
    padding: 10px;
    box-sizing: border-box;
}
</style>
