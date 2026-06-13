export const getRunningTimeToString = (runtime: number): string => {
  const hour = Math.floor(runtime / 60);
  const minute = runtime % 60;


  return (hour ? hour + '시간' : '') + (minute && minute + '분')
}