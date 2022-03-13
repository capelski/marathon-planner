export const getPace = (minutes: number, seconds: number) => {
  return minutes * 60 + seconds;
};

export const getPaceMinutes = (pace: number) => Math.floor(pace / 60);

export const getPaceSeconds = (pace: number) => pace % 60;
