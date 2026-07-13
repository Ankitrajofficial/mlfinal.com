/** MLS Group Command Centre — operational domain types */

export type EnquiryStatus =
  | 'new'
  | 'in_review'
  | 'quoted'
  | 'won'
  | 'lost'
  | 'archived'

export type EnquiryPriority = 'low' | 'medium' | 'high'

export type ShipmentStatus =
  | 'planned'
  | 'loading'
  | 'in_transit'
  | 'cleared_customs'
  | 'delivered'
  | 'delayed'
  | 'cancelled'

export type AlertLevel = 'info' | 'warn' | 'critical'
export type AlertStatus = 'open' | 'acknowledged' | 'resolved'

export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high'

export type VerticalStatus = 'on_track' | 'growing' | 'stable' | 'watch' | 'critical'

export type SiteStatus = 'operational' | 'active_shipping' | 'maintenance' | 'offline'

export interface AdminEnquiry {
  id: string
  reference: string
  name: string
  email: string
  phone: string
  company: string
  country: string
  market: string
  vertical: string
  category: string
  site: 'mls' | 'khadane'
  subject: string
  message: string
  status: EnquiryStatus
  priority: EnquiryPriority
  owner: string
  notes: string
  variety: string
  format: string
  volume: string
  source: 'website' | 'manual' | 'seed'
  createdAt: string
  updatedAt: string
}

