import Gallery from '@/components/pages/main-menu/Gallery/Gallery.vue';
import PrivacyPolicy from '@/components/pages/main-menu/PrivacyPolicy/PrivacyPolicy.vue';
import TermsOfUse from '@/components/pages/main-menu/TermsOfUse/TermsOfUse.vue';
import News from '@/components/pages/main-menu/News/News.vue';
import AboutUs from '@/components/pages/main-menu/AboutUs/AboutUs.vue';
import HowItWorks from '@/components/pages/main-menu/HowItWorks/HowItWorks.vue';
import FAQ from '@/components/pages/main-menu/FAQ/FAQ.vue';
import Store from '@/components/pages/main-menu/Store/Store.vue';
export default [
    {
        path: '/gallery',
        component: Gallery,
        name: 'gallery',
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
        path: '/news',
        component: News,
        name: 'news',
    },
    {
        path: '/about-us',
        component: AboutUs,
        name: 'about_us',
    },
    {
        path: '/how-it-works',
        component: HowItWorks,
        name: 'how_it_works',
    },
    {
        path: '/faq',
        component: FAQ,
        name: 'faq',
    },
    {
        path: '/store',
        component: Store,
        name: 'store',
    },
];