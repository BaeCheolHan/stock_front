import {createRouter, createWebHistory } from "vue-router";
import FrontMain from "@/views/FrontMain";
import SocialRedirect from "@/views/social/SocialRedirect.vue";

const routes = [
    {path: '/', name: 'FrontMain', component: FrontMain},
    {path: '/oauth2/redirect', name: 'SocialRedirect', component: SocialRedirect},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router