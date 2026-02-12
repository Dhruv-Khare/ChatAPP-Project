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
const TransformImage = (url, width = 100) => {
  if (
    typeof url !== "string" ||
    !url.includes("res.cloudinary.com") ||
    url.endsWith(".mp3")
  ) {
    return url;
  }

  return url.replace(
    "/upload/",
    `/upload/dpr_auto/w_${width}/`
  );
};


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

const getorSaveLocalstorage=({key,value,get})=>{

  if(get) return localStorage.getItem(key)? JSON.parse(localStorage.getItem(key)):null;
  else localStorage.setItem(key,JSON.stringify(value));

}
export { fileFormate, TransformImage, getLastDays,getorSaveLocalstorage };
