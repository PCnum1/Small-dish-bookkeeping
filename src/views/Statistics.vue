<template>
    <div>
        <Layout>
            <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type"/>
            <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval"/>
        </Layout>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Types from '@/components/Money/Types.vue';
import Tabs from '@/components/Tabs.vue';
import {Component} from 'vue-property-decorator';
import intervalList from '@/components/constants/intervalList.ts'
import recordTypeList from '@/components/constants/recordTypeList.ts'
@Component({components:{Types,Tabs}})
    export default class Statistics extends Vue {
        type = '-';
        interval = 'day';
        intervalList = intervalList;
        recordTypeList = recordTypeList
    }
</script>

<style lang="scss" scoped>
::v-deep .types-tabs-item{
    background: #fff;
    &.selected{
        background: #c4c4c4;
        &::after{
            display: none;
        }
    }
}
</style>