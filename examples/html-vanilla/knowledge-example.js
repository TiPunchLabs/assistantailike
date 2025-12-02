/**
 * AssistantAILike - Knowledge Base Example
 *
 * This file demonstrates how to create a comprehensive knowledge base
 * for your AI-like assistant.
 */

const myKnowledge = {
    // Simple text responses
    'hello': 'Hello! How can I help you today?',
    'bye': 'Goodbye! Have a great day!',

    // Structured responses with title and content
    'company': {
        title: 'Our Company',
        content: 'We are a leading technology company with over 10 years of experience in software development.'
    },

    // Rich HTML content
    'features': {
        title: 'Key Features',
        content: `
            <ul>
                <li><strong>Fast Performance</strong> - Optimized for speed</li>
                <li><strong>Easy Integration</strong> - Works with any framework</li>
                <li><strong>Customizable</strong> - Fully themeable</li>
                <li><strong>Accessible</strong> - WCAG 2.1 compliant</li>
            </ul>
        `
    },

    // Links and calls to action
    'demo': {
        title: 'Request a Demo',
        content: 'Want to see our product in action? <a href="/demo" style="color: var(--assistant-primary); font-weight: 600;">Schedule a demo</a> with our team today!'
    }
};

// Keyword mappings for fuzzy matching
const myKeywords = {
    // Greetings
    'hi': 'hello',
    'hey': 'hello',
    'good morning': 'hello',
    'good afternoon': 'hello',

    // Farewells
    'goodbye': 'bye',
    'see you': 'bye',
    'thanks': 'bye',

    // Company related
    'about': 'company',
    'who are you': 'company',
    'your company': 'company',

    // Features
    'what can you do': 'features',
    'capabilities': 'features',
    'functionality': 'features',

    // Demo
    'try': 'demo',
    'test': 'demo',
    'trial': 'demo'
};

// Export for use in your application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { myKnowledge, myKeywords };
}
