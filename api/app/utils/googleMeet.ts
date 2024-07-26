import { calendar } from '../config/google';

const generateMeetLink = async (): Promise<string> => {
  const event = {
    summary: 'Meeting',
    description: 'Mentorship Meeting',
    conferenceData: {
      createRequest: {
        requestId: 'some-random-string',
        conferenceSolutionKey: { type: 'hangoutsMeet' }
      }
    },
    start: {
      dateTime: new Date().toISOString(),
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
      timeZone: 'America/Los_Angeles'
    }
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1
  });

  const meetLink = response.data.hangoutLink;
  return meetLink || '';
};

export default generateMeetLink;
