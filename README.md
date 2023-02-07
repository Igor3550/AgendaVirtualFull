# AgendaVirtual

## Descrição 
Projeto voltado para usuários que desejam uma ferramenta de agendamentos virtual. Esse projeto foi feito para um usuário que trabalha no ramo da beleza, e não queria trabalhar com agenda fisica.

#### OBS.: O projeto ainda esta em desenvolvimento.

### Features
- O usuário pode agendar um horario com nome do cliente, data, serviço e horario desejado.
- O usuário pode ver a lista de agendamentos separados por agendamentos do dia atual, proximos dias e agendamentos atrasados que não foram fianlizados.
- Na pagina de listar agendamentos o usuario pode alterar, deletar um agendamento ou finalizar o agendamento.
- Ao finalizar, o agendamento fica na pagina de histórico de agendamento.
- O usuário tambem tem uma pagina para lista de espera, onde poderá guardar o nome do cliente, o serviço e a data desejada.

### Próximas Features
- O usuário terá uma página de configurações onde poderá adicionar, alterar e deleter serviços.
- Os clientes do usuário terá uma pagina onde poderá fazer seu agendamento.

## Ferramentas
Algumas das tecnologias utilizadas para o desenvolvimento deste projeto:

- ReactJs (Styled Components, Custom hooks, Custom Provider Pattern);
- NodeJs
- Express;
- Typescript;
- PostgreSQL 
- PrismaORM;
- Jest
- SuperTest;
- Docker;

## Clonar e rodar na sua máquina

- 1 - clonar esse repositório:
  #### `git clone https://github.com/Igor3550/AgendaVirtualFull.git`
- 2 - rodar o docker-compose na pasta raiz do projeto
  #### `docker-compose up --build`