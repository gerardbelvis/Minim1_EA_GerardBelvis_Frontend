import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Vacuna } from '../../models/vacuna';
import { VacunaService } from '../../services/vacuna.service';

@Component({
  selector: 'app-vacuna',
  templateUrl: './vacuna.component.html',
  styleUrls: ['./vacuna.component.css']
})
export class VacunaComponent implements OnInit {

  vacunaList: Vacuna[]; //para guardar la lista de las vacunas
  selectedVacuna: Vacuna; //para guardar solo la vacuna seleccionada de la lista

  visibleSelectedVacuna = false;


  addVacunaForm = new FormGroup({
    vacunaNameInput: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
    vacunaDescriptionInput: new FormControl('', [
      Validators.required,
      Validators.min(5),
    ]),
    vacunaTecnologyInput: new FormControl('', [
      Validators.required,
      Validators.min(4),
    ]),
    vacunaAcceptationDateInput: new FormControl('', [
      Validators.required,
      Validators.min(10),
    ]),
  });

  editVacunaForm = new FormGroup({
    vacunaNameEdit: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
    vacunaDescriptionEdit: new FormControl('', [
      Validators.required,
      Validators.min(4),
    ]),
    vacunaTecnologyEdit: new FormControl('', [
      Validators.required,
      Validators.min(4),
    ]), 
    vacunaAcceptationDateEdit: new FormControl('', [
      Validators.required,
      Validators.min(10),
    ]), 
  });

  constructor(private vacunaService: VacunaService) { }

  ngOnInit(): void {
    this.getVacunas();
  }

  public getVacunas() {
    this.vacunaList = []; //To reset the List
    this.selectedVacuna = new Vacuna(); //To reset 

    this.vacunaService.getVacunas().subscribe((res) => {
      this.vacunaList = res as Vacuna[];
      console.log(res);
    });
  }

  public getVacuna(i: number) {
    this.visibleSelectedVacuna = false;

    let selectedVacunaId = this.vacunaList[i]._id;

    this.vacunaService.getVacuna(selectedVacunaId).subscribe((res) => {
      this.selectedVacuna = res as Vacuna;
    });

    this.visibleSelectedVacuna = true;
  }

  public addVacuna() {
    let newvacuna = new Vacuna();
    newvacuna.name = this.addVacunaForm.get('vacunaNameInput').value;
    newvacuna.description = this.addVacunaForm.get(
      'vacunaDescriptionInput'
    ).value;
    newvacuna.tecnology = this.addVacunaForm.get('vacunaTecnologyInput').value;
    newvacuna.acceptationdate = this.addVacunaForm.get('vacunaAcceptationDateInput').value;

    this.vacunaService.addVacuna(newvacuna).subscribe((res) => {
      let addedvacuna = res as Vacuna;
      if (
        addedvacuna.name == newvacuna.name &&
        addedvacuna.description == newvacuna.description
      )
        alert(`Vacuna ${addedvacuna.name} created successfully`);
      else alert(`Could not create the Vacuna`);
    });
  }

  public editVacuna() {
    this.vacunaService.editVacuna(this.selectedVacuna._id, this.selectedVacuna).subscribe((res) => {
        let editedvacuna = res as Vacuna;
        if (
          editedvacuna.name ==
            this.editVacunaForm.get('vacunaNameEdit').value &&
          editedvacuna.description ==
            this.editVacunaForm.get('vacunaDescriptionEdit').value &&
          editedvacuna.tecnology ==
            this.editVacunaForm.get('vacunaTecnologyEdit').value &&
          editedvacuna.acceptationdate ==
            this.editVacunaForm.get('vacunaAcceptationDateEdit').value
        )
          alert(`Vacuna ${editedvacuna.name} edited successfully`);
        else alert(`Could not edit the Vacuna`);
      });
  }

}
