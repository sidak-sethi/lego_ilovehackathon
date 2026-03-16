'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { contractABI, contractAddress } from '@/utils/contractABI'

export default function OrganizerPage() {
  const [availableTickets, setAvailableTickets] = useState(0)
  const [ticketPrice, setTicketPrice] = useState(0)
  const [contractBalance, setContractBalance] = useState(0)
  const [newTicketPrice, setNewTicketPrice] = useState('')
  const [isOwner, setIsOwner] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchContractData()
    checkOwnership()
  }, [])

  async function fetchContractData() {
    setIsRefreshing(true)
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)

        const tickets = await contract.getAvailableTickets()
        setAvailableTickets(tickets.toNumber())

        const price = await contract.ticketPrice()
        setTicketPrice(parseFloat(ethers.utils.formatEther(price)))

        const balance = await provider.getBalance(contractAddress)
        setContractBalance(parseFloat(ethers.utils.formatEther(balance)))
      } catch (error) {
        console.error('Error fetching contract data:', error)
        toast({
          title: "Connection Error",
          description: "Could not sync with the smart contract. Check your network.",
          variant: "destructive"
        })
      }
    } else {
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to view live contract data.",
        variant: "destructive"
      })
    }
    setIsRefreshing(false)
  }

  async function withdrawFunds() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)

        const transaction = await contract.withdrawFunds()
        await transaction.wait()

        toast({
          title: "Withdrawal Successful",
          description: `${contractBalance} ETH has been transferred to your wallet.`,
        })

        fetchContractData()
      } catch (error) {
        toast({
          title: "Withdrawal Failed",
          description: "The transaction could not be completed.",
          variant: "destructive"
        })
      }
    }
  }

  async function checkOwnership() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)
        const ownerAddress = await contract.owner()
        const currentAddress = await signer.getAddress()
        setIsOwner(ownerAddress.toLowerCase() === currentAddress.toLowerCase())
      } catch (error) {
        setIsOwner(false)
      }
    }
  }

  async function updateTicketPrice() {
    if (typeof window.ethereum !== 'undefined' && newTicketPrice) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)

        const newPriceInWei = ethers.utils.parseEther(newTicketPrice)
        const transaction = await contract.setTicketPrice(newPriceInWei)
        await transaction.wait()

        toast({
          title: "Price Updated",
          description: `Ticket price is now set to ${newTicketPrice} ETH.`,
        })

        setNewTicketPrice('')
        fetchContractData()
      } catch (error) {
        toast({
          title: "Update Failed",
          description: "Ensure you are the contract owner and try again.",
          variant: "destructive"
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-white">Organizer <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Control Panel</span></h1>
            <p className="text-gray-400 mt-2">Manage ticket supply, pricing, and treasury.</p>
          </div>
          <Button 
            onClick={fetchContractData} 
            variant="outline" 
            disabled={isRefreshing}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            {isRefreshing ? 'Syncing...' : 'Refresh Data'}
          </Button>
        </div>

        {isOwner ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Available Supply</p>
              <p className="text-3xl font-bold text-white">{availableTickets}</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Ticket Price</p>
              <p className="text-3xl font-bold text-orange-400">{ticketPrice} ETH</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Treasury Balance</p>
              <p className="text-3xl font-bold text-green-400">{contractBalance} ETH</p>
            </div>
          </div>
        ) : null}

        {isOwner ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-4xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Pricing Strategy</h2>
              <div className="space-y-4">
                <Label htmlFor="price" className="text-gray-400">Set New Base Price (ETH)</Label>
                <div className="flex space-x-3">
                  <Input
                    type="number"
                    id="price"
                    step="0.001"
                    placeholder="0.05"
                    value={newTicketPrice}
                    onChange={(e) => setNewTicketPrice(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white h-12"
                  />
                  <Button onClick={updateTicketPrice} className="bg-orange-600 hover:bg-orange-700 h-12 px-6 rounded-xl transition-all">
                    Update
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-4xl shadow-2xl flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Fund Management</h2>
                <p className="text-gray-400 text-sm mb-6">Withdraw collected revenue to the owner wallet.</p>
              </div>
              <Button 
                onClick={withdrawFunds} 
                disabled={contractBalance === 0}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-8 rounded-2xl transition-all disabled:opacity-50"
              >
                Withdraw ${contractBalance} ETH
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-red-900/20 backdrop-blur-xl border border-red-500/20 p-12 rounded-4xl text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-2">Access Restricted</h2>
            <p className="text-gray-400">This dashboard is only available to the contract administrator.</p>
          </div>
        )}
      </div>
    </div>
  )
}

