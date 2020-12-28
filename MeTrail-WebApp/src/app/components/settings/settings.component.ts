import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
  selectedAvatar: HTMLElement;
  currentUser = this.authService.currentUserValue;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      firstName: [this.currentUser.fullName.split(" ")[0], Validators.required],
      surname: [this.currentUser.fullName.split(" ")[1], Validators.required],
      email: [this.currentUser.email, Validators.required]
    });

    let avatarId = localStorage.getItem("avatarId");
    if (avatarId != undefined) {
      this.selectedAvatar = document.getElementById(avatarId);
    } else {
      this.selectedAvatar = document.getElementById("avatar1");
    }

    this.highlightSelectedAvatar();
  }

  get f() { return this.settingsForm.controls; }

  onSubmit() {
    this.openConfirmDialog();
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Potwierdź zmianę', action: 'Po zmianie danych konieczne jest ponowne logowanie. Czy jesteś pewien że chcesz zmienić dane?', okButtonText: 'Potwierdź', cancelButtonText: 'Anuluj' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        localStorage.setItem("avatarId", this.selectedAvatar.id);
        this.authService.editUser(this.currentUser.id, this.f.firstName.value, this.f.surname.value, this.f.email.value).subscribe(() => {
          this.authService.logout();
          this.router.navigate(['/login'])
        })
      }
    });
  }

  selectAvatar(newAvatarId: string) {
    this.selectedAvatar.style.border = 'none';
    this.selectedAvatar.style.width = '28%';

    this.selectedAvatar = document.getElementById(newAvatarId);
    this.highlightSelectedAvatar()

  }

  private highlightSelectedAvatar() {
    this.selectedAvatar.style.border = '4px solid lime';
    this.selectedAvatar.style.width = 'calc(28% - 8px)'
    this.selectedAvatar.style.borderRadius = '50%';
  }

}
