# veterinary-appointment-system

A simple, role-based Angular front-end for managing veterinary clinic appointments with client-side validation, and in-app notifications.

## Features
- **Authentication & Authorization**  
  - Login/logout  
  - Role-based UI and route guards (Receptionist, Vet, Admin)  
- **Appointment Management**  
  - View, add, edit, delete appointments  
  - Custom date-status pipe (upcoming vs. past)  
- **Notifications**  
  - SweetAlert2 for warnings and success messages

## Functions
1. **Login**  
   - User enters credentials, obtains JWT, and is routed according to role.  
2. **Dashboard**  
   - Receptionists see “Add Appointment” form and full list.  
   - Vets see only their assigned appointments.  
   - Admins can manage users and view all data.  
3. **CRUD Operations**  
   - Forms validate required fields, numeric constraints, and date bounds.  
   - Actions trigger SweetAlert2 modals for confirmation and feedback.

## Tech Stack
- **Frontend:** Angular ≥ 13, TypeScript
- **Styling & UI:** Bootstrap 5, SweetAlert2  
- **API Proxy:** `proxy.conf.json` → forwards `/api` to backend  
- **Authentication:** JWT stored in `localStorage`  
- **Build & Deployment:** Angular CLI, Docker (backend)

## Clone the repository**  
   git clone https://github.com/ZamirLucky/veterinary-appointment-system.git

