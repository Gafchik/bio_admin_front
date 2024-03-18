
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
            }
        ]
    },
]