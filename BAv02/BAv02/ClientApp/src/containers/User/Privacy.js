import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Col } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";

class Privacy extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { open: false };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <Col md="12">
        <span>
          <button
            type="button"
            style={{
              border: "0px",
              backgroundColor: " #FFFFFF",
              color: "blue",
              size: "sm",
            }}
            onClick={this.toggle}
          >
            Privacy Policy.
          </button>
        </span>
        <Modal isOpen={this.state.open} className={"modal-lg "}>
          <ModalHeader name="modal1" toggle={this.toggle}></ModalHeader>
          <ModalBody>
            <Scrollbars style={{ height: 400 }}>
              <h6 className="text-center">PRIVACY POLICY</h6>

              <p>
                Protecting your private information is our priority. This
                Statement of Privacy applies to the www.bluagent.com and
                BluAgent, Technologies Inc. and governs data collection and
                usage. For the purposes of this Privacy Policy, unless otherwise
                noted, all references to BluAgent Technologies, Inc. include
                www.bluagent.com and BluAgent. The BluAgent website is an
                informational and online business website. By using the BluAgent
                website and mobile solutions, you consent to the data practices
                described in this statement.{" "}
              </p>
              <p>Collection of your Personal Information </p>
              <p>
                We collect both personally identifiable information and
                non-personal information from our users.
              </p>
              <p>
                The personal information collected can include your name, phone
                number, email address, where you are located, other aspects of
                your vehicle, driving behavior and trips and office address.
              </p>
              <p>
                Information about your computer hardware and software may be
                automatically collected by BluAgent. This information can
                include: your IP address, browser type, domain names, access
                times and referring website addresses. This information is used
                for the operation of the service, to maintain quality of the
                service, to provide general statistics regarding use of the
                BluAgent website, mobile solutions, and to enable BluAgent to
                provide additional services in the future.{" "}
              </p>
              <p>
                BluAgent encourages you to review the privacy statements of
                websites you choose to link to from BluAgent so that you can
                understand how those websites collect, use and share your
                information. BluAgent is not responsible for the privacy
                statements or other content on websites outside of the BluAgent
                website.{" "}
              </p>
              <p>Security of your Personal Information </p>
              <p>
                BluAgent secures your personal information from unauthorized
                access, use or disclosure. When personal information is
                transmitted to other websites, it is protected through the use
                of encryption, such as the Secure Sockets Layer (SSL) protocol.
                We do not store credit card information. BluAgent only use of
                cookies is for storing session management tokens for
                authentication validation.
              </p>
              <p>
                BluAgent uses Amazon Web Services to store some of your
                information (for example, your documents). You can find more
                information on Amazon’s data security from Amazon.
              </p>
              <p>Children Under Thirteen </p>
              <p>
                BluAgent does not knowingly collect personally identifiable
                information from children under the age of thirteen. If you are
                under the age of thirteen, you must ask your parent or guardian
                for permission to use the BluAgent website and mobile solutions.{" "}
              </p>
              <p>Opt-Out & Unsubscribe </p>
              <p>
                We respect your privacy and give you an opportunity to opt-out
                of receiving announcements of certain information. Users may
                opt-out of receiving any or all communications from BluAgent by
                contacting us here:{" "}
              </p>
              <p>- Web page: www.bluagent.com </p>
              <p>- Email: info@bluagent.com </p>
              <p>- Phone: 619-8785852 </p>
              <p>Changes to this Statement </p>
              <p>
                BluAgent will occasionally update this Statement of Privacy to
                reflect company and customer feedback. BluAgent encourages you
                to periodically review this Statement to be informed of how
                BluAgent is protecting your information.{" "}
              </p>
              <p>Contact Information </p>
              <p>
                BluAgent welcomes your questions or comments regarding this
                Statement of Privacy. If you believe that BluAgent has not
                adhered to this Statement, please contact BluAgent at:{" "}
              </p>
              <p>
                BluAgent Technologies, Inc. 9765 Marconi Drive Suite 200M, San
                Diego, CA 92154
              </p>
              <p>Email Address: info@bluagent.com </p>
              <p>Telephone number: 619-8785852</p>
              <p>Effective as of February 1, 2018 </p>
            </Scrollbars>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </Col>
    );
  }
}

export default Privacy;
