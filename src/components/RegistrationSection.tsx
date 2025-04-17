import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { events } from '../data/events';
import { submitToGoogleSheet } from '../utils/submitForm';

type FormData = {
  name: string;
  email: string;
  phone: string;
  college: string;
  event: string;
  teamMembers?: string;
  yearOfStudy: string;
  boxCricketPlayers?: string[];
  referenceCode?: string;
};

const RegistrationSection: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm<FormData>();
  const [selectedEvent, setSelectedEvent] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const onSubmit = async (data: FormData) => {
    const eventMap: Record<string, string> = {
      'Group Discussion (GD)': 'Coding',
      'Technical Marathon': 'Coding',
      'Dock The Flag': 'Quiz',
      'Box Cricket': 'Box Cricket',
    };
    const event_name = eventMap[data.event] || data.event;
    const formData: any = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      college: data.college,
      year: data.yearOfStudy,
      event_name,
      reference: data.referenceCode || '',
    };
    if (data.boxCricketPlayers && event_name === 'Box Cricket') {
      data.boxCricketPlayers.forEach((player, idx) => {
        formData[`player${idx + 1}`] = player || '';
      });
    }
    try {
      const response = await submitToGoogleSheet(formData);
      setSubmissionStatus({
        message: response,
        type: response.includes('Registered Successfully') ? 'success' : 'error',
      });
      if (response.includes('Registered Successfully')) {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: data.name, email: data.email }),
        });
      }
    } catch {
      setSubmissionStatus({
        message: 'There was a problem with your registration. Please try again later.',
        type: 'error',
      });
    }
  };

  const currentEventFee = events.find(e => e.title === watch('event'))?.fee || 0;

  const renderBoxCricketPlayers = () => {
    return (
      <div>
        <label className="block text-sm font-medium mb-2">Team Members (7 Players)*</label>
        <div className="grid grid-cols-1 gap-2">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div key={idx}>
              <input
                className="form-input"
                placeholder={`Player ${idx + 1} Name`}
                {...register(`boxCricketPlayers.${idx}` as const, {
                  required: 'Player name is required',
                  validate: value => value && value.trim() !== '' || 'Player name is required'
                })}
              />
              {errors.boxCricketPlayers && errors.boxCricketPlayers[idx] && (
                <p className="text-red-400 text-sm mt-1">{errors.boxCricketPlayers[idx]?.message as string}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="registration" className="min-h-screen w-full py-20 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
          Register Now
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 glass-card p-8 rounded-2xl">
          <div>
            <label className="block text-sm font-medium mb-2">Name*</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="form-input"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email*</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email'
                }
              })}
              className="form-input"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number*</label>
            <input
              type="tel"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Please enter a valid 10-digit phone number'
                }
              })}
              className="form-input"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">College Name*</label>
            <input
              {...register('college', { required: 'College name is required' })}
              className="form-input"
            />
            {errors.college && <p className="text-red-400 text-sm mt-1">{errors.college.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Year of Study*</label>
            <select
              {...register('yearOfStudy', { required: 'Please select your year of study' })}
              className="form-input"
            >
              <option value="">--Select year--</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Other">Other</option>
            </select>
            {errors.yearOfStudy && <p className="text-red-400 text-sm mt-1">{errors.yearOfStudy.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select Event*</label>
            <select
              {...register('event', { required: 'Please select an event' })}
              onChange={e => {
                setSelectedEvent(e.target.value);
                if (e.target.value !== 'Box Cricket') {
                  setValue('boxCricketPlayers', undefined);
                }
              }}
              className="form-input"
            >
              <option value="">--Select an event--</option>
              {events.map(event => (
                <option key={event.id} value={event.title}>{event.title}</option>
              ))}
            </select>
            {errors.event && <p className="text-red-400 text-sm mt-1">{errors.event.message}</p>}
          </div>

          {selectedEvent === 'Box Cricket' && renderBoxCricketPlayers()}
          {selectedEvent && events.find(e => e.title === selectedEvent)?.requiresTeam && selectedEvent !== 'Box Cricket' && selectedEvent !== 'Technical Marathon' && (
            <div>
              <label className="block text-sm font-medium mb-2">Team Members</label>
              <textarea
                {...register('teamMembers')}
                rows={3}
                className="form-input"
                placeholder="Enter team members' names (one per line)"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Reference Code (Optional)</label>
            <input
              {...register('referenceCode')}
              className="form-input"
              placeholder="Enter reference code if any"
            />
          </div>

          <div className="glass-card p-4 rounded-lg">
            <p className="text-sm font-medium">Entry Fee:</p>
            <p className="text-2xl font-bold text-blue-500">₹{currentEventFee}</p>
          </div>

          <button
            type="submit"
            className="w-full btn-primary"
          >
            Register
          </button>
        </form>

        {submissionStatus && (
          <div className={`mt-4 p-4 rounded-lg ${
            submissionStatus.type === 'success' ? 'bg-green-600/20' : 'bg-red-600/20'
          } glass-card`}>
            {submissionStatus.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default RegistrationSection;
