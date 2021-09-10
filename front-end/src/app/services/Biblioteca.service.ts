import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take } from 'rxjs/operators';
import { Usuario } from "../models/Usuario.model";
import { Livro } from '../models/Livro.model';
import { Emprestimo } from '../models/Emprestimo.model';

@Injectable({
  providedIn: 'root'
})

export class BibliotecaService {


  usuarioSubject = new BehaviorSubject<Usuario[]>([]);
  livroSubject = new BehaviorSubject<Livro[]>([]);
  emprestimoSubject = new BehaviorSubject<Emprestimo[]>([]);



  constructor(private http: HttpClient){}

  getDados(){
    this.getUsuarios();
    this.getLivros();
    this.getEmprestimos();
  }

  getUsuarios(){
    return this.http.get<any[]>(`${environment.URL_API}/usuario`).pipe(take(1))
    .subscribe(
      (usuarios) => {
        if(usuarios){
          const usuarioAux: Usuario[] = usuarios.map(item => new Usuario(item[0], item[1], item[2]))
          this.usuarioSubject.next(usuarioAux);
          console.log(usuarioAux)
        }
      },
      (error) => {
        this.usuarioSubject.next([]);
      }
    )
  }

  postUsuarios(usuario: Usuario){
    return this.http.post(`${environment.URL_API}/usuario`, {
      'cpf': usuario.cpf,
      'nome': usuario.nome,
      'matricula': usuario.matricula
    }).pipe(take(1)).subscribe(
      (response) => {
        this.getUsuarios();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getLivros(){
    return this.http.get<any[]>(`${environment.URL_API}/livro`).pipe(take(1))
    .subscribe(
      (livros) => {
        if(livros){
          const livrosAux: Livro[] = livros.map(item => new Livro(
            item[1], item[2], item[3], item[4], item[0]))
          this.livroSubject.next(livrosAux);
          console.log(livrosAux)
        }
      },
      (error) => {
        this.livroSubject.next([]);
      }
    )
  }

  postLivros(livro: Livro){
    return this.http.post(`${environment.URL_API}/livro`, {
      'nome': livro.nome,
      'edicao': livro.edicao,
      'autor': livro.autor,
      'unidades': livro.unidades
    }).pipe(take(1)).subscribe(
      (response) => {
        this.getLivros();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getEmprestimos(){
    return this.http.get<any[]>(`${environment.URL_API}/emprestimo`).pipe(take(1))
    .subscribe(
      (emprestimos:any[]) => {
        if(emprestimos){
          console.log(emprestimos)
          const emprestimosAux: Emprestimo[] = emprestimos.map(item => new Emprestimo(
            item[1], item[2], item[3], item[4], item[0]))
          this.emprestimoSubject.next(emprestimosAux);
          console.log(emprestimosAux);
        }
      },
      (error) => {
        this.emprestimoSubject.next([]);
      }
    )
  }

  postEmprestimos(emprestimo: Emprestimo){
    return this.http.post(`${environment.URL_API}/emprestimo`, {
      'cpf_usuario': emprestimo.cpfUsuario,
      'id_livro': emprestimo.idLivro,
      'data_emprestimo': emprestimo.dataEmprestimo,
      'data_vencimento': emprestimo.dataVencimento
    }).pipe(take(1)).subscribe(
      (response) => {
        this.getEmprestimos();
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
