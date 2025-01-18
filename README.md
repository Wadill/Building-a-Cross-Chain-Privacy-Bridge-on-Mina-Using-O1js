# How to Build Privacy-Preserving dApps on Mina Using Protokit

## Project Overview

This project demonstrates how to build privacy-preserving decentralized applications (dApps) using Mina Protocol and Protokit. Mina’s succinct blockchain ensures scalability and accessibility, while Protokit simplifies the integration of zk-SNARKs, enabling developers to create modular, privacy-focused dApps.

---

## Folder Structure

```
my-privacy-dapp/
├── contracts/        # zk-SNARK-enabled contracts
│   ├── voting.js     # Privacy-preserving voting contract
│   └── ageVerification.js # Custom zk-SNARK circuit for age verification
├── public/           # Frontend files
│   └── index.js      # Main entry point for the frontend
├── src/              # Application logic
│   └── components/   # React.js components
│       └── VoteForm.js # Frontend for private voting
├── protokit.config.js # Protokit configuration file
└── package.json      # Project dependencies and scripts
```

---

## Installation and Setup

### Prerequisites

- Node.js and npm
- Rust (for cryptographic libraries)
- Mina Protokit

### Steps

1. **Clone Mina CLI**:
    ```bash
    git clone https://github.com/MinaProtocol/mina.git
    cd mina
    make build
    ```
2. **Install Protokit**:
    ```bash
    npm install -g protokit-sdk
    ```

3. **Initialize the Protokit Project**:
    ```bash
    protokit init my-privacy-dapp
    cd my-privacy-dapp
    ```

---

## Code Samples

### Privacy-Preserving Voting Contract

**File:** `contracts/voting.js`

```javascript
import { zkProgram } from 'protokit';

const VotingContract = zkProgram({
  name: 'PrivateVoting',

  // Initialize the contract state
  initState: {
    totalVotes: 0,
  },

  // Define private voting logic
  methods: {
    vote: {
      private: true,
      inputs: ['candidateId'],
      execute(state, { candidateId }) {
        // Increment vote count privately
        state.totalVotes += 1;
        console.log(`Vote registered for candidate: ${candidateId}`);
      },
    },
  },
});

export default VotingContract;
```

### Frontend Voting Interface

**File:** `src/components/VoteForm.js`

```javascript
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
```

### Main Entry Point for Frontend

**File:** `public/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import VoteForm from '../src/components/VoteForm';

const App = () => {
  const contractAddress = '<YOUR_CONTRACT_ADDRESS>'; // Replace with deployed contract address
  return (
    <div>
      <VoteForm contractAddress={contractAddress} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

---

## Deployment and Testing

### Deploying the Contract

Deploy your contract using the Protokit CLI:

```bash
protokit deploy contracts/voting.js --network testnet
```

### Running the Frontend

Start the frontend application:

```bash
npm start
```

Access the dApp at `http://localhost:3000`.

---

## Advanced Features

### Custom zk-SNARK Circuit: Age Verification

**File:** `contracts/ageVerification.js`

```javascript
import { zkCircuit } from 'protokit';

const AgeVerificationCircuit = zkCircuit({
  name: 'AgeVerification',
  inputs: ['age', 'minAge'],
  verify({ age, minAge }) {
    return age >= minAge;
  },
});

export default AgeVerificationCircuit;
```

---

## Protokit Configuration

**File:** `protokit.config.js`

```javascript
module.exports = {
  network: 'testnet',
  zkSnark: {
    curve: 'bn128',
    circuitsPath: './contracts',
  },
  build: {
    outDir: './build',
    optimizationLevel: 2,
  },
  deployment: {
    contracts: './contracts',
    networkConfig: './network.json',
  },
};
```

### Project Dependencies and Scripts

**File:** `package.json`

```json
{
  "name": "my-privacy-dapp",
  "version": "1.0.0",
  "description": "A privacy-preserving dApp built on Mina Protocol using Protokit",
  "main": "public/index.js",
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production",
    "test": "jest"
  },
  "dependencies": {
    "protokit": "^1.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "webpack": "^5.0.0",
    "webpack-cli": "^5.0.0",
    "webpack-dev-server": "^4.0.0",
    "babel-loader": "^8.0.0",
    "@babel/core": "^7.0.0",
    "@babel/preset-react": "^7.0.0",
    "jest": "^29.0.0"
  }
}
```
