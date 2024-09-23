import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { skillSchema } from 'src/modules/dashboard/schema';
import { ICertificate } from 'src/modules/dashboard/types';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skillsFormArray !: FormArray<FormGroup>;
  certificates: ICertificate[] = [
    {
      id: '1',
      name: 'Angular',
      issuingOrganization: 'Coditas Technology',
      issueDate: new Date(),
      expirationDate: new Date(),
      url: []
    },
    {
      id: '2',
      name: 'React',
      issuingOrganization: 'Coditas Technology',
      issueDate: new Date(),
      expirationDate: new Date(),
      url: []
    },
    {
      id: '3',
      name: 'Spring',
      issuingOrganization: 'Coditas Technology',
      issueDate: new Date(),
      expirationDate: new Date(),
      url: []
    },
    {
      id: '4',
      name: 'Cloud',
      issuingOrganization: 'Coditas Technology',
      issueDate: new Date(),
      expirationDate: new Date(),
      url: []
    }
  ];

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  constructor(
    private _fb: FormBuilder
  ) {
    this.skillsFormArray = this._fb.array([skillSchema]);
    this.skillsFormArray.valueChanges.subscribe(value => {
      console.log('Skills Form Array Value Changes : ', value)
    })
  }

  addSkill() {
    this.skillsFormArray.controls.push(new FormGroup({
      title: new FormControl('', [Validators.required]),
      experience: new FormControl(''),
      proficiency: new FormControl(-1),
      certificates: new FormControl([])
    }))
  }

  getSelectedCertificates(index: number) {
    const certArr = this.skillsFormArray.controls[index].get('certificates')?.value;
    return certArr;
  }

  toShowChipList(index: number) {

  }

  removeCertificate(certificate: ICertificate, index: number) {
    const certificates = this.skillsFormArray.controls[index].get('certificates');

    const filteredValue = certificates?.value.filter((cert: ICertificate) => cert.id !== certificate.id);

    certificates?.setValue(
      filteredValue
    );
  }

  changeProficiency(event: any, index: number) {
    const proficiencyFormField = this.skillsFormArray.controls[index].get('proficiency');
    proficiencyFormField?.setValue(event.target.value);
  }
}
