import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage, isCloudinaryConfigured } from '@/lib/cloudinary';
import { toast } from 'sonner';

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

    if (!isCloudinaryConfigured) {
      toast.error('Cloudinary is not configured. Add your upload preset to .env');
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setPreview(url);
      onUpload(url);
      toast.success('Image uploaded');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      e.target.value = '';
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
            type="button"
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