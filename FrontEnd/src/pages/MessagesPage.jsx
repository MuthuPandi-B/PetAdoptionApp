
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../Services/api';

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState('');
  const [users, setUsers] = useState([]);
  const role = localStorage.getItem('role'); // Get user role from localStorage

  useEffect(() => {
    fetchConversations();
    fetchUsers();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await api.get('/messages/direct');
      setConversations(response.data);
    } catch (error) {
      toast.error('Error fetching conversations.');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users'); // Fetch users
      setUsers(response.data);
    } catch (error) {
      toast.error('Error fetching users.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await api.post('/messages/direct/send', { receiverId: selectedReceiver, message });
      toast.success('Message sent successfully.');
      setMessage('');
      fetchConversations();
    } catch (error) {
      toast.error('Error sending message.');
    }
  };

  const relevantUsers = users.filter(user => {
    if (role === 'adopter') return user.role === 'shelter' || user.role === 'foster';
    if (role === 'foster') return user.role === 'shelter';
    if (role === 'shelter') return user.role === 'adopter' || user.role === 'foster';
    return false;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      <form onSubmit={handleSendMessage}>
        <div className="mb-4">
          <label className="block text-gray-700">Send To</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={selectedReceiver}
            onChange={(e) => setSelectedReceiver(e.target.value)}
            required
          >
            <option value="">Select User</option>
            {relevantUsers.map(user => (
              <option key={user._id} value={user._id}>{user.name} ({user.role})</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send</button>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Conversations</h2>
        {conversations.length === 0 && <p>No conversations found.</p>}
        {conversations.map(conversation => (
          <div key={conversation._id} className="border p-4 rounded mb-4">
            <p><strong>From:</strong> {conversation.sender.name}</p>
            <p><strong>To:</strong> {conversation.receiver.name}</p>
            <p><strong>Message:</strong> {conversation.message}</p>
            <p><small>{new Date(conversation.createdAt).toLocaleString()}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
