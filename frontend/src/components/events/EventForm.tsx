import { useState, useEffect } from 'react';
import { EventDto } from '@/types/event';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';

interface EventFormProps {
  initialData?: EventDto;
  onSubmit: (event: EventDto) => void;
  onCancel: () => void;
}

export function EventForm({ initialData, onSubmit, onCancel }: EventFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [eventTime, setEventTime] = useState(initialData?.eventTime ?? '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? '');
      setDescription(initialData.description ?? '');
      setEventTime(initialData.eventTime ?? '');
      setImageUrl(initialData.imageUrl ?? '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id ?? null,
      name,
      description,
      eventTime,
      imageUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Event Name
        </Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <Label htmlFor="eventTime" className="block text-sm font-medium text-gray-700">
          Event Time
        </Label>
        <Input
          id="eventTime"
          type="datetime-local"
          value={eventTime ? new Date(eventTime).toISOString().slice(0, 16) : ''}
          onChange={(e) => setEventTime(e.target.value ? new Date(e.target.value).toISOString() : '')}
          required
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <Label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Image URL
        </Label>
        <Input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#D69E2E] hover:bg-[#c28b2a] text-white font-semibold">
          Save
        </Button>
      </div>
    </form>
  );
}