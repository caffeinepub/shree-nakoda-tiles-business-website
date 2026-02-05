import { useState } from 'react';
import { useGetBusinessCardImage, useUploadBusinessCardImage } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { ExternalBlob } from '../../backend';

export default function BusinessCardUpload() {
  const { data: currentImage } = useGetBusinessCardImage();
  const { mutate: uploadImage, isPending } = useUploadBusinessCardImage();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    const arrayBuffer = await imageFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const imageBlob = ExternalBlob.fromBytes(uint8Array);

    uploadImage(imageBlob, {
      onSuccess: () => {
        setImageFile(null);
        setImagePreview(null);
      },
    });
  };

  const handleCancel = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-900">Business Card Image</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Image */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900">Current Business Card</CardTitle>
          </CardHeader>
          <CardContent>
            {currentImage ? (
              <img
                src={currentImage.getDirectURL()}
                alt="Current Business Card"
                className="w-full rounded-lg shadow-md"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-amber-50 rounded-lg">
                <ImageIcon className="w-16 h-16 text-amber-300 mb-2" />
                <p className="text-muted-foreground">No business card uploaded yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload New Image */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900">Upload New Business Card</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full rounded-lg shadow-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleCancel}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-amber-200 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors">
                <Upload className="w-12 h-12 text-amber-400 mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}

            {imageFile && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 border-amber-300"
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={isPending}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
