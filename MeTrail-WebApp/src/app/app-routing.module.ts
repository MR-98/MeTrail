import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { VehicleManagementComponent } from './components/vehicle-management/vehicle-management.component';
import { AuthGuard } from './helpers/AuthGuard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'tracking', component: TrackerComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'employeeManagement', component: EmployeeManagementComponent, canActivate: [AuthGuard]},
  {path: 'addEmployee', component: AddEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'vehicleManagement', component: VehicleManagementComponent, canActivate: [AuthGuard]},
  {path: 'addVehicle', component: AddVehicleComponent, canActivate: [AuthGuard]},
  {path: 'editVehicle/:vehicleId', component: EditVehicleComponent, canActivate: [AuthGuard]},
  {path: 'editEmployee/:employeeId', component: EditEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'vehicleDetails/:vehicleId', component: VehicleDetailsComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
