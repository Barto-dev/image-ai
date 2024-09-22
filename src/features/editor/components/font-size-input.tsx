import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="rounded-r-none border-r-0 p-2"
        onClick={decrement}
      >
        <Minus className="size-4" />
      </Button>
      <Input
        value={value}
        onChange={handleChange}
        className="w-12 focus-visible:ring-offset-0 h-8 focus-visible:ring-0 rounded-none"
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-l-none border-l-0 p-2"
        onClick={increment}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
