'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Search, MoreHorizontal, Phone, Video, Paperclip } from 'lucide-react'

const contacts = [
  { id: 1, name: 'Rahul Gupta', company: 'Nexus Ventures', avatar: 'RG', unread: 2, lastMsg: 'Can you share the latest design mockups?', time: '2m', online: true },
  { id: 2, name: 'Sanjay Mehta', company: 'Capital Corp', avatar: 'SM', unread: 1, lastMsg: 'Invoice looks great, approving now.', time: '15m', online: true },
  { id: 3, name: 'Priya Singh', company: 'TechFlow Inc', avatar: 'PS', unread: 0, lastMsg: 'The chatbot is working perfectly!', time: '1h', online: false },
  { id: 4, name: 'Ananya Krishnan', company: 'Bloom Studio', avatar: 'AK', unread: 0, lastMsg: 'Love the brand colors!', time: '3h', online: false },
  { id: 5, name: 'Karan Patel', company: 'AppWave', avatar: 'KP', unread: 0, lastMsg: 'When do we start the redesign?', time: '1d', online: false },
]

type Message = {
  id: number
  text: string
  sender: 'me' | 'them'
  time: string
}

const conversationMap: Record<number, Message[]> = {
  1: [
    { id: 1, text: 'Hi! Hope you\'re doing well. Just checking in on the e-commerce project.', sender: 'them', time: '10:14 AM' },
    { id: 2, text: 'All good! We\'re at 72% completion. The payment gateway integration is done.', sender: 'me', time: '10:16 AM' },
    { id: 3, text: 'Amazing. Can you share the latest design mockups?', sender: 'them', time: '10:18 AM' },
    { id: 4, text: 'Sure, I\'ll send them over by 2 PM today.', sender: 'me', time: '10:20 AM' },
  ],
  2: [
    { id: 1, text: 'Invoice INV-2025-086 received. ₹1,20,000.', sender: 'them', time: '9:00 AM' },
    { id: 2, text: 'Yes, that\'s for the FinanceAI Dashboard milestone 2.', sender: 'me', time: '9:05 AM' },
    { id: 3, text: 'Invoice looks great, approving now.', sender: 'them', time: '9:10 AM' },
  ],
  3: [
    { id: 1, text: 'The chatbot is live! It handled 50 queries today already.', sender: 'them', time: 'Yesterday' },
    { id: 2, text: 'That\'s incredible! Let us know if you need any adjustments.', sender: 'me', time: 'Yesterday' },
    { id: 3, text: 'The chatbot is working perfectly!', sender: 'them', time: 'Yesterday' },
  ],
}

const avatarColors: Record<number, string> = {
  1: 'bg-blue-500/20 text-blue-500',
  2: 'bg-violet-500/20 text-violet-500',
  3: 'bg-emerald-500/20 text-emerald-500',
  4: 'bg-pink-500/20 text-pink-500',
  5: 'bg-amber-500/20 text-amber-500',
}

export function MessagesContent() {
  const [activeId, setActiveId] = useState(1)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Record<number, Message[]>>(conversationMap)
  const [search, setSearch] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  const activeContact = contacts.find((c) => c.id === activeId)!
  const conversation = messages[activeId] ?? []

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation.length])

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), newMsg] }))
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) handleSend()
  }

  const filteredContacts = contacts.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex h-[calc(100vh-8rem)] max-w-7xl bg-card border border-border rounded-2xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 shrink-0 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveId(contact.id)}
              className={`w-full flex items-center gap-3 p-4 transition-colors text-left border-b border-border/50 ${
                activeId === contact.id ? 'bg-primary/5' : 'hover:bg-accent'
              }`}
            >
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${avatarColors[contact.id]}`}>
                  {contact.avatar}
                </div>
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-card rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{contact.name}</p>
                  <p className="text-[10px] text-muted-foreground shrink-0 ml-1">{contact.time}</p>
                </div>
                <p className="text-xs text-muted-foreground truncate">{contact.lastMsg}</p>
              </div>
              {contact.unread > 0 && (
                <span className="w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                  {contact.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${avatarColors[activeId]}`}>
              {activeContact.avatar}
            </div>
            <div>
              <p className="font-semibold text-sm">{activeContact.name}</p>
              <p className="text-xs text-muted-foreground">{activeContact.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <Video className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {conversation.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-sm rounded-2xl px-4 py-2.5 ${
                msg.sender === 'me'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-muted text-foreground rounded-tl-sm'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-primary-foreground/60 text-right' : 'text-muted-foreground'}`}>
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
