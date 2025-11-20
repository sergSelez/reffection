'use client';
import { useRef } from 'react';
import ConsentInfoThird from './ConsentInfoThird';

function ConsentThird() {
  const wrapSection = useRef(null);

  return (
    <div className="consent_block" ref={wrapSection}>
      <ConsentInfoThird />
    </div>
  );
}

export default ConsentThird;
