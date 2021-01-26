<template>
    <div>
        <Layout>
            <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type"/>
            <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>
            <div>
                <ol>
                    <li v-for="group in result" :key="group.title">
                        <h3 class="title">{{beautify(group.title)}}</h3>
                        <ol>
                            <li class="record" v-for="item in group.items" :key="item.id">
                                <span>{{tagString(item.tags)}}</span>
                                <span class="notes">{{item.notes}}</span>
                                <span>￥{{item.amount}}</span>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
        </Layout>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Tabs from '@/components/Tabs.vue';
import {Component} from 'vue-property-decorator';
import intervalList from '@/components/constants/intervalList.ts'
import recordTypeList from '@/components/constants/recordTypeList.ts'
import dayjs from 'dayjs';
@Component({components:{Tabs}})
    export default class Statistics extends Vue {
        beautify(string: string){
            const day = dayjs(string)
            const now = dayjs();
            if(day.isSame(now,'day')){
                return '今天';
            }else if(day.isSame(now.subtract(1,'day'),'day')){
                return '昨天';
            }else if(day.isSame(now.subtract(2,'day'),'day')){
                return '前天';
            }else if(day.isSame(now,'year')){
                return day.format('M月D日')
            }else{
                return day.format('YYYY年MM月DD日')
            }
        }
        tagString(tags: Tag[]){
            return tags.length === 0 ?'无' : tags.join(',')
        }
        get recordList(){
            return (this.$store.state as RootState).recordList;
        }
        get result(){
            const {recordList} = this;
            type HashTableValue = {title: string;items: RecordItem[]}
            const hashTable: {[key: string]: HashTableValue} = {};
            for(let i = 0; i < recordList.length;i++){
                const [date] = recordList[i].createdAt!.split('T');
                hashTable[date] = hashTable[date] || {title: date,items: []}
                hashTable[date].items.push(recordList[i])
            }
            return hashTable
        }
        beforeCreate(){
            this.$store.commit('fetch')
        }
        type = '-';
        interval = 'day';
        intervalList = intervalList;
        recordTypeList = recordTypeList
        
    }
</script>

<style lang="scss" scoped>
::v-deep {
    .types-tabs-item{
        background: #fff;
        &.selected{
            background: #c4c4c4;
            &::after{
                display: none;
            }
        }
    }
    .interval-tabs-item{
        // height: 48px;
    }
}
%item{
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title{
    @extend %item
}
.record{
    background: #fff;
    @extend %item
}
.notes{
    margin-right: auto;
    margin-left: 16px;
    color: #999;
}
</style>