const REQUIREMENTS_DATA = [
  {
    label: "At time of application",
    value: "₹15 crore minimum net worth",
  },
  {
    label: "By end of financial year 3",
    value: "₹25 crore minimum net worth",
  },
  {
    label: "Ongoing maintenance",
    value: "₹25 crore net worth at all times thereafter",
  },
];
export default function RequirementsTable() {
  return (
    <div className="requirements-table-wrap">
      <div
        className="requirements-table"
        role="table"
        aria-label="Net Worth Requirements"
      >
        {REQUIREMENTS_DATA.map((row, idx) => (
          <div
            key={idx}
            className={`requirements-row ${idx % 2 === 0 ? "row-alt" : "row-white"}`}
            role="row"
          >
            <span className="requirement-label" role="cell">
              {row.label}
            </span>
            <span className="requirement-value" role="cell">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
