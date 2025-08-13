import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, BookOpen, Target, Calculator, Users, FileText, BarChart3, CalendarCheck } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'Marks vs Percentile', href: '/marks-vs-percentile', icon: BarChart3 },
    { name: 'IIM Cutoffs', href: '/iim-cutoffs', icon: Target },
    { name: 'Post-CAT Process', href: '/post-cat-process', icon: FileText },
    { name: 'Low PI/WAT IIMs', href: '/low-pi-wat-iims', icon: Target },
    { name: 'Other Colleges', href: '/other-colleges', icon: Users },
    { name: 'Tools', href: '/tools', icon: Calculator },
    { name: 'Study Materials', href: '/study-materials', icon: BookOpen },
    { name: 'CAT 2025 Guide', href: '/cat-2025-guide', icon: CalendarCheck }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-pink-100/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Modern Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-pink-700 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                <span className="text-white font-bold text-xl">CAT</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-left">
              <div className="text-xl font-black text-black tracking-tight">CAT Navigator</div>
              <div className="text-xs font-medium text-gray-700">Your IIM Admission Compass</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-black/5 text-black border-b-2 border-pink-600 font-semibold'
                      : 'text-gray-800 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-pink-100">
            <nav className="grid grid-cols-1 gap-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-pink-100 text-pink-700 border border-pink-200'
                        : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

