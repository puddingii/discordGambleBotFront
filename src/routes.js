/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from 'views/Dashboard.js';
import UserProfile from 'views/UserProfile.js';
import StockList from 'views/StockList.js';
import Typography from 'views/Typography.js';
import Icons from 'views/Icons.js';
import Notifications from 'views/Notifications.js';
import Login from 'views/Login.js';
import Weapon from 'views/Weapon.js';

const dashboardRoutes = [
	// {
	// 	upgrade: true,
	// 	path: '/upgrade',
	// 	name: 'Upgrade to PRO',
	// 	icon: 'nc-icon nc-alien-33',
	// 	component: Upgrade,
	// 	layout: '/admin',
	// 	isLoginRequired: true,
	// },
	{
		path: '/dashboard',
		name: '내 대시보드',
		icon: 'nc-icon nc-chart-pie-35',
		component: Dashboard,
		layout: '/admin',
		isLoginRequired: true,
	},
	{
		path: '/user',
		name: '유저정보',
		icon: 'nc-icon nc-circle-09',
		component: UserProfile,
		layout: '/admin',
		isLoginRequired: true,
	},
	{
		path: '/stock',
		name: '주식정보',
		icon: 'nc-icon nc-notes',
		component: StockList,
		layout: '/admin',
		isLoginRequired: true,
	},
	{
		path: '/weapon',
		name: '무기강화',
		icon: 'nc-icon nc-settings-90',
		component: Weapon,
		layout: '/admin',
		isLoginRequired: true,
	},
	{
		path: '/typography',
		name: 'Typography',
		icon: 'nc-icon nc-paper-2',
		component: Typography,
		layout: '/admin',
		isLoginRequired: true,
	},
	{
		path: '/icons',
		name: 'Icons',
		icon: 'nc-icon nc-atom',
		component: Icons,
		layout: '/admin',
		isLoginRequired: true,
	},
	{
		path: '/notifications',
		name: 'Notifications',
		icon: 'nc-icon nc-bell-55',
		component: Notifications,
		layout: '/admin',
		isLoginRequired: true,
	},
	{
		path: '/login',
		name: 'Login',
		icon: 'nc-icon nc-bell-55',
		component: Login,
		layout: '/admin',
		isLoginRequired: false,
		isLogoutRequired: true,
	},
];

export default dashboardRoutes;