export interface AdminShipment {
  id: string
  code: string
  destination: string
  variety: string
  status: ShipmentStatus
  eta: string
  volume: string
  port: string
  buyer: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface AdminAlert {
  id: string
  level: AlertLevel
  title: string
  body: string
  status: AlertStatus
  owner: string
  createdAt: string
  updatedAt: string
}

export interface AdminTask {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  owner: string
  dueDate: string
  relatedEnquiryId: string
  createdAt: string
  updatedAt: string
}

export interface AdminActivity {
  id: string
  actor: string
  action: string
  entityType: string
  entityId: string
  createdAt: string
}

export interface AdminVertical {
  id: string
  slug: string
  title: string
  brand: string
  framing: string
  revenue: string
  share: number
  status: VerticalStatus
  sites: string
  headcount: string
  highlight: string
  region: string
  notes: string
  updatedAt: string
}

export interface AdminSite {
  id: string
  name: string
  role: string
  coords: string
  status: SiteStatus
  people: string
  focus: string
  notes: string
  updatedAt: string
}

export interface AdminOperator {
  name: string
  role: string
  initials: string
  location: string
}

/** Mine / quarry GIS record for CEO field operations */
export type MineStatus =
  | 'active'
  | 'development'
  | 'seasonal'
  | 'idle'
  | 'closed'
  | 'allied'

export type MineOwnership = 'owned' | 'allied' | 'lease' | 'prospect'

export interface MineVisit {
  id: string
  visitedAt: string
  visitor: string
  purpose: string
  notes: string
  lat?: number
  lng?: number
}

/** Physical / catalogue sample held for a mine face */
export interface MineSample {
  id: string
  name: string
  /** Stone variety / trade name */
  stoneType: string
  finish: string
  size: string
  description: string
  /** Public path under /public, optional */
  imageUrl: string
}

export interface AdminMine {
  id: string
  /** URL slug for portfolio pages */
  slug: string
  code: string
  name: string
  /** Short portfolio summary for cards */
  tagline: string
  /** Longer portfolio description */
  description: string
  /** Primary stone / material worked */
  material: string
  /** Stone types / varieties at this face (list) */
  stoneTypes: string[]
  /** Sample catalogue for this mine */
  samples: MineSample[]
  district: string
  state: string
  address: string
  lat: number
  lng: number
  /** Accuracy in metres when captured from live GPS */
  gpsAccuracyM: number
  status: MineStatus
  ownership: MineOwnership
  /** Estimated annual capacity (sq.m or free text) */
  capacity: string
  /** Annual output phrasing */
  annualOutput: string
  /** Workforce / headcount */
  headcount: string
  /** Alias label for portfolio UI */
  workforce: string
  /** Revenue figure (illustrative or internal — CEO controlled) */
  revenue: string
  /** e.g. FY 2025–26 */
  revenuePeriod: string
  areaHa: string
  yearOpened: string
  equipment: string
  certifications: string
  safetyNotes: string
  accessNotes: string
  roadCondition: string
  nearestTown: string
  contactName: string
  contactPhone: string
  /** Comma legacy string — prefer stoneTypes */
  varieties: string
  notes: string
  /** Hero / card image */
  primaryImage: string
  /** Show on public /mines portfolio */
  publicVisible: boolean
  /** Show revenue on public portfolio */
  showRevenuePublic: boolean
  lastVisitedAt: string
  visits: MineVisit[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

/** CEO future plan with present → future gap for dashboard graphs */
export type CeoPlanStatus = 'draft' | 'active' | 'at_risk' | 'achieved' | 'shelved'

export type CeoPlanCategory =
  | 'revenue'
  | 'export'
  | 'workforce'
  | 'capacity'
  | 'mines'
  | 'capex'
  | 'market'
  | 'other'

export interface CeoPlanMilestone {
  id: string
  label: string
  targetDate: string
  done: boolean
}

export interface CeoPlan {
  id: string
  title: string
  category: CeoPlanCategory
  /** What is being measured */
  metricLabel: string
  unit: string
  /** Current baseline */
  presentValue: number
  /** Target at horizon */
  futureValue: number
  /** e.g. FY 2027–28 · Dec 2026 */
  horizon: string
  status: CeoPlanStatus
  owner: string
  notes: string
  linkedMineId: string
  milestones: CeoPlanMilestone[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface AdminStore {
  version: 1
  enquiries: AdminEnquiry[]
  shipments: AdminShipment[]
  alerts: AdminAlert[]
  tasks: AdminTask[]
  activity: AdminActivity[]
  verticals: AdminVertical[]
  sites: AdminSite[]
  mines: AdminMine[]
  ceoPlans: CeoPlan[]
  operator: AdminOperator
  lastSynced: string
}

export const CEO_PLAN_STATUSES: CeoPlanStatus[] = [
  'draft',
  'active',
  'at_risk',
  'achieved',
  'shelved',
]

export const CEO_PLAN_CATEGORIES: CeoPlanCategory[] = [
  'revenue',
  'export',
  'workforce',
  'capacity',
  'mines',
  'capex',
  'market',
  'other',
]

export const ENQUIRY_STATUSES: EnquiryStatus[] = [
  'new',
  'in_review',
  'quoted',
  'won',
  'lost',
  'archived',
]

export const ENQUIRY_PRIORITIES: EnquiryPriority[] = ['low', 'medium', 'high']

export const SHIPMENT_STATUSES: ShipmentStatus[] = [
  'planned',
  'loading',
  'in_transit',
  'cleared_customs',
  'delivered',
  'delayed',
  'cancelled',
]

export const VERTICAL_OPTIONS = [
  'Stone & Export',
  'Automotive & Fuel',
  'Hospitality',
  'Student Housing',
  'Food Services',
  'Careers',
  'Media',
  'Partnership',
  'Other',
] as const

export const OWNER_OPTIONS = [
  'Export desk',
  'Housing desk',
  'M3 front office',
  'Dhakar Motors',
  'Divine Food Services',
  'Group principal',
  'Yard operations',
  'Finance',
  'Unassigned',
] as const

export const MINE_STATUSES: MineStatus[] = [
  'active',
  'development',
  'seasonal',
  'idle',
  'closed',
  'allied',
]

export const MINE_OWNERSHIPS: MineOwnership[] = [
  'owned',
  'allied',
  'lease',
  'prospect',
]
