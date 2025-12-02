import React, { useState, useRef, useEffect, useCallback } from 'react'
import './Assistant.css'

/**
 * AssistantAILike React Component
 *
 * A lightweight, customizable AI-like chat assistant widget for React applications.
 *
 * @param {Object} props
 * @param {string} props.title - Header title
 * @param {string} props.subtitle - Header subtitle
 * @param {string} props.welcomeMessage - Initial bot message
 * @param {Object} props.knowledge - Knowledge base object
 * @param {Object} props.keywords - Keyword mappings for fuzzy matching
 * @param {Array} props.quickReplies - Array of quick reply buttons
 * @param {number} props.typingDelay - Delay before showing response (ms)
 * @param {string} props.notFoundMessage - Message when no answer found
 * @param {string} props.inputPlaceholder - Input placeholder text
 * @param {Function} props.onOpen - Callback when chat opens
 * @param {Function} props.onClose - Callback when chat closes
 * @param {Function} props.onMessageSent - Callback when user sends message
 * @param {Function} props.onMessageReceived - Callback when bot responds
 * @param {Function} props.customAnswerFn - Custom async function to get answers (for API integration)
 */
function Assistant({
  title = 'Virtual Assistant',
  subtitle = 'Ask me anything',
  welcomeMessage = 'Hello! How can I help you today?',
  knowledge = {},
  keywords = {},
  quickReplies = [],
  typingDelay = 500,
  notFoundMessage = "I'm not sure about that. Please try a different question.",
  inputPlaceholder = 'Type your question...',
  onOpen,
  onClose,
  onMessageSent,
  onMessageReceived,
  customAnswerFn
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Initialize with welcome message
  useEffect(() => {
    if (welcomeMessage && messages.length === 0) {
      setMessages([{ content: welcomeMessage, isUser: false, id: Date.now() }])
    }
  }, [welcomeMessage])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  // Normalize text for matching
  const normalizeText = useCallback((text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
  }, [])

  // Find answer in knowledge base
  const findAnswer = useCallback((question) => {
    const normalizedQuestion = normalizeText(question)

    // Exact match search
    for (const [key, value] of Object.entries(knowledge)) {
      const normalizedKey = normalizeText(key)
      if (normalizedQuestion.includes(normalizedKey)) {
        if (typeof value === 'object' && value.title && value.content) {
          return `<strong>${value.title}</strong><br>${value.content}`
        }
        return value
      }
    }

    // Keyword mapping search
    for (const [keyword, knowledgeKey] of Object.entries(keywords)) {
      if (normalizedQuestion.includes(keyword)) {
        const value = knowledge[knowledgeKey]
        if (value) {
          if (typeof value === 'object' && value.title && value.content) {
            return `<strong>${value.title}</strong><br>${value.content}`
          }
          return value
        }
      }
    }

    return null
  }, [knowledge, keywords, normalizeText])

  // Handle opening/closing
  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false)
      onClose?.()
    } else {
      setIsOpen(true)
      onOpen?.()
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  // Handle sending message
  const handleSend = async () => {
    const question = inputValue.trim()
    if (!question) return

    // Add user message
    const userMessage = { content: question, isUser: true, id: Date.now() }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    onMessageSent?.(question)

    // Show typing indicator
    setIsTyping(true)

    let answer

    if (customAnswerFn) {
      // Use custom answer function (for API integration)
      try {
        answer = await customAnswerFn(question)
      } catch (error) {
        console.error('Error in custom answer function:', error)
        answer = notFoundMessage
      }
    } else {
      // Use local knowledge base with delay
      await new Promise(resolve => setTimeout(resolve, typingDelay))
      answer = findAnswer(question)
    }

    // Hide typing and add response
    setIsTyping(false)

    const botMessage = {
      content: answer || notFoundMessage,
      isUser: false,
      id: Date.now()
    }
    setMessages(prev => [...prev, botMessage])

    if (answer) {
      onMessageReceived?.(answer)
    }
  }

  // Handle quick reply click
  const handleQuickReply = (question) => {
    setInputValue(question)
    // Use setTimeout to ensure state is updated before sending
    setTimeout(() => {
      const input = inputRef.current
      if (input) {
        input.value = question
        setInputValue(question)
        handleSend()
      }
    }, 0)
  }

  // Handle keyboard events
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  return (
    <>
      {/* Floating Button */}
      <button
        className={`assistant-button ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        aria-label="Open chat assistant"
      >
        <svg className="assistant-icon-chat" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
        <svg className="assistant-icon-close" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>

      {/* Chat Container */}
      <div
        className={`assistant-container ${isOpen ? 'active' : ''}`}
        role="dialog"
        aria-labelledby="assistant-title"
        aria-modal="true"
      >
        {/* Header */}
        <header className="assistant-header">
          <div className="assistant-header-info">
            <h3 id="assistant-title">{title}</h3>
            <p>{subtitle}</p>
          </div>
          <button
            className="assistant-close-btn"
            onClick={handleClose}
            aria-label="Close chat"
          >
            &times;
          </button>
        </header>

        {/* Messages */}
        <main className="assistant-messages" aria-live="polite">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`assistant-message ${msg.isUser ? 'user' : 'bot'}`}
            >
              <div
                className="assistant-message-content"
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="assistant-message bot">
              <div className="assistant-message-content">
                <div className="assistant-typing">
                  <span className="assistant-typing-dot"></span>
                  <span className="assistant-typing-dot"></span>
                  <span className="assistant-typing-dot"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </main>

        {/* Quick Replies */}
        {quickReplies.length > 0 && (
          <nav className="assistant-quick-replies" aria-label="Quick reply options">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="assistant-quick-reply-btn"
                onClick={() => handleQuickReply(reply.question)}
              >
                {reply.label}
              </button>
            ))}
          </nav>
        )}

        {/* Input Area */}
        <footer className="assistant-input-area">
          <input
            ref={inputRef}
            type="text"
            className="assistant-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={inputPlaceholder}
            aria-label="Type your message"
          />
          <button
            className="assistant-send-btn"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </footer>
      </div>
    </>
  )
}

export default Assistant
