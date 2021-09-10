import { Component, OnInit } from '@angular/core';
import { Emprestimo } from 'src/app/models/Emprestimo.model';
import { Livro } from 'src/app/models/Livro.model';
import { Usuario } from 'src/app/models/Usuario.model';
import { BibliotecaService } from 'src/app/services/Biblioteca.service';

@Component({
  selector: 'app-tabelas',
  templateUrl: './tabelas.component.html',
  styleUrls: ['./tabelas.component.css']
})
export class TabelasComponent implements OnInit {

  basicSettings = {
    add: {
      addButtonContent: '+',
      createButtonContent: 'Ok',
      cancelButtonContent: 'x',
      confirmCreate: true
    },
    actions:{
      columnTitle: 'Ações',
      add: true,
      edit: false,
      delete: false,
      position: 'right'
    },
    attr: {
      class: 'table table-bordered'
    }
  };


  settings  = [
    { //usuarios
      ...this.basicSettings,
      columns: {
        cpf: {
          title: 'CPF',
          type: 'string',
        },

        nome: {
          title: 'Nome',
          type: 'string',
        },

        matricula: {
          title: 'Matricula',
          type: 'string',
        },
      }
    },

   { ...this.basicSettings,
    columns: { //livros
   id: {
     title: 'ID',
     type: 'string',
     width: '70px'
   },
   autor: {
     title: 'Autor',
     type: 'string',
   },

   edicao: {
     title: 'Edição',
     type: 'string',
   },

   nome: {
     title: 'Nome',
     type: 'string',
   },

   unidades: {
    title: 'Unidades',
    type: 'string',
  },
 }
},
  { ...this.basicSettings,
    columns: {//emprestimo
  id: {
    title: 'ID',
    type: 'string',
    width: '70px'
  },
  cpfUsuario: {
    title: 'Cpf Usuário',
    type: 'string',
  },

  idLivro: {
    title: 'id Livro',
    type: 'string',
  },

  dataEmprestimo: {
    title: 'Data Emprestimo',
    type: 'string',
  },

  dataVencimento: {
    title: 'Data Vencimento',
    type: 'string',
  },
  }
}
]

sources: {name: string, data: Usuario[] | Livro[] | Emprestimo[]}[] = [
  {
    name: 'usuarios',
    data: []
  },

  {
    name: 'livros',
    data: []
  },

  {
    name: 'emprestimos',
    data: []
  },
]

  constructor(private biblioteca: BibliotecaService) { }

  ngOnInit(): void {
    this.biblioteca.getDados();

    this.biblioteca.usuarioSubject.subscribe(
      (usuarios) => {
        if(usuarios.length > 0){
          this.sources[0].data = usuarios;
        }
      }
    )

    this.biblioteca.livroSubject.subscribe(
      (livros) => {
        if(livros.length > 0){
          this.sources[1].data = livros;
        }
      }
    )

    this.biblioteca.emprestimoSubject.subscribe(
      (emprestimos) => {
        if(emprestimos.length > 0){
          this.sources[2].data = emprestimos;
        }
      }
    )
  }

  changeTab(){

  }

  updateTable(){

  }
  onCreateConfirm(event: any, tableName: string){
    console.log(event)
    switch(tableName){
      case 'usuarios':
        this.biblioteca.postUsuarios(event.newData)
        break;
      case 'livros':
        this.biblioteca.postLivros(event.newData)
        break;
      case 'emprestimos':
        this.biblioteca.postEmprestimos(event.newData)
        break;
    }

  }

}
