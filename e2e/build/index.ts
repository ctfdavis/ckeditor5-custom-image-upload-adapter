// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { createCustomImageUploadAdapter } from '../../src'; // Import your package's function

const customImageUploadAdapter = createCustomImageUploadAdapter(onSendRequest);

ClassicEditor.create(document.querySelector('#editor'), {
    extraPlugins: [customImageUploadAdapter]
}).catch((error: unknown) => {
    console.error(error);
});

async function onSendRequest(file: File): Promise<string> {
    return 'https://example.com/image.png';
}
