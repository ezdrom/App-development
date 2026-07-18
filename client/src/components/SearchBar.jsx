// Controlled input atom for req. "Searchable Pokemon".
// Usage: <SearchBar value={search} onChange={setSearch} />
export default function SearchBar({ value, onChange, placeholder = 'Search Pokemon...' }) {
  return (
    <input
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
