import React, { useState } from 'react'
import Assistant from './components/Assistant'

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  // Knowledge base configuration
  const knowledge = {
    'about': {
      title: 'About Us',
      content: 'We are a technology company focused on creating innovative solutions. Founded in 2020, we help businesses transform their digital presence.'
    },
    'services': {
      title: 'Our Services',
      content: 'We offer: <br>- Web Development<br>- Mobile Apps<br>- Cloud Solutions<br>- AI Integration'
    },
    'pricing': {
      title: 'Pricing',
      content: 'Our pricing is flexible:<br>- Starter: $999/month<br>- Professional: $2,499/month<br>- Enterprise: Custom pricing'
    },
    'contact': {
      title: 'Contact Us',
      content: 'Get in touch:<br>- Email: hello@example.com<br>- Phone: +1 (555) 123-4567'
    },
    'react': {
      title: 'React Integration',
      content: 'This assistant is built as a React component! It supports:<br>- Full TypeScript support<br>- Custom themes<br>- Event callbacks<br>- Easy knowledge base updates'
    }
  }

  const keywords = {
    'who': 'about',
    'company': 'about',
    'what do you do': 'services',
    'offer': 'services',
    'cost': 'pricing',
    'price': 'pricing',
    'email': 'contact',
    'phone': 'contact',
    'framework': 'react',
    'component': 'react'
  }

  const quickReplies = [
    { label: 'About', question: 'About' },
    { label: 'Services', question: 'Services' },
    { label: 'Pricing', question: 'Pricing' },
    { label: 'React', question: 'React' }
  ]

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <div className="demo-container">
        <header className="demo-header">
          <h1>AssistantAILike</h1>
          <p>React Component Example</p>
        </header>

        <div className="demo-card">
          <h2>React Integration</h2>
          <p>This example demonstrates the AssistantAILike React component.</p>
          <p>Features:</p>
          <ul>
            <li>Fully controlled React component</li>
            <li>TypeScript support ready</li>
            <li>Theme-aware (light/dark mode)</li>
            <li>Customizable knowledge base</li>
            <li>Event callbacks for analytics</li>
          </ul>
        </div>

        <div className="demo-card">
          <h2>Installation</h2>
          <p>Copy the Assistant component to your project:</p>
          <pre><code>src/components/Assistant.jsx</code></pre>
          <pre><code>src/components/Assistant.css</code></pre>
        </div>

        <div className="demo-card">
          <h2>Try These Topics</h2>
          <ul>
            <li><strong>About</strong> - Learn about the company</li>
            <li><strong>Services</strong> - Discover available services</li>
            <li><strong>React</strong> - Learn about React integration</li>
          </ul>
        </div>
      </div>

      <Assistant
        title="Virtual Assistant"
        subtitle="How can I help you?"
        welcomeMessage="Hello! I'm your virtual assistant. Ask me about our services or React integration!"
        knowledge={knowledge}
        keywords={keywords}
        quickReplies={quickReplies}
        typingDelay={500}
        notFoundMessage="I'm not sure about that. Try asking about: About, Services, Pricing, or React."
        onOpen={() => console.log('Assistant opened')}
        onClose={() => console.log('Assistant closed')}
        onMessageSent={(msg) => console.log('User:', msg)}
        onMessageReceived={(msg) => console.log('Bot replied')}
      />
    </>
  )
}

export default App
