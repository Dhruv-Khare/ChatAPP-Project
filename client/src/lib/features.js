import moment from "moment";

const fileFormate = (url = "") => {
  const fileExt = url.split(".").pop();
  if (fileExt == "mp4" || fileExt == "webm" || fileExt == "ogg") return "video";
  if (fileExt == "mp3" || fileExt == "wav") return "audio";

  if (
    fileExt == "png" ||
    fileExt == "jpg" ||
    fileExt == "jpeg" ||
    fileExt == "gif"
  )
    return "image";

  return "file";
};
const TransformImage = (url, width = 100) => url;

const getLastDays = () => {
  const currenetDate = moment();
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = currenetDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");
    last7Days.unshift(dayName);
  }
  return last7Days;
};
export { fileFormate, TransformImage, getLastDays };
