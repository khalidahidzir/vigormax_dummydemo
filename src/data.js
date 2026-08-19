// Demo data shaped like the Supabase tables the real app reads.
// This app has no backend — everything below is fictional, for showcase purposes only.
export const BRANCHES = [{ id: 1, name: 'Alor Setar' }, { id: 2, name: 'Langkawi' }, { id: 3, name: 'Penang' }]
export const DEPARTMENTS = [{ id: 1, name: 'Security' }, { id: 2, name: 'Operations' }, { id: 3, name: 'HR' }]

export const EMPLOYEES = [
  { id: 1001, first_name: 'Amirah', last_name: 'Zulkifli', position: 'Managing Director', branch_id: 1, department_id: 2, phone: '012-448 9021' },
  { id: 1002, first_name: 'Aruna', last_name: 'Pyakurel', position: 'Operations Head', branch_id: 2, department_id: 2, phone: '019-330 7712' },
  { id: 1003, first_name: 'Andy', last_name: 'Pham', position: 'Security Supervisor', branch_id: 3, department_id: 1, phone: '011-2065 8834' },
  { id: 1004, first_name: 'Benjamin', last_name: 'Zeager', position: 'HR Executive', branch_id: 1, department_id: 3, phone: '013-772 4410' },
  { id: 1005, first_name: 'Faridah', last_name: 'Ismail', position: 'Security Guard', branch_id: 2, department_id: 1, phone: '017-889 2255' },
  { id: 1006, first_name: 'Rajan', last_name: 'Kumar', position: 'Mobile Patrol Officer', branch_id: 3, department_id: 1, phone: '016-402 1188' },
  { id: 1007, first_name: 'Siti', last_name: 'Noraini', position: 'Traffic Marshal', branch_id: 1, department_id: 1, phone: '014-559 6603' },
]

