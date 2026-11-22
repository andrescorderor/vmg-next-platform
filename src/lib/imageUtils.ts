/**
 * Compresses an uploaded image file in the browser using HTML5 Canvas
 * so it can be stored at $0 USD cost in Firestore / LocalStorage (~120-250 KB).
 */
export async function compressImageToDataUrl(
  file: File,
  maxWidth = 1200,
  quality = 0.82
): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('INVALID_IMAGE_TYPE');
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('READ_ERROR'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('IMAGE_DECODE_ERROR'));
      img.onload = () => {
        const ratio = img.width > maxWidth ? maxWidth / img.width : 1;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/webp', quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
