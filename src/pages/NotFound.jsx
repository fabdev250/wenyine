import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound-page" style={{ padding: 40, textAlign: 'center' }}>
      <h1 style={{ fontSize: 48, marginBottom: 8 }}>404</h1>
      <h2 style={{ marginTop: 0 }}>Page not found</h2>
      <p>The page you requested does not exist or has been moved.</p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  );
}
