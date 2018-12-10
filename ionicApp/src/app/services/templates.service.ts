import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Template } from '../interfaces/template';

@Injectable(

)
export class TemplatesService {
  public templates: Template[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage) {

  }

  load(): Promise<boolean> {

    //return promise so we know when operation is completed
    return new Promise((resolve) => {

      //Get notes saved in storage
      this.storage.get('templates').then((templates) => {

        //set only this.notes to returned val if values stored
        if(templates != null) {
          this.templates = templates;
        }

        //check if data loaded or not
        this.loaded = true;
        resolve(true);
      });

    });

  }


  save(): void {
    //save current note array
    this.storage.set('templates', this.templates);
  }

  getTemplate(id): Template {
    //get specific note
    return this.templates.find(template => template.id === id);
  }


  createTemplate(title): void {

    //create unique id that is one larger than current largest id
    let id = Math.max(...this.templates.map(template => parseInt(template.id)), 0) + 1;

    this.templates.push({
      id: id.toString(),
      title: title,
      content: ''
    });
    this.save();
  }

  deleteTemplate(template): void {
    //get index in array of param note
    let index = this.templates.indexOf(template);

    //delete elem from array and resave data
    if(index > -1){
      this.templates.splice(index, 1);
      this.save();
    }

  }











}
