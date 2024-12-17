'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
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

export default function BuyTickets() {
  const [selectedEvent, setSelectedEvent] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { toast } = useToast()
  const searchParams = useSearchParams()

  useEffect(() => {
    const eventId = searchParams.get('event')
    if (eventId) {
      setSelectedEvent(eventId.toString())
    }
  }, [searchParams])

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault()
    const event = events.find(e => e.id === selectedEvent)
    if (event) {
      toast({
        title: "Purchase Successful",
        description: `You've purchased ${quantity} ticket(s) for ${event.name}.`,
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Buy Tickets
      </h1>
      <form onSubmit={handlePurchase} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="event" className="text-lg">Select Event</Label>
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger id="event" className="border-2 border-purple-200 focus:border-purple-500">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              {events.map(event => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name} - {event.date} (${event.price})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedEvent && (
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Event Details</h3>
            {(() => {
              const event = events.find(e => e.id === selectedEvent)
              return event ? (
                <div className="space-y-1 text-sm text-purple-600">
                  <p>Date: {event.date}</p>
                  {event.time && <p>Time: {event.time}</p>}
                  <p>Venue: {event.venue}</p>
                  {event.artists && <p>Artists: {event.artists}</p>}
                  <p className="font-semibold">Price per ticket: ${event.price}</p>
                  <p>Available tickets: {event.availableTickets}</p>
                </div>
              ) : null
            })()}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-lg">Number of Tickets</Label>
          <Input 
            type="number" 
            id="quantity" 
            min="1" 
            max={events.find(e => e.id === selectedEvent)?.availableTickets || 1}
            value={quantity} 
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border-2 border-purple-200 focus:border-purple-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-lg">Full Name</Label>
          <Input 
            type="text" 
            id="name" 
            placeholder="Enter your full name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required
            className="border-2 border-purple-200 focus:border-purple-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-lg">Email</Label>
          <Input 
            type="email" 
            id="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-2 border-purple-200 focus:border-purple-500"
          />
        </div>

        {selectedEvent && (
          <div className="text-right text-lg font-semibold text-purple-600">
            Total: ${(events.find(e => e.id === selectedEvent)?.price || 0) * quantity}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6"
        >
          Purchase Tickets
        </Button>
      </form>
    </div>
  )
}

