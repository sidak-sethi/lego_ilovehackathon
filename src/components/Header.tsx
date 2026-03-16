'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from './AuthContext'
import { useState } from 'react'
import { LoginModal } from './LoginModal'
import { SignupModal } from './SignupModal'

export default function Header() {
  const { user, logout } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  return (
    <header className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white border-b border-purple-500/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Book My Tickets
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="/" 
                className="hover:text-purple-400 transition duration-200 text-lg"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/buy-tickets" 
                className="hover:text-purple-400 transition duration-200 text-lg"
              >
                Buy Tickets
              </Link>
            </li>
            <li>
              <Link 
                href="/resell-tickets" 
                className="hover:text-purple-400 transition duration-200 text-lg"
              >
                Resell Tickets
              </Link>
            </li>
          </ul>
        </nav>
        <div className="space-x-3">
          {user ? (
            <>
              <span className="text-purple-400">Welcome, {user.username}!</span>
              <Button 
                variant="outline" 
                onClick={logout}
                className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => setShowLoginModal(true)}
                className="border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                Login
              </Button>
              <Button 
                onClick={() => setShowSignupModal(true)}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <SignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} />
    </header>
  )
}

