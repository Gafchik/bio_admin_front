
const TRANC_PREFIX = 'main_menu'
export default [
    {
        label: `${TRANC_PREFIX}.home`,
        route_name: 'home',
        icon: 'home',
    },
    {
        label: `${TRANC_PREFIX}.menu_management`,
        icon: 'folder',
        route_name: '',
        body: 'link',
        children: [
            {
                label: `${TRANC_PREFIX}.transactions`,
                route_name: 'transactions',
                icon: 'sync_alt'
            },
            {
                label: `${TRANC_PREFIX}.roles`,
                route_name: 'roles',
                icon: 'person'
            },
            {
                label: `${TRANC_PREFIX}.trees`,
                route_name: 'trees',
                icon: 'park'
            },
            {
                label: `${TRANC_PREFIX}.question`,
                route_name: 'question',
                icon: 'question_mark'
            },
            {
                label: `${TRANC_PREFIX}.withdraws`,
                route_name: 'withdraws',
                icon: 'payments'
            },
            {
                label: `${TRANC_PREFIX}.server_explorer`,
                route_name: 'server_explorer',
                icon: 'folder'
            },
            {
                label: `${TRANC_PREFIX}.faq_folder`,
                icon: 'folder',
                route_name: '',
                body: 'link',
                children: [
                    {
                        label: `${TRANC_PREFIX}.faq_category`,
                        route_name: 'faq_category',
                        icon: 'question_mark'
                    },
                    {
                        label: `${TRANC_PREFIX}.faq_question`,
                        route_name: 'faq_question',
                        icon: 'question_mark'
                    },
                ]
            },
            {
                label: `${TRANC_PREFIX}.contacts`,
                route_name: 'contacts',
                icon: 'import_contacts'
            },
            {
                label: `${TRANC_PREFIX}.privacy_policy`,
                route_name: 'privacy_policy',
                icon: 'policy'
            },
            {
                label: `${TRANC_PREFIX}.terms_of_use`,
                route_name: 'terms_of_use',
                icon: 'density_small'
            },
            {
                label: `${TRANC_PREFIX}.how_it_works`,
                route_name: 'how_it_works',
                icon: 'help'
            },
            {
                label: `${TRANC_PREFIX}.news`,
                route_name: 'news',
                icon: 'library_books'
            },
            {
                label: `${TRANC_PREFIX}.gallery`,
                route_name: 'gallery',
                icon: 'photo_library'
            },
            {
                label: `${TRANC_PREFIX}.about_us`,
                route_name: 'about_us',
                icon: 'person'
            },
        ]
    },
]