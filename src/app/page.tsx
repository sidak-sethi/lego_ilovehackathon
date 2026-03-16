'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const featuredEvents = [
  {
    id: 1,
    name: "Special Night Music Concert",
    date: "October 20, 2023",
    time: "8:00 PM",
    price: 15,
    venue: "Fresh Club",
    artists: "Featuring Olivia, Sebastian, and Oliver",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-12-17%20at%204.26.41%20AM-TxwQQvbGyoqUENoEs5hJylIWESR8Cs.jpeg"
  },
  {
    id: 2,
    name: "Coldplay: Music of the Spheres World Tour",
    date: "Coming Soon",
    price: 80,
    venue: "World Tour",
    artists: "Coldplay with Mystery Guest",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-12-17%20at%204.28.14%20AM-WiDDZVHDNwYdm74PCTMRCjpEwfvbl4.jpeg"
  },
  {
    id: 3,
    name: "Black Music Live Concerts",
    date: "February 1-28, 2024",
    time: "8:00 PM - 12:00 AM",
    price: 45,
    venue: "Hotel Club",
    description: "Live Band Performances, Soft Drinks, Dinner Night",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-12-17%20at%204.35.22%20AM-vqvaUZyjaFf390LxP3uI649voU0ZE0.jpeg"
  },
  {
    id: 4,
    name: "Ed Sheeran +-=÷x India Tour 2024",
    date: "March 16, 2024",
    venue: "Mahalaxmi Race Course, Mumbai",
    price: 120,
    artists: "Ed Sheeran with Special Guest Calum Scott",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-12-17%20at%209.45.59%20AM-ZllvdY8j1BpU8ecxQL1gAIGyXnoJ6o.jpeg"
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featuredEvents.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % featuredEvents.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + featuredEvents.length) % featuredEvents.length)
  }

  return (
    <div className="space-y-12 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-8">
      <section className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl font-bold mb-6 animate-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Welcome to Book My Tickets
        </h1>
        <p className="text-2xl mb-8 text-gray-300">
          Experience the magic of live music - book your tickets to unforgettable concerts
        </p>
        <div className="space-x-4">
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0"
          >
            <Link href="/buy-tickets">Buy Tickets</Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300"
          >
            <Link href="/resell-tickets">Resell Tickets</Link>
          </Button>
        </div>
      </section>
      <section className="relative max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Featured Events
        </h2>
        <div className="relative h-[600px] overflow-hidden rounded-xl shadow-2xl">
          {featuredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-700 transform ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
            >
              <img 
                src={event.image} 
                alt={event.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{event.name}</h3>
                <p className="text-xl mb-2">{event.date}</p>
                {event.time && <p className="text-lg mb-2">{event.time}</p>}
                <p className="text-lg mb-2">{event.venue}</p>
                {event.artists && <p className="text-lg mb-2">{event.artists}</p>}
                <p className="text-2xl font-bold text-purple-400">Starting from ${event.price}</p>
                <Button 
                  asChild 
                  className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Link href={`/buy-tickets?event=${event.id}`}>Book Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300"
        >
          <ChevronLeft size={30} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300"
        >
          <ChevronRight size={30} />
        </button>
      </section>
    </div>
  )
}

