'use client'

import { useState } from 'react'
import { Send, Paperclip } from 'lucide-react'
import { cn } from '@/lib/utils'

const threads = [
  {
    id: 1,
    from: 'Arjun S.',
    initials: 'AS',
    project: 'Nexus E-Commerce',
    lastMessage: 'The backend milestone is ready for your review. Please check the staging URL.',
    time: '2h ago',
    unread: 2,
    messages: [
      { sender: 'Arjun S.', text: 'Hi! We have completed the backend integration for the checkout flow.', time: '10:15 AM', mine: false },
      { sender: 'Arjun S.', text: 'The staging URL is live at staging.nexus-ecom.webandvisuals.com. Please review and share feedback.', time: '10:17 AM', mine: false },
      { sender: 'You', text: 'Great! Will review by EOD today. Can you share the credentials?', time: '11:30 AM', mine: true },
      { sender: 'Arjun S.', text: 'Credentials sent to your registered email. Let me know if you need anything else.', time: '11:35 AM', mine: false },
      { sender: 'Arjun S.', text: 'The backend milestone is ready for your review. Please check the staging URL.', time: '12:00 PM', mine: false },
    ],
  },
  {
    id: 2,
    from: 'Priya M.',
    initials: 'PM',
    project: 'Brand Identity',
    lastMessage: 'Final logo options are attached. Please pick your preferred direction.',
    time: '5h ago',
    unread: 1,
    messages: [
      { sender: 'Priya M.', text: 'Hello! We have finalized 3 logo directions for your brand refresh.', time: '8:00 AM', mine: false },
      { sender: 'You', text: 'Looking forward to reviewing them!', time: '8:45 AM', mine: true },
      { sender: 'Priya M.', text: 'Final logo options are attached. Please pick your preferred direction.', time: '9:00 AM', mine: false },
    ],
  },
  {
    id: 3,
    from: 'Support',
    initials: 'WV',
    project: 'General',
    lastMessage: 'Your invoice INV-2025-042 is due on July 31st.',
    time: '1d ago',
    unread: 0,
    messages: [
      { sender: 'Support', text: 'Hi there! This is a reminder that your invoice INV-2025-042 for ₹1,20,000 is due on July 31st, 2025.', time: 'Yesterday', mine: false },
      { sender: 'Support', text: 'You can pay directly from the Invoices section in your portal. Let us know if you have any questions.', time: 'Yesterday', mine: false },
    ],
  },
]

export function PortalMessages() {
  const [activeThread, setActiveThread] = useState(threads[0])
  const [input, setInput] = useState('')

  return (
    <div className="max-w-5xl h-[calc(100vh-9rem)]">
      <div className="h-full bg-card border border-border rounded-2xl overflow-hidden flex">
        {/* Thread list */}
        <div className="w-64 shrink-0 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-sm">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setActiveThread(thread)}
                className={cn(
                  'w-full flex items-start gap-3 px-4 py-3 text-left border-b border-border/50 hover:bg-accent/50 transition-colors',
                  activeThread.id === thread.id && 'bg-accent'
                )}
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                  {thread.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-semibold truncate">{thread.from}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{thread.time}</span>
                  </div>
                  <p className="text-[10px] text-primary mb-0.5">{thread.project}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{thread.lastMessage}</p>
                </div>
                {thread.unread > 0 && (
                  <span className="w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {thread.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message view */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              {activeThread.initials}
            </div>
            <div>
              <p className="text-sm font-semibold">{activeThread.from}</p>
              <p className="text-xs text-muted-foreground">{activeThread.project}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activeThread.messages.map((msg, i) => (
              <div key={i} className={cn('flex gap-2.5', msg.mine && 'flex-row-reverse')}>
                {!msg.mine && (
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shrink-0">
                    {msg.sender.slice(0, 2).toUpperCase()}
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
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-3 py-2">
              <button
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing && input.trim()) {
                    setInput('')
                  }
                }}
                className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
              />
              <button
                disabled={!input.trim()}
                onClick={() => setInput('')}
                className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
