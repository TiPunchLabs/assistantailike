/**
 * AssistantAILike - JavaScript Core
 * A lightweight, customizable AI-like chat assistant widget
 * https://github.com/xgueret/assistantailike
 *
 * @license MIT
 * @version 1.0.0
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AssistantAILike = factory());
})(this, (function () {
    'use strict';

    /**
     * Default configuration options
     */
    const defaultOptions = {
        // Selectors
        buttonSelector: '#assistantButton',
        containerSelector: '#assistantContainer',
        closeBtnSelector: '#assistantCloseBtn',
        messagesSelector: '#assistantMessages',
        inputSelector: '#assistantInput',
        sendBtnSelector: '#assistantSendBtn',
        quickRepliesSelector: '.assistant-quick-reply-btn',

        // Behavior
        typingDelay: 500,
        welcomeMessage: null,

        // Knowledge base
        knowledge: {},
        keywords: {},

        // Callbacks
        onOpen: null,
        onClose: null,
        onMessageSent: null,
        onMessageReceived: null,
        onNotFound: null,

        // i18n
        notFoundMessage: 'Sorry, I couldn\'t find information on that topic. Try one of the suggested topics.',
        inputPlaceholder: 'Type your question...',

        // Custom answer function (for API integration)
        customAnswerFn: null
    };

    /**
     * AssistantAILike Class
     */
    class AssistantAILike {
        constructor(options = {}) {
            this.options = { ...defaultOptions, ...options };
            this.elements = {};
            this.isOpen = false;
            this.isTyping = false;

            this._init();
        }

        /**
         * Initialize the assistant
         */
        _init() {
            this._getElements();
            this._bindEvents();

            if (this.options.welcomeMessage) {
                this.addMessage(this.options.welcomeMessage, false);
            }
        }

        /**
         * Get DOM elements
         */
        _getElements() {
            this.elements = {
                button: document.querySelector(this.options.buttonSelector),
                container: document.querySelector(this.options.containerSelector),
                closeBtn: document.querySelector(this.options.closeBtnSelector),
                messages: document.querySelector(this.options.messagesSelector),
                input: document.querySelector(this.options.inputSelector),
                sendBtn: document.querySelector(this.options.sendBtnSelector),
                quickReplies: document.querySelectorAll(this.options.quickRepliesSelector)
            };
        }

        /**
         * Bind event listeners
         */
        _bindEvents() {
            const { button, closeBtn, sendBtn, input, quickReplies } = this.elements;

            if (button) {
                button.addEventListener('click', () => this.toggle());
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.close());
            }

            if (sendBtn) {
                sendBtn.addEventListener('click', () => this._handleSend());
            }

            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this._handleSend();
                    }
                });
            }

            if (quickReplies && quickReplies.length > 0) {
                quickReplies.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const question = btn.dataset.question || btn.textContent.trim();
                        if (this.elements.input) {
                            this.elements.input.value = question;
                        }
                        this._handleSend();
                    });
                });
            }

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        }

        /**
         * Toggle chat visibility
         */
        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }

        /**
         * Open chat
         */
        open() {
            const { container, button, input } = this.elements;

            if (container) {
                container.classList.add('active');
            }
            if (button) {
                button.classList.add('active');
            }
            if (input) {
                input.focus();
            }

            this.isOpen = true;

            if (typeof this.options.onOpen === 'function') {
                this.options.onOpen();
            }
        }

        /**
         * Close chat
         */
        close() {
            const { container, button } = this.elements;

            if (container) {
                container.classList.remove('active');
            }
            if (button) {
                button.classList.remove('active');
            }

            this.isOpen = false;

            if (typeof this.options.onClose === 'function') {
                this.options.onClose();
            }
        }

        /**
         * Add a message to the chat
         * @param {string} content - Message content (HTML supported)
         * @param {boolean} isUser - Whether the message is from user
         */
        addMessage(content, isUser = false) {
            const { messages } = this.elements;
            if (!messages) return;

            const messageDiv = document.createElement('div');
            messageDiv.className = `assistant-message ${isUser ? 'user' : 'bot'}`;

            const contentDiv = document.createElement('div');
            contentDiv.className = 'assistant-message-content';
            contentDiv.innerHTML = content;

            messageDiv.appendChild(contentDiv);
            messages.appendChild(messageDiv);

            // Scroll to bottom
            this._scrollToBottom();

            return messageDiv;
        }

        /**
         * Show typing indicator
         */
        showTyping() {
            const { messages } = this.elements;
            if (!messages || this.isTyping) return;

            this.isTyping = true;

            const typingDiv = document.createElement('div');
            typingDiv.className = 'assistant-message bot assistant-typing-indicator';
            typingDiv.innerHTML = `
                <div class="assistant-message-content">
                    <div class="assistant-typing">
                        <span class="assistant-typing-dot"></span>
                        <span class="assistant-typing-dot"></span>
                        <span class="assistant-typing-dot"></span>
                    </div>
                </div>
            `;

            messages.appendChild(typingDiv);
            this._scrollToBottom();

            return typingDiv;
        }

        /**
         * Hide typing indicator
         */
        hideTyping() {
            const { messages } = this.elements;
            if (!messages) return;

            const typingIndicator = messages.querySelector('.assistant-typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }

            this.isTyping = false;
        }

        /**
         * Scroll messages to bottom
         */
        _scrollToBottom() {
            const { messages } = this.elements;
            if (messages) {
                messages.scrollTop = messages.scrollHeight;
            }
        }

        /**
         * Normalize text for matching (remove accents, lowercase)
         * @param {string} text - Text to normalize
         * @returns {string} Normalized text
         */
        _normalizeText(text) {
            return text
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .trim();
        }

        /**
         * Find answer in knowledge base
         * @param {string} question - User question
         * @returns {string|null} Answer or null if not found
         */
        findAnswer(question) {
            const { knowledge, keywords } = this.options;
            const normalizedQuestion = this._normalizeText(question);

            // Exact match search
            for (const [key, value] of Object.entries(knowledge)) {
                const normalizedKey = this._normalizeText(key);

                if (normalizedQuestion.includes(normalizedKey)) {
                    if (typeof value === 'object' && value.title && value.content) {
                        return `<strong>${value.title}</strong><br>${value.content}`;
                    }
                    return value;
                }
            }

            // Keyword mapping search
            for (const [keyword, knowledgeKey] of Object.entries(keywords)) {
                if (normalizedQuestion.includes(keyword)) {
                    const value = knowledge[knowledgeKey];
                    if (value) {
                        if (typeof value === 'object' && value.title && value.content) {
                            return `<strong>${value.title}</strong><br>${value.content}`;
                        }
                        return value;
                    }
                }
            }

            return null;
        }

        /**
         * Handle send action
         */
        async _handleSend() {
            const { input } = this.elements;
            if (!input) return;

            const question = input.value.trim();
            if (question === '') return;

            // Display user message
            this.addMessage(question, true);
            input.value = '';

            if (typeof this.options.onMessageSent === 'function') {
                this.options.onMessageSent(question);
            }

            // Show typing indicator
            this.showTyping();

            // Get answer
            let answer;

            if (typeof this.options.customAnswerFn === 'function') {
                // Use custom answer function (for API integration)
                try {
                    answer = await this.options.customAnswerFn(question);
                } catch (error) {
                    console.error('AssistantAILike: Error in custom answer function', error);
                    answer = this.options.notFoundMessage;
                }
            } else {
                // Use local knowledge base
                await this._delay(this.options.typingDelay);
                answer = this.findAnswer(question);
            }

            // Hide typing indicator
            this.hideTyping();

            // Display answer
            if (answer) {
                this.addMessage(answer);

                if (typeof this.options.onMessageReceived === 'function') {
                    this.options.onMessageReceived(answer);
                }
            } else {
                this.addMessage(this.options.notFoundMessage);

                if (typeof this.options.onNotFound === 'function') {
                    this.options.onNotFound(question);
                }
            }
        }

        /**
         * Delay helper
         * @param {number} ms - Milliseconds to delay
         * @returns {Promise}
         */
        _delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        /**
         * Update knowledge base
         * @param {object} knowledge - New knowledge base entries
         */
        updateKnowledge(knowledge) {
            this.options.knowledge = { ...this.options.knowledge, ...knowledge };
        }

        /**
         * Update keywords
         * @param {object} keywords - New keyword mappings
         */
        updateKeywords(keywords) {
            this.options.keywords = { ...this.options.keywords, ...keywords };
        }

        /**
         * Clear all messages
         */
        clearMessages() {
            const { messages } = this.elements;
            if (messages) {
                messages.innerHTML = '';
            }
        }

        /**
         * Destroy instance
         */
        destroy() {
            this.close();
            // Remove all event listeners would require storing references
            // For now, just clear elements
            this.elements = {};
        }
    }

    /**
     * Auto-initialize on DOMContentLoaded
     * Use data-assistant-auto-init attribute on the body or a container
     */
    function autoInit() {
        const autoInitElement = document.querySelector('[data-assistant-auto-init]');
        if (autoInitElement) {
            const configAttr = autoInitElement.getAttribute('data-assistant-config');
            let config = {};

            if (configAttr) {
                try {
                    config = JSON.parse(configAttr);
                } catch (e) {
                    console.warn('AssistantAILike: Invalid JSON in data-assistant-config');
                }
            }

            window.assistantAILike = new AssistantAILike(config);
        }
    }

    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }

    return AssistantAILike;
}));
