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
                icon: 'folder',
                route_name: '',
                body: 'link',
                children: [
                    {
                        label: 'FAQ Категории',
                        route_name: 'faq_category',
                        icon: 'question_mark'
                    },
                    {
                        label: 'FAQ Вопросы ответы',
                        route_name: 'faq_question',
                        icon: 'question_mark'
                    },
                ]
            },
        ]
    },
]