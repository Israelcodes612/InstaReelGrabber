import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Image, Video, Play } from "lucide-react";

interface PreviewCardProps {
  type: 'image' | 'video' | 'reel';
  thumbnail: string;
  url: string;
  title?: string;
}

export function PreviewCard({ type, thumbnail, url, title }: PreviewCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'reel':
        return <Play className="w-5 h-5" />;
      default:
        return <Image className="w-5 h-5" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'video':
        return 'Video';
      case 'reel':
        return 'Reel';
      default:
        return 'Image';
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
          <img 
            src={thumbnail} 
            alt={title || `Instagram ${type}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-lg">
            {getIcon()}
            {getTypeLabel()}
          </div>
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
        </div>
        <div className="p-5">
          {title && <p className="text-sm text-gray-700 mb-4 line-clamp-2 font-medium">{title}</p>}
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg transition-all">
            <Download className="w-4 h-4 mr-2" />
            Download {getTypeLabel()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}