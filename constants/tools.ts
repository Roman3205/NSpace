import type {NavigationMenuItem} from '@nuxt/ui'
export const sidebarMenu: NavigationMenuItem[][] = [[
    {label: "Conversation", icon: "lucide:message-square", to: "/dashboard/conversation"},
    {label: "Code Generation", icon: "lucide:code", to: "/dashboard/code"},
    {label: "AI Article Writer", icon: "lucide:square-pen", to: "/dashboard/write-article"},
    {label: "Blog Title Generator", icon:"lucide:hash", to: "/dashboard/generate-blog-title",},
    {label: "Background Removal", icon: "lucide:eraser", to: "/dashboard/remove-background"},
    {label: "Object Removal", icon: "lucide:scissors", to: "/dashboard/remove-object"},
    {label: "Resume Reviewer", icon: "lucide:file-check", to: "/dashboard/review-resume"}
]]

export const aiTools = [
    {
        title: 'Conversation',
        description: '',
        path: '/dashboard/conversation',
        icon: 'lucide:message-square',
        btnText: 'Start Conversation'
    },
    {
        title: 'Code Generation',
        description: '',
        path: '/dashboard/code',
        icon: 'lucide:code',
        btnText: 'Generate Code'
    },
    {
        title: 'AI Article Writer',
        description: '',
        path: '/dashboard/write-article',
        icon: 'lucide:square-pen',
        btnText: 'Generate Article'
    },
    {
        title: 'Blog Title Generator',
        description: '',
        path: '/dashboard/generate-blog-title',
        icon: 'lucide:hash',
        btnText: 'Generate Blog Title'
    },
    {
        title: 'Background Removal',
        description: '',
        path: '/dashboard/remove-background',
        icon: 'lucide:eraser',
        btnText: 'Remove Background'
    },
    {
        title: 'Object Removal',
        description: '',
        path: '/dashboard/remove-object',
        icon: 'lucide:scissors',
        btnText: 'Remove Object'
    },
    {
        title: 'Resume Reviewer',
        description: '',
        path: '/dashboard/review-resume',
        icon: 'lucide:file-check',
        btnText: 'Review Resume'
    }
]