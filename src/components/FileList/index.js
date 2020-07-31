/** Lista de arquivos e suas informações  */
import React from 'react';
import { Container, FileInfo, Preview } from './styles';
import { CircularProgressbar } from 'react-circular-progressbar';

import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

const FileList = ({ files, onDelete }) => (
    <Container>
        {/** leia todos os arquivos selecionados para upload */ }
        { files.map(uploadedFile => (
            <li key={uploadedFile.id}>
                {/** inf. do arquivos img, tamanho, preview */ }
                <FileInfo>
                    <Preview src={ uploadedFile.preview } />
                    <div>
                        <strong>{ uploadedFile.name }</strong>
                        <span>
                            { uploadedFile.readableSize }{" "}

                            {/** se o upload ja terminou, exibir o botao de excluir */}
                            { !!uploadedFile.url && (
                                <button onClick={ () => onDelete(uploadedFile.id) }>Excluir</button>
                            )}
                        </span>
                    </div>
                </FileInfo>
                <div>
                    {/** exibe progress bar, enquanto  terminou upload e nem houver erro  */ }
                    { !uploadedFile.uploaded && !uploadedFile.error && (
                        //** barra de progresso - exibida sozinha enquanto o upload esta acontecendo */ }
                        <CircularProgressbar
                            styles={ {
                                root: { width: 25 }, // tamanho do icone de progress
                                path: { stroke: '#7159c1' } // cor do circulo do progress
                            } }
                            strokeWidth={ 5 } // largura da seta de carregamento
                            percentage={ uploadedFile.progress } // porcentagem carregada
                        />
                        
                    ) }
                  
                    {/** exibe o link somente se a url estiver preenchida - preenchida assim que termina o upload */ }
                    { uploadedFile.url && (
                        //** link para imagem, abre em uma nova aba,  */ 
                        <a href={uploadedFile.url}
                            target="_blank"
                            rel="noopener noreferrer" // para evita erros do eslint
                        >
                            {/** oo - icone de link - exibido apos upload */ }
                            <MdLink style={ { marginRight: 8 } } size={ 24 } color="#222" />
                        </a>
                    ) }
                    {/** icone success ! - exibido apos upload ficar true */ }
                    { uploadedFile.uploaded && <MdCheckCircle size={ 24 } color="#78e5d5" /> }

                    {/** icone de erro - exibido somente se  erro ficar true */ }
                    { uploadedFile.error && <MdError size={ 24 } color="#e57878" /> }
                </div>
            </li>
        )) }
    </Container>
)

export default FileList;