'use client';
import { useRef } from 'react';
import ConsentInfo from './ConsentInfo';

function Consent() {
  const wrapSection = useRef(null);

  return (
    <div className="consent_block" ref={wrapSection}>
      <ConsentInfo />
    </div>
  );
}

export default Consent;
