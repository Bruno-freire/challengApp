import React from 'react';

interface CandidatePageProps {
  name: string;
  phone: string;
  email: string;
}

const CandidatePage: React.FC<CandidatePageProps> = ({ name, phone, email }) => {
    function onRestart() {
        window.location.reload()
    }

  return (
    <div>
      <h2>Candidate Details</h2>
      <p>Name: {name}</p>
      <p>Phone: {phone}</p>
      <p>Email: {email}</p>
      <button onClick={onRestart} className="bg-blue-500 text-white p-2 rounded-md mt-4">Reiniciar</button>
    </div>
  );
};

export default CandidatePage;