import Swal from "sweetalert2";
export const displayError = (errorMessage) => {
  console.log(errorMessage)
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${errorMessage.response.data.message}`,
    // footer: '<a href="">Why do I have this issue?</a>',
  });
};
export const displaySuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: `${message}`,
    // footer: '<a href="">Why do I have this issue?</a>',
  });
};
export const daysLeft = (deadline) => {
  const difference = new Date(deadline) - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
