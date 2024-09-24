import categories from "../categories";

interface FilterProps {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: FilterProps) => {
  return (
    <>
    <div className="container">
      <select
        className="form-select-category"
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
    </>
  );
};

export default ExpenseFilter;