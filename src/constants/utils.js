export const PHONE_REGEX =
  /^((\+92)?(0092)?(92)?(0)?)(3)((0)?(1)?(2)?(3)?(4)?)([0-9]{8})$/gm;

export const ALPHABET_REGIX = /^[a-zA-Z]+$/;

export const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


export const dateAndTimeFormatter = (seconds, nanoseconds) => {
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  const formattedTime = date.toLocaleTimeString();

  return {formattedDate, formattedTime}
}