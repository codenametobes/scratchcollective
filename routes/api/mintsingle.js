const express = require("express");
const router = express.Router();
const ipfsClient = require("ipfs-http-client");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const Art = require("../../models/Art");

const {
  ipfsProjectId,
  ipfsProjectSecret,
  imgurClientId,
} = require("../../constants");

// multer instantiation
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/singleImage");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jfif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .jfif and .jpeg format allowed!"));
    }
  },
});

const upload = multer({ storage: fileStorageEngine });

// infura ipfs - should be in config file constants
const auth =
  "Basic " +
  Buffer.from(ipfsProjectId + ":" + ipfsProjectSecret).toString("base64");

// instantiate infura client
const client = new ipfsClient.create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// @route   POST api/mintsingle
// @desc    Uploads single image to IPFS, generate metadata (IPFS), mint token to smart contract
// @access  Private
router.post("/", upload.array("image"), async (req, res) => {
  const id = req.body.id;

  let fileName;
  let filePath;
  file1 = req.files[0].filename;
  file1Ext = file1.split(".")[1];

  if (fs.existsSync(req.files[0].path)) {
    fs.renameSync(
      req.files[0].path,
      `images/singleImage/ScratchCollective${id}.${file1Ext}`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    fileName = `ScratchCollective${id}.${file1Ext}`;
    filePath = "images/singleImage/" + fileName;
  } else {
    return res.status(400).send({ message: "No (single) image exists" });
  }

  // upload file to IPFS and get the hash
  const ipfsObj = await addFile(fileName, filePath);
  const img_cid_obj = await ipfsObj.cid;
  const img_cid = img_cid_obj.toString();

  // send stylized image + parent images to hosting site and return (3) URLs
  const getImgurURL = async (localPath) => {
    const data = new FormData();

    data.append("image", fs.createReadStream(process.cwd() + localPath));

    const imgurConfig = {
      method: "post",
      url: "https://api.imgur.com/3/image",
      headers: {
        Authorization: `Client-ID ${imgurClientId}`,
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios(imgurConfig);

    return response.data;
  };

  const imgurBodyStyled = await getImgurURL(`/${filePath}`);
  const imgurUrlStyled = imgurBodyStyled.data.link;

  // METADATA - create JSON metadata using CID from ipfs image
  const name = req.body.name;
  const description = req.body.description;
  const creator = req.body.minter;

  const metadata_json = JSON.stringify({
    description: description,
    external_url: imgurUrlStyled,
    image: `https://ipfs.io/ipfs/${img_cid}`,
    name: name,
    attributes: [
      {
        display_type: "date",
        trait_type: "Created On",
        value: Date.now(),
      },
      {
        trait_type: "Original Creator",
        value: creator,
      },
    ],
  });

  const metadata = await client.add(metadata_json);
  const metadata_cid = metadata.cid;

  // return cid for input into contract; img cid for url on view page
  res.send({
    mintData: {
      cid: metadata_cid.toString(),
      imgCid: img_cid,
      imgurLink: imgurUrlStyled,
      parent1Link: "Single image, No Parent 1",
      parent2Link: "Single image, No Parent 2",
    },
  });
});

// @helper for POST api/mint - add image file to IPFS
const addFile = async (fileName, filePath) => {
  const file = fs.readFileSync(filePath);
  const fileAdded = await client.add({
    path: fileName,
    content: file,
  });
  return fileAdded;
};

// @route GET mintsingle/store
// @desc store data into mongoDB for faster frontend viewing
router.post("/store", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const imgUrl = req.body.imgUrl;
    const originalCreator = req.body.originalCreator;
    const scratchCollectiveId = req.body.scratchCollectiveId;
    const ipfsImgUri = req.body.ipfsImgUri;
    const tokenUri = req.body.tokenUri;
    const txHash = req.body.txHash;
    const networkId = req.body.networkId;
    const baseImageUrl = "Single Image, Base image N/A";
    const styleImageUrl = "Single Image, Style image N/A";

    const newArt = new Art({
      name,
      description,
      imgUrl,
      originalCreator,
      scratchCollectiveId,
      ipfsImgUri,
      tokenUri,
      txHash,
      networkId,
      parents: {
        baseImageUrl: baseImageUrl,
        styleImageUrl: styleImageUrl,
      },
    });

    const art = await newArt.save();

    console.log("saved to mongo");

    try {
      const directory = "images/singleImage";
      const directory2 = "images/inputImagesTemp";

      fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          if (file != ".gitkeep") {
            fs.unlink(path.join(directory, file), (err) => {
              if (err) throw err;
            });
          }
        }
      });

      fs.readdir(directory2, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          if (file != ".gitkeep") {
            fs.unlink(path.join(directory2, file), (err) => {
              if (err) throw err;
            });
          }
        }
      });
    } catch (err) {
      console.log("did not clear singleImage");
      console.log(`error: ${err}`);
    }

    res.json(art);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
