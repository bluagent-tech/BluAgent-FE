import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../../../store/AccountSettings';
import { TabPane, Row, Col, Alert } from 'reactstrap';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import Pagination from '../../../../../components/Pagination';
import FilesCard from '../../../../../components/FilesCard';
registerPlugin(FilePondPluginFileValidateType);
const id = JSON.parse(localStorage.getItem('user')).Id;

let Files = {
  data: [],
};

class SectionTab extends React.Component {
  constructor(props) {
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      docType: 'Certificate of Enrollment',
      activeTab: '1',
      allFiles: [],
      currentFiles: [],
      currentPage: null,
      totalPages: null,
      countFiles: 0,
    };
  }

  fileCard = (file) => {
    return (
      <FilesCard
        docType={this.props.docType}
        download={this.props.downloadDoc}
        toggle={this.props.toggleDeleteFilesCompanyModal}
        delete={this.props.deleteDoc}
        key={file.Id}
        file={file}
        class='FileCardsDropdown'
      />
    );
  };

  componentDidMount() {
    Files.data = this.props.docs.filter(this.props.filter);
    const { data: allFiles = [] } = Files;
    this.setState({ allFiles });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.message === 'File deleted successfully') {
      this.props.resetMessage();
    }
  }

  onPageChanged = (data) => {
    const { allFiles } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentFiles = allFiles.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentFiles, totalPages });
  };

  uploadFile() {
    var form = new FormData();
    let files = this.pond.getFiles();
    let timeout = 5000;
    if (files.length !== 0) {
      var elementId = 'loading' + this.props.tabId
      document.getElementById(elementId).style = 'display:block';
      document.getElementById('warningAlert').style = 'display:none';
      files.forEach((file) => {
        form.append('files', file.file);
      });
      form.append('id', id);
      form.append('docType', this.props.docType);
      form.append('idAccident', 0);
      this.props.uploadFile(form);
      setTimeout(() => {
        this.props.toggleDrugTestingAddDocument();
      }, timeout);
    } else {
      document.getElementById('warningAlert').style = 'display:block';
    }
  }

  render() {
    const { allFiles, currentFiles, countFiles } = this.state;
    return (
      <React.Fragment>
        <TabPane tabId={this.props.tabId}>
          <div className='container mb-5'>
            <Row>
              <Col md='12'>
                <div className='row d-flex flex-row py-2'>
                  {currentFiles.map(this.fileCard)}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <FilePond
                  ref={(ref) => (this.pond = ref)}
                  allowFileTypeValidation={false}
                  onupdatefiles={(countFiles) => {
                    this.setState({
                      countFiles: countFiles.length,
                    });
                  }}
                  allowRevert={false}
                  instantUpload={false}
                  allowMultiple={true}
                  maxFiles={100}
                  maxParallelUploads={100}
                />
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <Pagination
                  totalRecords={allFiles.length}
                  pageLimit={5}
                  onPageChanged={this.onPageChanged}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 6, offset: 6 }} style={{ textAlign: 'right' }}>
                <button
                  className='btn btn-primary'
                  type='button'
                  onClick={this.uploadFile}
                  disabled={countFiles === 0 ? true : false}
                >
                  Upload Files
                </button>
              </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col md='12' style={{ textAlign: 'center' }}>
                <Alert
                  id='warningAlert'
                  color='warning'
                  style={{ display: 'none' }}
                >
                  No file has been added for upload
                </Alert>

                <img
                  id={'loading' + this.props.tabId}
                  className='imgLoading'
                  style={{
                    display: 'none',
                  }}
                  src='../../assets/img/icons/loading2.gif'
                  alt='loading'
                />
              </Col>
            </Row>
          </div>
        </TabPane>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(SectionTab);
