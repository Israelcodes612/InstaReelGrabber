import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PreviewCard } from "./components/PreviewCard";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";
import { Card, CardContent } from "./components/ui/card";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Download, Link, Info } from "lucide-react";

export default function App() {
  const [url, setUrl] = useState("");
  const [bulkUrls, setBulkUrls] = useState("");
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAdNotice, setShowAdNotice] = useState(false);

  // Mock data for preview cards
  const mockResults = [
    {
      type: 'image' as const,
      thumbnail: 'https://images.unsplash.com/photo-1745398243027-5ac527601f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBzb2NpYWwlMjBtZWRpYSUyMHBob25lfGVufDF8fHx8MTc1ODUyNzA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      url: 'https://example.com/image1',
      title: 'Beautiful sunset over the mountains'
    },
    {
      type: 'video' as const,
      thumbnail: 'https://images.unsplash.com/photo-1582298473456-9f4de0655b6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsaWZlc3R5bGUlMjB2aWRlb3xlbnwxfHx8fDE3NTg1MjcwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      url: 'https://example.com/video1',
      title: 'Morning coffee routine'
    },
    {
      type: 'reel' as const,
      thumbnail: 'https://images.unsplash.com/photo-1656153303280-c761ff69f67a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBwaG90b3xlbnwxfHx8fDE3NTg1MjcwNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      url: 'https://example.com/reel1',
      title: 'Nature photography tips'
    }
  ];

  const handleDownload = () => {
    if ((!isBulkMode && !url.trim()) || (isBulkMode && !bulkUrls.trim())) {
      return;
    }
    
    setShowAdNotice(true);
    setShowResults(true);
  };

  const handleDownloadAll = () => {
    // Mock download all functionality
    console.log("Downloading all items...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Main Input Area */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Download Any Instagram Content
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Save videos, reels, photos, and stories from Instagram with just one click. 
              High quality, fast downloads, completely free.
            </p>
          </div>
          
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Bulk Download Toggle */}
                <div className="flex items-center justify-center space-x-3">
                  <Checkbox
                    id="bulk-mode"
                    checked={isBulkMode}
                    onCheckedChange={(checked) => setIsBulkMode(checked as boolean)}
                    className="border-purple-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <label
                    htmlFor="bulk-mode"
                    className="text-base text-gray-700 cursor-pointer font-medium"
                  >
                    🚀 Enable Bulk Download
                  </label>
                </div>

                {/* Input Field(s) */}
                {!isBulkMode ? (
                  <div className="space-y-5">
                    <div className="relative">
                      <Link className="absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-400 w-6 h-6" />
                      <Input
                        type="url"
                        placeholder="https://www.instagram.com/p/example..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="pl-14 py-7 text-lg border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:ring-0 bg-purple-50/50 placeholder:text-gray-400"
                      />
                    </div>
                    <Button 
                      onClick={handleDownload}
                      size="lg"
                      className="px-10 py-7 text-lg rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      <Download className="w-6 h-6 mr-3" />
                      Download Now
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <Textarea
                      placeholder="Paste multiple Instagram URLs here (one per line)...&#10;https://www.instagram.com/p/example1/&#10;https://www.instagram.com/p/example2/"
                      value={bulkUrls}
                      onChange={(e) => setBulkUrls(e.target.value)}
                      className="min-h-36 text-lg border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:ring-0 bg-purple-50/50 placeholder:text-gray-400"
                    />
                    <Button 
                      onClick={handleDownload}
                      size="lg"
                      className="px-10 py-7 text-lg rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      <Download className="w-6 h-6 mr-3" />
                      Process All Links
                    </Button>
                  </div>
                )}

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-purple-100">
                  <p className="text-sm text-gray-700">
                    💡 <strong>Tip:</strong> Supports all Instagram content - Photos, Videos, Reels, Stories, and IGTV
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ad Notice */}
        {showAdNotice && (
          <div className="mb-8">
            <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm">
              <Info className="h-5 w-5 text-amber-600" />
              <AlertDescription className="text-amber-800 text-base">
                🎬 <strong>Premium Quality Available!</strong> For FHD (Full HD) downloads, please view a short ad first.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Results Area */}
        {showResults && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                ✅ Content Ready for Download!
              </h2>
              <p className="text-gray-600">
                Your Instagram content has been processed and is ready to download
              </p>
            </div>
            
            {isBulkMode && (
              <div className="flex justify-center">
                <Button 
                  onClick={handleDownloadAll}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-8 py-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download All ({isBulkMode ? mockResults.length : 1} items)
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(isBulkMode ? mockResults : mockResults.slice(0, 1)).map((item, index) => (
                <PreviewCard
                  key={index}
                  type={item.type}
                  thumbnail={item.thumbnail}
                  url={item.url}
                  title={item.title}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}