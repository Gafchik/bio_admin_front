import Gallery from '@/components/pages/main-menu/Gallery/Gallery.vue';
import PrivacyPolicy from '@/components/pages/main-menu/PrivacyPolicy/PrivacyPolicy.vue';
import TermsOfUse from '@/components/pages/main-menu/TermsOfUse/TermsOfUse.vue';
import News from '@/components/pages/main-menu/News/News.vue';
import AboutUs from '@/components/pages/main-menu/AboutUs/AboutUs.vue';
import HowItWorks from '@/components/pages/main-menu/HowItWorks/HowItWorks.vue';
import FaqCategory from '@/components/pages/main-menu/FAQ/Category/FaqCategory.vue';
import FaqQuestion from '@/components/pages/main-menu/FAQ/Question/FaqQuestion.vue';
import Store from '@/components/pages/main-menu/Store/Store.vue';
import Contacts from '@/components/pages/main-menu/Contacts/Contacts.vue';
import Transactions from '@/components/pages/main-menu/Transactions/Transactions.vue';
import TreeStore from '@/components/pages/main-menu/TreeStore/TreeStore.vue';
import Question from '@/components/pages/main-menu/Question/Question.vue';
import Withdraws from '@/components/pages/main-menu/Withdraws/Withdraws.vue';
import ServerExplorer from '@/components/pages/main-menu/ServerExplorer/ServerExplorer.vue';
import Roles from '@/components/pages/main-menu/Roles/Roles.vue';
import Trees from '@/components/pages/main-menu/Trees/Trees.vue';
import Users from '@/components/pages/main-menu/Users/Users.vue';
export default [
    {
        path: '/faq-category',
        component: FaqCategory,
        name: 'faq_category',
    },
    {
        path: '/faq-question',
        component: FaqQuestion,
        name: 'faq_question',
    },
    {
        path: '/contacts',
        component: Contacts,
        name: 'contacts',
    },
    {
        path: '/privacy-policy',
        component: PrivacyPolicy,
        name: 'privacy_policy',
    },
    {
        path: '/terms-of-use',
        component: TermsOfUse,
        name: 'terms_of_use',
    },
    {
        path: '/how-it-works',
        component: HowItWorks,
        name: 'how_it_works',
    },
    {
        path: '/news',
        component: News,
        name: 'news',
    },
    {
        path: '/gallery',
        component: Gallery,
        name: 'gallery',
    },
    {
        path: '/about-us',
        component: AboutUs,
        name: 'about_us',
    },
    {
        path: '/store',
        component: Store,
        name: 'store',
    },
    {
        path: '/transactions',
        component: Transactions,
        name: 'transactions',
    },
    {
        path: '/treestore',
        component: TreeStore,
        name: 'treestore',
    },

    {
        path: '/question',
        component: Question,
        name: 'question',
    },
    {
        path: '/withdraws',
        component: Withdraws,
        name: 'withdraws',
    },
    {
        path: '/server-explorer',
        component: ServerExplorer,
        name: 'server_explorer',
    },
    {
        path: '/roles',
        component: Roles,
        name: 'roles',
    },
    {
        path: '/trees',
        component: Trees,
        name: 'trees',
    },
    {
        path: '/users',
        component: Users,
        name: 'users',
    },
];