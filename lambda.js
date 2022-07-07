const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.handler = async (event) => {


  //dynamically get the newly uploaded file
  let bucketName = event.Records[0].s3.bucket.name;
  let fileName = event.Records[0].s3.object.key;
  const fileSize = event.Records[0].s3.object.size;

  console.log('event:', bucketName, fileName, fileSize);

  const params = {
    Bucket: bucketName,
    Key: 'images.json',
  };


  try {
    const imageManifest = await s3.getObject(params).promise();
    let stringified = imageManifest.Body.toString();
    let myImages = JSON.parse(stringified);
    console.log('console:', myImages);

    myImages.push({
      name: fileName,
      size: fileSize,
      type: 'image/jpeg',
    });
    let manifestBody = JSON.stringify(myImages);
    const newManifest = await s3.putObject({ ...params, Body: manifestBody, ContentType: 'application/json' }).promise();

    console.log('image upload completed', newManifest);

  } catch (e) {
    console.log(e);
    if (e.message === 'The specified key does not exist.') {
      const newManifest = {
        Bucket: bucketName,
        Key: 'images.json',
        Body: JSON.stringify([{ name: fileName, size: fileSize, type: 'image/jpeg' }]),
        ContentType: 'application/json',
      };
      const manifest = await s3.putObject(newManifest).promise();
      console.log('JSON file created for bucket', manifest);
    }
    // console.log('need to create json file');
  }

  // TODO implement
  const payload = {
    statusCode: 200,
    body: JSON.stringify('Hello!'),
  };
  return payload;
};
