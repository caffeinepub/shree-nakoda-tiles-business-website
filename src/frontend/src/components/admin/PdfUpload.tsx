import { useState } from 'react';
import { useGetPdfDocument, useUploadPdfDocument } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText, Download } from 'lucide-react';
import { ExternalBlob } from '../../backend';

export default function PdfUpload() {
  const { data: currentPdf } = useGetPdfDocument();
  const { mutate: uploadPdf, isPending } = useUploadPdfDocument();

  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    }
  };

  const handleUpload = async () => {
    if (!pdfFile) return;

    const arrayBuffer = await pdfFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const pdfBlob = ExternalBlob.fromBytes(uint8Array);

    uploadPdf(pdfBlob, {
      onSuccess: () => {
        setPdfFile(null);
      },
    });
  };

  const handleCancel = () => {
    setPdfFile(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-900">PDF Document</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current PDF */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900">Current PDF Document</CardTitle>
          </CardHeader>
          <CardContent>
            {currentPdf ? (
              <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-amber-50 rounded-lg">
                <FileText className="w-16 h-16 text-amber-600" />
                <p className="text-sm text-muted-foreground">PDF document is available</p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
                >
                  <a
                    href={currentPdf.getDirectURL()}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Open/Download PDF
                  </a>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-amber-50 rounded-lg">
                <FileText className="w-16 h-16 text-amber-300 mb-2" />
                <p className="text-muted-foreground">No PDF uploaded yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload New PDF */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900">Upload New PDF Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pdfFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-amber-600" />
                    <div>
                      <p className="font-medium text-sm">{pdfFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleCancel}
                    disabled={isPending}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-amber-200 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors">
                <Upload className="w-12 h-12 text-amber-400 mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload PDF</span>
                <span className="text-xs text-muted-foreground mt-1">PDF files only</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  className="hidden"
                />
              </label>
            )}

            {pdfFile && (
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
