import { format } from "date-fns";

const getFormattedDate = (createdAt: number) => {
  const epocAWeekAgo = Date.now() - 604800000;
  const epocADayAgo = Date.now() - 86400000;
  var formatedCreatedAt;
  if (createdAt <= epocAWeekAgo) {
    formatedCreatedAt = format(new Date(createdAt), "MMMM do H:mma");
  } else {
    if (createdAt <= epocADayAgo) {
      formatedCreatedAt = format(new Date(createdAt), "eeee H:mma");
    } else {
      formatedCreatedAt = format(new Date(createdAt), "'Today' H:mma");
    }
  }
  return formatedCreatedAt;
};

export default getFormattedDate;
