import React, { Component } from 'react';
import GlobalStyle from './styles/global'
import { Container, Content } from './styles';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from './services/api';

import Upload from './components/Upload';
import FileList from './components/FileList';

class App extends Component {
  state = {
    uploadedFiles: [], // guarda informações dos arquivos que fez uploads
  };

  // ao iniciar a aplicação carrega todos os upload ja realizados
  async componentDidMount() {
    const response = await api.get('posts');

    // cria o state com os uploads recuperados
    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url
      }))
    })
  }

  handleUpload = files => {
    // retorna um objeto ({
    const uploadedFiles = files.map(file => ({
      file, // instancia do arquivo que esta sendo enviado para a api
      id: uniqueId(), // gera um nuveo aleatorio, sera o key da lista
      name: file.name,
      readableSize: filesize(file.size), // retorna o tamanho do arquivo em KB, MB
      preview: URL.createObjectURL(file), //URL Global do react, cria preview do file
      progress: 0,  // progresso da barra começa em zero 
      uploaded: false,  // true se finalizou 
      error: false,  // true se aconteceu erro
      url: null, //prenchido apos o upload do file link 
    }))

    // atualizas o state
    this.setState({
      // adiciona os dados do file selecionado o array do state 
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    // para cada arquivo que esta sendo feito upload
    uploadedFiles.forEach(this.processUpload);
  };

  // atualiza dados do file no state
  updateFile = (id, data) => {

    // para todos os arquivos que esta na lista de uploads
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {

        // se o id for igual ao id do file que esta sendo enviado, atualiza
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }  // atualiza os dados do file no state (progress )
          : uploadedFile;  // retorna sem alteração dos dados do file
      })
    });
  }

  // analisa um arquivo de upload de cada vez
  // medindo o progresso de cada um
  processUpload = (uploadedFile) => {
    const data = new FormData(); // cria um obj do tipo form 

    // adiciona novo campo file no formData, e associa um arquivo file(que sendo enviado) e envia seu nome junto (opcional)
    data.append('file', uploadedFile.file, uploadedFile.name);

    // executa requisição do upload
    api.post('posts', data, {
      onUploadProgress: e => {  // config. que retorna o progresso do upload         
        const progress = parseInt(Math.round((e.loaded * 100) / e.total)); // e.loaded - o qto do arq. ja foi carregado, regra de tres para calcular o percentual de upload realizado

        console.log("data comp rogress", progress);
        // atualiza dados do file no state
        this.updateFile(uploadedFile.id, {
          progress,
        });
      }
      // ao terminar com sucesso
    }).then((response) => {
      // altera dados do arquivo no state, e atualiza url e sinaliza uploaded(finalizado)
      this.updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data._id,
        url: response.data.url,
      })
    }).catch(() => {
      this.updateFile(uploadedFile.id, {
        error: true
      })
    })
  };

  handleDelete = async id => {
    await api.delete(`/posts/${id}`);

    this.setState({
      // retorna outro array com todos os elementos(file), que tenha id diferente do informado
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id),
    });
  }

  // ao fechar a app
  componentWillUnmount(){
    // remove todos os objetos da cache de imagens
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
  }

  render() {
    // obetem dados do state
    const { uploadedFiles } = this.state;

    return (
      <Container>
        <Content>
          <Upload onUpload={ this.handleUpload } />
          {/** !! retorna um booleano em vez do valor de length */ }
          { !!uploadedFiles.length && (
            // retorna a lista de arquivos selecionados para upload somente se existir 
            <FileList files={ uploadedFiles } onDelete={ this.handleDelete } />
          ) }
        </Content>
        <GlobalStyle />
      </Container>
    )
  }
}

export default App;
