'use client'

import { useState, useEffect, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useSearchParams } from 'next/navigation'

const events = [
  {
    id: 'event1',
    name: 'Special Night Music Concert',
    date: 'October 20, 2023',
    time: '8:00 PM',
    price: 15,
    venue: 'Fresh Club',
    artists: 'Olivia, Sebastian, and Oliver',
    availableTickets: 100
  },
  {
    id: 'event2',
    name: 'Coldplay: Music of the Spheres World Tour',
    date: 'Coming Soon',
    price: 80,
    venue: 'World Tour',
    artists: 'Coldplay with Mystery Guest',
    availableTickets: 500
  },
  {
    id: 'event3',
    name: 'Black Music Live Concerts',
    date: 'February 1-28, 2024',
    time: '8:00 PM - 12:00 AM',
    price: 45,
    venue: 'Hotel Club',
    description: 'Live Band Performances',
    availableTickets: 200
  },
  {
    id: 'event4',
    name: 'Ed Sheeran +-=÷x India Tour 2024',
    date: 'March 16, 2024',
    venue: 'Mahalaxmi Race Course, Mumbai',
    price: 120,
    artists: 'Ed Sheeran with Special Guest Calum Scott',
    availableTickets: 1000
  }
]

function BuyTicketsContent() {
  const [selectedEvent, setSelectedEvent] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const searchParams = useSearchParams()

  useEffect(() => {
    const eventId = searchParams.get('event')
    if (eventId) {
      setSelectedEvent(eventId.toString())
    }
  }, [searchParams])

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const event = events.find(e => e.id === selectedEvent)
    if (event) {
      toast({
        title: "Purchase Successful",
        description: `You've purchased ${quantity} ticket(s) for ${event.name}. Transaction hash: 0x${Math.random().toString(16).slice(2, 10)}...`,
      })
    }
    setIsProcessing(false)
  }

  const selectedEventData = events.find(e => e.id === selectedEvent)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Secure Your Spot
            </span>
          </h1>
          <p className="text-xl text-gray-400">Get your tickets for the most anticipated events of the season.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Purchase Form */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Order Details</h2>
            <form onSubmit={handlePurchase} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="event" className="text-gray-300">Select Event</Label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger id="event" className="bg-gray-800/50 border-gray-700 text-white h-12 focus:ring-purple-500">
                    <SelectValue placeholder="Choose an event" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {events.map(event => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-gray-300">Quantity</Label>
                <Input
                  type="number"
                  id="quantity"
                  min="1"
                  max={selectedEventData?.availableTickets || 1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="bg-gray-800/50 border-gray-700 text-white h-12 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-gray-800/50 border-gray-700 text-white h-12 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800/50 border-gray-700 text-white h-12 focus:ring-purple-500"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={!selectedEvent || isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {isProcessing ? 'Processing Transaction...' : `Buy for $${(selectedEventData?.price || 0) * quantity}`}
                </Button>
              </div>
            </form>
          </div>

          {/* Event Summary */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl h-full">
              <h2 className="text-2xl font-bold text-white mb-6">Selection Summary</h2>
              {selectedEventData ? (
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Event</p>
                    <p className="text-xl font-semibold text-white">{selectedEventData.name}</p>
                  </div>
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Venue</p>
                    <p className="text-lg text-gray-200">{selectedEventData.venue}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider">Date</p>
                      <p className="text-gray-200">{selectedEventData.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider">Time</p>
                      <p className="text-gray-200">{selectedEventData.time || 'TBA'}</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                      <span className="text-gray-300">Total Amount</span>
                      <span className="text-3xl font-bold text-purple-400">${selectedEventData.price * quantity}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 italic mt-4">
                    * Tickets are secured via smart contract and will be delivered to your email as NFT collectibles.
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4 py-20">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center">
                    ?
                  </div>
                  <p>Select an event to view summary</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BuyTickets() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading order system...</div>}>
      <BuyTicketsContent />
    </Suspense>
  )
}

