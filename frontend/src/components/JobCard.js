import React, { useState, useMemo } from 'react';
import styles from './JobCard.module.css';
import { formatDistanceToNow } from 'date-fns';

const JobCard = ({ job, onApply, onEdit, onDelete, isAdmin = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  const deadlineInfo = useMemo(() => {
    const now = new Date();
    const deadline = new Date(job.applicationDeadline);
    const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    
    return {
      daysLeft,
      isExpired: daysLeft < 0,
      isUrgent: daysLeft <= 7 && daysLeft > 0,
      relativeTime: formatDistanceToNow(deadline, { addSuffix: true }),
    };
  }, [job.applicationDeadline]);

  const getJobTypeColor = (type) => {
    switch (type) {
      case 'Full-time':
        return styles.fullTime;
      case 'Part-time':
        return styles.partTime;
      case 'Internship':
        return styles.internship;
      default:
        return '';
    }
  };

  const getSalaryTypeColor = (type) => {
    return type === 'Paid' ? styles.paid : styles.unpaid;
  };

  const getDeadlineColor = () => {
    if (deadlineInfo.isExpired) return styles.expired;
    if (deadlineInfo.isUrgent) return styles.urgent;
    return styles.active;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h3 className={styles.jobTitle}>{job.jobTitle}</h3>
          <p className={styles.companyName}>{job.companyName}</p>
        </div>
        <div className={styles.badgeGroup}>
          <span className={`${styles.badge} ${getJobTypeColor(job.jobType)}`}>
            {job.jobType}
          </span>
          <span className={`${styles.badge} ${getSalaryTypeColor(job.salaryType)}`}>
            {job.salaryType}
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.infoRow}>
          <span className={styles.label}>📍 Location:</span>
          <span className={styles.value}>{job.location}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>💰 Salary:</span>
          <span className={styles.value}>{job.salaryPackage}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>⏰ Posted:</span>
          <span className={styles.value}>
            {new Date(job.postedDate).toLocaleDateString()}
          </span>
        </div>

        <div className={`${styles.infoRow} ${getDeadlineColor()}`}>
          <span className={styles.label}>📅 Deadline:</span>
          <div className={styles.deadlineInfo}>
            <span className={styles.value}>
              {new Date(job.applicationDeadline).toLocaleDateString()}
            </span>
            {deadlineInfo.isExpired ? (
              <span className={styles.expired}>❌ Application Closed</span>
            ) : (
              <span className={styles.countdown}>
                {deadlineInfo.daysLeft} days left
              </span>
            )}
          </div>
        </div>
      </div>

      {showDetails && (
        <div className={styles.detailsSection}>
          <div className={styles.detailRow}>
            <strong>Job ID:</strong> {job._id}
          </div>
          <div className={styles.detailRow}>
            <strong>Application Portal:</strong>
            <a
              href={job.portalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {job.portalLink}
            </a>
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <button
          className={styles.toggleBtn}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? '▼ Hide Details' : '▶ Show Details'}
        </button>

        <div className={styles.actionButtons}>
          {!deadlineInfo.isExpired && (
            <button
              className={`${styles.btn} ${styles.applyBtn}`}
              onClick={() => onApply(job)}
            >
              Apply Now →
            </button>
          )}

          {isAdmin && (
            <>
              <button
                className={`${styles.btn} ${styles.editBtn}`}
                onClick={() => onEdit(job)}
                title="Edit job posting"
              >
                Edit
              </button>
              <button
                className={`${styles.btn} ${styles.deleteBtn}`}
                onClick={() => onDelete(job._id)}
                title="Delete job posting"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
