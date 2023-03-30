import { CustomImageUploadAdapter, CustomImageUploadAdapterOptions } from '../src/CustomImageUploadAdapter';
import { createCustomImageUploadAdapter } from '../src';

jest.mock('../src/CustomImageUploadAdapter');

describe('createCustomImageUploadAdapter', () => {
    let editor: any;
    let onSendRequest: jest.Mock;
    let options: CustomImageUploadAdapterOptions;
    let fileRepository: any;

    beforeEach(() => {
        onSendRequest = jest.fn();
        options = {
            defaultErrorMessageFactory: (fileName: string) => `Custom error message: ${fileName}`,
            onSendRequestFailure: jest.fn(),
            onUpload: jest.fn()
        };

        fileRepository = {
            createUploadAdapter: jest.fn()
        };

        editor = {
            plugins: {
                get: jest.fn().mockImplementation((pluginName: string) => {
                    if (pluginName === 'FileRepository') {
                        return fileRepository;
                    }
                })
            }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create and configure CustomImageUploadAdapter', () => {
        createCustomImageUploadAdapter(onSendRequest, options)(editor);

        expect(editor.plugins.get).toHaveBeenCalledWith('FileRepository');
        expect(fileRepository.createUploadAdapter).toBeDefined();

        const mockLoader = { test: 'mockLoader' };
        const adapter = fileRepository.createUploadAdapter(mockLoader);

        expect(CustomImageUploadAdapter).toHaveBeenCalledWith(mockLoader, onSendRequest, options);
        expect(adapter).toBeInstanceOf(CustomImageUploadAdapter);
    });
});
