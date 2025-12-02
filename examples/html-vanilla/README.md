# HTML Vanilla Example

This example demonstrates how to integrate AssistantAILike into a standard HTML page without any build tools or frameworks.

## Files

- `index.html` - Complete working example with custom knowledge base
- `knowledge-example.js` - Example knowledge base structure

## Running the Example

### Option 1: Direct File

Simply open `index.html` in your browser.

### Option 2: Local Server

For a better development experience, use a local server:

```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve . -p 3000

# Using PHP
php -S localhost:3000
```

Then open http://localhost:3000 in your browser.

## Customization

### Modify the Knowledge Base

Edit the `knowledge` object in `index.html`:

```javascript
const assistant = new AssistantAILike({
    knowledge: {
        'your-topic': {
            title: 'Your Topic Title',
            content: 'Your topic content with <strong>HTML</strong> support.'
        }
    }
});
```

### Add Keyword Mappings

Add synonyms and alternative phrases:

```javascript
keywords: {
    'synonym': 'your-topic',
    'alternative phrase': 'your-topic'
}
```

### Customize Quick Replies

Modify the HTML:

```html
<nav class="assistant-quick-replies">
    <button class="assistant-quick-reply-btn" data-question="Topic 1">Topic 1</button>
    <button class="assistant-quick-reply-btn" data-question="Topic 2">Topic 2</button>
</nav>
```

### Change Theme Colors

Override CSS variables:

```css
:root {
    --assistant-primary: #your-color;
    --assistant-bg: #your-background;
}
```

## Theme Toggle

This example includes a theme toggle button. Click "Toggle Dark Mode" to switch between light and dark themes.
