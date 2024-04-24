import React, { useState } from 'react';

const MultiTierForm = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNext={handleNext} />;
      case 2:
        return <Step2 onBack={handleBack} onNext={handleNext} />;
      case 3:
        return <Step3 onBack={handleBack} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

const Step1 = ({ onNext }) => {
  const [name, setName] = useState('');

  return (
    <div>
      <h1>Step 1</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onNext}>Next</button>
    </div>
  );
};

const Step2 = ({ onBack, onNext }) => {
  const [email, setEmail] = useState('');

  return (
    <div>
      <h1>Step 2</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={onBack}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

const Step3 = ({ onBack, onSubmit }) => {
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>Step 3</h1>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onBack}>Back</button>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default MultiTierForm;