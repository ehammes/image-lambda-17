# LAB 17

## Project: image-lambda-17

### Author: Elizabeth Hammes

### Problem Domain  

AWS Lambda allows writing code that is triggered in the cloud, without thinking about maintaining servers. We’ll use it to automatically run some processing on image files after they’re uploaded to an S3 Bucket.

Tasks include:

* Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser
* A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far
* When an image is uploaded to your S3 bucket, it should trigger a Lambda function which must:
  * Download a file called “images.json” from the S3 Bucket if it exists
  * The images.json should be an array of objects, each representing an image. Create an empty array if this file is not present
  * Create a metadata object describing the image: Name, Size, Type, etc.
  * Append the data for this image to the array
  * Upload the images.json file back to the S3 bucket

### Links and Resources

* [ci/cd](https://github.com/ehammes/image-lambda-17/actions) (GitHub Actions)

#### Setup

* **S3 Bucket**: add jpeg files to the following s3 bucket called `image-lambda-17`
* **Lambda**: Using the `add-image` lambda, the trigger is configured for .jpeg files added to the `image-lambda-17` s3 bucket and captures file information to the images.json file
* **images.json file**: [images.json](/images.json)
* Needed to verify that all access controls were configured correctly (ie s3 policy access) in order for lambda to access the s3 bucket
