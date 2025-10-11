// components/ProfessionalNav.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, User, Phone, Car, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getTranslation } from '../translations';
import LanguageSelector from './LanguageSelector';

const ProfessionalNav = ({ onGetStartedClick }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { currentLanguage } = useLanguage();
	const { user, isAuthenticated, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeLink, setActiveLink] = useState('home');
	const [showUserDropdown, setShowUserDropdown] = useState(false);

	// Debug logging
	console.log('ProfessionalNav - Auth State:', { user, isAuthenticated });

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 100);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Handle click outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (showUserDropdown && !event.target.closest('.user-dropdown')) {
				setShowUserDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [showUserDropdown]);

	const handleLinkClick = (section) => {
		setActiveLink(section);
		setIsOpen(false);
	};

	const handleLogout = () => {
		logout();
		setShowUserDropdown(false);
		navigate('/');
	};

	const getDashboardPath = () => {
		if (!user) return '/dashboard';
		switch (user.role) {
			case 'admin':
				return '/admin-dashboard';
			case 'trainer':
				return '/trainer-dashboard';
			default:
				return '/dashboard';
		}
	};

	const navItems = [
		{ name: getTranslation(currentLanguage, 'nav.home'), href: '/', icon: Home },
		{ name: getTranslation(currentLanguage, 'nav.courses'), href: '/courses', icon: BookOpen },
		{ name: getTranslation(currentLanguage, 'nav.about'), href: '/about', icon: User },
		{ name: getTranslation(currentLanguage, 'nav.contact'), href: '/contact', icon: Phone }
	];

	return (
		<>
		{/* Navigation */}
			<nav className={`fixed z-50 transition-all duration-500 ${
				isScrolled 
					? 'top-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 py-2 px-4 rounded-[40px] max-w-5xl' 
					: 'top-0 left-0 right-0 bg-transparent py-5 px-0'
			}`}>
				<div className={`${
					isScrolled ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
				}`}>
					<div className="flex justify-between items-center">
            
						{/* Logo */}
						<div className="flex items-center space-x-3">
						<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
							<Car className="text-white w-5 h-5" />
						</div>
							<div className={`flex flex-col ${isScrolled ? 'hidden sm:block' : ''}`}>
								<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									Wenyine
								</span>
								<span className="text-xs text-gray-500 -mt-1">Driving School</span>
							</div>
						</div>

						{/* Desktop Navigation */}
						<div className={`hidden lg:flex items-center ${isScrolled ? 'space-x-1' : 'space-x-2'} overflow-hidden`}>
						{navItems.map((item) => {
								const isActive = location.pathname === item.href || (item.href === '/courses' && location.pathname === '/services');
								return (
									<Link
										key={item.name}
										to={item.href}
									className={`relative flex items-center space-x-2 ${isScrolled ? 'px-2 py-2 text-xs' : 'px-4 py-3 text-sm'} rounded-2xl font-medium transition-all duration-300 group whitespace-nowrap ${
									isActive
										? 'text-blue-600 bg-blue-50 shadow-sm'
										: 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
								}`}
								>
									<item.icon className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'} flex-shrink-0`} />
									<span className={`${isScrolled ? 'hidden lg:block text-xs' : 'block'} truncate max-w-[100px]`}>{item.name}</span>
                    
										{/* Active indicator */}
										{isActive && (
											<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full animate-pulse-slow"></div>
										)}
                    
										{/* Hover effect */}
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</Link>
								);
							})}
						</div>

						{/* Language Selector & Auth Controls */}
						<div className="hidden lg:flex items-center space-x-3">
							<LanguageSelector />
							
							{!isAuthenticated ? (
								<button 
									onClick={onGetStartedClick}
									className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white ${isScrolled ? 'px-4 py-2 text-sm' : 'px-8 py-3'} rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-purple-700`}
								>
									{getTranslation(currentLanguage, 'nav.getStarted')}
								</button>
							) : (
								<>
									{/* Dashboard Button */}
									<Link
										to={getDashboardPath()}
										className={`flex items-center space-x-2 ${isScrolled ? 'px-3 py-2 text-sm' : 'px-4 py-2'} bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-2xl font-medium transition-all duration-300 hover:shadow-md`}
									>
										<LayoutDashboard className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
										<span className={isScrolled ? 'hidden xl:block' : 'block'}>Dashboard</span>
									</Link>
									
									{/* User Profile Dropdown */}
									<div className="relative user-dropdown">
										<button
											onClick={() => setShowUserDropdown(!showUserDropdown)}
											className={`flex items-center space-x-2 ${isScrolled ? 'px-2 py-1' : 'px-3 py-2'} hover:bg-gray-100 rounded-2xl transition-all duration-300`}
										>
											<img
												src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=3b82f6&color=fff`}
												alt={user?.name}
												className={`${isScrolled ? 'w-8 h-8' : 'w-10 h-10'} rounded-full object-cover border-2 border-white shadow-md`}
											/>
											{!isScrolled && (
												<>
													<span className="font-medium text-gray-700 hidden xl:block">{user?.name}</span>
													<ChevronDown className="w-4 h-4 text-gray-500" />
												</>
											)}
										</button>
										
										{/* Dropdown Menu */}
										{showUserDropdown && (
											<div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 py-2 z-50">
												{/* User Info */}
												<div className="px-4 py-3 border-b border-gray-200/50">
													<div className="flex items-center space-x-3">
														<img
															src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=3b82f6&color=fff`}
															alt={user?.name}
															className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
														/>
														<div>
															<div className="font-semibold text-gray-900">{user?.name}</div>
															<div className="text-sm text-gray-500">{user?.email}</div>
															<div className="text-xs text-blue-600 font-medium capitalize">{user?.role}</div>
														</div>
													</div>
												</div>
												
												{/* Menu Items */}
												<div className="py-2">
													<Link
														to={getDashboardPath()}
														className="flex items-center space-x-3 px-4 py-2 hover:bg-blue-50 transition-colors"
														onClick={() => setShowUserDropdown(false)}
													>
														<LayoutDashboard className="w-5 h-5 text-gray-500" />
														<span className="text-gray-700">Dashboard</span>
													</Link>
													
													<Link
														to="/chat"
														className="flex items-center space-x-3 px-4 py-2 hover:bg-blue-50 transition-colors"
														onClick={() => setShowUserDropdown(false)}
													>
														<Phone className="w-5 h-5 text-gray-500" />
														<span className="text-gray-700">Live Chat</span>
													</Link>
													
													<hr className="my-2 border-gray-200" />
													
													<button
														onClick={handleLogout}
														className="flex items-center space-x-3 px-4 py-2 hover:bg-red-50 transition-colors w-full text-left"
													>
														<LogOut className="w-5 h-5 text-red-500" />
														<span className="text-red-600">Sign Out</span>
													</button>
												</div>
											</div>
										)}
									</div>
								</>
							)}
						</div>

						{/* Mobile Language & Menu */}
						<div className="lg:hidden flex items-center space-x-2">
							<LanguageSelector />
							<button
								onClick={() => setIsOpen(!isOpen)}
								className="relative w-12 h-12 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
							>
							<span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
								isOpen ? 'rotate-45 top-6' : 'top-4'
							}`}></span>
							<span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
								isOpen ? 'opacity-0' : 'opacity-100'
							}`}></span>
								<span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
									isOpen ? '-rotate-45 top-6' : 'top-7'
								}`}></span>
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Navigation */}
			<div className={`lg:hidden fixed inset-y-0 right-0 z-40 w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 transform transition-transform duration-500 ease-in-out ${
				isOpen ? 'translate-x-0' : 'translate-x-full'
			}`}>
        
				{/* Mobile Header */}
				<div className="p-6 border-b border-gray-200/50">
					<div className="flex items-center space-x-3 mb-2">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
							<Car className="text-white w-6 h-6" />
						</div>
						<div className="flex flex-col">
							<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Wenyine
							</span>
							<span className="text-sm text-gray-500 -mt-1">Driving School</span>
						</div>
					</div>
					<p className="text-gray-500 text-sm">Navigation Menu</p>
				</div>

				{/* Mobile Menu Items */}
				<div className="p-6 space-y-4">
					{navItems.map((item, index) => {
						const isActive = location.pathname === item.href || (item.href === '/courses' && location.pathname === '/services');
						return (
							<Link
								key={item.name}
								to={item.href}
								className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
									isActive
										? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-lg'
										: 'bg-gray-50/50 hover:bg-gray-100/50 border border-transparent'
								}`}
								style={{ animationDelay: `${index * 100}ms` }}
							>
							<div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
									isActive 
										? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
										: 'bg-white text-gray-600 shadow-md'
								}`}>
									<item.icon className="w-5 h-5" />
								</div>
								<div className="flex-1">
									<div className={`font-semibold ${
										isActive ? 'text-blue-600' : 'text-gray-700'
									}`}>
										{item.name}
									</div>
									<div className="text-sm text-gray-500">
										{item.name === 'Home' && 'Welcome page'}
										{item.name === 'Services' && 'Our offerings'}
										{item.name === 'About' && 'Our story'}
										{item.name === 'Contact' && 'Get in touch'}
									</div>
									</div>
								<div className={`w-2 h-2 rounded-full ${
									isActive ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
								}`}></div>
							</Link>
						);
					})}
				</div>

				{/* Mobile Auth Section */}
				<div className="absolute bottom-6 left-6 right-6">
					{!isAuthenticated ? (
						<button 
							onClick={onGetStartedClick}
							className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
						>
							{getTranslation(currentLanguage, 'nav.getStarted')}
						</button>
					) : (
						<div className="space-y-3">
							{/* User Info */}
							<div className="bg-blue-50 rounded-2xl p-4">
								<div className="flex items-center space-x-3">
									<img
										src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=3b82f6&color=fff`}
										alt={user?.name}
										className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
									/>
									<div className="flex-1">
										<div className="font-semibold text-gray-900">{user?.name}</div>
										<div className="text-sm text-blue-600 capitalize">{user?.role}</div>
									</div>
								</div>
							</div>
							
							{/* Action Buttons */}
							<div className="grid grid-cols-2 gap-3">
								<Link
									to={getDashboardPath()}
									className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
									onClick={() => setIsOpen(false)}
								>
									<LayoutDashboard className="w-5 h-5" />
									<span>Dashboard</span>
								</Link>
								
								<button
									onClick={handleLogout}
									className="flex items-center justify-center space-x-2 bg-red-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
								>
									<LogOut className="w-5 h-5" />
									<span>Sign Out</span>
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Mobile Overlay */}
			{isOpen && (
				<div 
					className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
					onClick={() => setIsOpen(false)}
				/>
			)}
		</>
	);
};

export default ProfessionalNav;
