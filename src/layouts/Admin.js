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
import React, { Component } from 'react';
import { useLocation, Route, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import routes from 'routes.js';

import sidebarImage from 'assets/img/sidebar-4.jpg';
import { useGetIsLoginQuery } from 'quires/useUserQuery';
import { loginStatus } from 'recoils/user';

function Admin() {
	useGetIsLoginQuery();
	const isLoggedIn = useRecoilValue(loginStatus);

	const myRoutes = routes.filter(route => route.isLoginRequired === isLoggedIn);
	const [image, setImage] = React.useState(sidebarImage);
	const [color, setColor] = React.useState('black');
	const [hasImage, setHasImage] = React.useState(true);
	const location = useLocation();
	const mainPanel = React.useRef(null);
	const getRoutes = routes => {
		return routes.map((prop, key) => {
			if (prop.layout === '/admin') {
				return (
					<Route
						path={prop.layout + prop.path}
						render={props => <prop.component {...props} />}
						key={key}
					/>
				);
			}
			return null;
		});
	};
	React.useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainPanel.current.scrollTop = 0;
		if (
			window.innerWidth < 993 &&
			document.documentElement.className.indexOf('nav-open') !== -1
		) {
			document.documentElement.classList.toggle('nav-open');
			var element = document.getElementById('bodyClick');
			element.parentNode.removeChild(element);
		}
	}, [location]);
	return (
		<>
			<div className="wrapper">
				<Sidebar color={color} image={hasImage ? image : ''} routes={myRoutes} />
				<div className="main-panel" ref={mainPanel}>
					<AdminNavbar />
					<div className="content">
						<Switch>{getRoutes(myRoutes)}</Switch>
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
}

export default Admin;
