import styled, { css } from 'styled-components';

// muda a cor do componente ao aceitar a imagem
const dragActive = css`
   border-color: #78e5d5;
`;

// muda a cor do componente ao rejeitar a imagem
const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
    className: 'dropzone'
})`
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer; /** componente clicavel */

    transition: height 0.2s ease;  /** animação */

    /** aplica o css se a propriedade idDragActive do componente for true  */
    ${props => props.isDragActive && dragActive}
    ${props => props.isDragReject && dragReject}
`;

/** cores para uso conforme atrib. type do componente */
const messageColors = {
    default: "#999",
    error: "#e57878",
    success: "#78e5d5"
};


export const UploadMessage = styled.p`
  display: flex;
  color: ${props => messageColors[props.type || "default"]}; /** props vem dos atrib. do componente usado no index.js */
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;