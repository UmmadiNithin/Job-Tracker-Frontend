import React, { useState, useEffect } from 'react';
import JobFormModal from '../components/JobFormModal';
import { FaSearch, FaFilter, FaPlus, FaBuilding } from 'react-icons/fa';

import './JobTracker.css';

const JobTracker = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs/getAll')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Fetch jobs error:', err));
  }, []);

  const handleNewJob = (jobData) => {
    const jobWithMeta = {
      company: jobData.company,
      role: jobData.title,
      link: jobData.link,
      status: jobData.status,
      createdAt: new Date().toLocaleString(),
    };

    const url = editMode
      ? `http://localhost:5000/api/jobs/update/${selectedJob._id}`
      : 'http://localhost:5000/api/jobs/add';

    const method = editMode ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobWithMeta),
    })
      .then(res => res.json())
      .then(savedJob => {
        const updatedJob = {
          ...savedJob,
          createdAt: new Date().toLocaleString(),
        };

        if (editMode) {
          setJobs(prev => prev.map(job => job._id === savedJob._id ? updatedJob : job));
        } else {
          setJobs(prev => [...prev, updatedJob]);
        }

        setShowForm(false);
        setEditMode(false);
        setSelectedJob(null);
      })
      .catch(err => console.error('Submit job error:', err));
  };

  const handleDeleteJob = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/jobs/delete/${id}`, {
        method: 'DELETE',
      });
      setJobs(prev => prev.filter(job => job._id !== id));
      setShowDetails(false);
    } catch (err) {
      console.error('Delete job error:', err);
    }
  };

  const filteredJobs = jobs
    .filter(job =>
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(job =>
      filterStatus ? job.status === filterStatus : true
    );

  const groupByStatus = status => filteredJobs.filter(job => job.status === status);

  return (
    <div className="job-tracker-container">
      <div className="job-header">
        <h2>My 2025 Job Search</h2>

        <div className="job-actions">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="filter-btn" onClick={() => setShowFilterModal(true)}>
            <FaFilter /> Filter
          </button>

          <button className="add-btn" onClick={() => setShowForm(true)}>
            <FaPlus /> Add Job
          </button>
        </div>
      </div>

      {showDetails && selectedJob && (
        <div className="job-detail-modal">
          <div className="job-detail-content">
            <div className="header">
              <FaBuilding className="company-icon" />
              <h2>{selectedJob.company}</h2>
            </div>

            <div className="job-info">
              <p><span>Role:</span> {selectedJob.role}</p>
              <p><span>Status:</span> {selectedJob.status}</p>
              <p>
                <span>Link:</span>{' '}
                <a href={selectedJob.link} target="_blank" rel="noopener noreferrer">
                  {selectedJob.link}
                </a>
              </p>
            </div>

            <div className="modal-buttons">
              <button
                className="edit"
                onClick={() => {
                  setShowDetails(false);
                  setEditMode(true);
                  setShowForm(true);
                }}
              >
                Edit
              </button>

              <button className="delete" onClick={() => handleDeleteJob(selectedJob._id)}>
                Delete
              </button>

              <button className="close" onClick={() => setShowDetails(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showFilterModal && (
        <div className="filter-modal-overlay">
          <div className="filter-modal">
            <h3>Select Status to Filter</h3>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="filter-buttons">
              <button onClick={() => setShowFilterModal(false)}>Apply</button>
              <button onClick={() => {
                setFilterStatus('');
                setShowFilterModal(false);
              }}>Clear</button>
            </div>
          </div>
        </div>
      )}

      <JobFormModal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditMode(false);
          setSelectedJob(null);
        }}
        onSubmit={handleNewJob}
        initialData={editMode ? selectedJob : null}
        formTitle={editMode ? 'Edit Job' : 'Add Job'}
      />

      <div className="scroll-container">
        {['Applied', 'Interviewed', 'Offer', 'Rejected'].map(status => (
          <div className="job-section" key={status}>
            <h3>{status}</h3>
            <div className="job-cards">
              {groupByStatus(status).map(job => (
                <div
                  className="job-card"
                  key={job._id}
                  onClick={() => {
                    setSelectedJob(job);
                    setShowDetails(true);
                  }}
                >
                  <div className="job-company">
                    <FaBuilding className="company-icon" />
                    <span>{job.company}</span>
                  </div>
                  <div className="job-role">{job.title}</div>
                  <div className="job-date">{job.createdAt}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTracker;
