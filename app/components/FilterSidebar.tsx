import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

// Type for FilterSection props
interface FilterSectionProps {
  title: ReactNode;
  children: ReactNode;
}

// Reusable filter section
const FilterSection = ({ title, children }: FilterSectionProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-sm font-semibold text-black">{title}</h3>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
};

// Type for Checkbox
interface CheckboxProps {
  label: string;
  checked?: boolean;
}

const Checkbox = ({ label, checked }: CheckboxProps) => (
  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
    <input
      type="checkbox"
      defaultChecked={checked}
      className="w-4 h-4 accent-indigo-600 border-gray-300 rounded"
    />
    <span>{label}</span>
    <span className="ml-auto text-xs text-gray-400">
      {checked ? "289" : "548"}
    </span>
  </label>
);

// Type for Radio
interface RadioProps {
  label: string;
  name: string;
  checked?: boolean;
}

const Radio = ({ label, name, checked }: RadioProps) => (
  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
    <input
      type="radio"
      name={name}
      defaultChecked={checked}
      className="w-4 h-4 accent-indigo-600 border-gray-300"
    />
    <span>{label}</span>
    <span className="ml-auto text-xs text-gray-400">
      {checked ? "289" : "548"}
    </span>
  </label>
);

// Main filter sidebar component
export default function FilterSidebar() {
  return (
    <aside className="w-full max-w-xs px-5 py-6">
      {/* Filters Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          <h2 className="font-semibold text-lg">Filters</h2>
        </div>
        <ChevronUp size={18} className="text-gray-600" />
      </div>

      {/* Orientation */}
      <FilterSection title={<span className="text-indigo-600 font-semibold">Orientation</span>}>
        <Checkbox label="Square" checked />
        <Checkbox label="Widescreen" />
        <Checkbox label="Portrait" />
        <Checkbox label="Traditional" />
        <Checkbox label="Vertical" />
        <Checkbox label="Horizontal" />
        <Checkbox label="Social post" />
        <Checkbox label="Standard" />
        <Checkbox label="Classic" />
      </FilterSection>

      {/* Style / Categories */}
      <FilterSection title={<span className="text-indigo-600 font-semibold">Style / Categories</span>}>
        <Radio label="Artistic Styles" name="style" checked />
        <Radio label="Modern Illustration" name="style" />
        <Radio label="Cartoon Styles" name="style" />
        <Radio label="Photorealistic Styles" name="style" />
        <Radio label="Cultural Styles" name="style" />
        <Radio label="Experimental Styles" name="style" />
      </FilterSection>

      {/* Subcategories */}
      <FilterSection title={<span className="text-indigo-600 font-semibold">Subcategories</span>}>
        <Radio label="Van Gogh" name="artist" checked />
        <Checkbox label="Starry Night" checked />
        <Checkbox label="Sunflowers" />
        <Radio label="Picasso" name="artist" />
        <Radio label="Monet" name="artist" />
        <Radio label="Da Vinci" name="artist" />
        <Radio label="Rembrandt" name="artist" />
      </FilterSection>

      {/* Price */}
      <FilterSection title={<span className="text-indigo-600 font-semibold">Price</span>}>
        <Checkbox label="Up To ₹500" checked />
        <Checkbox label="₹ 501 - ₹1,999" />
        <Checkbox label="₹2,000 - ₹4,999" />
        <Checkbox label="Above ₹5,000" />
      </FilterSection>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button className="flex-1 bg-gray-100 text-gray-600 py-2 rounded text-sm font-medium">
          Clear
        </button>
        <button className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded text-sm font-medium">
          Apply
        </button>
      </div>
    </aside>
  );
}
