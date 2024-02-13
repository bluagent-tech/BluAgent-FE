import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Form,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Drivers';
import dateConvertTables from './../../services/dateConvertTables';
import SignatureLetterInquiry from './../../containers/signatureLetterInquiry';
import swal from 'sweetalert';
import PdfLI from '../../containers/Drivers/Pdf/PdfLI';
import ToastAlert from '../../components/ToastAlert';
import DatePicker from '../../components/DatePicker';
import SignatureEmploymentHistoryRecords from './../../containers/signatureEmploymentHistoryRecords';
const idCompany = localStorage['idCompany'];

//LETTER INQUIRY  DRIVER LINK

class LetterInAndEmployHis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rN: false,
            rA: false,
            rP: false,
            signaturePad: '',
            Name: '',
            Question1: '',
            Question2: '',
            Question3: '',
            Question4: '',
            Question5: '',
            Question6: '',
            Question7: '',
            Question8: '',
            Question9: '',
            Question10: '',
            Question11: '',
            Question12: '',
            Question13: '',
            Question14: '',
            select: '',
            link: '',
            id: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.alert = this.alert.bind(this);
        this.getLink = this.getLink.bind(this);
        this.getParams = this.getParams.bind(this);
    }

    resizeCanvas(e) {
        let canvas = document.getElementById('signaturepad'),
            ratio = Math.max(window.devicePixelRatio || 1, 1);
        if (canvas && ratio) {
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext('2d').scale(ratio, ratio);
        }
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }

    componentDidMount() {
        if (
            this.props.match.params.id !== null &&
            this.props.match.params.id !== undefined
        ) {
            // this.props.getLetterofInquiry(this.props.match.params.id);
            // this.props.getOneEmploymentHistory(this.props.match.params.id);
            this.props.getLetterInAndEmployHis(this.props.match.params.id, this.props.match.params.idEmployerRecord);
        } else {
            var d = atob(this.props.match.params.x.substr(5)).split(',');
            let mydate = new Date(d[5]);
            let convert = mydate.getTime();
            // this.props.getLetterofInquiry(d[0]);
            this.props.getLetterInAndEmployHis(d[0], d[2]);
            if (Date.now() <= convert) {
            } else {
                this.props.history.push('/login');
            }
        }
    }

    getParams(param) {
        let d = [];
        if (param === 'company') {
            d = atob(this.props.match.params.x.substr(5)).split(',');
            return d[4];
        }
        if (param === 'user') {
            d = atob(this.props.match.params.x.substr(5)).split(',');
            return d[0];
        }
        if (param === 'name') {
            d = atob(this.props.match.params.x.substr(5)).split(',');
            return d[3];
        }
        if (param === 'idL') {
            d = atob(this.props.match.params.x.substr(5)).split(',');
            return d[1];
        }
        if (param === 'idE') {
            d = atob(this.props.match.params.x.substr(5)).split(',');
            return d[1];
        }
    }

    handleSubmit(e) {
        const signatureId = this.props.match.params.idE;
        e.preventDefault();
        let a;

        if (
            this.props.match.params.idE !== null &&
            this.props.match.params.idE !== undefined
        ) {
            var can = signatureId;
        } else {
            var d = atob(this.props.match.params.x.substr(5)).split(',');
            var can = document.getElementById(d[1]);
            a = document.getElementById(d[1]);
        }

        var sec = document.getElementById('Section');
        var rt = new FormData(e.target);

        if (a) {
            var signature = a.toDataURL('image/png');
        }

        if (
            this.props.match.params.idE !== null &&
            this.props.match.params.idE !== undefined
        ) {
            rt.append('Id', this.props.match.params.idE);
            rt.append('IdDriver', this.props.match.params.id);
            rt.append('IdEmployeeRecord', this.props.match.params.idEmployerRecord);
            rt.append('IdEmploymentRecord', this.props.match.params.idEmployerRecord);
        } else {
            var d = atob(this.props.match.params.x.substr(5)).split(',');
            rt.append('Id', d[1]);
            rt.append('IdDriver', d[0]);
            rt.append('IdEmployeeRecord', d[2]);
            rt.append('IdEmploymentRecord', d[2]);
        }

        if (sec.checked) {
            rt.append('Section382', true);
        } else {
            rt.append('Section382', false);
        }

        if (idCompany !== null && idCompany !== undefined) {
            rt.append('IdCompany', idCompany);
        } else {
            let d = atob(this.props.match.params.x.substr(5)).split(',');
            rt.append('IdCompany', d[3]);
        }

        if (
            this.props.match.params.name !== null &&
            this.props.match.params.name !== undefined
        ) {
            rt.append('DriverName', this.props.match.params.name);
        }
        else {
            let d = atob(this.props.match.params.x.substr(5)).split(',');
            rt.append('DriverName', d[2]);
        }

        if (!this.props.signaturePadIsEmpty()) {
            rt.append('Signature', 'signature.png');
            this.props.updateInquiryAnswer(rt);
            this.props.saveEHistoryAnswer(rt);
        } else {
            this.props.signaturePadIsEmpty();
        }
    }

    handleCheckboxChange(e) {
        const sectionOne = document.getElementById('sectionOne');
        const sectionTwo = document.getElementById('sectionTwo');
        const sectionThree = document.getElementById('sectionThree');

        e.target.checked
            ? (sectionOne.style.display = 'none')
            : (sectionOne.style.display = 'block');

        e.target.checked
            ? (this.Q1.options.selectedIndex = 2)
            : (this.Q1.options.selectedIndex = 0);
        e.target.checked
            ? (this.Q2.options.selectedIndex = 2)
            : (this.Q2.options.selectedIndex = 0);
        e.target.checked
            ? (this.Q3.options.selectedIndex = 2)
            : (this.Q3.options.selectedIndex = 0);
        e.target.checked
            ? (this.Q4.options.selectedIndex = 2)
            : (this.Q4.options.selectedIndex = 0);
        e.target.checked
            ? (this.Q5.options.selectedIndex = 2)
            : (this.Q5.options.selectedIndex = 0);

        if (this.state.rN === true && !e.target.checked) {
            sectionTwo.style.display = 'block';
            sectionThree.style.display = 'block';
        } else if (this.state.rN === false && !e.target.checked) {
            sectionTwo.style.display = 'none';
            sectionThree.style.display = 'none';
        }
    }

    handleChange(e) {
        const sectionTwo = document.getElementById('sectionTwo');
        const sectionThree = document.getElementById('sectionThree');
        e.preventDefault();
        if (
            this.Q1.options.selectedIndex === 1 ||
            this.Q2.options.selectedIndex === 1 ||
            this.Q3.options.selectedIndex === 1 ||
            this.Q4.options.selectedIndex === 1 ||
            this.Q5.options.selectedIndex === 1
        ) {
            this.setState({ rN: true, rA: true, rP: true });
            sectionTwo.style.display = 'block';
            sectionThree.style.display = 'block';
        } else {
            this.setState({ rN: false, rA: false, rP: false });
            sectionTwo.style.display = 'none';
            sectionThree.style.display = 'none';
        }
    }

    alert() {
        swal({
            title: 'Survey completed',
            icon: 'success',
            buttons: {
                Ok: {
                    text: 'Ok',
                    onClick:
                        this.props.history.push(
                            '/Drivers/' + this.props.match.params.id
                        ),
                },
            },
        });
    }

    getLink() {
        var date = new Date();
        date.setMinutes(date.getMinutes() + 5);
        var dd = [
            this.props.match.params.id,
            this.props.match.params.idE,
            this.props.match.params.name,
            idCompany,
            date.getTime(),
        ];
        var d = JSON.stringify(dd);
        var f = 'HmTpS' + btoa(d);
        this.setState({ link: window.location.origin + '/#/LetterInAndEmployHis/' + f });
    }

    render() {
        return (
            <React.Fragment>
                <ToastAlert
                    toggleToast={this.props.toggleToastAlert}
                    isOpen={this.props.toastAlertState}
                    message={this.props.message}
                    error={this.props.error}
                />
                <div className='container-fluid' style={{ marginTop: '3%' }}>
                    <div className='animated fadeIn'>
                        {this.props.LetterInAndEmployHis.map((row, index) => (
                            <Row key={index}>
                                {/* <Col sm='3'>  
                                </Col> */}
                                {/*LEVEL 2*/}
                                <Col sm='12'>
                                    <Card>
                                        <CardHeader className='text-center'>
                                            {/* <Card className='text-center'>
                                        <CardBody className='text-white bg-primary'> */}
                                            <div style={{ backgroundColor: '#86d3ff', padding: "20px" }}>
                                                <img
                                                    src={
                                                        this.props.match.params.id !== null &&
                                                            this.props.match.params.id !== undefined
                                                            ? `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${this.props.match.params.id}/driverAvatar.png`
                                                            : `https://bluagent-files.s3-us-west-2.amazonaws.com/${this.getParams(
                                                                'company'
                                                            )}/Drivers/${this.getParams(
                                                                'user'
                                                            )}/driverAvatar.png`
                                                    }
                                                    ref={(img) => (this.img = img)}
                                                    onError={() =>
                                                    (this.img.src =
                                                        'assets/img/Images/profile/profile.png')
                                                    }
                                                    width='200px'
                                                    height='200px'
                                                    alt={this.props.driver.Image}
                                                    className='img-avatar'
                                                />
                                                <span className='avatar-status badge-danger'></span>
                                            </div>
                                            <div className='text-center'>
                                                <strong>
                                                    {row.DriverName
                                                        ? row.DriverName
                                                        : this.getParams('name')}</strong>
                                            </div>
                                            {/* </CardBody>
                                    </Card> */}
                                            {this.props.match.params.id !== null &&
                                                this.props.match.params.id !== undefined ? (
                                                <Card className='text-center'></Card>
                                            ) : (
                                                ''
                                            )}
                                            <h5>
                                                REQUEST/CONSENT FOR INFORMATION FROM PREVIOUS
                                                EMPLOYER(S)
                                            </h5>
                                            <h5>ON ALCOHOL & CONTROLLED SUBSTANCES TESTING</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Form onSubmit={this.handleSubmit} style={{ marginLeft: "100px", marginRight: "100px" }}>
                                                <FormGroup row>
                                                    <Col md='12'>
                                                        <Label style={{ marginLeft: '-1%' }}>
                                                            {' '}
                                                            <Input
                                                                onChange={this.handleCheckboxChange}
                                                                type='checkbox'
                                                                id='Section'
                                                                value={1}
                                                                name='if'
                                                            />{' '}
                                                            If driver was not subject to Part 382 testing
                                                            requirements (did not operate a vehicle which
                                                            required a commercial drivers license) while
                                                            employed, please check and skip items 1 through 5.{' '}
                                                        </Label>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup id='sectionOne'>
                                                    <FormGroup row>
                                                        <Col md='8'>
                                                            <Label htmlFor='text-input'>
                                                                1. Has this person ever tested positive for a
                                                                controlled substance in the last two years?{' '}
                                                            </Label>
                                                        </Col>
                                                        <Col md='4'>
                                                            <select
                                                                name='Question1'
                                                                id='Q1'
                                                                ref={(Q1) => (this.Q1 = Q1)}
                                                                onChange={this.handleChange}
                                                                className='form-control'
                                                                required
                                                                value={row.Question1}
                                                            >
                                                                <option value={undefined}>SELECT</option>
                                                                <option value={true}>YES</option>
                                                                <option value={false}>NO</option>
                                                            </select>
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Col md='8'>
                                                            <Label htmlFor='text-input'>
                                                                2. Has this person ever had an alcohol test with
                                                                a Breath Alcohol Concentration 0.04 or grater in
                                                                the last two years?
                                                            </Label>
                                                        </Col>
                                                        <Col md='4'>
                                                            <select
                                                                name='Question2'
                                                                id='Q2'
                                                                ref={(Q2) => (this.Q2 = Q2)}
                                                                onChange={this.handleChange}
                                                                className='form-control'
                                                                required
                                                                value={row.Question2}
                                                            >
                                                                <option value=''>SELECT</option>
                                                                <option value={true}>YES</option>
                                                                <option value={false}>NO</option>
                                                            </select>
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Col md='8'>
                                                            <Label htmlFor='text-input'>
                                                                3. Has this person ever refused a required test
                                                                for drugs or alcohol in the last two years?
                                                            </Label>
                                                        </Col>
                                                        <Col md='4'>
                                                            <select
                                                                name='Question3'
                                                                id='Q3'
                                                                ref={(Q3) => (this.Q3 = Q3)}
                                                                onChange={this.handleChange}
                                                                className='form-control'
                                                                required
                                                                value={row.Question3}
                                                            >
                                                                <option value=''>SELECT</option>
                                                                <option value={true}>YES</option>
                                                                <option value={false}>NO</option>
                                                            </select>
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Col md='8'>
                                                            <Label htmlFor='text-input'>
                                                                4. Has this person committed other violations of
                                                                DOT drug and alcohol testing regulations?
                                                            </Label>
                                                        </Col>
                                                        <Col md='4'>
                                                            <select
                                                                name='Question4'
                                                                id='Q4'
                                                                ref={(Q4) => (this.Q4 = Q4)}
                                                                onChange={this.handleChange}
                                                                className='form-control'
                                                                required
                                                                value={row.Question4}
                                                            >
                                                                <option value=''>SELECT</option>
                                                                <option value={true}>YES</option>
                                                                <option value={false}>NO</option>
                                                            </select>
                                                        </Col>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup row>
                                                        <Col md='8'>
                                                            <Label htmlFor='text-input'>
                                                                5. If this person has violated a DOT drug and
                                                                alcohol regulation, do you have documentation of
                                                                the employee's successful completion of DOT
                                                                return-to-duty requirements, including
                                                                follow-up?
                                                            </Label>
                                                        </Col>
                                                        <Col md='4'>
                                                            <select
                                                                name='Question5'
                                                                id='Q5'
                                                                ref={(Q5) => (this.Q5 = Q5)}
                                                                onChange={this.handleChange}
                                                                className='form-control'
                                                                required
                                                                value={row.Question5}
                                                            >
                                                                <option value=''>SELECT</option>
                                                                <option value={true}>YES</option>
                                                                <option value={false}>NO</option>
                                                            </select>
                                                        </Col>
                                                    </FormGroup>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md='12'>
                                                        <Label htmlFor='text-input'>
                                                            If YES to any of the above question, please give
                                                            the SAP's (Substance Abuse Professional) name,
                                                            address, and phone number for further reference.
                                                        </Label>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup
                                                    row
                                                    id='sectionTwo'
                                                    style={{ display: 'none' }}
                                                >
                                                    <Col md='6'>
                                                        <Label htmlFor='text-input'>Name:</Label>
                                                        <Input
                                                            type='text'
                                                            id='Name'
                                                            name='Name'
                                                            maxLength='100'
                                                            required={this.state.rN}
                                                            value={row.Name}
                                                        />
                                                    </Col>
                                                    <Col md='6'>
                                                        <Label htmlFor='text-input'>Phone Number:</Label>
                                                        <Input
                                                            type='text'
                                                            id='phone'
                                                            name='SAPPhoneNumber'
                                                            maxLength='15'
                                                            required={this.state.rP}
                                                            value={row.PhoneNumber}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup
                                                    row
                                                    id='sectionThree'
                                                    style={{ display: 'none' }}
                                                >
                                                    <Col md='8'>
                                                        <Label htmlFor='text-input'>
                                                            Address, City, State, Zip Code:
                                                        </Label>
                                                        <Input
                                                            type='text'
                                                            id='Address'
                                                            name='Address'
                                                            maxLength='200'
                                                            required={this.state.rA}
                                                            value={row.AddressInquiry}
                                                        />
                                                    </Col>
                                                </FormGroup>



                                                <FormGroup row>
                                                    <Col md='7'>
                                                        <Label htmlFor='text-input'>
                                                            6. Is the employment record with your company correct
                                                            as stated above?
                                                        </Label>
                                                    </Col>
                                                    <Col md='5'>
                                                        <select
                                                            id='6'
                                                            name='Question6'
                                                            className='form-control'
                                                            required
                                                        >
                                                            <option value=''>SELECT</option>
                                                            <option value={0}>YES</option>
                                                            <option value={1}>NO</option>
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md='7'>
                                                        <Label htmlFor='text-input'>
                                                            7. What kind of work did the applicant do?
                                                        </Label>
                                                    </Col>
                                                    <Col md='5'>
                                                        <select
                                                            id='7'
                                                            name='Question7'
                                                            className='form-control'
                                                            required
                                                        >
                                                            <option value=''>SELECT</option>
                                                            <option value={0}>DRIVER</option>
                                                            <option value={1}>MECHANIC</option>
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md='7'>
                                                        <Label htmlFor='text-input'>
                                                            8. Did the applicant drive commercial motor vehicles?
                                                        </Label>
                                                    </Col>
                                                    <Col md='5'>
                                                        <select
                                                            id='8'
                                                            name='Question8'
                                                            className='form-control'
                                                            required
                                                        >
                                                            <option value=''>SELECT</option>
                                                            <option value={0}>YES</option>
                                                            <option value={1}>NO</option>
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md='7'>
                                                        <Label htmlFor='text-input'>
                                                            9. Was the applicant a safe and efficient driver?
                                                        </Label>
                                                    </Col>
                                                    <Col md='5'>
                                                        <select
                                                            id='9'
                                                            name='Question9'
                                                            className='form-control'
                                                            required
                                                        >
                                                            <option value=''>SELECT</option>
                                                            <option value={0}>YES</option>
                                                            <option value={1}>NO</option>
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md='7'>
                                                        <Label htmlFor='text-input'>
                                                            10. Was the applicant involved in any vehicle
                                                            accidents?
                                                        </Label>
                                                    </Col>
                                                    <Col md='5'>
                                                        <select
                                                            id='10'
                                                            name='Question10'
                                                            className='form-control'
                                                            required
                                                        >
                                                            <option value=''>SELECT</option>
                                                            <option value={0}>YES</option>
                                                            <option value={1}>NO</option>
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md='7'>
                                                        <Label htmlFor='text-input'>
                                                            11. Reason for leaving your company:
                                                        </Label>
                                                    </Col>
                                                    <Col md='5'>
                                                        <select
                                                            id='11'
                                                            name='Question11'
                                                            className='form-control'
                                                            required
                                                        >
                                                            <option value=''>SELECT</option>
                                                            <option value={0}>Discharged</option>
                                                            <option value={1}>Laid off</option>
                                                            <option value={2}>Resigned</option>
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md='7'>
                                                        <Label htmlFor='text-input'>Remarks:</Label>
                                                        <Input
                                                            type='textarea'
                                                            id='RQ11'
                                                            name='RemarkQuestion11'
                                                            style={{ resize: 'none' }}
                                                            maxLength='355'
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <br />
                                                <FormGroup row>
                                                    <Col md='7'>
                                                        <Label htmlFor='text-input'>
                                                            12. Was the applicant's general conduct satisfactory?
                                                        </Label>
                                                    </Col>
                                                    <Col md='5'>
                                                        <select
                                                            id='12'
                                                            name='Question12'
                                                            className='form-control'
                                                            required
                                                        >
                                                            <option value=''>SELECT</option>
                                                            <option value={0}>YES</option>
                                                            <option value={1}>NO</option>
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md='7'>
                                                        <Label htmlFor='text-input'>
                                                            13. Is the applicant competent for the position sought?
                                                        </Label>
                                                    </Col>
                                                    <Col md='5'>
                                                        <select
                                                            id='13'
                                                            name='Question13'
                                                            className='form-control'
                                                            required
                                                        >
                                                            <option value=''>SELECT</option>
                                                            <option value={0}>YES</option>
                                                            <option value={1}>NO</option>
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                                <br />
                                                <FormGroup row>
                                                    <Col md='7'>
                                                        <Label htmlFor='text-input'>
                                                            14. Did the applicant at any time drink alcoholic
                                                            beverages while on duty?
                                                        </Label>
                                                    </Col>
                                                    <Col md='5'>
                                                        <select
                                                            id='14'
                                                            name='Question14'
                                                            className='form-control'
                                                            required
                                                        >
                                                            <option value=''>SELECT</option>
                                                            <option value={0}>YES</option>
                                                            <option value={1}>NO</option>
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row className='text-center'>
                                                    <Col md='3'>
                                                        <Label htmlFor='text-input'></Label>
                                                    </Col>
                                                    <Col md='3'>
                                                        <Label>Excellent</Label>
                                                    </Col>
                                                    <Col md='3'>
                                                        <Label>Good</Label>
                                                    </Col>
                                                    <Col md='3'>
                                                        <Label>Bad</Label>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row className='text-center'>
                                                    <Col md='3'>
                                                        <Label htmlFor='text-input'>Quality of work</Label>
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input
                                                            type='radio'
                                                            id='c'
                                                            value={1}
                                                            name='Quality'
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input type='radio' id='c' value={2} name='Quality' />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input type='radio' id='c' value={3} name='Quality' />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row className='text-center'>
                                                    <Col md='3'>
                                                        <Label htmlFor='text-input'>
                                                            Cooperation with others
                                                        </Label>
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input
                                                            type='radio'
                                                            id='c'
                                                            value={1}
                                                            name='Cooperation'
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input
                                                            type='radio'
                                                            id='c'
                                                            value={2}
                                                            name='Cooperation'
                                                        />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input
                                                            type='radio'
                                                            id='c'
                                                            value={3}
                                                            name='Cooperation'
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row className='text-center'>
                                                    <Col md='3'>
                                                        <Label htmlFor='text-input'>Safety habits</Label>
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input
                                                            type='radio'
                                                            id='c'
                                                            value={1}
                                                            name='Safety'
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input type='radio' id='c' value={2} name='Safety' />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input type='radio' id='c' value={3} name='Safety' />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row className='text-center'>
                                                    <Col md='3'>
                                                        <Label htmlFor='text-input'>Personal habits</Label>
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input
                                                            type='radio'
                                                            id='c'
                                                            value={1}
                                                            name='Personal'
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input type='radio' id='c' value={2} name='Personal' />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input type='radio' id='c' value={3} name='Personal' />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row className='text-center'>
                                                    <Col md='3'>
                                                        <Label htmlFor='text-input'>Driving skill</Label>
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input
                                                            type='radio'
                                                            id='c'
                                                            value={1}
                                                            name='Driving'
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input type='radio' id='c' value={2} name='Driving' />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input type='radio' id='c' value={3} name='Driving' />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row className='text-center'>
                                                    <Col md='3'>
                                                        <Label htmlFor='text-input'>Attitude</Label>
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input
                                                            type='radio'
                                                            id='c'
                                                            value={1}
                                                            name='Attitude'
                                                            required
                                                        />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input type='radio' id='c' value={2} name='Attitude' />
                                                    </Col>
                                                    <Col md='3'>
                                                        <Input type='radio' id='c' value={3} name='Attitude' />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md='7'>
                                                        <Label htmlFor='text-input'>Remarks:</Label>
                                                        <Input
                                                            type='textarea'
                                                            id='6'
                                                            name='Remarks'
                                                            style={{ resize: 'none' }}
                                                            maxLength='355'
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <br />
                                                <p
                                                    style={{
                                                        fontSize: '13pt',
                                                        textAlign: 'justify',
                                                        width: '550px',
                                                    }}
                                                >
                                                    This section was completed by:
                                                </p>
                                                <FormGroup row>
                                                    <Col md='6'>
                                                        <Label htmlFor='text-input'>Name:</Label>
                                                        <Input
                                                            type='text'
                                                            id='NameR'
                                                            name='CompletedByName'
                                                            maxLength='100'
                                                            required
                                                            value={row.CompletedByName}
                                                        />
                                                    </Col>
                                                    <Col md='6'>
                                                        <Label htmlFor='text-input'>Title:</Label>
                                                        <select
                                                            className='form-control'
                                                            type='text'
                                                            id='Title'
                                                            name='CompletedByTitle'
                                                            maxLength='20'
                                                            required
                                                            value={row.CompletedByTitle}
                                                        >
                                                            <option value=''>SELECT</option>
                                                            <option value={1}>
                                                                Prospective Employee Supervisor
                                                            </option>
                                                            <option value={2}>
                                                                Previous Employer Supervisor
                                                            </option>
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md={6}>
                                                        <DatePicker
                                                            id='date'
                                                            name='DateSent'
                                                            labelText='Date'
                                                            value={dateConvertTables(
                                                                row.DateSent || row.DateMailed
                                                            )}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md='4'>
                                                        {row.Signature !== 'signature.png' ? (
                                                            <SignatureEmploymentHistoryRecords
                                                            name='eHisitory'
                                                            id={
                                                                this.props.match.params.idE
                                                                    ? this.props.match.params.idE
                                                                    : this.getParams('idE')
                                                            }
                                                            saveSignatureFile={
                                                                this.props.saveSignatureFileEmployerHistory
                                                            }
                                                            driver={this.props.driver}
                                                        />
                                                        ) : 
                                                            this.props.match.params.name !== null &&
                                                            this.props.match.params.name !== undefined ? 
                                                            (
                                                            <img
                                                                id='SignatureHistory'
                                                                name='SignatureHistory'
                                                                src={`https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/EmployerSignatureHistory/${this.props.match.params.idE}/signature.png`}
                                                                alt='employer-signature'
                                                            />
                                                        ) : (
                                                            <img
                                                                id='SignatureHistory'
                                                                name='SignatureHistory'
                                                                src={`https://bluagent-files.s3-us-west-2.amazonaws.com/${this.getParams('company')}/Drivers/EmployerSignatureHistory/${this.getParams('idE')}/signature.png`}
                                                                alt='employer-signature'
                                                            />
                                                        )
                                                    }
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md='4'>
                                                        <Button
                                                            size='md'
                                                            outline
                                                            color='primary'
                                                            type='submit'
                                                        >
                                                            Save
                                                        </Button>
                                                        {this.props.isLoading ? (
                                                            <img
                                                                style={{
                                                                    width: '140px',
                                                                    position: 'absolute',
                                                                    marginTop: '0px',
                                                                    right: '40%',
                                                                }}
                                                                src='../../assets/img/icons/loading2.gif'
                                                                alt='loading'
                                                            />
                                                        ) : (
                                                            <div />
                                                        )}
                                                    </Col>
                                                    <Col md='7'>
                                                        {this.props.message === 'Saved Correctly'
                                                            ? (this.props.match.params.id !== null &&
                                                                this.props.match.params.id !== undefined) ?? this.alert()
                                                            : ''}
                                                    </Col>
                                                </FormGroup>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        ))}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(
    (state) => state.drivers,
    (dispatch) => bindActionCreators(actionCreators, dispatch)
)(LetterInAndEmployHis);
