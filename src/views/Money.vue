<template>
        <Layout class-prefix="layout">
            <NumberPad :value.sync="record.amount" @submit="saveRecord"/> 
            <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
            <div class="notes">
                <Notes placeholder="请输入备注" fieldName="备注" @update:value="onUpdateNotes" />
            </div>
            <Tags/>
        </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/components/constants/recordTypeList.ts'



@Component({components: { NumberPad, Types, Notes, Tags ,Tabs}})
    export default class Money extends Vue {
        get recordList(){
            return this.$store.state.recordList
        }
        recordTypeList = recordTypeList;
        record: RecordItem ={
            tags:[],
            amount: 0,
            type: '-',
            notes: '',
        }
        created(){
            this.$store.commit('fetch')
        }
        onUpdateNotes(value: string){
            this.record.notes = value
        }
        saveRecord(){
            this.$store.commit('createRecord',this.record)
        }
        
    }
</script>
<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
        > .notes{
            padding: 12px 0;
        }
    }
</style>
<style lang="scss" scoped>










</style>