import multer from "multer"

export const storageUserPhoto = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets/uploads/photos')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      // image/png kita ambil data yang png
      const extension = file.mimetype.split('/')[1]

      const filename = `photo-${uniqueSuffix}.${extension}`
      cb(null, filename)
    }
  })