import { CustomImageUploadAdapter, CustomImageUploadAdapterOptions } from './CustomImageUploadAdapter';

export function createCustomImageUploadAdapter(onSendRequest: (file: File) => Promise<string>, options?: CustomImageUploadAdapterOptions) {
    return function (editor: any) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
            return new CustomImageUploadAdapter(loader, onSendRequest, options);
        };
    };
}
