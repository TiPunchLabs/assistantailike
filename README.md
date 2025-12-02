```
 █████╗ ███████╗███████╗██╗███████╗████████╗ █████╗ ███╗   ██╗████████╗
██╔══██╗██╔════╝██╔════╝██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║╚══██╔══╝
███████║███████╗███████╗██║███████╗   ██║   ███████║██╔██╗ ██║   ██║
██╔══██║╚════██║╚════██║██║╚════██║   ██║   ██╔══██║██║╚██╗██║   ██║
██║  ██║███████║███████║██║███████║   ██║   ██║  ██║██║ ╚████║   ██║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝
                     █████╗ ██╗    ██╗     ██╗██╗  ██╗███████╗
                    ██╔══██╗██║    ██║     ██║██║ ██╔╝██╔════╝
                    ███████║██║    ██║     ██║█████╔╝ █████╗
                    ██╔══██║██║    ██║     ██║██╔═██╗ ██╔══╝
                    ██║  ██║██║    ███████╗██║██║  ██╗███████╗
                    ╚═╝  ╚═╝╚═╝    ╚══════╝╚═╝╚═╝  ╚═╝╚══════╝
                    Lightweight AI-Like Chat Assistant Widget
```

A lightweight, customizable AI-like chat assistant widget for websites and web applications.

## Features

- **Zero Dependencies** - Pure vanilla JavaScript, no external libraries required
- **Lightweight** - ~8KB CSS + ~10KB JS (minified)
- **Customizable** - Full theming support with CSS variables
- **Dark Mode** - Automatic light/dark theme detection
- **Responsive** - Mobile-friendly design
- **Accessible** - ARIA labels and keyboard navigation
- **React Ready** - Includes a React component version
- **API Ready** - Support for custom answer functions (connect to any AI API)

## Demo

![AssistantAILike Demo](docs/demo.gif)

## Quick Start

### CDN (Recommended for HTML projects)

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/xgueret/assistantailike@1.0.0/dist/assistant.min.css">

<!-- JS -->
<script src="https://cdn.jsdelivr.net/gh/xgueret/assistantailike@1.0.0/dist/assistant.min.js"></script>
```

### Local Installation

1. Copy the files from `dist/` to your project:
   - `assistant.min.css`
   - `assistant.min.js`

2. Include them in your HTML:

```html
<link rel="stylesheet" href="path/to/assistant.min.css">
<script src="path/to/assistant.min.js"></script>
```

## Usage

### HTML Structure

Add the assistant HTML to your page (before closing `</body>` tag):

```html
<!-- Floating Button -->
<button class="assistant-button" id="assistantButton" aria-label="Open chat assistant">
    <svg class="assistant-icon-chat" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
    </svg>
    <svg class="assistant-icon-close" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
</button>

<!-- Chat Container -->
<div class="assistant-container" id="assistantContainer">
    <header class="assistant-header">
        <div class="assistant-header-info">
            <h3>Virtual Assistant</h3>
            <p>How can I help you?</p>
        </div>
        <button class="assistant-close-btn" id="assistantCloseBtn">&times;</button>
    </header>

    <main class="assistant-messages" id="assistantMessages">
        <div class="assistant-message bot">
            <div class="assistant-message-content">
                Hello! How can I help you today?
            </div>
        </div>
    </main>

    <nav class="assistant-quick-replies">
        <button class="assistant-quick-reply-btn" data-question="About">About</button>
        <button class="assistant-quick-reply-btn" data-question="Services">Services</button>
        <button class="assistant-quick-reply-btn" data-question="Contact">Contact</button>
    </nav>

    <footer class="assistant-input-area">
        <input type="text" class="assistant-input" id="assistantInput" placeholder="Type your question...">
        <button class="assistant-send-btn" id="assistantSendBtn">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
    </footer>
