import React, { Component } from 'react';
import Dropzone from 'react-dropzone'; /** lib de cx. dialogo para upload de imagens */
import { DropContainer, UploadMessage } from './styles';

export default class Upload extends Component {

    renderDragMessage = (isDragActive, isDragReject) => {
        if (!isDragActive) {
            return <UploadMessage>Clique e selecione ou Arraste arquivos para cá...</UploadMessage>
        }
        if (isDragReject) {
            return <UploadMessage type="error">Arquivo não suportado...</UploadMessage>
        }

        return <UploadMessage type="success">Solte os arquivos aqui...</UploadMessage>
    }

    render() {
        // onUpload - propriedade do componente Upload setado em App.js 
        const { onUpload } = this.props;
       
        return (

            <Dropzone accept="image/*" onDropAccepted={ onUpload }>
                {/* usa RenderProps (funcao) em vez de um children e envolto por () retorna um jsx */ }
                { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                    <DropContainer
                        { ...getRootProps() }
                        isDragActive={ isDragActive } //true ativa a img ao arrastar
                        isDragReject={ isDragReject } //true o file nao é img
                    >
                        <input { ...getInputProps() } /> {/* trata o proprs do input*/ }
                        { this.renderDragMessage(isDragActive, isDragReject) }{/* chama funcao de tratamente e visualização do upload */ }
                    </DropContainer>
                ) }
            </Dropzone>

        )
    }
}