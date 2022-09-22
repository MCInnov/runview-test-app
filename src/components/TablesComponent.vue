<template>
    <div>
        <div class="base-demo flex flex-row justify-around my-5">

            <button v-on:click="removeSelected()"
                class="inline-flex justify-center rounded-md border border-transparent bg-red-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Remove Selected
            </button>

            <button v-on:click="openAddModal()"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add
                New Item</button>

        </div>
        <div>
            <ag-grid-vue class="ag-theme-alpine" style="height: 500px" :columnDefs="columnDefs.value"
                :rowData="rowData.value" :defaultColDef="defaultColDef" rowSelection="multiple" animateRows="true"
                @cell-clicked="cellWasClicked" @grid-ready="onGridReady">
            </ag-grid-vue>
        </div>
        <div v-if="modal.add">
            <ModalView />
        </div>
        <div v-if="modal.update">
            <ModalViewUpdate />
        </div>
        <div v-if="modal.read">
            <ModalViewRead />
        </div>
    </div>

</template>

<script>

/* eslint-disable */
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
import { reactive, ref } from "vue";
import { storeToRefs } from 'pinia'
import { useDatasStore } from '@/store/datas';
import BtnRender from '@/components/BtnRender.vue'
import ModalView from '@/views/ModalView.vue';
import ModalViewRead from '@/views/ModalViewRead.vue';
import ModalViewUpdate from '@/views/ModalViewUpdate.vue';

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS



export default {
    name: 'TablesComponent',
    components: {
        AgGridVue,
        ModalView,
        BtnRender,
        ModalViewRead,
        ModalViewUpdate
    },
    data() {
        return {
            rowData: reactive({}),
            columnDefs: reactive({
                value: [
                    { field: "Nom", editable: true, filter: true },
                    { field: "Né le", editable: true, filter: true },
                    { field: "Race", editable: true, filter: true },
                    { field: "Prix", editable: true, filter: true },
                    { field: "Sexe", editable: true, filter: true },
                    { field: "Commentaires", editable: true, filter: true },
                    {
                        field: "Actions",
                        editable: false,
                        filter: false,
                        cellRenderer: BtnRender,
                    }
                ],
            }),
            modalState: false,
            gridApi: ref(null),
            immutableStore: [],
        }
    },
    setup() {
        // DefaultColDef sets props common to all Columns
        const defaultColDef = {
            sortable: true,
            filter: true,
            flex: 1,
            floatingFilter: true,
        };

        const datasStore = useDatasStore();
        const { datas, modal, refresh } = storeToRefs(datasStore);

        return {
            defaultColDef,
            datasStore,
            datas,
            modal,
            refresh,
            cellWasClicked: (event) => { }
        };
    },
    created() {
        this.rowData.value = JSON.parse(localStorage.getItem("temp_data"));
        this.datas = this.rowData.value
    },
    watch: {
        refresh(newResfresh, oldRefresh) {
            if (newResfresh == true) {
                setTimeout(() => {
                    this.gridApi.setRowData(this.datas);
                    this.rowData.value = this.datas;
                    this.refresh = false;
                    localStorage.setItem("temp_data", JSON.stringify(this.datas));
                }, 500);
            }
        }
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
            this.immutableStore = this.rowData.value;
        },
        removeSelected() {
            const selectRows = this.gridApi.getSelectedRows();
            this.gridApi.applyTransaction({ remove: selectRows });
            var tab = [];
            this.gridApi.forEachNode(function (node) {
                tab.push(node.data);
            });

            this.immutableStore = tab;
            this.gridApi.setRowData(tab);
            this.refresh = true;
        },
        openAddModal() {
            this.modal.add = true;
        }
    }
}
</script>