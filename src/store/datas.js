import { defineStore } from "pinia"
import { ref } from "vue";

export const useDatasStore = defineStore('datas', {
    state: () => (
        {
            modal: {
                read: false,
                add: false,
                update: false
            },
            datas: ref([]),
            itemSelected: {},
            refresh: false
        }
    )
});