// components/ProfessionalNav.jsx
import React, { useState, useEffect } from 'react';

const ProfessionalNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeLink, setActiveLink] = useState('home');

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
      
			// Update active link based on scroll position
			const sections = ['home', 'services', 'about', 'contact'];
			const currentSection = sections.find(section => {
				const element = document.getElementById(section);
				if (element) {
					const rect = element.getBoundingClientRect();
					return rect.top <= 100 && rect.bottom >= 100;
				}
				return false;
			});
      
			if (currentSection) {
				setActiveLink(currentSection);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleLinkClick = (section) => {
		setActiveLink(section);
		setIsOpen(false);
	};

	const navItems = [
		{ name: 'Home', href: '#home', icon: '🏠' },
		{ name: 'Services', href: '#services', icon: '⚙️' },
		{ name: 'About', href: '#about', icon: '👤' },
		{ name: 'Contact', href: '#contact', icon: '📞' }
	];

	return (
		<>
			{/* Navigation */}
			<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				isScrolled 
					? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 py-3' 
					: 'bg-transparent py-5'
			}`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center">
            
						{/* Logo */}
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
								<span className="text-white font-bold text-lg">N</span>
							</div>
							<div className="flex flex-col">
								<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									Nexus
								</span>
								<span className="text-xs text-gray-500 -mt-1">Professional</span>
							</div>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden lg:flex items-center space-x-1">
							{navItems.map((item) => {
								const isActive = activeLink === item.href.substring(1);
								return (
									<a
										key={item.name}
										href={item.href}
										onClick={() => handleLinkClick(item.href.substring(1))}
										className={`relative flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 group ${
											isActive
												? 'text-blue-600 bg-blue-50 shadow-sm'
												: 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
										}`}
									>
										<span className="text-lg">{item.icon}</span>
										<span>{item.name}</span>
                    
										{/* Active indicator */}
										{isActive && (
											<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full animate-pulse-slow"></div>
										)}
                    
										{/* Hover effect */}
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</a>
								);
							})}
						</div>

						{/* CTA Button */}
						<div className="hidden lg:block">
							<button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-purple-700">
								Get Started
							</button>
						</div>

						{/* Mobile menu button */}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="lg:hidden relative w-12 h-12 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
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
			</nav>

			{/* Mobile Navigation */}
			<div className={`lg:hidden fixed inset-y-0 right-0 z-40 w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 transform transition-transform duration-500 ease-in-out ${
				isOpen ? 'translate-x-0' : 'translate-x-full'
			}`}>
        
				{/* Mobile Header */}
				<div className="p-6 border-b border-gray-200/50">
					<div className="flex items-center space-x-3 mb-2">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
							<span className="text-white font-bold text-xl">N</span>
						</div>
						<div className="flex flex-col">
							<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Nexus
							</span>
							<span className="text-sm text-gray-500 -mt-1">Professional</span>
						</div>
					</div>
					<p className="text-gray-500 text-sm">Navigation Menu</p>
				</div>

				{/* Mobile Menu Items */}
				<div className="p-6 space-y-4">
					{navItems.map((item, index) => {
						const isActive = activeLink === item.href.substring(1);
						return (
							<a
								key={item.name}
								href={item.href}
								onClick={() => handleLinkClick(item.href.substring(1))}
								className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
									isActive
										? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-lg'
										: 'bg-gray-50/50 hover:bg-gray-100/50 border border-transparent'
								}`}
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
									isActive 
										? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
										: 'bg-white text-gray-600 shadow-md'
								}`}>
									{item.icon}
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
							</a>
						);
					})}
				</div>

				{/* Mobile CTA */}
				<div className="absolute bottom-6 left-6 right-6">
					<button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center">
						Start Free Trial
					</button>
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
