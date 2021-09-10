export class Emprestimo{

  constructor(
    public cpfUsuario: string,
    public idLivro: number,
    public dataEmprestimo: string,
    public dataVencimento: string,
    public id? :number){}
}
