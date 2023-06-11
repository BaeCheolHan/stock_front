import {createRouter, createWebHistory } from "vue-router";
import FrontMain from "@/views/FrontMain";

const routes = [
    {path: '/', name: 'FrontMain', component: FrontMain}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router