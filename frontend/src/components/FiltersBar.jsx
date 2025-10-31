
export default function FiltersBar({ filters, setFilters, apply }) {
  return (
    <div className="mt-3">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <select className="input w-full md:w-48" value={filters.category} onChange={e=>setFilters(s=>({...s, category: e.target.value}))}>
          <option value="">All Categories</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Health</option>
          <option>Other</option>
        </select>

        <input className="input w-full md:w-40" type="date" value={filters.startDate} onChange={e=>setFilters(s=>({...s, startDate: e.target.value}))} />
        <input className="input w-full md:w-40" type="date" value={filters.endDate} onChange={e=>setFilters(s=>({...s, endDate: e.target.value}))} />

        <div className="flex gap-2">
          <button className="btn" onClick={apply}>Apply</button>
          <button className="btn" onClick={()=>{ setFilters({ category: "", startDate: "", endDate: "" }); apply(); }}>Reset</button>
        </div>
      </div>
    </div>
  );
}