const day = (n) => {
  const d = new Date(); d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

export const TASKS = [
  { task_id: 5001, title: 'Renew KDN License', assigned_to: 1001, branch_id: 1, due_date: day(-4), status: 'TO_DO' },
  { task_id: 5002, title: 'Submit monthly patrol log — Langkawi', assigned_to: 1002, branch_id: 2, due_date: day(0), status: 'TO_DO' },
  { task_id: 5003, title: 'Order 12 replacement uniforms', assigned_to: 1004, branch_id: 1, due_date: day(9), status: 'TO_DO' },
  { task_id: 5004, title: 'CCTV maintenance walkthrough — Penang site', assigned_to: 1003, branch_id: 3, due_date: day(2), status: 'IN_PROGRESS' },
  { task_id: 5005, title: 'Reconcile February guard timesheets', assigned_to: 1004, branch_id: 1, due_date: day(-1), status: 'IN_PROGRESS' },
  { task_id: 5006, title: 'Brief new guards on residential SOP', assigned_to: 1002, branch_id: 2, due_date: day(5), status: 'IN_PROGRESS' },
  { task_id: 5007, title: 'File Q1 MOHA compliance return', assigned_to: 1001, branch_id: 1, due_date: day(-12), status: 'DONE' },
  { task_id: 5008, title: 'Renew mobile patrol vehicle road tax', assigned_to: 1003, branch_id: 3, due_date: day(-8), status: 'DONE' },
]

// Each onboarding step holds a document with an approval state:
// 'none' (nothing uploaded) · 'pending' (uploaded, awaiting approver sign-off) · 'approved'
export const ONBOARDING = [
  { id: 1, employee_id: 1005, name: 'Faridah Ismail', branch_id: 2, cleared: true, clearedAt: day(-15),
    steps: {
      bgCheck: { status: 'approved', file: 'PDRM_screening_Faridah.pdf', at: day(-22), uploadedBy: 'Benjamin Zeager', approvedBy: 'Amirah Zulkifli', approvedAt: day(-21) },
      cert: { status: 'approved', file: 'PSDM_cert_Faridah.pdf', at: day(-18), uploadedBy: 'Benjamin Zeager', approvedBy: 'Amirah Zulkifli', approvedAt: day(-17) },
      training: { status: 'approved', file: 'Basic_guard_training_Faridah.pdf', at: day(-16), uploadedBy: 'Aruna Pyakurel', approvedBy: 'Amirah Zulkifli', approvedAt: day(-15) },
    } },
  { id: 2, employee_id: 1006, name: 'Rajan Kumar', branch_id: 3, cleared: false,
    steps: {
      bgCheck: { status: 'approved', file: 'PDRM_screening_Rajan.pdf', at: day(-12), uploadedBy: 'Andy Pham', approvedBy: 'Amirah Zulkifli', approvedAt: day(-11) },
      cert: { status: 'pending', file: 'PSDM_cert_Rajan.pdf', at: day(-2), uploadedBy: 'Andy Pham' },
      training: { status: 'none' },
    } },
  { id: 3, employee_id: 1007, name: 'Siti Noraini', branch_id: 1, cleared: false,
    steps: {
      bgCheck: { status: 'approved', file: 'PDRM_screening_Siti.pdf', at: day(-6), uploadedBy: 'Benjamin Zeager', approvedBy: 'Amirah Zulkifli', approvedAt: day(-5) },
      cert: { status: 'none' },
      training: { status: 'none' },
    } },
  { id: 4, employee_id: 1003, name: 'Andy Pham', branch_id: 3, cleared: true, clearedAt: day(-40),
    steps: {
      bgCheck: { status: 'approved', file: 'PDRM_screening_Andy.pdf', at: day(-48), uploadedBy: 'Benjamin Zeager', approvedBy: 'Amirah Zulkifli', approvedAt: day(-47) },
      cert: { status: 'approved', file: 'PSDM_cert_Andy.pdf', at: day(-44), uploadedBy: 'Benjamin Zeager', approvedBy: 'Amirah Zulkifli', approvedAt: day(-43) },
      training: { status: 'approved', file: 'Basic_guard_training_Andy.pdf', at: day(-41), uploadedBy: 'Aruna Pyakurel', approvedBy: 'Amirah Zulkifli', approvedAt: day(-40) },
    } },
  { id: 5, employee_id: 1008, name: 'Mohd Hafiz Rahman', branch_id: 1, cleared: false,
    steps: {
      bgCheck: { status: 'pending', file: 'PDRM_screening_Hafiz.pdf', at: day(-4), uploadedBy: 'Benjamin Zeager' },
      cert: { status: 'none' },
      training: { status: 'none' },
    } },
  { id: 6, employee_id: 1009, name: 'Lim Wei Sheng', branch_id: 3, cleared: false,
    steps: { bgCheck: { status: 'none' }, cert: { status: 'none' }, training: { status: 'none' } } },
  { id: 7, employee_id: 1010, name: 'Nurul Aisyah Zainal', branch_id: 2, cleared: true, clearedAt: day(-3),
    steps: {
      bgCheck: { status: 'approved', file: 'PDRM_screening_Aisyah.pdf', at: day(-11), uploadedBy: 'Aruna Pyakurel', approvedBy: 'Amirah Zulkifli', approvedAt: day(-10) },
      cert: { status: 'approved', file: 'PSDM_cert_Aisyah.pdf', at: day(-7), uploadedBy: 'Aruna Pyakurel', approvedBy: 'Amirah Zulkifli', approvedAt: day(-6) },
      training: { status: 'approved', file: 'Basic_guard_training_Aisyah.pdf', at: day(-4), uploadedBy: 'Aruna Pyakurel', approvedBy: 'Amirah Zulkifli', approvedAt: day(-3) },
    } },
  { id: 8, employee_id: 1011, name: 'Ganesh Subramaniam', branch_id: 3, cleared: false,
    steps: {
      bgCheck: { status: 'approved', file: 'PDRM_screening_Ganesh.pdf', at: day(-8), uploadedBy: 'Andy Pham', approvedBy: 'Amirah Zulkifli', approvedAt: day(-7) },
      cert: { status: 'approved', file: 'PSDM_cert_Ganesh.pdf', at: day(-5), uploadedBy: 'Andy Pham', approvedBy: 'Amirah Zulkifli', approvedAt: day(-4) },
      training: { status: 'pending', file: 'Basic_guard_training_Ganesh.pdf', at: day(-1), uploadedBy: 'Aruna Pyakurel' },
    } },
]

export const ONBOARDING_STEPS = [
  ['bgCheck', 'Background check', 'PDRM screening result'],
  ['cert', 'Certification', 'PSDM / KDN certificate'],
  ['training', 'Training', 'Basic guard training record'],
]

export const DOCS = [
  { id: 1, title: 'KDN_License_2026.pdf', category: 'Compliance', branch_id: 1, date: day(-3) },
  { id: 2, title: 'Mobile_Patrol_SOP_v4.docx', category: 'Operations', branch_id: 2, date: day(-6) },
  { id: 3, title: 'Guard_Training_Register_Q1.xlsx', category: 'HR', branch_id: 1, date: day(-11) },
  { id: 4, title: 'Payroll_Summary_Feb2026.pdf', category: 'Finance', branch_id: 3, date: day(-14) },
  { id: 5, title: 'Langkawi_Site_Risk_Assessment.pdf', category: 'Compliance', branch_id: 2, date: day(-19) },
]

export const ACTIVITY = [
  { id: 1, action: 'Moved "Reconcile February guard timesheets" to In progress', user_name: 'aruna@vigormax.com.my', at: '2 hours ago', tone: 'progress', tag: 'In progress' },
  { id: 2, action: 'Uploaded PSDM certificate for Rajan Kumar', user_name: 'ben@vigormax.com.my', at: '5 hours ago', tone: 'pending', tag: 'Awaiting approval' },
  { id: 3, action: 'Uploaded document "KDN_License_2026.pdf"', user_name: 'amirah@vigormax.com.my', at: 'Yesterday', tone: 'info', tag: 'Compliance' },
  { id: 4, action: 'Added employee Siti Noraini', user_name: 'ben@vigormax.com.my', at: 'Yesterday', tone: 'cleared', tag: 'New' },
  { id: 5, action: 'Created task "Order 12 replacement uniforms"', user_name: 'amirah@vigormax.com.my', at: '2 days ago', tone: 'neutral', tag: 'To do' },
]

export const AUDIT_ITEMS = [
  { id: 1, title: 'Guard post handover checklist', type: 'Checklist', status: 'Active', category: 'Operations', description: 'Completed at every shift change across all guarded sites.', file_name: 'handover_checklist_v3.pdf',
    lines: [
      { id: 1, label: 'Verify incoming guard ID and licence', assignee: 'Andy Pham', is_complete: true },
      { id: 2, label: 'Walk the perimeter with outgoing guard', assignee: 'Andy Pham', is_complete: true },
      { id: 3, label: 'Log open incidents in the site book', assignee: 'Rajan Kumar', is_complete: false },
      { id: 4, label: 'Confirm radio and torch handover', assignee: 'Rajan Kumar', is_complete: false },
    ] },
  { id: 2, title: 'MOHA quarterly compliance return', type: 'SOP', status: 'Active', category: 'Operations', description: 'Filing procedure for the quarterly return to the Ministry of Home Affairs.',
    lines: [
      { id: 5, label: 'Export guard clearance register', assignee: 'Amirah Zulkifli', is_complete: true },
      { id: 6, label: 'Attach current KDN licence copy', assignee: 'Amirah Zulkifli', is_complete: false },
    ] },
  { id: 3, title: 'Langkawi uniform replacement', type: 'Action Item List', status: 'Draft', category: 'Team/Project', description: 'Follow-up actions from the February site inspection.',
    lines: [{ id: 7, label: 'Confirm sizes with 12 guards', assignee: 'Aruna Pyakurel', is_complete: false }] },
  { id: 4, title: 'CCTV installation workflow', type: 'Workflow', status: 'Archived', category: 'Team/Project', description: 'Superseded by the 2026 integration SOP.', lines: [] },
]

export const NAV = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'kanban', label: 'Task board' },
  { key: 'employees', label: 'Employees' },
  { key: 'onboarding', label: 'Onboarding' },
  { key: 'documents', label: 'Documents' },
  { key: 'audit', label: 'Audit log' },
  { key: 'ai', label: 'VigorAI' },
]

export function branchName(id) { const b = BRANCHES.find(b => b.id === id); return b ? b.name : 'Branch ' + id }
export function empName(id) { const e = EMPLOYEES.find(e => e.id === id); return e ? e.first_name + ' ' + e.last_name : 'Employee ' + id }
export function dayDiff(dateStr) {
  const due = new Date(dateStr); due.setHours(0, 0, 0, 0)
  const now = new Date(); now.setHours(0, 0, 0, 0)
  return Math.round((due - now) / 86400000)
}
export function formatDue(dateStr) {
  const d = dayDiff(dateStr)
  if (d < 0) return Math.abs(d) + 'd overdue'
  if (d === 0) return 'Due today'
  if (d === 1) return 'Due tomorrow'
  if (d <= 7) return d + 'd left'
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}
