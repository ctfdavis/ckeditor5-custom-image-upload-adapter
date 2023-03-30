export type CustomImageUploadAdapterOptions = {
    defaultErrorMessageFactory?: (fileName: string) => string;
    onSendRequestFailure?: (error: unknown) => void;
    onUpload?: (file: File) => void;
};

export class CustomImageUploadAdapter {
    constructor(private loader: any, private onSendRequest: (file: File) => Promise<string>, private options?: CustomImageUploadAdapterOptions) {}

    async upload() {
        const file = await this.loader.file;
        try {
            this.options?.onUpload?.(file);
            const url = await this.onSendRequest(file);
            return {
                default: url
            };
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : this.options?.defaultErrorMessageFactory?.(file.name) ?? `Upload ${file.name} failed`;
            this.options?.onSendRequestFailure?.(e);
            throw new Error(errorMessage);
        }
    }

    abort() {
        /* NOT IMPLEMENTED */
    }
}
