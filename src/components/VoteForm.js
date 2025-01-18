import { useState } from 'react';
import { Mina } from 'protokit';

const VoteForm = ({ contractAddress }) => {
  const [candidateId, setCandidateId] = useState('');
  const [status, setStatus] = useState('');

  const handleVote = async () => {
    try {
      const contract = Mina.loadContract(contractAddress);
      await contract.vote(candidateId);
      setStatus('Vote successfully registered!');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Private Voting</h1>
      <input
        type="text"
        placeholder="Enter Candidate ID"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
      />
      <button onClick={handleVote}>Vote</button>
      <p>{status}</p>
    </div>
  );
};

export default VoteForm;