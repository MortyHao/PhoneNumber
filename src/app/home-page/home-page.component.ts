import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CombinationSerivce } from './combination.service';
import { MatPaginatorIntl } from '@angular/material';
import { Subscription } from 'rxjs';

const fakeData = [
  { phoneNumber: "1234567A" },
  { phoneNumber: "1234567B" },
  { phoneNumber: "1234567C" },
  { phoneNumber: "1234567D" },
  { phoneNumber: "1234567E" },
  { phoneNumber: "1234567F" },
  { phoneNumber: "1234567G" },
  { phoneNumber: "1234567H" },
  { phoneNumber: "1234567I" },
];
export interface RequestBody{
  count:number;
  phoneCombination:string[];
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit, OnDestroy {
  phoneNumberForm: FormGroup;
  phoneNumber;
  dataSource: object[];
  displayedColumns: string[] = ["phoneNumber"];
  count = 100;
  pageSize = 10;
  pageIndex=0;
  pageSizeOptions = [10, 25, 50];
  getSubscribtion:Subscription;

  constructor(private combinationService: CombinationSerivce, paginator: MatPaginatorIntl) { }

  ngOnInit() {
    this.phoneNumberForm = new FormGroup({
      phoneNumber: new FormControl('', {
        validators: [Validators.required, validatePhoneNumber]
      })
    });
  }
  ngOnDestroy(){
    if(this.getSubscribtion){
      this.getSubscribtion.unsubscribe();
    }
  }
  onSubmit() {
    this.phoneNumber = this.phoneNumberForm.value.phoneNumber;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.fetchingdata(this.phoneNumber, this.pageIndex, this.pageSize);
  }
  getServerData(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchingdata(this.phoneNumber, this.pageIndex, this.pageSize);
  }
  fetchingdata(phoneNumber,pageIndex, pageSize){
    if(this.getSubscribtion){
      this.getSubscribtion.unsubscribe();
    }
    this.getSubscribtion=this.combinationService.getData(phoneNumber, pageIndex, pageSize).subscribe((data:RequestBody)=>{
      this.count=data.count;
      this.dataSource=[];
      for(let i=0; i<data.phoneCombination.length;i++){
        this.dataSource.push({
          phoneNumber:data.phoneCombination[i]
        })
      }
    });
  }
}

export function validatePhoneNumber(c: FormControl) {
  let REGEXP = /^(([0-9]{7})|([0-9]{10}))$/;

  return REGEXP.test(c.value) ? null : {
    validatePhoneNumber: {
      valid: false
    }
  };
}
