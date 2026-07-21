'use client'

import { useState } from 'react'
import { Send, Paperclip } from 'lucide-react'
import { cn } from '@/lib/utils'
import { sendClientMessage } from '@/lib/actions/portal'
import type { getPortalMessagesThread } from '@/lib/queries/portal'

type Thread = Awaited<ReturnType<typeof getPortalMessagesThread>>

export function PortalMessages({ thread, clientName }: { thread: Thread; clientName: string }) {
  const [messages, setMessages] = useState(thread.messages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    const text = input.trim()
    setMessages((prev) => [
      ...prev,
      { id: `temp-${Date.now()}`, text, mine: true, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
    ])
    setInput('')
    sendClientMessage(thread.conversationId, text).catch(() => {})
  }

  return (
    <div className="max-w-5xl h-[calc(100vh-9rem)]">
      <div className="h-full bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
            WV
          </div>
          <div>
            <p className="text-sm font-semibold">Web & Visuals Team</p>
            <p className="text-xs text-muted-foreground">Your project team</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={cn('flex gap-2.5', msg.mine && 'flex-row-reverse')}>
              {!msg.mine && (
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shrink-0">
                  WV
                </div>
              )}
              <div className={cn(
                'max-w-[72%] rounded-2xl px-3.5 py-2.5',
                msg.mine
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-muted text-foreground rounded-tl-sm'
              )}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={cn('text-[10px] mt-1', msg.mine ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground')}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No messages yet — say hello to your project team, {clientName}!
            </p>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-3 py-2">
            <button
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Attach file"
              disabled
              title="File attachments aren't wired up yet"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing && input.trim()) handleSend()
              }}
              className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
            />
            <button
              disabled={!input.trim()}
              onClick={handleSend}
              className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
