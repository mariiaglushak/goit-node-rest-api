import Jimp from "jimp";

const jimpProcessingAvatar = async (req, res, next) => {
  try {
    const imgAvatar = await Jimp.read(req.file.path);
    imgAvatar.resize(250, 250);
    imgAvatar.writeAsync(req.file.path);

    next();
  } catch (error) {
    next(error);
  }
};

export default jimpProcessingAvatar;
