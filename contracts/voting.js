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
