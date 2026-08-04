const STORAGE_KEY = 'apex_simracing_data_v1';

const DEFAULT_STATE = {
  rubricRatings: {
    priority1_line: 0,         // 0 to 5 stars
    priority2_exitSpeed: 0,    // 0 to 5 stars
    priority3_brakingEntry: 0, // 0 to 5 stars
    mistake1_exitRunoff: false,
    mistake2_lateBraking: false,
    mistake3_badDownshifts: false,
    mistake4_liftingThrottle: false
  },
  sessionLogs: [
    {
      id: 'demo-log-1',
      date: new Date().toISOString().split('T')[0],
      sim: 'iRacing',
      car: 'Formula Vee / Ray FF1600',
      track: 'Sebring International Raceway (Club)',
      bestLap: '1:14.250',
      focusArea: 'Finding R3 ideal line arc at Turn 9 Carousel & unwinding wheel on exit',
      notes: 'Gained 0.3s on the straight by squeezing throttle 10 meters earlier.'
    }
  ],
  quizScores: {
    chapter1: null // { score: 5, total: 5, date: '2026-08-04' }
  },
  simulatorState: {
    cornerRadius: 105, // feet
    frictionCoeff: 1.0,
    entrySpeed: 55 // mph
  }
};

export const getStoredData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (err) {
    console.error('Error reading APEX storage:', err);
    return DEFAULT_STATE;
  }
};

export const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving APEX storage:', err);
  }
};

export const exportUserDataJSON = () => {
  const data = getStoredData();
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `apex-simracing-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importUserDataJSON = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed === 'object' && parsed !== null) {
      saveStoredData(parsed);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed to import JSON data:', err);
    return false;
  }
};

export const resetUserData = () => {
  localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_STATE;
};
