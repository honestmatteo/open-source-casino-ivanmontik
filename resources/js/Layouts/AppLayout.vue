    <template>
    <div>
        <Head :title="title" />

        <jet-banner />

        <div class="min-h-screen bg-gray-100">
            <nav class="bg-white border-b border-gray-100">
                <!-- Primary Navigation Menu -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center">
                                <Link :href="route('casino')">
                                    <jet-application-mark class="block h-9 w-auto" />
                                </Link>
                            </div>

                            <!-- Navigation Links -->
                            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <jet-nav-link :href="route('casino')" :active="route().current('casino')">
                                    Casino
                                </jet-nav-link>
                                <jet-nav-link :href="route('poker')" :active="route().current('poker')">
                                    Poker
                                </jet-nav-link>

                            </div>
                        </div>

                        <div class="flex items-center ml-6">

                            <!-- Currencies Dropdown -->
                            <div class="ml-3 relative" v-if="$page.props.loggedUser">
                                <jet-dropdown align="right" width="48">
                                    <template #trigger>
                                        <span class="inline-flex">
                                            <button type="button" class="text-xs inline-flex items-center h-8 px-4 text-red-700 bg-red-100 sm:text-sm transition-colors duration-[200ms] ease border border-red-200 rounded-full hover:bg-red-500 hover:text-red-100 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition">
                                                {{ $page.props.currentBalance }} {{ $page.props.user.currentCurrency }}

                                                <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                    <!-- Display on dropdown all currencies -->
                                    <template v-for="balance in $page.props.balances" :key="componentKey">
                                        <form v-if="balance.hidden !== '1'" @submit.prevent="switchToCurrency(balance.currency_code)">
                                            <div class="border-t border-gray-100"></div>
                                            <jet-dropdown-link as="button">
                                                <div class="flex items-center">
                                                    <div v-if="$page.props.user.currentCurrency === balance.currency_code" class="block opacity-100 px-4 py-2 text-xs">
                                                        <span class="text-semibold">{{ balance.currency_code }}</span>
                                                    </div>
                                                    <div v-else class="block px-4 py-2 text-xs text-gray-400 opacity-80 hover:opacity-100">
                                                        {{ balance.currency_code }}
                                                    </div>
                                                    <div class="text-sm right opacity-80 hover:opacity-100">{{ balance.balance }} <br><span class="text-xxs">worth {{ balance.usd_value }}$</span></div>   
                                            </div>
                                            </jet-dropdown-link>

                                        </form>
                                    </template>

                                        <div class="border-t border-gray-100"></div> 
                                        <!-- Open Wallet Modal -->
                                        <form @submit.prevent="openWallet('open')">
                                            <jet-dropdown-link as="button">
                                                <div class="block px-4 py-2 text-xs text-gray-500">
                                                    Wallet: Deposit & Withdraw
                                                </div>
                                            </jet-dropdown-link>
                                        </form>

                                    </template>
                                </jet-dropdown>
                            </div>
                        </div>

                        <div class="hidden sm:flex sm:items-center sm:ml-6">

                            <!-- Admin Dropdown -->
                            <div v-if="$page.props.loggedUser">
                                <div class="ml-3 relative" v-if="$page.props.user.super === '1'">
                                    <jet-dropdown align="right" width="48">
                                        <template #trigger>
                                            <span class="inline-flex rounded-md">
                                                <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition">
                                                   Admin

                                                    <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                    </svg>
                                                </button>
                                            </span>
                                        </template>

                                        <template #content>
                                            <!-- Account Management -->
                                            <div class="block px-4 py-2 text-xs text-gray-400">
                                                Admin Actions
                                            </div>

                                            <jet-dropdown-link :href="route('admin.payments.show')">
                                                Payment Ledger
                                            </jet-dropdown-link>

                                            <jet-dropdown-link :href="route('currencies.show')">
                                                Currency
                                            </jet-dropdown-link>

                                            <jet-dropdown-link :href="route('admin.games.show')">
                                                Games
                                            </jet-dropdown-link>

                                            <div class="border-t border-gray-100"></div>

                                        </template>
                                    </jet-dropdown>
                                </div>
                            </div>
                            <!-- Settings Dropdown -->
                            <div v-if="$page.props.loggedUser" class="ml-3 relative">
                                <jet-dropdown align="right" width="48">
                                    <template #trigger>
                                        <button v-if="$page.props.jetstream.managesProfilePhotos" class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                                            <img class="h-8 w-8 rounded-full object-cover" :src="$page.props.user.profile_photo_url" :alt="$page.props.user.name" />
                                        </button>

                                        <span v-else class="inline-flex rounded-md">
                                            <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition">
                                                {{ $page.props.user.name }}

                                                <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <!-- Account Management -->
                                        <div class="block px-4 py-2 text-xs text-gray-400">
                                            Manage Account
                                        </div>

                                        <jet-dropdown-link :href="route('profile.show')">
                                            Profile
                                        </jet-dropdown-link>

                                        <jet-dropdown-link :href="route('payment.history.show')">
                                            Payment History
                                        </jet-dropdown-link>

                                        <jet-dropdown-link :href="route('api-tokens.index')" v-if="$page.props.jetstream.hasApiFeatures">
                                            API Tokens
                                        </jet-dropdown-link>

                                        <div class="border-t border-gray-100"></div>

                                        <!-- Authentication -->
                                        <form @submit.prevent="logout">
                                            <jet-dropdown-link as="button">
                                                <div class="block px-4 py-2 text-xs text-gray-500">
                                                    Log Out
                                                </div>
                                            </jet-dropdown-link>
                                        </form>

                                    </template>
                                </jet-dropdown>
                            </div>
                            <div v-if="!$page.props.loggedUser" class="ml-3 relative">
                                <div align="right" width="48">
                                        <jet-button class="ml-3" @click="loginRoute()">
                                            Login
                                        </jet-button>
                                </div>
                            </div>

                        </div>

                        <!-- Hamburger -->
                        <div class="-mr-2 flex items-center sm:hidden">
                            <button @click="showingNavigationDropdown = ! showingNavigationDropdown" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition">
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path :class="{'hidden': showingNavigationDropdown, 'inline-flex': ! showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path :class="{'hidden': ! showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div :class="{'block': showingNavigationDropdown, 'hidden': ! showingNavigationDropdown}" class="sm:hidden">
                    <div class="pt-2 pb-3 space-y-1">
                        <jet-responsive-nav-link :href="route('casino')" :active="route().current('casino')">
                            Casino
                        </jet-responsive-nav-link>
                        <jet-responsive-nav-link v-if="!$page.props.loggedUser" @click="loginRoute()">
                            Login
                        </jet-responsive-nav-link>

                    </div>

                    <!-- Responsive Settings Options -->
                    <div v-if="$page.props.loggedUser" class="pt-4 pb-1 border-t border-gray-200">
                        <div class="flex items-center px-4">
                            <div v-if="$page.props.jetstream.managesProfilePhotos" class="shrink-0 mr-3" >
                                <img class="h-10 w-10 rounded-full object-cover" :src="$page.props.user.profile_photo_url" :alt="$page.props.user.name" />
                            </div>

                            <div>
                                <div class="font-medium text-base text-gray-800">{{ $page.props.user.name }}</div>
                                <div class="font-medium text-sm text-gray-500">{{ $page.props.user.email }}</div>
                            </div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <jet-responsive-nav-link :href="route('profile.show')" :active="route().current('profile.show')">
                                Profile
                            </jet-responsive-nav-link>

                            <jet-responsive-nav-link :href="route('api-tokens.index')" :active="route().current('api-tokens.index')" v-if="$page.props.jetstream.hasApiFeatures">
                                API Tokens
                            </jet-responsive-nav-link>

                            <!-- Authentication -->
                            <form method="POST" @submit.prevent="logout">
                                <jet-responsive-nav-link as="button">
                                    Log Out
                                </jet-responsive-nav-link>
                            </form>

                            <!-- Team Management -->
                            <template v-if="$page.props.jetstream.hasTeamFeatures">
                                <div class="border-t border-gray-200"></div>

                                <div class="block px-4 py-2 text-xs text-gray-400">
                                    Manage Team
                                </div>

                                <!-- Team Settings -->
                                <jet-responsive-nav-link :href="route('teams.show', $page.props.user.current_team)" :active="route().current('teams.show')">
                                    Team Settings
                                </jet-responsive-nav-link>

                                <jet-responsive-nav-link :href="route('teams.create')" :active="route().current('teams.create')" v-if="$page.props.jetstream.canCreateTeams">
                                    Create New Team
                                </jet-responsive-nav-link>

                                <div class="border-t border-gray-200"></div>

                                <!-- Team Switcher -->
                                <div class="block px-4 py-2 text-xs text-gray-400">
                                    Switch Teams
                                </div>

                                <template v-for="team in $page.props.user.all_teams" :key="team.id">
                                    <form @submit.prevent="switchToTeam(team)">
                                        <jet-responsive-nav-link as="button">
                                            <div class="flex items-center">
                                                <svg v-if="team.id == $page.props.user.current_team_id" class="mr-2 h-5 w-5 text-green-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <div>{{ team.name }}</div>
                                            </div>
                                        </jet-responsive-nav-link>
                                    </form>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Wallet Modal -->
            <jet-confirmation-modal v-if="$page.props.loggedUser" :show="walletModal" @close="walletModal = null">
                <template #title>
                    Wallet
                </template>

                <template #content>
                    <template v-for="balance in $page.props.balances" :key="componentKey">
                        <form v-if="balance.hidden !== '1'" @submit.prevent="switchToCurrency(balance.currency_code)">
                            <div class="border-t border-gray-100"></div>
                            <jet-dropdown-link as="button">
                                <div class="flex items-center w-full">
                                    <div v-if="$page.props.user.currentCurrency === balance.currency_code" class="block px-4 py-2 text-xs">
                                        <span class="text-semibold">{{ balance.currency_code }}</span>
                                    </div>
                                    <div v-else class="block px-3 py-2 text-xs text-gray-400 opacity-80">
                                        {{ balance.currency_code }}
                                    </div>
                                    <div v-if="$page.props.user.currentCurrency === balance.currency_code" class="text-sm px-1 right opacity-100 hover:opacity-100">
                                        <span v-if="$page.props.currentDepositWallet === null"><jet-button class="ml-3">Generate {{ balance.currency_code }} Address</jet-button></span>
                                        <span v-else>
                                                {{ $page.props.currentDepositWallet }}
                                        <input type="hidden" id="copy-clipboard-wallet" :value="$page.props.currentDepositWallet">

                                    </span>
                                </div>
                                    <div v-else class="text-sm right opacity-70 hover:opacity-100">view deposit address</div>   
                            </div>
                            <div v-if="$page.props.user.currentCurrency === balance.currency_code" class="block px-4 py-2 text-xs">
                                <small>Min. deposit: {{ balance.minimum_deposit }}{{ balance.currency_code }} ({{ balance.minimum_deposit_usd}}$)</small>
                            </div>

                            </jet-dropdown-link>

                        </form>
                        <div class="mt-1 mb-3" v-if="$page.props.user.currentCurrency === balance.currency_code">
                       <jet-secondary-button class="ml-2" @click="withdrawRequestRoute()">Withdraw</jet-secondary-button>
                       <jet-secondary-button class="ml-2" v-if="!copied" @click="copyClipboard('#copy-clipboard-wallet')">Copy</jet-secondary-button>
                        <jet-secondary-button class="ml-2" v-if="copied">Copied</jet-secondary-button> 
                    </div>
                    </template>
                </template>

                <template #footer>
                    <jet-secondary-button @click="walletModal = null">
                        Close
                    </jet-secondary-button>
                    <jet-secondary-button class="ml-2" @click="paymentHistoryRoute()">
                        Payment History
                    </jet-secondary-button>
                    <jet-button class="ml-2">
                        Support
                    </jet-button>
                </template>
            </jet-confirmation-modal>

            <!-- Page Heading -->
            <header class="bg-white shadow" v-if="$slots.header">
                <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <slot name="header"></slot>
                </div>
            </header>

            <!-- Game Heading -->
            <header class="bg-white shadow" v-if="$slots.gameheader">
                <div class="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
                    <slot name="gameheader"></slot>
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    import JetApplicationMark from '@/Jetstream/ApplicationMark.vue'
    import JetBanner from '@/Jetstream/Banner.vue'
    import JetDropdown from '@/Jetstream/Dropdown.vue'
    import JetDropdownLink from '@/Jetstream/DropdownLink.vue'
    import JetNavLink from '@/Jetstream/NavLink.vue'
    import JetResponsiveNavLink from '@/Jetstream/ResponsiveNavLink.vue'
    import { Head, Link } from '@inertiajs/inertia-vue3';
    import JetConfirmationModal from '@/Jetstream/ConfirmationModal.vue'
    import Modal from '@/Jetstream/Modal.vue'
    import JetButton from '@/Jetstream/Button.vue'
    import JetDangerButton from '@/Jetstream/DangerButton.vue'
    import JetDialogModal from '@/Jetstream/DialogModal.vue'
    import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue'
    import { ref } from 'vue'

    export default defineComponent({
        props: {
            title: String,
        },

        components: {
            Head,
            JetApplicationMark,
            JetBanner,
            JetDropdown,
            JetDropdownLink,
            JetButton,
            JetDangerButton,
            JetDialogModal,
            JetSecondaryButton,
            JetConfirmationModal,
            JetNavLink,
            Modal,
            JetResponsiveNavLink,
            Link,
        },
       created() {
            this.reloadCurBalance();
            //this.timer = setInterval(this.reloadCurBalance, 10000);
       },
        data() {
            return {
                showingNavigationDropdown: false,
                componentKey: 0,
                currentBal: null,
                copied: null,
                startWithdrawModal: null,
                walletModal: null,
                timer: 0
            }
        },
        methods: {
            copyClipboard(queryselector) {
              let inputToCopy = document.querySelector(queryselector)
              inputToCopy.setAttribute('type', 'text')
              inputToCopy.select()

              try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                this.copied = 'Copied wallet address.';
              } catch (err) {
                this.copied = null;
              }
              inputToCopy.setAttribute('type', 'hidden')
              window.getSelection().removeAllRanges()
            },
            openWallet(status) {
                this.walletModal = status
                this.$inertia.reload({ only: ['currentBalance', 'currentDepositWallet'] })
            },
            reloadCurBalance() {
                this.$inertia.reload({ only: ['currentBalance', 'currentDepositWallet'] });
            },
            switchToTeam(team) {
                this.$inertia.put(route('current-team.update'), {
                    'team_id': team.id
                }, {
                    preserveState: false
                })
            },
            generateWallet(currency) {
                this.$inertia.post(route('currencies.generateWallet'), {
                    'currency': currency
                }, {
                    preserveState: false
                })
            },
            switchToCurrency(currency) {
                this.copied = null;
                this.$inertia.put(route('user.data.selectedCurrency'), {
                    'selectedCurrency': currency
                })
            },
            logout() {
                this.$inertia.post(route('logout'));
            },
            paymentHistoryRoute() {
                this.wallet = null;
                this.$inertia.get(route('payment.history.show'));
            },
            withdrawRequestRoute() {
                this.wallet = null;
                this.$inertia.get(route('withdrawRequest.show'));
            },
            loginRoute() {
                this.$inertia.get(route('login'));
            },

        }
    })
</script>
