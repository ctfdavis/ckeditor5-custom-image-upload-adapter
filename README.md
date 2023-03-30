# CKEditor5 Custom Image Upload Adapter

A custom image upload adapter for CKEditor 5, allowing you to integrate your own file upload handler with additional options and callbacks.

## Installation

```bash
# npm
npm install --save ckeditor5-custom-image-upload-adapter

# yarn
yarn add ckeditor5-custom-image-upload-adapter

# pnpm
pnpm add ckeditor5-custom-image-upload-adapter
```

## Usage

First, import the `createCustomImageUploadAdapter` function:

```javascript
import { createCustomImageUploadAdapter } from 'ckeditor5-custom-image-upload-adapter';
```

Then, use the function to configure the image upload adapter for your CKEditor instance:

```typescript
  extraPlugins: [
    createCustomImageUploadAdapter(async function onSendRequest(file: File) {
      // send file to server
      // then return a url of the image
      return 'https://picsum.photos/200/300'
    })
  ]
```

## Explanation

The `createCustomImageUploadAdapter` function takes two parameters: `onSendRequest` and `options`. The `onSendRequest` parameter is a required callback function that handles the image upload request to the server and returns a Promise that resolves with the URL of the uploaded image. The options parameter is an optional object that can be used to configure the behavior of the custom image upload adapter.

The options parameter has the following properties:

- `defaultErrorMessageFactory`: A function that takes a file name as a parameter and returns a string that represents the default error message if the image upload fails. This property is optional.
- `onSendRequestFailure`: A callback function that takes an error object as a parameter and is called if the onSendRequest function throws an error. This property is optional.
- `onUpload`: A callback function that takes a File object as a parameter and is called when the file upload starts. This property is optional.

## Testing

The package is tested with both unit tests (`/test`) and e2e tests (`/e2e`).

To run the e2e tests, you must first build the e2e src:

```bash
npm run build:e2e
```

Then, run the e2e tests:

```bash
npm run test:e2e
```
