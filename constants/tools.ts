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