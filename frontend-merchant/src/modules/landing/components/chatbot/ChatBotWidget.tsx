'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { ChatMessage, Message } from '../../types'
import { BOT_RESPONSES, INITIAL_CHAT_MESSAGE } from '../../constants'

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      ...INITIAL_CHAT_MESSAGE,
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate bot response
    setTimeout(() => {
      const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % BOT_RESPONSES.length
      const botResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        text: BOT_RESPONSES[randomIndex],
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 800)
  }

  const widgetVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  } as const

  const chatBoxVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  } as const

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  } as const

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            variants={widgetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Open chat"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatBoxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-0 right-0 w-96 rounded-2xl border border-border bg-card shadow-2xl flex flex-col h-96 backdrop-blur-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-4">
              <div>
                <h3 className="font-semibold text-sm">FinHub Support</h3>
                <p className="text-xs opacity-90">Typically replies instantly</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/50">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-start"
                >
                  <div className="bg-muted text-foreground rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="h-2 w-2 bg-foreground/40 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                        className="h-2 w-2 bg-foreground/40 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="h-2 w-2 bg-foreground/40 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4 bg-background">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-muted text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
