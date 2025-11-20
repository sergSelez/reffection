'use client';
import { useRef } from 'react';
import ConsentInfoSecond from './ConsentInfoSecond';

function ConsentSecond() {
  const wrapSection = useRef(null);

  return (
    <div className="consent_block" ref={wrapSection}>
      <ConsentInfoSecond />
    </div>
  );
}

export default ConsentSecond;
