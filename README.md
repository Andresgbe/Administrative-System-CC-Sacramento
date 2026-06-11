# CC Sacramento — Administrative System

> Full-stack web application for managing the Carrizal Shopping Center (Sacramento), located near Los Teques, Venezuela. Built to replace spreadsheet-based management with a structured, role-aware administrative platform.

---

## Tech Stack

| Layer | Technology | Hosting |
|---|---|---|
| Frontend | Angular 22 + SCSS | Vercel / Netlify |
| Backend | Node.js + Express | Railway / Render |
| Database | PostgreSQL | Supabase / Neon.tech |
| Auth | JWT + bcrypt | — |

---

## Project Structure

```
src/
├── app/
│   ├── core/                        # Global, singleton services and guards
│   │   ├── guards/                  # Route protection (auth, role)
│   │   ├── interceptors/            # HTTP interceptors (JWT injection)
│   │   └── services/               # App-wide services (auth, etc.)
│   │
│   ├── shared/                      # Reusable components across modules
│   │   └── layout/
│   │       ├── sidebar/             # Navigation sidebar
│   │       └── main-layout/        # Shell layout (sidebar + router outlet)
│   │
│   ├── modules/                     # Feature modules (lazy loaded)
│   │   ├── auth/                    # Login / logout
│   │   │   └── pages/login/
│   │   ├── dashboard/              # KPIs and overview charts
│   │   │   └── pages/dashboard-home/
│   │   ├── locales/                # Store/tenant management
│   │   ├── pagos/                  # Rent payment tracking
│   │   ├── egresos/                # Operational expenses
│   │   ├── tasas/                  # Exchange rate management
│   │   ├── calculadora/            # Currency calculator
│   │   └── reportes/               # PDF / Excel export
│   │
│   ├── app-routing-module.ts       # Root router with lazy loading
│   ├── app-module.ts               # Root module
│   └── app.html                    # Root template (<router-outlet>)
│
└── styles/                          # Global SCSS architecture
    ├── _variables.scss              # Color palette, typography, shadows
    ├── _typography.scss             # Font imports and base type rules
    └── _globals.scss               # Resets and global element styles
```

---

## Architecture Pattern

This project follows **Feature Module Architecture** with **Angular Standalone Components**.

### Core Principles

**Separation of concerns** — every file has one responsibility and one only.

**Lazy loading** — feature modules are loaded on demand, keeping the initial bundle small.

**Standalone components** — each component declares its own imports, removing the need for shared NgModule declarations.

**Single Core** — global services are provided in `root` and instantiated once across the entire application.

**Shared is shared** — anything used in more than one module lives in `shared/`, never duplicated.

### Where does each file go?

| Type | Location | Rule |
|---|---|---|
| Global service | `core/services/` | One instance for the whole app |
| Route guard | `core/guards/` | Protects routes globally |
| HTTP interceptor | `core/interceptors/` | Modifies all HTTP requests |
| Reusable component | `shared/` | Used in 2+ modules |
| Full page (routable) | `modules/[name]/pages/` | Has its own route |
| Small UI component | `modules/[name]/components/` | Used inside a page |
| Data model / interface | `modules/[name]/models/` | TypeScript types for the module |
| Feature service | `modules/[name]/services/` | Logic specific to one module |

---

## Modules

### Auth
Handles login and session management. Uses JWT stored in `localStorage`. The `AuthGuard` checks token validity on every protected route.

### Dashboard
Overview of the shopping center's operational status: total stores, occupancy, collected vs expected income, and charts.

### Locales (Store Management)
Full CRUD for commercial spaces. Each store tracks tenant info, contract dates, rental amount and currency, square meters, and status (ACTIVE / DELINQUENT / VACANT).

### Pagos (Payments)
Records rent payments per store. Tracks date, amount, currency, payment method, and notes. Feeds into the income balance.

### Egresos (Expenses)
Logs operational expenses for the shopping center. Categorized and tracked monthly and annually.

### Tasas (Exchange Rates)
Manual entry of daily exchange rates: BCV (official), USDT, and EUR. All monetary calculations across the system use the most recently registered rate.

### Calculadora (Calculator)
Real-time currency converter (Bs ↔ USD ↔ EUR) using the latest rates from the Tasas module. Accessible from any screen.

### Reportes (Reports)
Generates and exports reports in PDF and Excel format. Covers income summaries, expense breakdowns, occupancy statistics, and delinquency lists.

---

## Access Roles

| Role | Permissions |
|---|---|
| `admin` | Full access: read, write, delete, configuration |
| `subadmin` | Read and register only — no delete, no configuration |

Role enforcement happens at two levels: Angular route guards on the frontend, and JWT middleware on every API endpoint.

---

## Business Rules

1. A store is marked **DELINQUENT** when rent is overdue by more than 30 days.
2. Contract expiration alerts trigger **30 days before** the end date.
3. All monetary amounts are stored in their original currency plus their USD equivalent at the time of registration.
4. Reports can be expressed in any supported currency using the exchange rate of the selected date.
5. A store with registered payments **cannot be deleted** — it can only be deactivated.
6. Every write action is logged with the acting user and a timestamp (audit trail).

---

## Getting Started

### Prerequisites

- Node.js 20+
- Angular CLI 22
- PostgreSQL (via Supabase or Neon.tech)

### Install dependencies

```bash
npm install
```

### Run development server

```bash
ng serve
```

Open `http://localhost:4200` in your browser.

### Default credentials (development only)

```
Email:    admin@carrizal.com
Password: admin123
```

---

## Roadmap

- [x] Project structure and architecture
- [x] Global SCSS design system
- [x] Login screen with form validation
- [ ] Sidebar navigation and main layout
- [ ] Dashboard with KPI cards
- [ ] Store management module
- [ ] Payment tracking module
- [ ] Expense module
- [ ] Exchange rate module
- [ ] Currency calculator
- [ ] Reports and export (PDF / Excel)
- [ ] Backend API (Node.js + Express)
- [ ] PostgreSQL schema and migrations
- [ ] Production deployment

---

## License

Private project. All rights reserved — Centro Comercial Sacramento, Carrizal, Venezuela.