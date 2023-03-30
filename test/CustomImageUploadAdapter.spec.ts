import { CustomImageUploadAdapter, CustomImageUploadAdapterOptions } from '../src/CustomImageUploadAdapter';

describe('CustomImageUploadAdapter', () => {
    let loader: any;
    let onSendRequest: jest.Mock;
    let options: CustomImageUploadAdapterOptions;
    let file: File;

    beforeEach(() => {
        loader = {
            file: Promise.resolve(new File([''], 'test-image.png'))
        };
        onSendRequest = jest.fn();
        options = {
            defaultErrorMessageFactory: (fileName: string) => `Custom error message: ${fileName}`,
            onSendRequestFailure: jest.fn(),
            onUpload: jest.fn()
        };
        file = new File([''], 'test-image.png');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('upload()', () => {
        it('should handle success', async () => {
            onSendRequest.mockResolvedValue('https://test-url.com/test-image.png');
            const adapter = new CustomImageUploadAdapter(loader, onSendRequest, options);

            const result = await adapter.upload();

            expect(onSendRequest).toHaveBeenCalledWith(file);
            expect(options.onUpload).toHaveBeenCalledWith(file);
            expect(result).toEqual({ default: 'https://test-url.com/test-image.png' });
        });

        describe('error', () => {
            describe('instanceof Error', () => {
                it('should handle error', async () => {
                    const errorMessage = 'Network Error';
                    const error = new Error(errorMessage);
                    onSendRequest.mockRejectedValue(error);
                    const adapter = new CustomImageUploadAdapter(loader, onSendRequest, options);
                    await expect(adapter.upload()).rejects.toThrowError(errorMessage);
                    expect(onSendRequest).toHaveBeenCalledWith(file);
                    expect(options.onUpload).toHaveBeenCalledWith(file);
                    expect(options.onSendRequestFailure).toHaveBeenCalledWith(error);
                });

                it('should handle error without custom error message', async () => {
                    const errorMessage = 'Network Error';
                    const error = new Error(errorMessage);
                    onSendRequest.mockRejectedValue(error);
                    const adapter = new CustomImageUploadAdapter(loader, onSendRequest);

                    await expect(adapter.upload()).rejects.toThrowError(errorMessage);
                });
            });

            describe('not instanceof Error', () => {
                it('should handle error', async () => {
                    const errorMessage = 'Custom error message: test-image.png';
                    onSendRequest.mockRejectedValue('Network Error');
                    const adapter = new CustomImageUploadAdapter(loader, onSendRequest, options);
                    await expect(adapter.upload()).rejects.toThrowError(errorMessage);
                    expect(onSendRequest).toHaveBeenCalledWith(file);
                    expect(options.onUpload).toHaveBeenCalledWith(file);
                    expect(options.onSendRequestFailure).toHaveBeenCalledWith('Network Error');
                });

                it('should handle error without custom error message', async () => {
                    const errorMessage = 'Upload test-image.png failed';
                    onSendRequest.mockRejectedValue('Network Error');
                    const adapter = new CustomImageUploadAdapter(loader, onSendRequest);

                    await expect(adapter.upload()).rejects.toThrowError(errorMessage);
                });
            });
        });
    });
    describe('abort', () => {
        it('should exist', () => {
            const adapter = new CustomImageUploadAdapter(loader, onSendRequest, options);
            expect(adapter.abort).toBeDefined();
        });
    });
});
