import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../Services/api";

const ShelterApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [expandedApplications, setExpandedApplications] = useState({});
  const [filter, setFilter] = useState("Pending"); // Default filter to show pending applications

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications/getall");
      setApplications(response.data);
    } catch (error) {
      toast.error("Error fetching applications.");
    }
  };

  const handleApprove = async (id) => {
    const shelternotes = prompt("Enter the reason for approval:");
    if (shelternotes) {
      try {
        await api.patch(`/applications/approve/${id}`, { shelternotes });
        toast.success("Application approved successfully.");
        fetchApplications();
      } catch (error) {
        toast.error("Error approving application.");
      }
    }
  };

  const handleReject = async (id) => {
    const shelternotes = prompt("Enter the reason for rejection:");
    if (shelternotes) {
      try {
        await api.patch(`/applications/reject/${id}`, { shelternotes });
        toast.success("Application rejected successfully.");
        fetchApplications();
      } catch (error) {
        toast.error("Error rejecting application.");
      }
    }
  };

  const handleScheduleMeetAndGreet = async (id, date, time) => {
    try {
      await api.post(`/applications/scheduled/${id}`, { date, time });
      toast.success("Meet-and-Greet scheduled successfully.");
      fetchApplications();
    } catch (error) {
      toast.error("Error scheduling Meet-and-Greet.");
    }
  };

  const handleRequestInfo = async (id) => {
    const shelternotes = prompt("Enter the message for additional information:");
    if (shelternotes) {
      try {
        await api.post(`/applications/request-info/${id}`, { shelternotes });
        toast.success("Request for additional information sent.");
        fetchApplications();
      } catch (error) {
        toast.error("Error sending request for additional information.");
      }
    }
  };

  const toggleExpand = (id) => {
    setExpandedApplications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredApplications = applications.filter(
    (application) => filter === "All" || application.status === filter
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Review Applications</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Filter by Status:
        </label>
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Meet-and-Greet Scheduled">Meet-and-Greet Scheduled</option>
          <option value="Additional Information Needed">Additional Information Needed</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="All">All</option>
        </select>
      </div>
      {applications.length === 0 && <p>No applications found.</p>}
      {filteredApplications.map((application) => (
        <div key={application._id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-bold">
            Application for Pet: {application.petName}
          </h2>
          <p>Applicant: {application.applicantName}</p>
          <p>Status: {application.status}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2"
            onClick={() => toggleExpand(application._id)}
          >
            {expandedApplications[application._id] ? "Hide Details" : "View Details"}
          </button>
          {expandedApplications[application._id] && (
            <div className="mt-4">
              <p><strong>Breed:</strong> {application.petBreed}</p>
              <p><strong>Mobile Number:</strong> {application.phone}</p>
              <p><strong>Email:</strong> {application.email}</p>
              <p><strong>Reason For Adoption:</strong> {application.reason}</p>
              <p><strong>Address:</strong> {application.address}</p>
              <p><strong>User Id:</strong> {application.creator}</p>
              {application.status === "Approved" && (
                <p><strong>Approval Reason:</strong> {application.shelternotes}</p>
              )}
              {application.status === "Rejected" && (
                <p><strong>Rejection Reason:</strong> {application.shelternotes}</p>
              )}
              {application.status === "Meet-and-Greet Scheduled" && (
                <>
                  <p><strong>Meet-and-Greet Date:</strong> {application.meetAndGreetDate}</p>
                  <p><strong>Meet-and-Greet Time:</strong> {application.meetAndGreetTime}</p>
                </>
              )}
              {application.status === "Additional Information Needed" && (
                <p><strong>Additional Info Note:</strong> {application.shelternotes}</p>
              )}
            </div>
          )}
          {(application.status === "Pending" || application.status === "Additional Information Needed") && (
            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-2 mr-2"
                onClick={() => handleApprove(application._id)}
              >
                Approve
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 mr-2"
                onClick={() => handleRequestInfo(application._id)}
              >
                Request More Information
              </button>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => {
                  const date = prompt("Enter meet-and-greet date (YYYY-MM-DD):");
                  const time = prompt("Enter meet-and-greet time (HH:MM):");
                  if (date && time) {
                    handleScheduleMeetAndGreet(application._id, date, time);
                  }
                }}
              >
                Schedule Meet-and-Greet
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => handleReject(application._id)}
              >
                Reject
              </button>
            </div>
          )}
          {application.status === "Meet-and-Greet Scheduled" && (
            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-2 mr-2"
                onClick={() => handleApprove(application._id)}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => handleReject(application._id)}
              >
                Reject
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => handleRequestInfo(application._id)}
              >
                Request More Information
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShelterApplicationsPage;
