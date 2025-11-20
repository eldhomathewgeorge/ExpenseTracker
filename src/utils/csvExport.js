export function exportToCSV(data, filename = "expenses.csv") {
  if (!data || data.length === 0) {
    alert('No data to export')
    return
  }
  const headers = Object.keys(data[0])
  const csvRows = []
  csvRows.push(headers.join(','))
  for (const row of data) {
    const values = headers.map(h => {
      const val = row[h] == null ? '' : String(row[h])
      return '"' + val.replace(/"/g, '""') + '"'
    })
    csvRows.push(values.join(','))
  }
  const csv = csvRows.join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
