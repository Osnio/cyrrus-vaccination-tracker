import { ChildDetailData } from '../shared/models/child-detail.model';

export const CHILD_DETAIL_DATA: ChildDetailData[] = [
  {
    "id": 1,
    "nome": "Arthur Martins",
    "nascimento": "04 de ago, 2022",
    "idade": "3 anos",
    "genero": "Masculino",
    "statusGeral": "Próxima vacinação",
    "progresso": 91,
    "contadores": { "aplicadas": 10, "pendentes": 1, "atrasadas": 0, "total": 11 },
    "vacinas": [
      { "nome": "Influenza", "dose": "Dose 1/1", "desc": "Vacina anual contra os principais subtipos do vírus Influenza.", "data": "11/07/2026", "recom": "A partir de 6 meses, anualmente", "status": "Próxima" },
      { "nome": "Tríplice Viral", "dose": "Dose 1/2", "desc": "Protege contra Sarampo, Caxumba e Rubéola.", "data": "04/08/2023", "recom": "12 meses", "status": "Aplicada" },
      { "nome": "Febre Amarela", "dose": "Dose 1/1", "desc": "Imunização contra o vírus da febre amarela, recomendada em todo território nacional.", "data": "04/05/2023", "recom": "9 meses", "status": "Aplicada" },
      { "nome": "Poliomielite (VIP)", "dose": "Dose 3/3", "desc": "Vacina inativada poliomielite, protege contra a paralisia infantil.", "data": "04/02/2023", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Pentavalente", "dose": "Dose 3/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "04/02/2023", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Poliomielite (VIP)", "dose": "Dose 2/3", "desc": "Vacina inativada poliomielite, protege contra a paralisia infantil.", "data": "04/12/2022", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Pentavalente", "dose": "Dose 2/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "04/12/2022", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Poliomielite (VIP)", "dose": "Dose 1/3", "desc": "Vacina inativada poliomielite, protege contra a paralisia infantil.", "data": "04/10/2022", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Pentavalente", "dose": "Dose 1/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "04/10/2022", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Hepatite B", "dose": "Dose 1/4", "desc": "Imunização contra o vírus da Hepatite B, prevenindo cirrose e câncer de fígado.", "data": "05/08/2022", "recom": "Ao nascer, 2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "BCG", "dose": "Dose 1/1", "desc": "Protege contra formas graves da tuberculose, como a meningite tuberculosa.", "data": "05/08/2022", "recom": "Ao nascer", "status": "Aplicada" }
    ]
  },
  {
    "id": 2,
    "nome": "Helena Martins",
    "nascimento": "12 de mar, 2024",
    "idade": "2 anos e 3m",
    "genero": "Feminino",
    "statusGeral": "Vacina atrasada",
    "progresso": 73,
    "contadores": { "aplicadas": 8, "pendentes": 2, "atrasadas": 1, "total": 11 },
    "vacinas": [
      { "nome": "Meningocócica C", "dose": "Dose 2/3", "desc": "Imuniza contra meningite meningocócica do tipo C.", "data": "18/07/2026", "recom": "3, 5 meses e reforço aos 12 meses", "status": "Próxima" },
      { "nome": "Pentavalente", "dose": "Dose 3/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "04/07/2026", "recom": "2, 4 e 6 meses", "status": "Próxima" },
      { "nome": "Pneumocócica 10", "dose": "Dose 2/3", "desc": "Protege contra pneumonia, otite e meningite por pneumococo.", "data": "10/06/2026", "recom": "2, 4 meses e reforço aos 12 meses", "status": "Atrasada" },
      { "nome": "Rotavírus", "dose": "Dose 2/2", "desc": "Previne diarreias graves causadas pelo rotavírus em bebês.", "data": "15/07/2024", "recom": "2 e 4 meses", "status": "Aplicada" },
      { "nome": "Pentavalente", "dose": "Dose 2/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "14/07/2024", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Meningocócica C", "dose": "Dose 1/3", "desc": "Imuniza contra meningite meningocócica do tipo C.", "data": "13/06/2024", "recom": "3, 5 meses e reforço aos 12 meses", "status": "Aplicada" },
      { "nome": "Pneumocócica 10", "dose": "Dose 1/3", "desc": "Protege contra pneumonia, otite e meningite por pneumococo.", "data": "15/05/2024", "recom": "2, 4 meses e reforço aos 12 meses", "status": "Aplicada" },
      { "nome": "Rotavírus", "dose": "Dose 1/2", "desc": "Previne diarreias graves causadas pelo rotavírus em bebês.", "data": "15/05/2024", "recom": "2 e 4 meses", "status": "Aplicada" },
      { "nome": "Pentavalente", "dose": "Dose 1/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "15/05/2024", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Hepatite B", "dose": "Dose 1/4", "desc": "Imunização contra o vírus da Hepatite B, prevenindo cirrose e câncer de fígado.", "data": "13/03/2024", "recom": "Ao nascer, 2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "BCG", "dose": "Dose 1/1", "desc": "Protege contra formas graves da tuberculose, como a meningite tuberculosa.", "data": "13/03/2024", "recom": "Ao nascer", "status": "Aplicada" }
    ]
  },
  {
    "id": 3,
    "nome": "Laura Martins",
    "nascimento": "21 de nov, 2020",
    "idade": "5 anos",
    "genero": "Feminino",
    "statusGeral": "Vacina atrasada",
    "progresso": 63,
    "contadores": { "aplicadas": 5, "pendentes": 3, "atrasadas": 2, "total": 8 },
    "vacinas": [
      { "nome": "Influenza", "dose": "Dose 1/1", "desc": "Vacina anual contra os principais subtipos do vírus Influenza.", "data": "27/06/2026", "recom": "A partir de 6 meses, anualmente", "status": "Próxima" },
      { "nome": "Febre Amarela", "dose": "Dose 1/1", "desc": "Imunização contra o vírus da febre amarela, recomendada em todo território nacional.", "data": "06/05/2026", "recom": "9 meses", "status": "Atrasada" },
      { "nome": "Tríplice Viral", "dose": "Dose 2/2", "desc": "Protege contra Sarampo, Caxumba e Rubéola.", "data": "20/02/2026", "recom": "12 meses", "status": "Atrasada" },
      { "nome": "Tríplice Viral", "dose": "Dose 1/2", "desc": "Protege contra Sarampo, Caxumba e Rubéola.", "data": "22/11/2021", "recom": "12 meses", "status": "Aplicada" },
      { "nome": "Pentavalente", "dose": "Dose 3/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "21/05/2021", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Pentavalente", "dose": "Dose 2/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "21/03/2021", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Pentavalente", "dose": "Dose 1/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "21/01/2021", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "BCG", "dose": "Dose 1/1", "desc": "Protege contra formas graves da tuberculose, como a meningite tuberculosa.", "data": "22/11/2020", "recom": "Ao nascer", "status": "Aplicada" }
    ]
  },
  {
    "id": 4,
    "nome": "Miguel Martins",
    "nascimento": "30 de mai, 2018",
    "idade": "8 anos",
    "genero": "Masculino",
    "statusGeral": "Em dia",
    "progresso": 100,
    "contadores": { "aplicadas": 8, "pendentes": 0, "atrasadas": 0, "total": 8 },
    "vacinas": [
      { "nome": "Influenza", "dose": "Dose 1/1", "desc": "Vacina anual contra os principais subtipos do vírus Influenza.", "data": "21/04/2026", "recom": "A partir de 6 meses, anualmente", "status": "Aplicada" },
      { "nome": "Tríplice Viral", "dose": "Dose 2/2", "desc": "Protege contra Sarampo, Caxumba e Rubéola.", "data": "30/05/2020", "recom": "12 meses", "status": "Aplicada" },
      { "nome": "Tríplice Viral", "dose": "Dose 1/2", "desc": "Protege contra Sarampo, Caxumba e Rubéola.", "data": "30/05/2019", "recom": "12 meses", "status": "Aplicada" },
      { "nome": "Febre Amarela", "dose": "Dose 1/1", "desc": "Imunização contra o vírus da febre amarela, recomendada em todo território nacional.", "data": "28/02/2019", "recom": "9 meses", "status": "Aplicada" },
      { "nome": "Pentavalente", "dose": "Dose 3/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "30/11/2018", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Pentavalente", "dose": "Dose 2/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "30/09/2018", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "Pentavalente", "dose": "Dose 1/3", "desc": "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.", "data": "30/07/2018", "recom": "2, 4 e 6 meses", "status": "Aplicada" },
      { "nome": "BCG", "dose": "Dose 1/1", "desc": "Protege contra formas graves da tuberculose, como a meningite tuberculosa.", "data": "01/06/2018", "recom": "Ao nascer", "status": "Aplicada" }
    ]
  },
  {
    "id": 5,
    "nome": "Sofia Martins",
    "nascimento": "09 de jan, 2016",
    "idade": "10 anos",
    "genero": "Feminino",
    "statusGeral": "Próxima vacinação",
    "progresso": 80,
    "contadores": { "aplicadas": 4, "pendentes": 1, "atrasadas": 0, "total": 5 },
    "vacinas": [
      { "nome": "Influenza", "dose": "Dose 1/1", "desc": "Vacina anual contra os principais subtipos do vírus Influenza.", "data": "02/07/2026", "recom": "A partir de 6 meses, anualmente", "status": "Próxima" },
      { "nome": "Tríplice Viral", "dose": "Dose 2/2", "desc": "Protege contra Sarampo, Caxumba e Rubéola.", "data": "09/01/2018", "recom": "12 meses", "status": "Aplicada" },
      { "nome": "Tríplice Viral", "dose": "Dose 1/2", "desc": "Protege contra Sarampo, Caxumba e Rubéola.", "data": "09/01/2017", "recom": "12 meses", "status": "Aplicada" },
      { "nome": "Febre Amarela", "dose": "Dose 1/1", "desc": "Imunização contra o vírus da febre amarela, recomendada em todo território nacional.", "data": "09/10/2016", "recom": "9 meses", "status": "Aplicada" },
      { "nome": "BCG", "dose": "Dose 1/1", "desc": "Protege contra formas graves da tuberculose, como a meningite tuberculosa.", "data": "10/01/2016", "recom": "Ao nascer", "status": "Aplicada" }
    ]
  }
];