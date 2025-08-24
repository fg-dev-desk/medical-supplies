"use client"

import {
  ShoppingCart,
  ChevronDown,
  Search,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Stethoscope,
  Building2,
  Shield,
  Syringe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useCart } from "@/features/cart/context/cart-context"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const { items, toggleCart } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [showCategories, setShowCategories] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const categories = [
    { name: "Instrumentos", value: "instruments", icon: Stethoscope },
    { name: "Equipos", value: "equipment", icon: Building2 },
    { name: "Seguridad", value: "safety", icon: Shield },
    { name: "Consumibles", value: "consumables", icon: Syringe },
  ]

  const languages = [
    { name: "Español", code: "es", flag: "🇪🇸" },
    { name: "English", code: "en", flag: "🇺🇸" },
    { name: "Français", code: "fr", flag: "🇫🇷" },
  ]

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="hidden sm:flex items-center space-x-4">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span className="hidden md:inline">info@medsupply.com</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="hidden lg:inline">Ciudad, País</span>
              </span>
            </div>
            
            {/* Mobile: Show only language selector */}
            <div className="sm:hidden">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-emerald-600 px-2 py-1 h-auto"
                  onClick={() => setShowLanguages(!showLanguages)}
                >
                  <Globe className="w-4 h-4 mr-1" />
                  ES
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
                
                {showLanguages && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg border border-gray-200 rounded-md w-32 z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 first:rounded-t-md last:rounded-b-md"
                        onClick={() => setShowLanguages(false)}
                      >
                        <span className="mr-2">{language.flag}</span>
                        <span className="text-xs">{language.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop language selector */}
              <div className="hidden sm:block relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-emerald-600 px-2 py-1 h-auto"
                  onClick={() => setShowLanguages(!showLanguages)}
                >
                  <Globe className="w-4 h-4 mr-1" />
                  Español
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
                
                {showLanguages && (
                  <div className="absolute top-full right-0 mt-1 bg-white shadow-lg border border-gray-200 rounded-md w-40 z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 first:rounded-t-md last:rounded-b-md"
                        onClick={() => setShowLanguages(false)}
                      >
                        <span className="mr-2">{language.flag}</span>
                        {language.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2 sm:space-x-3">
                <Facebook className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors" />
                <Instagram className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors" />
                <Linkedin className="hidden sm:block w-6 h-6 text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors" />
                <Youtube className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <a href="/" className="text-lg sm:text-2xl font-bold text-gray-800">
              MedSupply
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input placeholder="Buscar productos médicos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSearch()} className="pr-10 border-gray-300" />
              <Search 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-emerald-500" 
                onClick={handleSearch}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600"
              onClick={() => {/* Toggle mobile search */}}
            >
              <Search className="w-5 h-5" />
            </Button>

            <div className="hidden lg:flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span className="text-gray-600">+123-456-789</span>
            </div>

            <Button variant="outline" size="sm" onClick={toggleCart} className="relative bg-transparent text-xs sm:text-sm px-2 sm:px-3">
              <ShoppingCart className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">TU CARRITO</span>
              <span className="sm:hidden">CART</span>
              <span className="ml-1 text-emerald-500 font-semibold">
                ${items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </span>
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs">{itemCount}</Badge>
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <div className="relative w-full">
            <Input 
              placeholder="Buscar productos médicos..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              onKeyPress={(e) => e.key === "Enter" && handleSearch()} 
              className="pr-10 border-gray-300 text-sm" 
            />
            <Search 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-emerald-500" 
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="bg-emerald-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center overflow-x-auto">
            {/* Categories Dropdown */}
            <div className="relative flex-shrink-0">
              <Button
                variant="ghost"
                className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-none px-3 sm:px-6 py-3 text-sm sm:text-base"
                onClick={() => setShowCategories(!showCategories)}
              >
                <span className="hidden sm:inline">☰ CATEGORÍAS</span>
                <span className="sm:hidden">☰ CAT</span>
                <ChevronDown className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
              </Button>

              {showCategories && (
                <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-200 w-56 sm:w-64 z-50">
                  {categories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <a
                        key={category.value}
                        href={`/catalog?category=${category.value}`}
                        className="flex items-center px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 border-b border-gray-100"
                        onClick={() => setShowCategories(false)}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-emerald-500" />
                        <span className="text-gray-700 text-sm sm:text-base">{category.name}</span>
                      </a>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Main Navigation */}
            <nav className="flex items-center space-x-4 sm:space-x-8 ml-4 sm:ml-8 overflow-x-auto">
              <a href="/" className="text-white hover:text-emerald-100 py-3 text-sm sm:text-base whitespace-nowrap">
                Inicio
              </a>
              <a href="/about" className="text-white hover:text-emerald-100 py-3 text-sm sm:text-base whitespace-nowrap">
                Nosotros
              </a>
              <a href="/catalog" className="text-white hover:text-emerald-100 py-3 text-sm sm:text-base whitespace-nowrap">
                Productos
              </a>
              <a href="/contact" className="text-white hover:text-emerald-100 py-3 text-sm sm:text-base whitespace-nowrap">
                Contacto
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
