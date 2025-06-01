import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AlunoService } from '../aluno.service';
import { Aluno } from '../../core/models/aluno.model';

@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css'],
})
export class AlunoCadastroComponent implements OnInit {
  aluno = new Aluno();
  iddisc: number;
  salvando: boolean = false;
  constructor(
    private alunoService: AlunoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.iddisc = this.route.snapshot.params['id'];

    this.title.setTitle('Cadastro de Aluno');

    if (this.iddisc) {
      this.spinner.show();
      this.carregarAluno(this.iddisc);
    } else {
      this.aluno.status = true;
    }
  }

  get editando() {
    return Boolean(this.aluno.idaluno);
  }

  carregarAluno(id: number) {
    this.alunoService
      .buscarPorId(id)
      .then((obj) => {
        this.aluno = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        // this.errorHandler.handle(erro);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Aluno:${this.aluno.nome}`);
  }

  salvar(form: NgForm) {
    console.log(form);
    if (this.editando) {
      this.atualizarAluno(form);
    } else {
      this.cadastroAluno(form);
    }
  }

  cadastroAluno(form: NgForm) {
    this.salvando = true;
    console.log(this.aluno);
    this.alunoService.adicionar(this.aluno).then((obj) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Aluno',
        detail: 'cadastrado com sucesso!',
      });
      this.salvando = false;
      this.router.navigate(['/alunos']);
    });
  }

  atualizarAluno(form: NgForm) {
    this.salvando = true;
    this.alunoService
      .atualizar(this.aluno)
      .then((obj) => {
        this.aluno = obj;
        this.salvando = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Aluno',
          detail: `${obj.nome}, alterado com sucesso`,
        });
        this.atualizarTituloEdicao();
        this.router.navigate(['/alunos']);
      })
      .catch((erro) => {
        this.salvando = false;
      });
  }
}
