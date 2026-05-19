import { useState } from 'react';
import { Upload, X, Loader2, Star } from 'lucide-react';
import { uploadImage, isCloudinaryConfigured } from '@/lib/cloudinary';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const MAX_IMAGES = 8;

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export const MultiImageUpload = ({ value, onChange }: MultiImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    if (!isCloudinaryConfigured) {
      toast.error('Cloudinary is not configured. Add your upload preset to .env');
      return;
    }

    const remaining = MAX_IMAGES - value.length;
    if (remaining <= 0) {
      toast.error(`Maximum ${MAX_IMAGES} images per product`);
      return;
    }

    const toUpload = Array.from(files).slice(0, remaining);
    setIsUploading(true);

    try {
      const urls: string[] = [];
      for (const file of toUpload) {
        urls.push(await uploadImage(file));
      }
      onChange([...value, ...urls]);
      toast.success(
        urls.length === 1 ? 'Image uploaded' : `${urls.length} images uploaded`
      );
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const setPrimary = (index: number) => {
    if (index === 0) return;
    const next = [...value];
    const [primary] = next.splice(index, 1);
    onChange([primary, ...next]);
  };

  const canAddMore = value.length < MAX_IMAGES;

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative aspect-square rounded-lg overflow-hidden border border-border group"
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
              {index === 0 && (
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-background/90 px-1.5 py-0.5 text-[10px] font-medium text-accent border border-accent/30">
                  <Star className="w-3 h-3 fill-current" /> Cover
                </span>
              )}
              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => setPrimary(index)}
                    className="p-1 bg-background/90 rounded-full text-xs"
                    title="Set as cover image"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1 bg-background/90 rounded-full"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {canAddMore && (
        <div
          className={cn(
            'relative border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center bg-secondary/20 hover:bg-secondary/30 transition-colors',
            value.length === 0 ? 'aspect-video' : 'py-8'
          )}
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          ) : (
            <>
              <Upload className="w-7 h-7 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground text-center px-4">
                {value.length === 0
                  ? 'Upload product images'
                  : `Add more (${value.length}/${MAX_IMAGES})`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">First image is the cover</p>
            </>
          )}
          <input
            type="file"
            multiple
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
