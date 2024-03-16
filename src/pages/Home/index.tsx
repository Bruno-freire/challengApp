import React, { useState, useEffect } from 'react';
import RegistrationForm from '../../components/RegistrationForm';
import CountdownTimer from '../../components/CountdownTimer';
import Modal from '../../components/Modal';
import CandidatePage from '../../components/CandidatePage';

const Home: React.FC = () => {
  const [isChallengeStarted, setIsChallengeStarted] = useState(false);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false); 
  const [formData, setFormData] = useState<{ name: string; phone: string; email: string }>({
    name: '',
    phone: '',
    email: '',
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); 

  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isChallengeStarted && !isChallengeCompleted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isChallengeCompleted) {
      setIsModalOpen(true);
      setIsSubmitDisabled(true); 
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [isChallengeStarted, isChallengeCompleted, timeLeft]);

  const handleStartChallenge = () => {
    setIsChallengeStarted(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsChallengeCompleted(true);
    setIsSuccessModal(true); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsSuccessModal(false); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col container items-center w-auto mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Challenge app</h1>
      {!isChallengeStarted && !isChallengeCompleted && (
        <RegistrationForm onStartChallenge={handleStartChallenge} onInputChange={handleInputChange} />
      )}
      {isChallengeStarted && !isChallengeCompleted && (
        <>
          <CountdownTimer timeLeft={timeLeft} />
          <form onSubmit={handleFormSubmit} className="mt-4">
            <button
              type="submit"
              className={`bg-blue-500 text-white p-2 rounded-md ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitDisabled}
            >
              Enviar
            </button>
          </form>
        </>
      )}
      {isChallengeCompleted && <CandidatePage {...formData} />}
      {(isModalOpen || isSuccessModal) && (
        <Modal onClose={handleModalClose} content={isModalOpen ? "Desafio finalizado com falha!" : "Desafio finalizado com sucesso!"} />
      )}
    </div>
  );
};

export default Home;
