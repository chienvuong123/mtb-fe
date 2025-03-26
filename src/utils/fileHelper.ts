import type { GetProp, UploadProps } from 'antd';

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const MIME_TYPE = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const downloadFile = (data: Blob, filename: string = 'DSKH.xlsx') => {
  const url = URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadBase64File = (
  base64String: string,
  fileName: string,
  mimeType: string = MIME_TYPE.xlsx,
): void => {
  try {
    // Convert Base64 to Blob
    const byteCharacters = atob(base64String);
    const byteNumbers = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i += 1) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteNumbers], { type: mimeType });

    downloadFile(blob, fileName);
  } catch (error) {
    console.error('Lỗi khi tải xuống file:', error);
  }
};

export const getBase64FromFile = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const formatFileSize = (size: number): string => {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`; // < 1MB → KB
  }
  if (size > 1024 * 1024 * 1000) {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`; // > 1000MB → GB
  }
  return `${(size / (1024 * 1024)).toFixed(2)} MB`; // Default → MB
};
