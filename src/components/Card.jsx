export default function Card({title, children, className=''}) {
  return (
    <div className={`bg-white shadow rounded-lg p-4 ${className}`}>
      {title && <h2 className="font-semibold text-lg mb-3">{title}</h2>}
      {children}
    </div>
  )
}
