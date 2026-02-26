import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const allOptions = [
  "Full Name",
  "Phone Number",
  "Address",
  "Email",
  "Time/Date",
  "Additional Notes",
  "Company Name",
  "Other",
];

export default function OrderFieldsSelector() {
  const [selected, setSelected] = useState<string[]>([]);
  const [otherValue, setOtherValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "Other") {
      setDialogOpen(true);
      return;
    }
    if (!selected.includes(value)) setSelected([...selected, value]);
  };

  const handleOtherAdd = () => {
    if (otherValue.trim() && !selected.includes(otherValue.trim())) {
      setSelected([...selected, otherValue.trim()]);
      setOtherValue("");
      setDialogOpen(false);
    }
  };

  const handleRemove = (field: string) => {
    setSelected(selected.filter((f: string) => f !== field));
  };

  return (
    <div>
      <div className="flex gap-2 items-center mb-4">
        <select
          className="border rounded-md px-3 py-2 min-w-[180px] bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          style={{borderRadius: '10px'}}
          onChange={handleSelect}
          value=""
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">Select field...</option>
          {allOptions.map(opt => (
            <option key={opt} value={opt} className="bg-gray-800 text-gray-200">{opt}</option>
          ))}
        </select>
      </div>

      {/* Dialog for Other option */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Add Custom Field</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              placeholder="Enter field name..."
              value={otherValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtherValue(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  handleOtherAdd();
                }
              }}
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  setOtherValue("");
                }}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleOtherAdd}
                disabled={!otherValue.trim()}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Add Field
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-wrap gap-2">
        {selected.map((field: string, idx: number) => (
          <div key={field} className="flex items-center bg-gray-800 rounded-md px-3 py-1 text-sm text-gray-200 shadow-sm" style={{borderRadius: '10px'}}>
            <span>{field}</span>
            <button type="button" className="ml-2 text-gray-400 hover:text-red-400 rounded-full p-1 transition-colors" onClick={() => handleRemove(field)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
