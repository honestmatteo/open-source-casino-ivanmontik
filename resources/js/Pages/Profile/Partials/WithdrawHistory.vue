<template>
    <div>
    <jet-action-section>
            <template #title>
                Withdrawal History
            </template>

            <template #description> 
                Review your withdrawal history.
            </template>

            <template #content>
                <div class="space-y-4">
                    <div v-if="Object.keys(withdraw_history).length === 0" class="flex items-center justify-center">
                        <div class="text-sm text-gray-500">
                                No withdrawals made yet. 
                        </div>
                    </div>
                    <div class="flex items-center justify-between" v-for="withdraw in withdraw_history">
                        <div>
                            {{ withdraw.currency_code }} 
                            <small class="ml-1 text-xs text-gray-400">
                                ±{{ withdraw.usd_value }}$ - <u>{{ withdraw.created_at }}</u>
                            </small>
                        <br>
                        <span class="text-xs text-gray-500">{{ withdraw.status }} to <u>{{ withdraw.withdraw_address }}</u></span>
                        <span class="text-xs text-gray-500" v-if="$page.props.user.super === '1'"><br>User @{{ withdraw.user_id }}<br></span>
                        <jet-button class="text-xss ml-1 mt-2" v-if="$page.props.user.super === '1' && withdraw.transaction_id === '0'" @click="markAccepted(withdraw)">Mark Accepted</jet-button>
                        </div>

                        <div class="flex items-center text-md text-green-500">
                                +{{ withdraw.amount }} {{ withdraw.currency_code }}

                        </div>
                    </div> 
                </div>
            </template>
    </jet-action-section> 

</div>
</template>

<script>
    import { defineComponent } from 'vue'
    import JetActionMessage from '@/Jetstream/ActionMessage.vue'
    import JetActionSection from '@/Jetstream/ActionSection.vue'
    import JetButton from '@/Jetstream/Button.vue'
    import JetConfirmationModal from '@/Jetstream/ConfirmationModal.vue'
    import JetDangerButton from '@/Jetstream/DangerButton.vue'
    import JetDialogModal from '@/Jetstream/DialogModal.vue'
    import JetFormSection from '@/Jetstream/FormSection.vue'
    import JetInput from '@/Jetstream/Input.vue'
    import JetCheckbox from '@/Jetstream/Checkbox.vue'
    import JetInputError from '@/Jetstream/InputError.vue'
    import JetLabel from '@/Jetstream/Label.vue'
    import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue'
    import JetSectionBorder from '@/Jetstream/SectionBorder.vue'

    export default defineComponent({

        props: [
            'withdraw_history'
        ],

        components: {
            JetActionMessage,
            JetActionSection,
            JetButton,
            JetConfirmationModal,
            JetDangerButton,
            JetDialogModal,
            JetFormSection,
            JetInput,
            JetCheckbox,
            JetInputError, 
            JetLabel,
            JetSecondaryButton,
            JetSectionBorder,
        },
        methods: {
            markAccepted(payment) {
                this.$inertia.put(route('admin.markpayment'), {
                    id: payment
                }, {
                    preserveState: false
                })
            },            
        },
    })
</script>
