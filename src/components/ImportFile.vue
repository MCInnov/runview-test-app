<template>
    <div>
        <label class="block text-sm font-medium text-gray-700">CSV File</label>
        <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                    aria-hidden="true">
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                    <label for="file-upload"
                        class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" accept=".csv" type="file" class="sr-only"
                            @change="handleFileUpload( $event )">
                    </label>
                    <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">CSV up to 10MB</p>
            </div>
        </div>
    </div>
</template>

<script>
import Papa from 'papaparse';
import { storeToRefs } from 'pinia';
import { useDatasStore } from '@/store/datas';

export default {
    name: 'ImportFile',
    setup() {
        const datasStore = useDatasStore();
        const { datas, refresh } = storeToRefs(datasStore);

        return {
            datasStore,
            datas,
            refresh
        };
    },
    data() {
        return {
            file: '',
            content: [],
            parsed: false,
        }
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
            this.parseFile();
        },
        parseFile() {
            Papa.parse(this.file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    this.content = results;
                    this.parsed = true;
                    this.datas = results.data;
                    this.refresh = true;
                    // Save csv data in LocalStorage
                    localStorage.setItem("temp_data", JSON.stringify(results.data));
                }.bind(this)
            });
        },
    }
}
</script>