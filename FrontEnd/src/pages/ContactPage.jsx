// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import api from '../Services/api';

// const ContactPage = () => {
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [email, setEmail] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/messages/send', { subject, message, email });
//       toast.success(response.data.message);
//       setSubject('');
//       setMessage('');
//       setEmail('');
//     } catch (error) {
//       toast.error('Error sending message.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Subject</label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Message</label>
//           <textarea
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send</button>
//       </form>
//     </div>
//   );
// };

// export default ContactPage;
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../Services/api';

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/messages/contact/send', { email, subject, message });
      toast.success(response.data.message);
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast.error('Error sending message.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Subject</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
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
    </div>
  );
};

export default ContactPage;
