export  const convertToCelsius = (temp) => {
    const num = (5/9) * (temp-32);
  return  Math.round(num * 100) / 100 ;
};