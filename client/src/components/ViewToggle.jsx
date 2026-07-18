// Controlled toggle atom for req. "Grid & list view".
// Usage: <ViewToggle value={view} onChange={setView} />
export default function ViewToggle({ value, onChange }) {
  return (
    <div role="group" aria-label="View mode">
      <button type="button" disabled={value === 'grid'} onClick={() => onChange('grid')}>
        Grid
      </button>
      <button type="button" disabled={value === 'list'} onClick={() => onChange('list')}>
        List
      </button>
    </div>
  )
}