</div>
```

### JavaScript Initialization

```javascript
const assistant = new AssistantAILike({
    // Knowledge base
    knowledge: {
        'about': {
            title: 'About Us',
            content: 'We are a technology company focused on innovation.'
        },
        'services': {
            title: 'Our Services',
            content: 'We offer web development, mobile apps, and cloud solutions.'
        },
        'contact': {
            title: 'Contact Us',
            content: 'Email: hello@example.com<br>Phone: +1 (555) 123-4567'
        }
    },

    // Keyword mappings (optional)
    keywords: {
        'who': 'about',
        'company': 'about',
        'email': 'contact',
        'phone': 'contact'
    },

    // Options
    typingDelay: 500,
    notFoundMessage: "I'm not sure about that. Try asking about: About, Services, or Contact.",

    // Callbacks (optional)
    onOpen: () => console.log('Chat opened'),
    onClose: () => console.log('Chat closed'),
    onMessageSent: (msg) => console.log('User:', msg),
    onMessageReceived: (msg) => console.log('Bot replied')
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `buttonSelector` | string | `#assistantButton` | Selector for the chat button |
| `containerSelector` | string | `#assistantContainer` | Selector for the chat container |
| `closeBtnSelector` | string | `#assistantCloseBtn` | Selector for the close button |
| `messagesSelector` | string | `#assistantMessages` | Selector for the messages container |
| `inputSelector` | string | `#assistantInput` | Selector for the input field |
| `sendBtnSelector` | string | `#assistantSendBtn` | Selector for the send button |
| `quickRepliesSelector` | string | `.assistant-quick-reply-btn` | Selector for quick reply buttons |
| `typingDelay` | number | `500` | Delay before showing response (ms) |
| `welcomeMessage` | string | `null` | Initial welcome message |
| `knowledge` | object | `{}` | Knowledge base object |
| `keywords` | object | `{}` | Keyword to knowledge key mappings |
| `notFoundMessage` | string | `"Sorry, I couldn't find..."` | Message when no answer found |
| `inputPlaceholder` | string | `"Type your question..."` | Input field placeholder |
| `customAnswerFn` | function | `null` | Custom async function for API integration |
| `onOpen` | function | `null` | Callback when chat opens |
| `onClose` | function | `null` | Callback when chat closes |
| `onMessageSent` | function | `null` | Callback when user sends a message |
| `onMessageReceived` | function | `null` | Callback when bot responds |
| `onNotFound` | function | `null` | Callback when no answer is found |

## Knowledge Base Format

### Simple Text

```javascript
knowledge: {
    'hello': 'Hello! How can I help you?'
}
```

### Structured Response

```javascript
knowledge: {
    'about': {
        title: 'About Us',
        content: 'We are a technology company...'
    }
}
```

### Rich HTML Content

```javascript
knowledge: {
    'features': {
        title: 'Key Features',
        content: `
            <ul>
                <li><strong>Fast</strong> - Optimized for speed</li>
                <li><strong>Easy</strong> - Simple integration</li>
            </ul>
            <a href="/features">Learn more</a>
        `
    }
}
```

## API Integration

Connect to any AI API using the `customAnswerFn` option:

```javascript
const assistant = new AssistantAILike({
    customAnswerFn: async (question) => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: question })
        });
        const data = await response.json();
        return data.answer;
    }
});
```

## Theming

### CSS Variables

Customize the appearance using CSS variables:

```css
:root {
    --assistant-primary: #1565c0;
    --assistant-primary-dark: #0d47a1;
    --assistant-bg: #ffffff;
    --assistant-bg-alt: #f8f9fa;
    --assistant-text: #212121;
    --assistant-text-secondary: #555555;
    --assistant-border: #e0e0e0;
    --assistant-shadow: rgba(0, 0, 0, 0.15);
    --assistant-user-message: #1565c0;
    --assistant-bot-message-bg: #ffffff;
    --assistant-quick-reply-bg: #f0f0f0;
    --assistant-quick-reply-border: #ddd;
}
```

### Dark Mode

Dark mode is automatically detected via `prefers-color-scheme` media query. You can also manually set it:

```html
<html data-theme="dark">
```

Or toggle it with JavaScript:

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

## React Integration

See the `examples/react` folder for a complete React component implementation.

### Basic Usage

```jsx
import Assistant from './components/Assistant';

function App() {
    return (
        <Assistant
            title="Virtual Assistant"
            subtitle="How can I help?"
            welcomeMessage="Hello! Ask me anything."
            knowledge={{
                about: { title: 'About', content: 'We are...' }
            }}
            quickReplies={[
                { label: 'About', question: 'About' },
                { label: 'Contact', question: 'Contact' }
            ]}
            onMessageSent={(msg) => console.log(msg)}
        />
    );
}
```

## Methods

### `open()`
Opens the chat window.

### `close()`
Closes the chat window.

### `toggle()`
Toggles the chat window open/closed state.

### `addMessage(content, isUser = false)`
Adds a message to the chat.

### `showTyping()`
Shows the typing indicator.

### `hideTyping()`
Hides the typing indicator.

### `updateKnowledge(knowledge)`
Updates the knowledge base.

### `updateKeywords(keywords)`
Updates the keyword mappings.

### `clearMessages()`
Clears all messages from the chat.

### `destroy()`
Destroys the assistant instance.

## Examples

- **HTML Vanilla**: `examples/html-vanilla/` - Basic HTML/CSS/JS integration
- **React**: `examples/react/` - React component with Vite

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Infrastructure

This project uses Terraform to manage the GitHub repository.

### Prerequisites

- [Terraform](https://www.terraform.io/) >= 1.0
- A GitHub token with necessary permissions
- [direnv](https://direnv.net/) for environment variable management
- [pass](https://www.passwordstore.org/) for secure token storage

### Deployment

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## Project Principles

This project follows a strict set of principles:

- **Zero Dependencies** - Pure vanilla JavaScript, no external libraries
- **Accessibility First** - ARIA labels, keyboard navigation, screen reader support
- **CSS Variables Theming** - All styling via customizable CSS variables
- **API-Ready** - Works standalone or connected to any AI API
- **Progressive Enhancement** - Graceful degradation and responsive design

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

Xavier GUERET - [GitHub](https://github.com/xgueret)
