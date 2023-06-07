import multer from "multer";
import { v4 as uuid } from "uuid";
const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, cb) => {
		cb(null, `${uuid()}.${file.mimetype.split("/")[1]}`); // Dosya adını belirleyin
	},
});

export const upload = multer({ storage: storage });
