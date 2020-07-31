# Diario de Dev
App front-end para uploads de arquivos local ou remoto.

## Criando o projeto
`create-react-app <my-app>`
create-react-app - Deve ter sido instalado anteriormente.

## Libs e ferramentas utilizadas no projeto
 instalação ex: `yarn add <nomeDaLib>`
 
 `styled-components` - lib que expande o uso de CSS em components Reactjs      utilizando um arquivo .js

`react-dropzone` - lib de criação de caixa de dialogo "dragandrop" para uploads de arquivos  arrastando e soltando o file, alem de visualizações, o usuário pode selecionar um file "agarrando" e arrastando-o para o local desejado 

`react-circular-progressbar` - Componente circular da barra de progresso, construído com SVG e extensivamente personalizável.

`react-icons` - lib de ícones em formato de vetor, populares do React de varias fontes, permite incluir apenas os ícones que o projeto está usando.

`lodash` - lib para trabalhar com matrizes, números, objetos, seqüências de caracteres etc.  Iterando matrizes, objetos e cadeias permite manipular e testar valores criando funções compostas.

`filesize` - retorna um inteiro contendo o tamanho em bytes do arquivo filename ou, se nenhum filename for especificado, retorna o do arquivo que está sendo lido no momento.

`axios` - Cliente HTTP baseado em promisses, que visam representar a conclusão de operações assíncronas para o navegador e nodejs

# Criando projeto front-end
Executar o comando abaixo no terminal:
`create-react-app uploadfile-front-end`

# Criado pasta styles
Pasta criada para conter os stylos globais de CSS aplicado em todo projeto
usando styled-components.
Conteúdo:
~~~
import styled from 'styled-components';

export const Container = styled.div`
   height: 100%; /** somente height 100%, porque width inplicitamente assume a configuração global */
   display: flex;
   justify-content: center; 
   align-items: center; 
`;

export const Content = styled.div`
    width: 100%; /** para caso o max-width seja menor que 400px a div vai usar 100% da tela */
    max-width: 400px;
    margin: 30px;
    background: #FFF;
    border-radius: 4px;
    padding: 20px;
`;
~~~

