<template>
    <div class="checklist-demo">
        <vf-checklist v-model="checklist" @on-change="onChange">
            <vf-checklist-item value="1111">
                <div>aaaaaaaaaaa</div>
            </vf-checklist-item>
            <vf-checklist-item value="2222">
                <div>bbbbbbbbbbbbbbb</div>
            </vf-checklist-item>
            <vf-checklist-item value="3333">
                <div>cccccccccccccc</div>
            </vf-checklist-item>
            <vf-checklist-item value="4444">
                <div>ddddddddddd</div>
            </vf-checklist-item>
            <vf-checklist-item value="5555">
                <div>eeeeeeeeeeee</div>
                <div>ffffffffffffff</div>
                <div>ddddddddddddd</div>
            </vf-checklist-item>
        </vf-checklist>
        <div>
            <span>已选择:</span>{{checklist}}
        </div>
    </div>
</template>

<script>
import Checklist from '../src/components/Checklist'
// import a from '../src/components/Checklist/Checklist.vue'
// import b from '../src/components/Checklist/ChecklistItem.vue'
// console.log(Checklist);
export default {
    components: {
        ...Checklist
    },
    data() {
        return {
            checklist: ['1111', '2222']
        }
    },
    methods: {
        onChange(value) {
            console.dir(value)
        }
    }
}
</script>

<style>

</style>
