import categories from "../categories";

interface FilterProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const ExpenseFilter = ({ onSelectCategory, selectedCategory }: FilterProps) => {
  return (
    <div className="container mt-4">
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;