// Controlled select atom for req. "Sortable by descending / ascending".
// Usage: <SortControl value={sort} onChange={setSort} />
export default function SortControl({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="asc">Name: A → Z</option>
      <option value="desc">Name: Z → A</option>
    </select>
  )
}
