# React Example

This example demonstrates how to integrate AssistantAILike as a React component.

## Prerequisites

- Node.js >= 16
- npm or yarn

## Installation

```bash
cd examples/react
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

## Project Structure

```
examples/react/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          # Entry point
    ├── App.jsx           # Main app component
    ├── index.css         # Demo page styles
    └── components/
        ├── Assistant.jsx  # Assistant React component
        └── Assistant.css  # Assistant styles
```

## Usage in Your Project

### 1. Copy the Component

Copy these files to your React project:
- `src/components/Assistant.jsx`
- `src/components/Assistant.css`

### 2. Import and Use

```jsx
import Assistant from './components/Assistant';

function App() {
    return (
        <div>
            <h1>My App</h1>

            <Assistant
                title="Help Bot"
                subtitle="Ask me anything"
                welcomeMessage="Hello! How can I help?"
                knowledge={{
                    about: {
                        title: 'About Us',
                        content: 'We are a great company!'
                    }
                }}
                quickReplies={[
                    { label: 'About', question: 'About' }
                ]}
            />
        </div>
    );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `"Virtual Assistant"` | Header title |
| `subtitle` | string | `"Ask me anything"` | Header subtitle |
| `welcomeMessage` | string | `"Hello! How can I help?"` | Initial bot message |
| `knowledge` | object | `{}` | Knowledge base |
| `keywords` | object | `{}` | Keyword mappings |
| `quickReplies` | array | `[]` | Quick reply buttons |
| `typingDelay` | number | `500` | Response delay (ms) |
| `notFoundMessage` | string | `"I'm not sure..."` | Fallback message |
| `inputPlaceholder` | string | `"Type your question..."` | Input placeholder |
| `customAnswerFn` | function | `null` | Custom async answer function |
| `onOpen` | function | `null` | Called when chat opens |
| `onClose` | function | `null` | Called when chat closes |
| `onMessageSent` | function | `null` | Called when user sends message |
| `onMessageReceived` | function | `null` | Called when bot responds |

## API Integration Example

Connect to an AI API:

```jsx
<Assistant
    customAnswerFn={async (question) => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: question })
        });
        const data = await response.json();
        return data.answer;
    }}
/>
```

## TypeScript

The component can be easily typed. Create a `types.ts`:

```typescript
interface KnowledgeItem {
    title: string;
    content: string;
}

interface QuickReply {
    label: string;
    question: string;
}

interface AssistantProps {
    title?: string;
    subtitle?: string;
    welcomeMessage?: string;
    knowledge?: Record<string, KnowledgeItem | string>;
    keywords?: Record<string, string>;
    quickReplies?: QuickReply[];
    typingDelay?: number;
    notFoundMessage?: string;
    inputPlaceholder?: string;
    customAnswerFn?: (question: string) => Promise<string>;
    onOpen?: () => void;
    onClose?: () => void;
    onMessageSent?: (message: string) => void;
    onMessageReceived?: (message: string) => void;
}
```

## Theming

The component uses CSS variables that can be overridden:

```css
:root {
    --assistant-primary: #your-color;
}

[data-theme="dark"] {
    --assistant-primary: #your-dark-color;
}
```
