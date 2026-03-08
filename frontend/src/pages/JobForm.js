import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useJobContext } from '../context/JobContext.js';
import styles from './JobForm.module.css';

const JobForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { createJob, updateJob, loading, error } = useJobContext();

  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    location: '',
    jobType: 'Full-time',
    salaryType: 'Paid',
    salaryPackage: '',
    portalLink: '',
    applicationDeadline: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isEdit && location.state?.job) {
      const job = location.state.job;
      const deadline = new Date(job.applicationDeadline)
        .toISOString()
        .split('T')[0];

      setFormData({
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        location: job.location,
        jobType: job.jobType,
        salaryType: job.salaryType,
        salaryPackage: job.salaryPackage,
        portalLink: job.portalLink,
        applicationDeadline: deadline,
      });
    }
  }, [isEdit, location.state]);

  const validateForm = () => {
    const errors = {};

    if (!formData.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }

    if (!formData.jobTitle.trim()) {
      errors.jobTitle = 'Job title is required';
    }

    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }

    if (!formData.salaryPackage.trim()) {
      errors.salaryPackage = 'Salary package is required';
    }

    if (!formData.portalLink.trim()) {
      errors.portalLink = 'Application portal link is required';
    } else if (!isValidUrl(formData.portalLink)) {
      errors.portalLink = 'Please enter a valid URL';
    }

    if (!formData.applicationDeadline) {
      errors.applicationDeadline = 'Application deadline is required';
    } else {
      const deadline = new Date(formData.applicationDeadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (deadline < today) {
        errors.applicationDeadline = 'Deadline cannot be in the past';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEdit) {
        await updateJob(id, formData);
        setSuccessMessage('Job updated successfully!');
      } else {
        await createJob(formData);
        setSuccessMessage('Job created successfully!');
      }

      setTimeout(() => {
        navigate('/manage-jobs');
      }, 1500);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>
            {isEdit ? '✏️ Edit Job Posting' : '➕ Create New Job Posting'}
          </h1>

          {error && (
            <div className={styles.alert + ' ' + styles.error}>
              ⚠️ {error}
            </div>
          )}

          {successMessage && (
            <div className={styles.alert + ' ' + styles.success}>
              ✅ {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.gridContainer}>
              <div className={styles.formGroup}>
                <label htmlFor="companyName">Company Name *</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className={validationErrors.companyName ? styles.inputError : ''}
                />
                {validationErrors.companyName && (
                  <span className={styles.errorText}>
                    {validationErrors.companyName}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="jobTitle">Job Title *</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g., Senior Developer"
                  className={validationErrors.jobTitle ? styles.inputError : ''}
                />
                {validationErrors.jobTitle && (
                  <span className={styles.errorText}>
                    {validationErrors.jobTitle}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., New York, NY"
                  className={validationErrors.location ? styles.inputError : ''}
                />
                {validationErrors.location && (
                  <span className={styles.errorText}>
                    {validationErrors.location}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="jobType">Job Type *</label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="salaryType">Salary Type *</label>
                <select
                  id="salaryType"
                  name="salaryType"
                  value={formData.salaryType}
                  onChange={handleChange}
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="salaryPackage">Salary Package *</label>
                <input
                  type="text"
                  id="salaryPackage"
                  name="salaryPackage"
                  value={formData.salaryPackage}
                  onChange={handleChange}
                  placeholder="e.g., ₹5L - ₹7L"
                  className={
                    validationErrors.salaryPackage ? styles.inputError : ''
                  }
                />
                {validationErrors.salaryPackage && (
                  <span className={styles.errorText}>
                    {validationErrors.salaryPackage}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="applicationDeadline">
                  Application Deadline *
                </label>
                <input
                  type="date"
                  id="applicationDeadline"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className={
                    validationErrors.applicationDeadline ? styles.inputError : ''
                  }
                />
                {validationErrors.applicationDeadline && (
                  <span className={styles.errorText}>
                    {validationErrors.applicationDeadline}
                  </span>
                )}
              </div>

              <div className={styles.fullWidth}>
                <label htmlFor="portalLink">Application Portal Link *</label>
                <input
                  type="url"
                  id="portalLink"
                  name="portalLink"
                  value={formData.portalLink}
                  onChange={handleChange}
                  placeholder="https://example.com/apply"
                  className={validationErrors.portalLink ? styles.inputError : ''}
                />
                {validationErrors.portalLink && (
                  <span className={styles.errorText}>
                    {validationErrors.portalLink}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading
                  ? isEdit
                    ? '⏳ Updating...'
                    : '⏳ Creating...'
                  : isEdit
                  ? '💾 Update Job'
                  : '➕ Create Job'}
              </button>

              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => navigate('/manage-jobs')}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className={styles.infoBox}>
          <h3>📝 Tips for a Great Job Posting</h3>
          <ul>
            <li>
              <strong>Clear Title:</strong> Use specific job titles that
              candidates search for
            </li>
            <li>
              <strong>Location:</strong> Be specific about where the job is
              located
            </li>
            <li>
              <strong>Salary:</strong> Include a salary range when possible
            </li>
            <li>
              <strong>Deadline:</strong> Set a realistic application deadline
            </li>
            <li>
              <strong>Portal Link:</strong> Make sure the application link is
              valid and working
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
