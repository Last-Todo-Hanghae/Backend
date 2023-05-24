const { S3Client } = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new S3Client({	region: "ap-northeast-2" });

// Multer 및 Multer-S3 설정
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'lasttodo',
    acl: 'public-read', // 이미지가 공개적으로 접근 가능하도록 설정
    key: function (req, file, cb) {
			const fileName = `${Date.now().toString()}.${file.originalname.split('.').pop()}`;
      cb(null, fileName);; // S3에 저장되는 파일 이름 설정
    },
		contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

module.exports = upload;