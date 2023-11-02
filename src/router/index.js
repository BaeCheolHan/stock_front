import {createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard/Dashboard";
import SocialRedirect from "@/views/social/SocialRedirect.vue";
import PersonalSetting from "@/views/PersonalSetting/PersonalSetting";
import MyStockDashboard from "@/components/myStockManage/MyStockDashboard"

const routes = [
    {path: '/', name: 'Dashboard', component: Dashboard},
    {path: '/settings', name: 'PersonalSetting', component: PersonalSetting},
    {path: '/redirect', name: 'SocialRedirect', component: SocialRedirect},
    {path: '/my', name: 'MyStockDashboard', component: MyStockDashboard},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router