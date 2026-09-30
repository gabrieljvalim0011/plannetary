import React from 'react';

export default function PhenomenonIcon({ type }) {
  if (type === 'blood') {
    return (
      <svg className="phenomenon-art" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="19" fill="#c84d62" />
        <ellipse cx="25" cy="25" rx="8" ry="5" fill="rgba(255,255,255,.11)" />
        <path d="M15 34c6-7 18-8 32-1 3 2 4 5 4 8-5 7-11 10-19 10-9 0-16-4-21-11 0-2 1-4 4-6Z" fill="rgba(17,21,30,.55)" />
        <circle cx="32" cy="32" r="19" fill="none" stroke="rgba(255,255,255,.14)" />
      </svg>
    );
  }

  if (type === 'blue') {
    return (
      <svg className="phenomenon-art" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="19" fill="#6d8df0" />
        <circle cx="25" cy="25" r="5" fill="rgba(255,255,255,.08)" />
        <circle cx="38" cy="37" r="4" fill="rgba(22,30,58,.22)" />
        <circle cx="32" cy="32" r="19" fill="none" stroke="rgba(190,210,255,.24)" />
      </svg>
    );
  }

  if (type === 'micro') {
    return (
      <svg className="phenomenon-art" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="25" fill="none" stroke="rgba(148,183,255,.18)" strokeDasharray="2.5 4" />
        <circle cx="32" cy="32" r="15" fill="#d9e2f5" />
        <ellipse cx="27" cy="27" rx="6" ry="4" fill="rgba(255,255,255,.18)" />
        <circle cx="32" cy="32" r="15" fill="none" stroke="rgba(255,255,255,.10)" />
      </svg>
    );
  }

  return (
    <svg className="phenomenon-art" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="23" fill="none" stroke="rgba(148,183,255,.18)" />
      <circle cx="32" cy="32" r="19" fill="#e6edf8" />
      <circle cx="25" cy="24" r="4.5" fill="rgba(255,255,255,.20)" />
      <circle cx="39" cy="37" r="5" fill="rgba(40,50,70,.18)" />
      <circle cx="32" cy="32" r="19" fill="none" stroke="rgba(255,255,255,.16)" />
    </svg>
  );
}
