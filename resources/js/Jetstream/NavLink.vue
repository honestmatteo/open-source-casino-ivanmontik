<template>
    <Link :href="href" :class="classes">
        <slot />
    </Link>
</template>

<script>
    import { defineComponent } from 'vue'
    import { Link } from '@inertiajs/inertia-vue3';

    export default defineComponent({
        components: {
            Link,
        },
        props: ['href', 'active'],

        computed: {
            classes() {
                return this.active
                    ? 'inline-flex items-center px-2 pt-1 border-b-2 border-red-400 uppercase tracking-wide text-tab font-semibold leading-5 text-gray-900 focus:outline-none focus:border-red-700 transition'
                    : 'inline-flex items-center px-2 pt-1 border-b-2 border-transparent tracking-wide uppercase text-tab font-semibold leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition'
            }
        }
    })
</script>