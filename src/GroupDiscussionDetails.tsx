import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupDiscussionDetails: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen theme-bg theme-text py-8 px-2 md:px-10 flex items-center justify-center">
      <div className="w-full max-w-3xl glass-card rounded-2xl flex flex-col gap-6 p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-2 gradient-text text-center" style={{backgroundImage: 'linear-gradient(90deg, #4f3bc0, #0066ff, #FF28A9, #D12DFF, #7C3DF2, #3F45F2, #00CFFF, #00FFB8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent'}}>Group Discussion</h1>
        <p className="mb-2">30 April 2025</p>
        <p className="mb-6"><strong>Details:</strong> Further details related to time will be shared soon.</p>
        <h2 className="text-xl font-semibold mb-2">1. General Guidelines</h2>
        <ul className="list-disc list-inside mb-4 theme-text-secondary">
          <li>The event is open to all registered participants.</li>
          <li>College Identity is Mandatory</li>
          <li>Participants must be present at the venue 10 minutes before the scheduled time.</li>
          <li>Mobile phones and any other electronic devices must be switched off during the discussion.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">2. Group Formation & Topics</h2>
        <ul className="list-disc list-inside mb-4 theme-text-secondary">
          <li>Participants will be divided into groups of 8-10 members based on the number of entries.</li>
          <li>Topics will be given on the spot by the judge/moderator.</li>
          <li>The topic will be different for each group, but the difficulty level will be the same.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">3. Rules of the Discussion</h2>
        <ul className="list-disc list-inside mb-4 theme-text-secondary">
          <li>Each group will have 2 minutes for spontaneous preparation and a discussion duration of 10 minutes.</li>
          <li>A moderator will oversee the discussion and ensure smooth proceedings.</li>
          <li>Participants must speak in English.</li>
          <li>Each participant must contribute meaningfully without interrupting others.</li>
          <li>Use of offensive language, personal attacks, or disrespectful behaviour will lead to disqualification by the moderator.</li>
          <li>Participants should not carry notes; spontaneous discussion is encouraged.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">4. Evaluation Criteria</h2>
        <p className="mb-4 theme-text-secondary">Evaluation criteria will be decided by the judge/moderator.</p>
        <h2 className="text-xl font-semibold mb-2">5. Results & Awards</h2>
        <ul className="list-disc list-inside mb-4 theme-text-secondary">
          <li>The decision of the judges will be final and binding.</li>
          <li>Winners and runners-up will be announced at the end of the event.</li>
          <li>Certificates and prizes will be awarded as per the event structure.</li>
          <li>Every participant will receive a certificate at the end of the event.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">6. Miscellaneous</h2>
        <ul className="list-disc list-inside mb-4 theme-text-secondary">
          <li>AISA (Artificial Intelligence and Data Science Students Association) reserves the right to amend rules if necessary.</li>
          <li>In case of disputes, the decision of the event coordinator will be final.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Contact For Further Information</h2>
        <ul className="list-disc list-inside mb-4 theme-text-secondary">
          <li>Event Coordinator: Tejas Narute  </li>
          <li>Contact No: 7517055941</li>
          <li>Email: tejasnarute04@gmail.com</li>
        </ul>

        <button className="mt-8 w-full btn-primary" style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}} onClick={() => navigate(-1)}>
          ← Return
        </button>
      </div>
    </div>
  );
};

export default GroupDiscussionDetails;
