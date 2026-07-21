'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Search, MoreHorizontal, Phone, Video, Paperclip } from 'lucide-react'
import { sendMessage } from '@/lib/actions/messages'
import type { ConversationRow } from '@/lib/queries/messages'

const avatarColors = [
  'bg-blue-500/20 text-blue-500', 'bg-violet-500/20 text-violet-500',
  'bg-emerald-500/20 text-emerald-500', 'bg-pink-500/20 text-pink-500',
  'bg-amber-500/20 text-amber-500',
]

export function MessagesContent({ initialConversations }: { initialConversations: ConversationRow[] }) {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? '')
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  const activeContact = conversations.find((c) => c.id === activeId)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeContact?.messages.length])

  const handleSend = () => {
    if (!input.trim() || !activeContact) return
    const text = input.trim()
    const optimisticMsg = {
      id: `temp-${Date.now()}`,
      text,
      sender: 'me' as const,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, optimisticMsg], lastMsg: text } : c))
    )
    setInput('')
    sendMessage(activeId, text).catch(() => {})
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleSend()
  }

  const filteredContacts = conversations.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase())
  )

  if (!activeContact) {
    return (
      <div className="flex h-[calc(100vh-8rem)] max-w-7xl items-center justify-center bg-card border border-border rounded-2xl">
        <p className="text-sm text-muted-foreground">No conversations yet.</p>
      </div>
    )
  }

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
          {filteredContacts.map((contact, i) => (
            <button
              key={contact.id}
              onClick={() => setActiveId(contact.id)}
              className={`w-full flex items-center gap-3 p-4 transition-colors text-left border-b border-border/50 ${
                activeId === contact.id ? 'bg-primary/5' : 'hover:bg-accent'
              }`}
            >
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${avatarColors[i % avatarColors.length]}`}>
                  {contact.avatar}
                </div>
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
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${avatarColors[conversations.findIndex(c => c.id === activeId) % avatarColors.length]}`}>
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
          {activeContact.messages.map((msg) => (
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
          {activeContact.messages.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No messages yet — say hello!</p>
          )}
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
