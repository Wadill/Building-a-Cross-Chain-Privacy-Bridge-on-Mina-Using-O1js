import { zkCircuit } from 'protokit';

const AgeVerificationCircuit = zkCircuit({
  name: 'AgeVerification',
  inputs: ['age', 'minAge'],
  verify({ age, minAge }) {
    return age >= minAge;
  },
});

export default AgeVerificationCircuit;