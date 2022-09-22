<template>
    <span>
        <button style="color: #b91c1c; margin: 0 0.5rem" @click="btnClickedHandler()">
            <font-awesome-icon icon="fa-solid fa-trash" />
        </button>
        <button style="color: #f59e0b; margin: 0 0.5rem" @click="btnUpdate()">
            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </button>
        <button style="color: #4f46e5; margin: 0 0.5rem" @click="btnRead()">
            <font-awesome-icon icon="fa-solid fa-circle-info" />
        </button>
    </span>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useDatasStore } from '@/store/datas';

export default ({
    name: "BtnRender",
    setup() {
        const datasStore = useDatasStore();
        const { refresh, datas, modal, itemSelected } = storeToRefs(datasStore);

        return {
            datasStore,
            datas,
            refresh,
            modal,
            itemSelected
        };
    },
    methods: {
        btnClickedHandler() {
            var newDatas = [];
            this.datas.forEach((e, i) => {
                if (i != this.params.rowIndex) {
                    newDatas.push(e);
                }
            });
            this.datas = newDatas;
            this.refresh = true;
        },
        btnRead() {
            this.modal.read = true;
            this.itemSelected = {
                data: this.params.data,
                index: this.params.rowIndex
            };
        },
        btnUpdate() {
            this.modal.update = true;
            this.itemSelected = this.itemSelected = {
                data: this.params.data,
                index: this.params.rowIndex
            };
        }
    },

})
</script>
