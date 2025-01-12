import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../Services/api';

const ContactMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/messages/contact');
      setMessages(response.data);
    } catch (error) {
      toast.error('Error fetching contact messages.');
    }
  };

  const handleReply = async (messageId) => {
    try {
      await api.post(`/messages/contact/reply/${messageId}`, { reply });
      toast.success('Reply sent successfully.');
      setReply('');
      fetchMessages();
    } catch (error) {
      toast.error('Error sending reply.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Messages</h1>
      {messages.length === 0 && <p>No messages found.</p>}
      {messages.map((message) => (
        <div key={message._id} className="border p-4 rounded mb-4">
          <p><strong>Email:</strong> {message.email}</p>
          <p><strong>Subject:</strong> {message.subject}</p>
          <p><strong>Message:</strong> {message.message}</p>
          {message.replies && (
            <div className="mt-2">
              <h3 className="font-bold">Replies:</h3>
              {message.replies.map((reply, index) => (
                <p key={index}>{reply}</p>
              ))}
            </div>
          )}
          <div className="mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply..."
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => handleReply(message._id)}
            >
              Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMessagesPage;
