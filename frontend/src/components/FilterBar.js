import React, { useState } from 'react';
import styles from './FilterBar.module.css';

const FilterBar = ({ onSearch, onFilter, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryType, setSalaryType] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilter = () => {
    onFilter({
      jobType: jobType || null,
      salaryType: salaryType || null,
      searchTerm,
    });
  };

  const handleClear = () => {
    setSearchTerm('');
    setJobType('');
    setSalaryType('');
    onClear();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilter();
    }
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="🔍 Search by job title or company..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className={styles.select}
            title="Filter by job type"
          >
            <option value="">📋 All Job Types</option>
            <option value="Full-time">💼 Full-time</option>
            <option value="Part-time">⏱️ Part-time</option>
            <option value="Internship">🎓 Internship</option>
          </select>

          <select
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
            className={styles.select}
            title="Filter by salary type"
          >
            <option value="">💰 All Salary Types</option>
            <option value="Paid">✅ Paid</option>
            <option value="Unpaid">❌ Unpaid</option>
          </select>

          <button
            className={styles.filterBtn}
            onClick={handleFilter}
            title="Apply filters"
          >
            Apply Filters
          </button>

          <button
            className={styles.clearBtn}
            onClick={handleClear}
            title="Clear all filters"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
