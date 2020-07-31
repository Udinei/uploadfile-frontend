import styled from 'styled-components';

export const Container = styled.div`
   height: 100%; /** somente height 100%, porque width inplicitamente assume a configuração global */
   display: flex;
   justify-content: center; /** centraliza o conteudo */
   align-items: center;  /** alinha os itens pelo centro */
`;

export const Content = styled.div`
    width: 100%; /** para caso o max-width seja menor que 400px a div vai usar 100% da tela */
    max-width: 400px;
    margin: 30px;
    background: #FFF;
    border-radius: 4px;
    padding: 20px;
`;