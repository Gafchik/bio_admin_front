export default [
    {
        label: 'Главная',
        route_name: 'home',
        icon: 'home',
    },
    {
        label: 'Управление меню',
        icon: 'folder',
        route_name: '',
        body: 'link',
        children: [
            {
                label: 'FAQ',
                route_name: 'faq',
                icon: 'question_mark'
            },
        ]
    },
]