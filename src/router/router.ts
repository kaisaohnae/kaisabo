import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const settings = cookies.get('settings');

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'login',
        },
        component: () => import('../views/Login.vue'),
    },
    { path: '/403', name: '403', meta: { title: '403' }, component: () => import('../views/error/403.vue') },
    { path: '/500', name: '500', meta: { title: '403' }, component: () => import('../views/error/500.vue') },
    { path: '/:pathMatch(.*)*', name: '404', meta: { title: '404' }, component: () => import('../views/error/404.vue') },
    {
        path: '/',
        name: '',
        component: Home,
        children: [
            {
                path: '/main',
                name: 'main',
                meta: {
                    title: 'main',
                    auth: true,
                },
                component: () => import('../views/main/Main.vue'),
            },
            // 프로그램으로 만들지 않는...
            { path: '/bs/calendar', name: 'calendar', meta: { title: 'calendar', auth: true, }, component: () => import( '../views/bs/Calendar.vue'), },
            { path: '/bs/dictionary', name: 'dictionary', meta: { title: 'dictionary', auth: true, }, component: () => import( '../views/bs/Dictionary.vue'), },
            // 프로그램으로 자동생성
            { path: '/bs/code', name: 'code', meta: { title: 'code', auth: true, }, component: () => import( '../views/bs/Code.vue'), },
            { path: '/bs/apihistory', name: 'apihistory', meta: { title: 'apihistory', auth: true, }, component: () => import( '../views/bs/ApiHistory.vue'), },
            { path: '/bs/batchhistory', name: 'batchhistory', meta: { title: 'batchhistory', auth: true, }, component: () => import( '../views/bs/BatchHistory.vue'), },
            { path: '/bs/code', name: 'code', meta: { title: 'code', auth: true, }, component: () => import( '../views/bs/Code.vue'), },
            { path: '/bs/file', name: 'file', meta: { title: 'file', auth: true, }, component: () => import( '../views/bs/File.vue'), },
            { path: '/bs/filedetail', name: 'filedetail', meta: { title: 'filedetail', auth: true, }, component: () => import( '../views/bs/FileDetail.vue'), },
            { path: '/bs/linkhistory', name: 'linkhistory', meta: { title: 'linkhistory', auth: true, }, component: () => import( '../views/bs/LinkHistory.vue'), },
            { path: '/bs/menu', name: 'menu', meta: { title: 'menu', auth: true, }, component: () => import( '../views/bs/Menu.vue'), },
            { path: '/bs/menurole', name: 'menurole', meta: { title: 'menurole', auth: true, }, component: () => import( '../views/bs/MenuRole.vue'), },
            { path: '/bs/messagehistory', name: 'messagehistory', meta: { title: 'messagehistory', auth: true, }, component: () => import( '../views/bs/MessageHistory.vue'), },
            { path: '/cs/faq', name: 'faq', meta: { title: 'faq', auth: true, }, component: () => import( '../views/cs/Faq.vue'), },
            { path: '/cs/notice', name: 'notice', meta: { title: 'notice', auth: true, }, component: () => import( '../views/cs/Notice.vue'), },
            { path: '/cs/popup', name: 'popup', meta: { title: 'popup', auth: true, }, component: () => import( '../views/cs/Popup.vue'), },
            { path: '/cs/qna', name: 'qna', meta: { title: 'qna', auth: true, }, component: () => import( '../views/cs/Qna.vue'), },
            { path: '/cs/qnacomment', name: 'qnacomment', meta: { title: 'qnacomment', auth: true, }, component: () => import( '../views/cs/QnaComment.vue'), },
            { path: '/dp/board', name: 'board', meta: { title: 'board', auth: true, }, component: () => import( '../views/dp/Board.vue'), },
            { path: '/dp/boardcategory', name: 'boardcategory', meta: { title: 'boardcategory', auth: true, }, component: () => import( '../views/dp/BoardCategory.vue'), },
            { path: '/dp/boardcomment', name: 'boardcomment', meta: { title: 'boardcomment', auth: true, }, component: () => import( '../views/dp/BoardComment.vue'), },
            { path: '/dp/display', name: 'display', meta: { title: 'display', auth: true, }, component: () => import( '../views/dp/Display.vue'), },
            { path: '/dp/displayproduct', name: 'displayproduct', meta: { title: 'displayproduct', auth: true, }, component: () => import( '../views/dp/DisplayProduct.vue'), },
            { path: '/dp/event', name: 'event', meta: { title: 'event', auth: true, }, component: () => import( '../views/dp/Event.vue'), },
            { path: '/dp/eventproduct', name: 'eventproduct', meta: { title: 'eventproduct', auth: true, }, component: () => import( '../views/dp/EventProduct.vue'), },
            { path: '/mb/couponhistory', name: 'couponhistory', meta: { title: 'couponhistory', auth: true, }, component: () => import( '../views/mb/CouponHistory.vue'), },
            { path: '/mb/point', name: 'point', meta: { title: 'point', auth: true, }, component: () => import( '../views/mb/Point.vue'), },
            { path: '/mb/pointhistory', name: 'pointhistory', meta: { title: 'pointhistory', auth: true, }, component: () => import( '../views/mb/PointHistory.vue'), },
            { path: '/mb/company', name: 'company', meta: { title: 'company', auth: true, }, component: () => import( '../views/mb/Company.vue'), },
            { path: '/mb/coupon', name: 'coupon', meta: { title: 'coupon', auth: true, }, component: () => import( '../views/mb/Coupon.vue'), },
            { path: '/mb/holiday', name: 'holiday', meta: { title: 'holiday', auth: true, }, component: () => import( '../views/mb/Holiday.vue'), },
            { path: '/mb/member', name: 'member', meta: { title: 'member', auth: true, }, component: () => import( '../views/mb/Member.vue'), },
            { path: '/mb/peakseason', name: 'peakseason', meta: { title: 'peakseason', auth: true, }, component: () => import( '../views/mb/Peakseason.vue'), },
            { path: '/mb/point', name: 'point', meta: { title: 'point', auth: true, }, component: () => import( '../views/mb/Point.vue'), },
            { path: '/mb/user', name: 'user', meta: { title: 'user', auth: true, }, component: () => import( '../views/mb/User.vue'), },
            { path: '/mb/usergroup', name: 'usergroup', meta: { title: 'usergroup', auth: true, }, component: () => import( '../views/mb/UserGroup.vue'), },
            { path: '/or/order', name: 'order', meta: { title: 'order', auth: true, }, component: () => import( '../views/or/Order.vue'), },
            { path: '/or/payment', name: 'payment', meta: { title: 'payment', auth: true, }, component: () => import( '../views/or/Payment.vue'), },
            { path: '/or/paymentcancel', name: 'paymentcancel', meta: { title: 'paymentcancel', auth: true, }, component: () => import( '../views/or/PaymentCancel.vue'), },
            { path: '/pr/product', name: 'product', meta: { title: 'product', auth: true, }, component: () => import( '../views/pr/Product.vue'), },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `kaisa ${to.meta.title}`;

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const codeList = JSON.parse(localStorage.getItem('codeList') || '{}');
    const menuList = JSON.parse(localStorage.getItem('menuList') || '[]');

    const isUser = (
           userInfo.cmpId
        && codeList
        && settings
        && menuList.length > 0
        && userInfo.token
    );
    
    let isRole = (to.path == '/' || to.path == '/main') ? true : false;
    if(!isRole) {
        for(let o of menuList) {
            if(to.path === o.url) {
                isRole = true;
                break;
            }
        }
    }

    if (!isUser && to.path !== '/login') {
        next('/login');
    } else if (to.meta.auth && (!isUser || !isRole) && userInfo &&  userInfo.id != 'kaisa') {
        next('/403');
    } else if (to.path === '/') {
        next('/main');
    } else {
        next();
    }
});

export default router;
