'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { contractABI, contractAddress } from '@/utils/contractABI'

export default function OrganizerPage() {
  const [availableTickets, setAvailableTickets] = useState(0)
  const [ticketPrice, setTicketPrice] = useState(0)
  const [contractBalance, setContractBalance] = useState(0)
  const [newTicketPrice, setNewTicketPrice] = useState('')
  const [isOwner, setIsOwner] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchContractData()
    checkOwnership()
  }, [])

  async function fetchContractData() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
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
          title: "Error",
          description: "Failed to fetch contract data. Please try again.",
          variant: "destructive"
        })
      }
    } else {
      console.log('Please install MetaMask!')
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to interact with the blockchain.",
        variant: "destructive"
      })
    }
  }

  async function withdrawFunds() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)

        const transaction = await contract.withdrawFunds()
        await transaction.wait()

        toast({
          title: "Funds Withdrawn",
          description: `Successfully withdrawn ${contractBalance} ETH from the contract.`,
        })

        fetchContractData() // Refresh the contract data
      } catch (error) {
        console.error('Error withdrawing funds:', error)
        toast({
          title: "Withdrawal Failed",
          description: "There was an error withdrawing funds. Please try again.",
          variant: "destructive"
        })
      }
    } else {
      console.log('Please install MetaMask!')
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to interact with the blockchain.",
        variant: "destructive"
      })
    }
  }

  async function checkOwnership() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)
        const ownerAddress = await contract.owner()
        const currentAddress = await signer.getAddress()
        setIsOwner(ownerAddress.toLowerCase() === currentAddress.toLowerCase())
      } catch (error) {
        console.error('Error checking contract owner:', error)
        setIsOwner(false)
      }
    }
  }

  async function updateTicketPrice() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)

        const newPriceInWei = ethers.utils.parseEther(newTicketPrice)
        const transaction = await contract.setTicketPrice(newPriceInWei)
        await transaction.wait()

        toast({
          title: "Ticket Price Updated",
          description: `Successfully updated ticket price to ${newTicketPrice} ETH.`,
        })

        fetchContractData() // Refresh the contract data
      } catch (error) {
        console.error('Error updating ticket price:', error)
        toast({
          title: "Update Failed",
          description: "There was an error updating the ticket price. Please try again.",
          variant: "destructive"
        })
      }
    } else {
      console.log('Please install MetaMask!')
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to interact with the blockchain.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Organizer Dashboard
      </h1>
      {isOwner ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Contract Status</h2>
            <p>Available Tickets: {availableTickets}</p>
            <p>Current Ticket Price: {ticketPrice} ETH</p>
            <p>Contract Balance: {contractBalance} ETH</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Update Ticket Price</h2>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="New ticket price (ETH)"
                value={newTicketPrice}
                onChange={(e) => setNewTicketPrice(e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-500"
              />
              <Button onClick={updateTicketPrice} className="bg-purple-600 hover:bg-purple-700 text-white">
                Update Price
              </Button>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Withdraw Funds</h2>
            <Button onClick={withdrawFunds} className="bg-green-600 hover:bg-green-700 text-white">
              Withdraw {contractBalance} ETH
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl text-red-600">You are not authorized to access this page.</p>
        </div>
      )}
    </div>
  )
}

