import { formatDistance } from "date-fns";

const getUTCDate = (origDate) => {
  let date = new Date(origDate);

  return new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
}

export const getDateTimeDifference = (created_date) => {
  let createdDate = new Date(created_date);
  createdDate.toString();

  let todaysDate = getUTCDate(new Date().toString());

  return formatDistance(createdDate, todaysDate);
};
