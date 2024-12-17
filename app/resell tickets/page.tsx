'use client'

import { useAuth } from '@/components/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

const userTickets = [
  { id: 'ticket1', eventName: 'Rock Festival 2024', date: 'July 15-17, 2024' },
  { id: 'ticket2', eventName: 'Jazz in the Park', date: 'August 5, 2024' },
  { id: 'ticket3', eventName: 'Electronic Dance Night', date: 'September 20, 2024' },
]

export default function ResellTickets() {
  const { user } = useAuth()
  const [selectedTicket, setSelectedTicket] = useState('')
  const [price, setPrice] = useState('')
  const { toast } = useToast()

  const handleResell = (e: React.FormEvent) => {
    e.preventDefault()
    const ticket = userTickets.find(t => t.id === selectedTicket)
    if (ticket) {
      toast({
        title: "Ticket Listed for Resale",
        description: `Your ticket for ${ticket.eventName} has been listed for $${price}`,
      })
    }
  }

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Resell Tickets</h1>
        <p className="mb-4">You need to be logged in to resell tickets.</p>
        <Button onClick={() => window.location.href = '/'}>Go to Home Page</Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Resell Tickets</h1>
      <form onSubmit={handleResell} className="space-y-6">
        <div>
          <Label htmlFor="ticket">Select Ticket to Resell</Label>
          <Select value={selectedTicket} onValueChange={setSelectedTicket}>
            <SelectTrigger id="ticket">
              <SelectValue placeholder="Select a ticket" />
            </SelectTrigger>
            <SelectContent>
              {userTickets.map(ticket => (
                <SelectItem key={ticket.id} value={ticket.id}>
                  {ticket.eventName} - {ticket.date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price">Resale Price</Label>
          <Input 
            type="number" 
            id="price" 
            min="0" 
            step="0.01" 
            placeholder="Enter resale price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">List Ticket for Resale</Button>
      </form>
    </div>
  )
}

