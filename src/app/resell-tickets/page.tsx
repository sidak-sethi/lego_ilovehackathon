'use client'

import { useAuth } from '@/components/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
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
  const [isListing, setIsListing] = useState(false)
  const { toast } = useToast()

  const handleResell = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsListing(true)
    
    // Simulate blockchain listing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const ticket = userTickets.find(t => t.id === selectedTicket)
    if (ticket) {
      toast({
        title: "Ticket Listed for Resale",
        description: `Your ticket for ${ticket.eventName} has been listed for $${price}. Verification pending on-chain.`,
      })
    }
    setIsListing(false)
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 p-12 rounded-3xl shadow-2xl max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-white">Access Denied</h1>
          <p className="mb-8 text-gray-400">Please sign in to your account to manage and resell your tickets.</p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-2xl transition-all"
          >
            Sign In Now
          </Button>
        </div>
      </div>
    )
  }

  const selectedTicketData = userTickets.find(t => t.id === selectedTicket)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              Resell Your Tickets
            </span>
          </h1>
          <p className="text-xl text-gray-400">Turn your unused tickets into value with our secure on-chain marketplace.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Listing Form */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Listing Details</h2>
            <form onSubmit={handleResell} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ticket" className="text-gray-300">Select Ticket</Label>
                <Select value={selectedTicket} onValueChange={setSelectedTicket}>
                  <SelectTrigger id="ticket" className="bg-gray-800/50 border-gray-700 text-white h-12 focus:ring-cyan-500">
                    <SelectValue placeholder="Choose a ticket" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {userTickets.map(ticket => (
                      <SelectItem key={ticket.id} value={ticket.id}>
                        {ticket.eventName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-300">Desired Price ($)</Label>
                <Input
                  type="number"
                  id="price"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="bg-gray-800/50 border-gray-700 text-white h-12 focus:ring-cyan-500"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={!selectedTicket || isListing}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {isListing ? 'Listing on Marketplace...' : 'Confirm Resale Listing'}
                </Button>
              </div>
            </form>
          </div>

          {/* Ticket Preview */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl h-full">
              <h2 className="text-2xl font-bold text-white mb-6">Ticket Preview</h2>
              {selectedTicketData ? (
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/20">
                         <span className="text-cyan-400 text-xs font-bold">NFT</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Authenticated Ticket</p>
                    <p className="text-2xl font-bold text-white mb-2">{selectedTicketData.eventName}</p>
                    <p className="text-gray-300 mb-4">{selectedTicketData.date}</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Listing As</p>
                        <p className="text-2xl font-bold text-cyan-400">${price || '0.00'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Ticket ID</p>
                        <p className="text-gray-400 font-mono text-xs">{selectedTicketData.id}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 text-sm text-gray-400">
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <p>Ownership verified on-chain</p>
                    </div>
                    <div className="flex items-start space-x-3 text-sm text-gray-400">
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <p>Smart contract protected resale</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 italic border-t border-white/5 pt-4 mt-8">
                    * A 2% marketplace fee will be deducted upon successful sale. Your funds will be automatically transferred to your connected wallet.
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4 py-20">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center">
                    ?
                  </div>
                  <p>Select a ticket to preview listing</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

