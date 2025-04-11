import React, { useState, useEffect } from 'react';
import './JobFormModal.css';

const JobFormModal = ({ isOpen, onClose, onSubmit, initialData = null, formTitle = 'Add Job' }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    link: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company || '',
        role: initialData.title || '',
        status: initialData.status || 'Applied',
        link: initialData.link || ''
      });
    } else {
      setFormData({
        company: '',
        role: '',
        status: 'Applied',
        link: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // rename "role" back to "title" for consistency with backend
    const formattedData = {
      ...formData,
      title: formData.role
    };
    delete formattedData.role;

    onSubmit(formattedData);
  };

  if (!isOpen) return null;

//   return (
//     <div className="modal-backdrop">
//       <div className="modal-content">
//         <h3>{formTitle}</h3>
//         <form onSubmit={handleSubmit}>
//           <input
//             name="company"
//             placeholder="Company Name"
//             value={formData.company}
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="role"
//             placeholder="Role"
//             value={formData.role}
//             onChange={handleChange}
//             required
//           />
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             required
//           >
//             <option value="Applied">Applied</option>
//             <option value="Interviewed">Interviewed</option>
//             <option value="Offer">Offer</option>
//             <option value="Rejected">Rejected</option>
//           </select>
//           <input
//             name="link"
//             placeholder="Job Link"
//             value={formData.link}
//             onChange={handleChange}
//             required
//           />
//           <div className="modal-buttons">
//             <button type="submit">Submit</button>
//             <button type="button" className="cancel" onClick={onClose}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


return (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h3>{formTitle}</h3>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="company">Company Name</label>
        <input
          id="company"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Role</label>
        <input
          id="role"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <label htmlFor="link">Job Link</label>
        <input
          id="link"
          name="link"
          placeholder="Job Link"
          value={formData.link}
          onChange={handleChange}
          required
        />

        <div className="modal-buttons">
          <button type="submit">Submit</button>
          <button type="button" className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
);
}


export default JobFormModal;
