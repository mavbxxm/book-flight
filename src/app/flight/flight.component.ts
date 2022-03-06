import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Flight } from '../flight';
import { DatePipe } from '@angular/common';
import { PageService } from '../share/page.service';




@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  flights !: Flight[];
  bookForm !:FormGroup;
  confirm: Boolean = false;
  sDate: Date;
  StartDate: Date;


  country = [
    {id: 1,name:"Korea"},
    {id: 2,name:"Japan"},
    {id: 3,name:"Singapore"},
    {id: 4,name:"Netherland"},
    {id: 5,name:"Thailand"}
  ];

  constructor(private fb:FormBuilder,public pageService: PageService) {
this.sDate = new Date(Date.now())
this.StartDate = new Date(this.sDate.toLocaleDateString('th-TH'))

this.bookForm=this.fb.group({
  fullName:['',Validators.required],
  from:[null,Validators.required],
  to:[null,Validators.required],
  type:[null,Validators.required],
  adults:[,[Validators.required, Validators.min(1),Validators.max(99), Validators.pattern("[0-9]*$")]],
  departure:[],
  children:[,[ Validators.min(1),Validators.max(99), Validators.pattern("[0-9]*$")]],
  infants:[,[Validators.min(1)]],
  arrival:[]
});
   }

  ngOnInit(): void {
    this.getPages();
  }
  getPages(){
    this.flights = this.pageService.getPages();
  }

  onSubmit(f:Flight): void{
    let a  = new Date(f.departure).toISOString().slice(0, -1)
    let b = new Date(f.arrival).toISOString().slice(0, -1)
    f.departure = new Date(a)
    f.arrival = new Date(b)

    if(f.from == f.to){
      alert("Please choose another country")
    }else{

      if(f.type == "One way"){
        f.arrival = new Date("")
      }

      if(f.children == null){
        f.children = 0
      }

      if(f.infants == null){
        f.infants = 0
      }

      this.pageService.addFlight(f)
      alert("Success! Thank you!")
      this.bookForm.reset()

    }
  }


}



