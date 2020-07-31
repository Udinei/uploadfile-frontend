/** Estilização global da aplicação sera convertido para CSS em tempo de execução*/
import { createGlobalStyle } from 'styled-components';

// import global do css usado pelo circular-progressbar
import 'react-circular-progressbar/dist/styles.css';

export default createGlobalStyle`
/** para todos os componentes da tela */
   * {
       margin: 0;
       padding: 0;
       outline: 0;
       box-sizing: border-box;
   }

   body {
       font-family: Arial, Helvetica, sans-serif;
       font-size: 14px;
       background: #7159c1;
       text-rendering: optimizeLegibility; /** melhora visao do texto renderizado */
       -webkit-font-smoothing: antialiased; 
   }

   /** as tags html,body e #root irão ocupar 100% da tela */
   html, body, #root {
       height: 100%;
   }
`;