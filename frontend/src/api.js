const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/employees'

async function request(url = '', options = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  })

  if (!response.ok) {
    const problem = await response.json().catch(() => ({}))
    throw new Error(problem.detail ?? 'Something went wrong. Please try again.')
  }

  return response.status === 204 ? null : response.json()
}

export const employeeApi = {
  list: (query = '') => request(query ? `?query=${encodeURIComponent(query)}` : ''),
  create: (employee) => request('', { method: 'POST', body: JSON.stringify(employee) }),
  update: (id, employee) => request(`/${id}`, { method: 'PUT', body: JSON.stringify(employee) }),
  remove: (id) => request(`/${id}`, { method: 'DELETE' })
}

