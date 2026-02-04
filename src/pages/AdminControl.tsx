import React from 'react';
import '../styles/modules.css';

export const AdminControl: React.FC = () => {
  const settings = [
    {
      category: 'System Configuration',
      items: [
        { label: 'API Endpoint', value: 'https://api.intellitextile.com' },
        { label: 'Database Host', value: 'mongodb.intellitextile.com' },
        { label: 'ML Service URL', value: 'https://ml.intellitextile.com' },
      ],
    },
    {
      category: 'ML Model Settings',
      items: [
        { label: 'Demand Forecast Model', value: 'LSTM v2.1' },
        { label: 'Price Recommendation Model', value: 'XGBoost v1.3' },
        { label: 'Model Update Frequency', value: 'Weekly' },
      ],
    },
    {
      category: 'Threshold Values',
      items: [
        { label: 'Low Stock Alert Threshold', value: '20%' },
        { label: 'Waste Alert Threshold', value: '15%' },
        { label: 'Price Change Limit', value: '±10%' },
      ],
    },
  ];

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Admin Control Panel</h1>
      </div>

      <div className="admin-section">
        <h3>System Configuration</h3>
        <div className="config-cards">
          {settings.map((setting, idx) => (
            <div key={idx} className="config-card">
              <h4>{setting.category}</h4>
              <div className="config-items">
                {setting.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="config-item">
                    <label>{item.label}</label>
                    <div className="config-value">
                      <input
                        type="text"
                        value={item.value}
                        readOnly
                        className="form-input"
                      />
                      <button className="btn btn-secondary">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Management */}
      <div className="admin-section">
        <div className="section-header">
          <h3>User Management</h3>
          <button className="btn btn-primary">Add New User</button>
        </div>
        <div className="users-grid">
          <div className="user-card">
            <h4>Admin Users</h4>
            <p className="count">2</p>
            <button className="btn btn-secondary">Manage</button>
          </div>
          <div className="user-card">
            <h4>Buyer Users</h4>
            <p className="count">15</p>
            <button className="btn btn-secondary">Manage</button>
          </div>
          <div className="user-card">
            <h4>Total Active Sessions</h4>
            <p className="count">8</p>
            <button className="btn btn-secondary">View</button>
          </div>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="admin-section">
        <h3>Recent System Activity</h3>
        <div className="activity-log">
          <div className="log-item">
            <span className="log-type">User Login</span>
            <span className="log-detail">admin@intellitextile.com</span>
            <span className="log-time">2 hours ago</span>
          </div>
          <div className="log-item">
            <span className="log-type">Data Upload</span>
            <span className="log-detail">Sales data CSV (500 records)</span>
            <span className="log-time">5 hours ago</span>
          </div>
          <div className="log-item">
            <span className="log-type">Report Generated</span>
            <span className="log-detail">Monthly Inventory Report</span>
            <span className="log-time">1 day ago</span>
          </div>
          <div className="log-item">
            <span className="log-type">ML Model Update</span>
            <span className="log-detail">Demand forecast model retrained</span>
            <span className="log-time">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};
