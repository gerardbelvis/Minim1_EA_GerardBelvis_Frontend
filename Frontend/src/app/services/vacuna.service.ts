import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacuna } from '../models/vacuna';

@Injectable({
  providedIn: 'root'
})
export class VacunaService {

  vacunaRouter: string = `http://localhost:25000/api`;

  constructor(private http: HttpClient) { }

  getVacunas() {
    const path = `${this.vacunaRouter}/`;
    return this.http.get<Vacuna[]>(path);
  }

  getVacuna(vacunaid: string) {
    const path = `${this.vacunaRouter}/${vacunaid}`;
    console.log(vacunaid);
    return this.http.get<Vacuna>(path);
  }

  addVacuna(newvacuna: Vacuna) {
    const path = `${this.vacunaRouter}/new`;
    return this.http.post(path, newvacuna);
  }

  editVacuna(vacunaid: string, vacunatomodify: Vacuna) {
    const path = `${this.vacunaRouter}/${vacunaid}`;
    return this.http.put(path, vacunatomodify);
  }

}
