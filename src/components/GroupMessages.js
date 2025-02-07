import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupMessages = ({ partners }) => {
    const [customMessage, setCustomMessage] = useState('');
    const [selectedPartner, setSelectedPartner] = useState(partners.length > 0 ? partners[0] : '');
    const [messages, setMessages] = useState([]);

    const genericMessages = [
        "Great job!",
        "Keep up the good work!",
        "You're doing amazing!",
        "Fantastic effort!"
    ];

    // Fetch existing messages from backend on mount
    useEffect(() => {
        axios.get('/api/messages')
            .then(response => setMessages(response.data))
            .catch(error => console.error('Error fetching messages:', error));
    }, []);

    const sendMessage = (message) => {
        if (!message.trim()) return; // Prevent empty messages

        const newMessage = { partner: selectedPartner, message };

        // Send message to backend
        axios.post('/api/messages', newMessage)
            .then(response => {
                setMessages([...messages, response.data]); // Update UI with new message
                setCustomMessage(''); // Reset input
            })
            .catch(error => console.error('Error sending message:', error));
    };

    return (
        <div>
            <h2>Group Messages</h2>
            <div>
                <label>Select Partner: </label>
                <select 
                    onChange={(e) => setSelectedPartner(e.target.value)} 
                    value={selectedPartner}
                    disabled={partners.length === 0}
                >
                    {partners.length > 0 ? (
                        partners.map((partner, index) => (
                            <option key={index} value={partner}>{partner}</option>
                        ))
                    ) : (
                        <option>No partners available</option>
                    )}
                </select>
            </div>
            <div>
                <h3>Send a Message</h3>
                <div>
                    <label>Generic Messages: </label>
                    <select onChange={(e) => sendMessage(e.target.value)}>
                        <option value="">Select a message</option>
                        {genericMessages.map((msg, index) => (
                            <option key={index} value={msg}>{msg}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Custom Message: </label>
                    <input 
                        type="text" 
                        value={customMessage} 
                        onChange={(e) => setCustomMessage(e.target.value)} 
                    />
                    <button onClick={() => sendMessage(customMessage)}>Send</button>
                </div>
            </div>
            <div>
                <h3>Messages</h3>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.partner}:</strong> {msg.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GroupMessages;
