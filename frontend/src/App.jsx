import { useCallback, useEffect, useMemo, useState } from 'react'
import { employeeApi } from './api.js'

const emptyForm = {
  firstName: '', lastName: '', email: '', department: '', role: '', salary: '', joiningDate: ''
}

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0
})

export default function App() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState('')

  const loadEmployees = useCallback(async (search = '') => {
    setLoading(true)
    try {
      setEmployees(await employeeApi.list(search))
      setNotice('')
    } catch (error) {
      setNotice(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadEmployees() }, [loadEmployees])

  const departments = useMemo(
    () => new Set(employees.map((employee) => employee.department)).size,
    [employees]
  )
  const newestJoiningDate = useMemo(
    () => employees.map((employee) => employee.joiningDate).sort().at(-1) ?? '—',
    [employees]
  )

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function saveEmployee(event) {
    event.preventDefault()
    try {
      const payload = { ...form, salary: Number(form.salary) }
      let message
      if (editingId) {
        await employeeApi.update(editingId, payload)
        message = 'Employee updated successfully.'
      } else {
        await employeeApi.create(payload)
        message = 'Employee added successfully.'
      }
      setForm(emptyForm)
      setEditingId(null)
      await loadEmployees(query)
      setNotice(message)
    } catch (error) {
      setNotice(error.message)
    }
  }

  function startEdit(employee) {
    setEditingId(employee.id)
    setForm({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      salary: employee.salary,
      joiningDate: employee.joiningDate
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function removeEmployee(id) {
    if (!window.confirm('Delete this employee record?')) return
    try {
      await employeeApi.remove(id)
      await loadEmployees(query)
      setNotice('Employee deleted.')
    } catch (error) {
      setNotice(error.message)
    }
  }

  function search(event) {
    event.preventDefault()
    loadEmployees(query)
  }

  return (
    <main className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">PeopleDesk</p>
          <h1>Employee Management</h1>
          <p className="hero-copy">A simple full-stack workspace for keeping employee records accurate and easy to find.</p>
        </div>
        <span className="status-pill">● API connected</span>
      </header>

      <section className="stats" aria-label="Employee statistics">
        <article><span>Total employees</span><strong>{employees.length}</strong></article>
        <article><span>Departments</span><strong>{departments}</strong></article>
        <article><span>Newest joining</span><strong>{newestJoiningDate}</strong></article>
      </section>

      <section className="panel form-panel">
        <div className="section-title">
          <div><p className="eyebrow">Employee details</p><h2>{editingId ? 'Update employee' : 'Add a new employee'}</h2></div>
          {editingId && <button className="button ghost" onClick={() => { setEditingId(null); setForm(emptyForm) }}>Cancel edit</button>}
        </div>
        <form className="employee-form" onSubmit={saveEmployee}>
          <label>First name<input required name="firstName" value={form.firstName} onChange={updateField} /></label>
          <label>Last name<input required name="lastName" value={form.lastName} onChange={updateField} /></label>
          <label>Email<input required type="email" name="email" value={form.email} onChange={updateField} /></label>
          <label>Department<input required name="department" value={form.department} onChange={updateField} /></label>
          <label>Role<input required name="role" value={form.role} onChange={updateField} /></label>
          <label>Monthly salary<input required min="0" type="number" name="salary" value={form.salary} onChange={updateField} /></label>
          <label>Joining date<input required type="date" name="joiningDate" value={form.joiningDate} onChange={updateField} /></label>
          <button className="button primary" type="submit">{editingId ? 'Save changes' : 'Add employee'}</button>
        </form>
        {notice && <p className="notice" role="status">{notice}</p>}
      </section>

      <section className="panel">
        <div className="section-title">
          <div><p className="eyebrow">Directory</p><h2>Your team</h2></div>
          <form className="search" onSubmit={search}>
            <input aria-label="Search employees" placeholder="Search name or department" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button className="button dark">Search</button>
          </form>
        </div>

        <div className="table-wrap">
          <table>
            <thead><tr><th>Employee</th><th>Department</th><th>Role</th><th>Salary</th><th>Joined</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="empty">Loading employees…</td></tr>
              ) : employees.length === 0 ? (
                <tr><td colSpan="6" className="empty">No employees found. Add your first team member above.</td></tr>
              ) : employees.map((employee) => (
                <tr key={employee.id}>
                  <td><strong>{employee.firstName} {employee.lastName}</strong><small>{employee.email}</small></td>
                  <td>{employee.department}</td><td>{employee.role}</td><td>{currency.format(employee.salary)}</td><td>{employee.joiningDate}</td>
                  <td className="actions"><button onClick={() => startEdit(employee)}>Edit</button><button className="danger" onClick={() => removeEmployee(employee.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
