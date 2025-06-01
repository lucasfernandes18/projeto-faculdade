import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { AlunoCadastroComponent } from './aluno-cadastro/aluno.cadastro.component';
import { AlunoListaComponent } from './aluno-lista/aluno-lista.component';
import { AlunoRoutingModule } from './aluno.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlunoRoutingModule,
    PrimengModule,
    SharedModule
  ],
  declarations: [
    AlunoCadastroComponent,
    AlunoListaComponent
  ]
})
export class AlunoModule { }