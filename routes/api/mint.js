const express = require("express");
const router = express.Router();
const ipfsClient = require("ipfs-http-client");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const {
  ipfsProjectId,
  ipfsProjectSecret,
  imgurClientId,
} = require("../../constants");

const upload = multer();

const Art = require("../../models/Art");

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

// @route   POST api/mint
// @desc    Uploads stylized image to IPFS, generate metadata (IPFS), mint token to smart contract
// @access  Private
router.post("/", upload.array(), async (req, res) => {
  let fileName;
  let filePath;
  const id = req.body.id;
  const oldFilePath = "images/styledImage/stylized.jpg";
  const testDir = "images/styledImage";

  fs.readdir(testDir, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      console.log(`styledImage Dir: ${file}`);
    }
  });

  // check if file exists + rename to scratchcollective + id
  if (fs.existsSync(oldFilePath)) {
    fs.renameSync(
      oldFilePath,
      `images/styledImage/ScratchCollective${id}.jpg`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    fileName = `ScratchCollective${id}.jpg`;
    filePath = "images/styledImage/" + fileName;
  } else {
    // send error trigger to release loading state
    console.log("No stylized image exists");
    return res.status(400).send({ message: "No sylized image exists" });
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

  // TO DO: look at this, why do you even own a computer? This is trash
  const parent1PathJpg = `/images/inputImagesTemp/original_image.jpg`;
  const parent2PathJpg = `/images/inputImagesTemp/style_image.jpg`;
  const parent1PathPng = `/images/inputImagesTemp/original_image.png`;
  const parent2PathPng = `/images/inputImagesTemp/style_image.png`;
  const parent1PathJpeg = `/images/inputImagesTemp/original_image.jpeg`;
  const parent2PathJpeg = `/images/inputImagesTemp/style_image.jpeg`;
  const parent1PathJfif = `/images/inputImagesTemp/original_image.jfif`;
  const parent2PathJfif = `/images/inputImagesTemp/style_image.jfif`;
  let imgurBodyParent1;
  let imgurBodyParent2;

  if (fs.existsSync(process.cwd() + parent1PathJpg)) {
    imgurBodyParent1 = await getImgurURL(parent1PathJpg);
  } else if (fs.existsSync(process.cwd() + parent1PathPng)) {
    imgurBodyParent1 = await getImgurURL(parent1PathPng);
  } else if (fs.existsSync(process.cwd() + parent1PathJpeg)) {
    imgurBodyParent1 = await getImgurURL(parent1PathJpeg);
  } else {
    imgurBodyParent1 = await getImgurURL(parent1PathJfif);
  }
  const imgurUrlParent1 = imgurBodyParent1.data.link;

  if (fs.existsSync(process.cwd() + parent2PathJpg)) {
    imgurBodyParent2 = await getImgurURL(parent2PathJpg);
  } else if (fs.existsSync(process.cwd() + parent2PathPng)) {
    imgurBodyParent2 = await getImgurURL(parent2PathPng);
  } else if (fs.existsSync(process.cwd() + parent2PathJpeg)) {
    imgurBodyParent2 = await getImgurURL(parent2PathJpeg);
  } else {
    imgurBodyParent2 = await getImgurURL(parent2PathJfif);
  }
  const imgurUrlParent2 = imgurBodyParent2.data.link;

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
        trait_type: "Base Image",
        value: imgurUrlParent1,
      },
      {
        trait_type: "Style Image",
        value: imgurUrlParent2,
      },
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
      parent1Link: imgurUrlParent1,
      parent2Link: imgurUrlParent2,
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

// @route GET mint/store
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
    const baseImageUrl = req.body.baseImageUrl;
    const styleImageUrl = req.body.styleImageUrl;

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
      const directory = "images/styledImage";
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
      console.log(err);
    }

    res.json(art);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
