import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  defaultValue?: string;
}

export const ImageUpload = ({ onUpload, defaultValue }: ImageUploadProps) => {
  const [preview, setPreview] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      );

      const data = await response.json();
      if (data.secure_url) {
        setPreview(data.secure_url);
        onUpload(data.secure_url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const clear = () => {
    setPreview(undefined);
    onUpload('');
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative aspect-video rounded-lg overflow-hidden border border-border group">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            onClick={clear}
            className="absolute top-2 right-2 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative border-2 border-dashed border-border rounded-lg aspect-video flex flex-col items-center justify-center bg-secondary/20 hover:bg-secondary/30 transition-colors">
          {isUploading ? (
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload product image</p>
            </>
          )}
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleUpload}
            disabled={isUploading}
            accept="image/*"
          />
        </div>
      )}
    </div>
  );
};
