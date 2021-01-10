<template>
    <div>
        <ul class="types">
            <li @click="selectType('-')" :class="value === '-' && 'selected'">支出</li>
            <li @click="selectType('+')" :class="value === '+' && 'selected'">收入</li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop, Watch} from 'vue-property-decorator'
@Component 
    export default class Types extends Vue{
        @Prop() readonly value!: string;
        // @Prop(String) type: string | undefined;
        selectType(type: string){
            if(type !== '-' && type !== '+'){
                throw new Error('type is unknow')
            }
            this.$emit('update:value',type)
        }
    }
</script>

<style lang="scss" scoped>
.types{
    display: flex;
    background: #c4c4c4;
    text-align: center;
    font-size: 24px;
    > li{
        width: 50%;
        justify-content: center;
        align-items: center;
        position: relative;
        line-height: 64px;
        height: 64px;
        &.selected::after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #333333;
        }
    }
}
</style>