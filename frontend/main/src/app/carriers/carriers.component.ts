import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrierService } from '../carrier.service';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-carriers',
  templateUrl: './carriers.component.html',
  styleUrls: ['./carriers.component.css']
})
export class CarriersComponent implements OnInit {
  
  carriers!: Array<any>
  cnpj!: string
  email!: string
  razao!: string
  taxa!: number
  
    constructor(public carrierService: CarrierService, public quoteService: QuoteService, private router: Router, private http: HttpClient) { }
  
    ngOnInit(): void {
      this.carriers = new Array()
      // this.carriers.push({name:"Total Express", email:"total@express.com", cnpj:"4564564566454655", taxValorFrete:0.081})
      // this.carriers.push({name:"Jadlog", email:"jadlog@jadlog.com", cnpj:"4564664656565456", taxValorFrete:0.084})
      // this.carriers.push({name:"Braspress", email:"braspress@braspress.com", cnpj:"1231323132312", taxValorFrete:0.089})
      // this.carriers.push({name:"Correios", email:"correios@correios.com", cnpj:"7897987899789", taxValorFrete:0.078})

              
       this.carrierService.listCarrier().pipe().subscribe((response: any) => {

        console.log(response);

        
        
        var count = Object.keys(response).length;

        for (let i = 0; i < count; i++) {

          this.razao = response[i].razao;
          this.taxa = response[i].taxa;
          this.email = response[i].email;
          this.cnpj = response[i].cnpj;
      
          this.carriers.push({ razao: this.razao, taxa: this.taxa, email: this.email, cnpj: this.cnpj});

        }

          this.razao = "";
          this.taxa = 0;
          this.email = "";
          this.cnpj = "";

      })
      
    }
  
    adicionar(razao: string, taxa: number, email: string, cnpj: string) {
   

      let build ={
        "razao":razao,
        "taxa":taxa,
        "email":email,
        "cnpj":cnpj
       
      }
  
      this.carrierService.adicionar(build)
  
      this.carriers.push({razao:this.razao, taxa:this.taxa, email:this.email, cnpj:this.cnpj});
    }
  
  }