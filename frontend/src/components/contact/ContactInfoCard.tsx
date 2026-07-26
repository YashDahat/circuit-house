import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

interface ContactInfoCardProps {
  address: string;
  phone: string;
  whatsappNumber: string;
}

export function ContactInfoCard({ address, phone, whatsappNumber }: ContactInfoCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-[#2D3748]">Get in Touch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <MapPin className="text-[#D69E2E] h-6 w-6" />
          <div>
            <h3 className="font-medium text-lg text-[#2D3748]">Address</h3>
            <p className="text-[#2D3748]">{address}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Phone className="text-[#D69E2E] h-6 w-6" />
          <div>
            <h3 className="font-medium text-lg text-[#2D3748]">Phone</h3>
            <a href={`tel:${phone}`} className="text-[#2D3748] hover:underline transition-all duration-200">
              {phone}
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <MessageCircle className="text-[#D69E2E] h-6 w-6" />
          <div>
            <h3 className="font-medium text-lg text-[#2D3748]">WhatsApp</h3>
            <Button asChild className="bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                Send a Message
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}