<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <!-- HERE -->
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Nouveau Item
                            </h3>
                        </div>
                        <div class="mt-5 md:col-span-2 md:mt-0">
                            <form action="#" method="POST">
                                <div class="overflow-hidden shadow sm:rounded-md">
                                    <div class="bg-white px-4 py-5 sm:p-6">
                                        <div class="grid grid-cols-6 gap-6">
                                            <!-- Input name -->
                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="first-name"
                                                    class="block text-sm font-medium text-gray-700">Nom</label>
                                                <input v-model="name" type="text" name="first-name" id="first-name"
                                                    autocomplete="given-name"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                            </div>

                                            <!-- Input birt -->
                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="last-name"
                                                    class="block text-sm font-medium text-gray-700">Né le</label>
                                                <input v-model="birth" type="text" name="last-name" id="last-name"
                                                    autocomplete="family-name"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                            </div>

                                            <!-- Input prix  -->
                                            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                                <label for="city"
                                                    class="block text-sm font-medium text-gray-700">Prix</label>
                                                <input v-model="prix" type="text" name="city" id="city"
                                                    autocomplete="address-level2"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                            </div>

                                            <!-- Input race  -->
                                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label for="region"
                                                    class="block text-sm font-medium text-gray-700">Race</label>
                                                <input v-model="race" type="text" name="region" id="region"
                                                    autocomplete="address-level1"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                            </div>

                                            <!-- Input sexe -->
                                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label for="postal-code"
                                                    class="block text-sm font-medium text-gray-700">Sexe</label>
                                                <input v-model="sexe" type="text" name="postal-code" id="postal-code"
                                                    autocomplete="postal-code"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                            </div>

                                            <!-- Textarea comment -->
                                            <div class="col-span-6">
                                                <label for="street-address"
                                                    class="block text-sm font-medium text-gray-700">Commentaires</label>
                                                <textarea v-model="comment" id="about" name="about" rows="3"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Your comment ..."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="button" v-on:click="update()"
                            class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Modifier</button>
                        <button type="button" v-on:click="cancel()"
                            class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { storeToRefs } from 'pinia'
import { useDatasStore } from '@/store/datas';

export default ({
    name: 'ModalViewUpdate',
    setup() {
        const datasStore = useDatasStore();
        const { datas, modal, itemSelected, refresh } = storeToRefs(datasStore);

        return {
            datasStore,
            datas,
            modal,
            itemSelected,
            refresh
        };
    },
    data() {
        return {
            comment: this.itemSelected.data["Commentaires"],
            name: this.itemSelected.data["Nom"],
            birth: this.itemSelected.data["Né le"],
            prix: this.itemSelected.data["Prix"],
            race: this.itemSelected.data["Race"],
            sexe: this.itemSelected.data["Sexe"],
        }
    },
    methods: {
        cancel() {
            this.modal.update = false;
        },
        update() {
            if (this.name != "" && this.comment != "" && this.birth != "" && this.prix != "" && this.race != "" && this.sexe != "") {

                this.datas.forEach((item, index) => {
                    if (index == this.itemSelected.index) {
                        this.datas[index] = {
                            "Commentaires": this.comment,
                            "Nom": this.name,
                            "Né le": this.birth,
                            "Prix": this.prix,
                            "Race": this.race,
                            "Sexe": this.sexe
                        };
                    }
                });
                localStorage.setItem("temp_data", JSON.stringify(this.datas));
                this.modal.update = false;
                this.refresh = true;
            }
        }
    }
})
</script>

