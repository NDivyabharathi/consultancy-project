import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import '../styles/modules.css';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const SupportChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! Welcome to IntelliTextile Support. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const commonQuestions = [
    { q: 'What is the minimum order quantity?', a: 'The minimum order quantity is 50 units.' },
    { q: 'How long does delivery take?', a: 'Standard delivery takes 5-7 business days.' },
    {
      q: 'What are your payment terms?',
      a: 'We accept bank transfer, cheque, and online payment. Net-30 terms available for bulk orders.',
    },
    {
      q: 'Can I get bulk discounts?',
      a: 'Yes! Orders above 500 units qualify for 5-10% bulk discounts.',
    },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // Simple bot response logic
    let botResponse = '';
    const lowerInput = input.toLowerCase();

    if (
      lowerInput.includes('minimum order') ||
      lowerInput.includes('moq')
    ) {
      botResponse = 'The minimum order quantity is 50 units.';
    } else if (lowerInput.includes('delivery') || lowerInput.includes('shipping')) {
      botResponse = 'Standard delivery takes 5-7 business days.';
    } else if (lowerInput.includes('payment') || lowerInput.includes('terms')) {
      botResponse =
        'We accept bank transfer, cheque, and online payment. Net-30 terms available.';
    } else if (lowerInput.includes('discount') || lowerInput.includes('bulk')) {
      botResponse = 'Orders above 500 units qualify for 5-10% bulk discounts.';
    } else {
      botResponse =
        'Thank you for your question. Our support team will assist you shortly.';
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'bot',
          text: botResponse,
          timestamp: new Date(),
        },
      ]);
    }, 500);

    setInput('');
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Customer Support Chat</h1>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-content">
                <p>{msg.text}</p>
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-section">
          <div className="chat-input-wrapper">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="chat-input"
            />
            <button className="btn btn-primary" onClick={handleSend}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Common Questions */}
      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-list">
          {commonQuestions.map((item, idx) => (
            <div key={idx} className="faq-item">
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Help */}
      <div className="help-section">
        <AlertCircle size={20} />
        <p>
          For urgent issues, please contact our support team at support@intellitextile.com
        </p>
      </div>
    </div>
  );
};
