import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';

class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { open: false };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  onChange(e) {
    var checkbox = e.target;
    let errorDOT = document.getElementById('errorDOT').innerText.trim();

    if (errorDOT !== '' && errorDOT === 'Duplicate USDOT Account') {
      document.getElementById('createC').setAttribute('disabled', 'disabled');
    } else {
      document.getElementById('createC').removeAttribute('disabled');
    }
    if (!checkbox.checked) {
      document.getElementById('createC').setAttribute('disabled', 'disabled');
    }
  }

  render() {
    return (
      <Col md='12'>
        <input
          type='checkbox'
          id='termsOfS1'
          name='Ia'
          onChange={this.onChange}
        />{' '}
        <span>
          I have read and accept the{' '}
          <button
            type='button'
            style={{
              border: '0px',
              backgroundColor: ' #FFFFFF',
              color: 'blue',
              size: 'sm',
            }}
            onClick={this.toggle}
          >
            Terms of Service
          </button>
          and
        </span>
        <Modal isOpen={this.state.open} className={'modal-lg '}>
          <ModalHeader name='modal1' toggle={this.toggle}></ModalHeader>
          <ModalBody>
            <Scrollbars style={{ height: 400 }}>
              <h6 className='text-center'>
                TERMS OF SERVICE AND PRIVACY POLICY
              </h6>

              <p>
                Welcome to the BluAgent Technologies, Inc. ("BluAgent," "we" or
                "us") website located at bluagent.com (the "Site"). Please read
                these Terms of Service (the "Terms") carefully because they
                govern your use of our Service (as defined below). By using our
                Services, you agree to be bound by these Terms, with your
                agreement being further specified in Section 2. Please contact
                us with any questions at sales@bluagent.com.
              </p>
              <p>1. Description of Service</p>
              <p>
                1.1. The "Service(s)" means BluAgent's drug and alcohol testing
                and compliance management software (including the Site, our
                mobile device application ("App"), and any software)
                ("Software"), and all of Our Content (as defined below). The
                Service does not include Your Data (as defined below) or any
                software application or service that is provided by you or a
                third party, which you use in connection with the Service,
                whether or not BluAgent designates them as official integrations
                (each a "Non-BluAgent Product"). Any modifications and new
                features added to the Service are also subject to these Terms.
                All rights, title and interest in and to the Service and its
                components (including all intellectual property rights) will
                remain with and belong exclusively to BluAgent, including the
                rights to any text, graphics, images, music, software, audio,
                video, documents, works of authorship of any kind, and
                information or other materials that are posted, generated,
                provided or otherwise made available by us through the Services
                ("Our Content").
              </p>
              <p>2. Agreement to Terms</p>
              <p>
                2.1. BY USING OUR SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS
                INCLUDING ANY POLICIES OR OTHER TERMS REFERENCED IN OR
                INCORPORATED BY THESE TERMS (SUCH AS THE PRIVACY POLICY). BY
                ACCEPTING THIS AGREEMENT, SIGNING UP FOR AN ACCOUNT (AS DEFINED
                BELOW) OR BY EXECUTING AN ORDER FORM THAT REFERENCES THIS
                AGREEMENT, YOU AGREE TO THE TERMS OF THIS AGREEMENT. IF YOU ARE
                ENTERING INTO THIS AGREEMENT ON BEHALF OF A COMPANY OR OTHER
                LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE THE AUTHORITY TO BIND
                SUCH ENTITY AND ITS AFFILIATES TO THESE TERMS AND CONDITIONS, IN
                WHICH CASE THE TERMS "YOU" OR "YOUR" SHALL REFER TO SUCH ENTITY
                AND ITS AFFILIATES. IF YOU DO NOT HAVE SUCH AUTHORITY, OR IF YOU
                DO NOT AGREE WITH THESE TERMS AND CONDITIONS, YOU MUST NOT
                ACCEPT THIS AGREEMENT AND MAY NOT USE THE SERVICES.
              </p>

              <p>
                2.2. PLEASE BE AWARE OF THE AGREEMENT TO ARBITRATE LOCATED IN
                SECTION 12 OF THESE TERMS, AS IT REQUIRES ARBITRATION TO RESOLVE
                DISPUTES, IN MOST CASES, ON AN INDIVIDUAL BASIS, RATHER THAN
                JURY TRIALS AND CLASS ACTIONS.
              </p>
              <p>3. Your Access and Use of the Services</p>

              <p>
                3.1. You may access and use the Service only for lawful,
                authorized purposes and you shall not misuse the Service in any
                manner (as determined by BluAgent in its sole discretion). See
                Section 11 below for further provisions outlining prohibited
                uses of the Service. You shall comply with any codes of conduct,
                policies, storage limitations, or other notices BluAgent
                provides you or publishes in connection with the Service from
                time to time, but if any of those policies materially change the
                terms, we will provide you with reasonable notice as provided in
                Section 5 below.
              </p>

              <p>
                3.2. Any Software or any of Our Content that may be made
                available by or on behalf of BluAgent in connection with the
                Service contains proprietary and confidential information that
                is protected by applicable intellectual property and other laws.
                Subject to these Terms, BluAgent only grants you a personal,
                non-sublicensable, non-exclusive and revocable license to use
                the object code of any Software solely in connection with the
                Service. Any rights not expressly granted herein are reserved.
              </p>

              <p>
                3.3. Subject to your compliance with these Terms, BluAgent
                grants you a limited, non-exclusive, non-transferable,
                non-sublicensable and revocable license to download and install
                a copy of the App on a mobile device or computer that you own or
                control and to run such copy of the App. BluAgent reserves all
                rights in and to the App not expressly granted to you under
                these Terms.
              </p>
              <p>
                3.4. You may not share your Account information with, or allow
                access to your Account by, any third party. You are solely
                responsible for all activity that occurs under your access
                credentials, whether or not a third party accesses your Account.
              </p>

              <p>
                3.5. You shall promptly notify BluAgent if you learn of a
                security breach related to the Service.
              </p>

              <p>4. Your Data and Your Ownership of Your Data</p>

              <p>
                4.1. "Your Data" means any data and content you create, post,
                upload, transmit or otherwise make available via the Services
                (which may include data you elect to import from Non-BluAgent
                Products you use). "Your Data" includes logs you create,
                location coordinates that are collected, messages you send,
                documents you upload, profile information and anything else you
                enter or upload into the Service. BluAgent will make
                commercially reasonable efforts to ensure that all facilities
                used to store and process Your Data meet a high standard for
                security. For more information on our current practices and
                policies regarding data privacy, security and confidentiality,
                please see our Privacy Policy; we keep that document updated as
                these practices and policies evolve over time.
              </p>
              <p>
                4.2. Your acceptance of these Terms does not grant us ownership
                of Your Data. As between BluAgent and you, you are only granting
                us the rights necessary to provide our Services to you. In order
                for us to provide the Services to you, we need to be able to
                transmit, store and copy Your Data in order to display it to
                you, to index it so you are able to search it, to make backups
                to prevent data loss, and so on. Your acceptance of these Terms
                gives us the permission to do so and grants us any such rights
                necessary to provide the Service to you, only for the purpose of
                providing the Service (and for no other purpose). This
                permission includes allowing us to use third-party service
                providers (such as Microsoft Azure) in the operation and
                administration of the Service and the rights granted to us are
                extended to these third parties to the degree necessary in order
                for the Service to be provided.
              </p>
              <p>
                4.3. You are solely responsible for your conduct (including by
                and between all users), the content of Your Data, and all
                communications with others while using the Services. You
                represent and warrant that you own all Your Data or you have all
                rights that are necessary to grant us the license rights in Your
                Data under these Terms. You also represent and warrant that
                neither Your Data, nor your use and provision of Your Data, nor
                any use of Your Data by BluAgent on or through the Services will
                infringe, misappropriate or violate a third party's intellectual
                property rights, or rights of publicity or privacy, or result in
                the violation of any applicable law or regulation. We are not
                responsible for the accuracy, appropriateness, or legality of
                Your Data or any other information you and your users may be
                able to access using the Services. Should you be in violation of
                these Terms, we have the right to remove any of Your Data
                causing such violation.
              </p>
              <p>
                4.4. The Services provide features that allow you and your users
                to share Your Data and other materials with others. When you
                choose to share Your Data through our Services, you are granting
                us the necessary rights and licenses to do so. Please consider
                carefully what you allow to be shared.
              </p>
              <p>
                4.5. While you retain ownership in all rights to your feedback
                and suggestions, you agree that by submitting suggestions or
                other feedback regarding our Services or BluAgent, BluAgent may
                use such feedback for any purpose without compensation to you.
                We appreciate all of your feedback and suggestions, and you can
                submit Feedback by emailing us at feedback@bluagent.com.
              </p>

              <p> 5. Changes to Terms of Services</p>
              <p>
                5.1. We may modify these Terms at any time, in our sole
                discretion. If we do so, we'll let you know either by posting
                the modified Terms on the Site or through other communications.
                It's important that you review the modified Terms because if you
                continue to use the Services after we've let you know that the
                Terms have been modified, you are indicating to us that you
                agree to be bound by the modified Terms. If you don't agree to
                be bound by the modified Terms then you may no longer use the
                Services. Because our Services are evolving over time we may
                change or discontinue all or any part of the Services, at any
                time and without notice, at our sole discretion.
              </p>

              <p>6. Limitations on Services and Third-Party Relationships</p>
              <p>
                6.1. BluAgent is not a party to any relationships or agreements
                between you and any third parties for the performance of any
                duties between the parties, and does not have control over and
                disclaims all liability for the quality, timing, legality,
                failure to provide, or any other aspect whatsoever of any
                professional duties performed by you or other users of the
                Services. BluAgent acts only as an interface to facilitate-not
                to direct or control-communications between users of BluAgent's
                Services.
              </p>

              <p>7. Who May Use the Services</p>
              <p>
                7.1. You may use the Services only if you are 18 years or older
                and capable of forming a binding contract with BluAgent and are
                not barred from using the Services under applicable law.
              </p>
              <p>
                7.2. If you want to access and use the Services, you'll have to
                create an account ("Account"). You can do this via the Services.
                It's important that you provide us with accurate, complete and
                up-to-date information for your Account and you agree to update
                such information to keep it accurate, complete and up-to-date.
                If you don't, we might have to suspend or terminate your
                Account. You agree that you won't disclose your Account password
                to anyone and you'll notify us immediately of any unauthorized
                use of your Account. You're responsible for all activities that
                occur under your Account, whether or not you know about them.
              </p>

              <p>
                8. Warnings and Awareness About Connections Between Drivers and
                Companies
              </p>
              <p>
                8.1. The Services enable a commercial motor vehicle driver
                ("Driver") to connect directly with a motor carrier ("Company"),
                allowing Drivers to send messages and automatically share their
                documents, location information and other data ("Driver Data")
                with the Company. When Drivers connect with a Company through
                the Services, the Company's employees and other third parties
                who are also connected to that Company ("Fleet Users") may
                access Driver Data for all Drivers who are connected to that
                same Company.
              </p>
              <p>
                8.2. If a Driver connects with a Company, the Driver should be
                aware that the Driver's Driver Data will be automatically shared
                with that Company and its Fleet Users and that Company and its
                Fleet Users will be able to send messages to that Driver. Please
                consider carefully the parties with whom you choose to connect
                and what you choose to share. BluAgent's role in this process is
                solely to provide the technology and platform that enables these
                services. Please see the Section 4 above and Section 11 below,
                as well as the rest of these Terms, for further specific
                provisions outlining your responsibility for anything shared
                through the Services.
              </p>

              <p>9. Payment Terms</p>
              <p>
                9.1. BluAgent offers paid Services ("Paid Services"). A
                description of the Paid Services is available at
                bluagent.com/pricing. In order to request Paid Services, you
                must submit and agree to the terms of an order form ("Order
                Form"). To the extent you use any of our Paid Services, you will
                be required to provide BluAgent accurate information regarding
                your credit card or other payment instrument. You will promptly
                update your Account information with any changes in your payment
                information. If you do not update your Account with changes in
                your payment information, we may suspend or terminate your
                subscription to the Paid Services. You agree to pay BluAgent in
                accordance with the terms set forth on the Order Form and these
                Terms, and you authorize BluAgent to bill your payment
                instrument in advance on a periodic basis in accordance with
                such terms. Please be aware that the pricing for the Paid
                Services will be governed by the terms in your Order Form and
                not the pricing set forth at bluagent.com/pricing.
              </p>
              <p>
                9.2. If you dispute any charges you must let BluAgent know
                within sixty (60) days after the date that BluAgent invoices
                you. All amounts paid are non-refundable and we reserve the
                right to change our prices in the future. BluAgent may choose to
                bill you through an invoice, in which case, full payment for
                invoices issued must be received by the date specified in the
                invoice.{' '}
              </p>
              <p>
                9.3. You are responsible to pay any and all taxes that we may be
                required to collect or pay based on providing the Services other
                than taxes based on our net income.
              </p>

              <p>10. Privacy Policy</p>
              <p>
                Please refer to our Privacy Policy information on how we
                collect, use and disclose information from our users
              </p>

              <p>11. General Prohibitions</p>
              <p>
                11.1. IT IS STRICTLY FORBIDDEN TO USE THE BLUAGENT APP WHILE
                DRIVING.
              </p>
              <p>11.2. You further agree not to do any of the following:</p>
              <p>
                11.2.1. Post, upload, publish, submit or transmit anything that:
                (i) infringes, misappropriates or violates a third party's
                patent, copyright, trademark, trade secret, moral rights or
                other intellectual property rights, or rights of publicity or
                privacy; (ii) violates, or encourages any conduct that would
                violate, any applicable law or regulation or would give rise to
                civil liability; (iii) is fraudulent, false, misleading or
                deceptive; (iv) is defamatory, obscene, pornographic, vulgar or
                offensive; (v) promotes discrimination, bigotry, racism, hatred,
                harassment or harm against any individual or group; (vi) is
                violent or threatening or promotes violence or actions that are
                threatening to any person or entity; or (vii) promotes illegal
                or harmful activities or substances;
              </p>
              <p>
                11.2.2. Use, display, mirror or frame the Services, or any
                individual element within the Services, BluAgent's name, any
                BluAgent trademark, logo or other proprietary information, or
                the layout and design of any page or form contained on a page,
                without BluAgent's express written consent;
              </p>
              <p>
                11.2.3. Access, tamper with, or use non-public areas of the
                Services, BluAgent's computer systems, or the technical delivery
                systems of BluAgent's providers;
              </p>
              <p>
                11.2.4. Attempt to probe, scan, or test the vulnerability of any
                BluAgent system or network or breach any security or
                authentication measures;
              </p>
              <p>
                11.2.5. Avoid, bypass, remove, deactivate, impair, descramble or
                otherwise circumvent any technological measure implemented by
                BluAgent or any of BluAgent's providers or any other third party
                (including another user) to protect the Services;
              </p>
              <p>
                11.2.6. Attempt to access or search the Services or download any
                Software or Our Content from the Services through the use of any
                engine, software, tool, agent, device or mechanism (including
                spiders, robots, crawlers, data mining tools or the like) other
                than the software and/or search agents provided by BluAgent or
                other generally available third party web browsers;
              </p>
              <p>
                11.2.7. Send any unsolicited or unauthorized advertising,
                promotional materials, email, junk mail, spam, chain letters or
                other form of solicitation;
              </p>
              <p>
                11.2.8. Use any meta tags or other hidden text or metadata
                utilizing a BluAgent trademark, logo, URL or product name
                without BluAgent's express written consent;
              </p>
              <p>
                11.2.9. Use the Services for the benefit of any third party or
                in any manner not permitted by these Terms;
              </p>
              <p>
                11.2.10. Forge any TCP/IP packet header or any part of the
                header information in any email or newsgroup posting, or in any
                way use the Services to send altered, deceptive or false
                source-identifying information;
              </p>
              <p>
                11.2.11. Attempt to decipher, decompile, disassemble or reverse
                engineer any of the software used to provide the Services;
              </p>
              <p>
                11.2.12. Interfere with, or attempt to interfere with, the
                access of any user, host or network, including, without
                limitation, sending a virus, overloading, flooding, spamming, or
                mail-bombing the Services;
              </p>
              <p>
                11.2.13. Collect or store any personally identifiable
                information from the Services from other users of the Services
                without their express permission;
              </p>
              <p>
                11.2.14. Impersonate or misrepresent your affiliation with any
                person or entity;
              </p>
              <p>11.2.15. Violate any applicable law or regulation; or</p>
              <p>
                11.2.16. Encourage or enable any other individual to do any of
                the foregoing.
              </p>
              <p>
                11.3. Although we're not obligated to monitor access to or use
                of the Services or to review or edit any of Services or Your
                Data, we have the right to do so for the purpose of operating
                the Services, to ensure compliance with these Terms, or to
                comply with applicable law or other legal requirements. We
                reserve the right, but are not obligated, to remove or disable
                access to any of Our Content or Your Data, at any time and
                without notice, including, but not limited to, if we, at our
                sole discretion, consider any of Our Content or Your Data to be
                objectionable or in violation of these Terms. We have the right
                to investigate violations of these Terms or conduct that affects
                the Services. We may also consult and cooperate with law
                enforcement authorities to prosecute users who violate the law.
              </p>

              <p>12. Arbitration Agreement, Dispute Resolution and Releases</p>
              <p>
                PLEASE READ THIS SECTION CAREFULLY AS IT MAY AFFECT YOUR LEGAL
                RIGHTS AND YOUR RIGHT TO FILE A LAWSUIT IN COURT, YOUR RIGHT TO
                A JURY TRIAL AND YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION.
              </p>
              <p>
                Unless otherwise agreed to by both parties in writing, you and
                BluAgent agree that, in order to expedite and control the cost
                of any disputes, any legal or equitable claim arising out of or
                relating in any way to your use of the Services, or any use of
                the Services by a user to whom you provide access to your
                Account, or arising out of or relating to these Terms ("Claim")
                will be resolved as follows:
              </p>
              <p>
                12.1. Informal Dispute Resolution. Except with respect to Claims
                listed in Section 12.6, below, you and BluAgent agree to attempt
                to resolve any disputes informally before initiating any
                arbitration or other formal proceedings, and neither of us may
                start an arbitration or other formal proceeding for at least 30
                days after you contact us or we contact you regarding any
                dispute ("Informal Negotiation Period").
              </p>
              <p>
                12.2. Agreement to Arbitrate. If such dispute is not resolved
                within 30 days, you or BluAgent may initiate a formal
                arbitration proceeding in accordance with the terms in this
                Section 13. Except with respect to Claims listed in Section
                13.6, below, you and BluAgent agree to resolve any Claims
                relating to or arising from the Services or these Terms through
                final and binding arbitration in accordance with the terms in
                this Section 13.
              </p>
              <p>
                12.3. Arbitration Notice. If either you or BluAgent chooses to
                start an arbitration proceeding, the party initiating the
                proceeding will send a notice of its Claim ("Arbitration
                Notice") to the other party. You will send your Arbitration
                Notice by email to support@bluagent.com and by U.S. mail to:
              </p>
              <p>
                BluAgent Technologies, Inc 101 W Broadway, Suite 200 ,San Diego,
                CA 92101
              </p>
              <p>
                12.4. Arbitration Procedures. Any arbitration proceedings
                between you and us will be conducted under the commercial rules
                then in effect for the American Arbitration Association ("AAA"),
                except with respect to the provision of this agreement which
                bars class actions in Section 13.8 and any specific rules and
                procedures explicitly discussed in this Section 13.4. The award
                rendered by the arbitrator(s) shall include costs of
                arbitration, reasonable costs of expert and other witness and
                reasonable attorneys' fees. For claims less than $10,000, we
                will advance to you AAA's filing fees; provided, however, that
                such fees must be repaid to BluAgent if BluAgent prevails in the
                arbitration. Please see this link for the AAA's current rules
                and procedures or contact the AAA at 1-800-778-7879.
              </p>
              <p>
                12.5. Non-Appearance-Based Arbitration Option. Except with
                respect to the exceptions to arbitration below in Section 13.6,
                for Claims where the total amount of the award sought in
                arbitration is less than $10,000, the party seeking the award
                may choose non-appearance-based arbitration. If
                non-appearance-based arbitration is elected, the arbitration
                will be conducted online, by telephone, and/or solely based on
                written submissions to the arbitrator. The specific manner shall
                be chosen by the party initiating arbitration.
                Non-appearance-based arbitration involves no personal
                appearances by parties or witnesses unless otherwise mutually
                agreed to by the parties.
              </p>
              <p>12.6. Exceptions to the Agreement to Arbitrate.</p>
              <p>
                12.6.1. Notwithstanding the foregoing, the Arbitration Notice
                requirement and the Informal Negotiation Period do not apply to
                either lawsuits solely for injunctive relief to stop
                unauthorized use of the Services or lawsuits concerning
                copyrights, trademarks, moral rights, patents, trade secrets,
                claims of piracy or unauthorized use of the Services.
              </p>
              <p>
                12.6.2. Either you or BluAgent may assert claims which qualify
                for small claims court in San Diego, CA or in any United States
                county in which you either live or work.
              </p>
              <p>
                12.7. Opting Out of the Agreement to Arbitrate. You have the
                right to opt-out and not be bound by the binding agreement to
                arbitrate provided in these Terms by sending written notice of
                your decision to opt-out to support@BluAgent.com AND by U.S.
                Mail to BluAgent, 101 W Broadway, Suite 200, San Diego, CA
                92010. In order for your opting out to be valid, your notice
                must be sent within 30 days of first using the Services.
              </p>
              <p>
                12.8. No Class Actions. Unless you and BluAgent agree otherwise,
                you may only resolve disputes with us on an individual basis.
                Class actions, class arbitrations, private attorney general
                actions and consolidations with other Claims are not allowed.
                Neither you nor BluAgent may not consolidate a Claim or Claims
                as a plaintiff or a class member in a class action, a
                consolidated action or a representative action.
              </p>
              <p>
                12.9. Consent to Jurisdiction. If the agreement to arbitrate
                provided for in these Terms is found not to apply to you or your
                Claim, or if you or BluAgent challenges any arbitration award or
                seeks to have an arbitration award enforced, you and BluAgent
                agree that any judicial proceeding will be brought in the
                federal or state courts located in San Diego, CA. You and
                BluAgent consent and agree to both venue and personal
                jurisdiction in the federal and state courts located in San
                Diego, CA.
              </p>
              <p>
                12.10. Release from Third-Party Claims. Because BluAgent is not
                party to any agreements between you and any third parties or
                involved in the completion of any associated professional
                services, in the event that you have a dispute with one or more
                other Drivers, Fleet Users or Companies or other third parties,
                as applicable (each, an "Other Party"), you agree to address
                such dispute directly with the Other Party in question and you
                release BluAgent (and our officers, directors, agents,
                investors, subsidiaries, and employees from any and all claims,
                demands, or damages (actual or consequential)) of every kind and
                nature, known and unknown, suspected and unsuspected, disclosed
                and undisclosed, arising out of or in any way connected with
                such dispute.
              </p>

              <p>13. Links to Third Party Websites or Resources</p>
              <p>
                13.1. The Services may contain links to third-party websites or
                resources. We provide these links only as a convenience and are
                not responsible for the content, products or services on or
                available from those websites or resources or links displayed on
                such sites. You acknowledge sole responsibility for, and assume
                all risk arising from, your use of any third-party websites or
                resources.
              </p>

              <p>14. Digital Millennium Copyright Act</p>
              <p>
                14.1. We respect the ownership rights of artists and other
                content owners and creators and ask that you do too. We respond
                to notices that we receive regarding alleged infringement if
                they comply with the requirements of and process specified in
                the Digital Millennium Copyright Act of 1998 ("DMCA"). For an
                overview of the DMCA's notice and takedown procedures for
                allegedly infringing material, please see
                http://www.copyright.gov/legislation/dmca.pdf. For more
                comprehensive provisions please see
                http://www.copyright.gov/title17/92chap5.html#512.
              </p>
              <p>
                14.2. Upon receipt of a notice which complies with the DMCA, we
                will take whatever action we deem appropriate, including
                removing the allegedly infringing content from the Services and
                limiting or terminating use of the Services for any users who
                are infringing the property rights of others.
              </p>
              <p>
                14.3. Please note that this Section is intended to inform you
                and copyright owners of procedures under the DMCA and to comply
                with BluAgent's rights and obligations under the DMCA. This
                Section does not constitute legal advice, and it may be
                advisable to contact an attorney concerning your rights and
                obligations under the DMCA and any other applicable laws.
              </p>

              <p>15. Termination</p>
              <p>
                15.1. These Terms will continue in full force and effect unless
                and until your Account or these Terms are terminated as
                described herein.
              </p>
              <p>
                15.2. We may terminate your access to and use of the Services,
                at our sole discretion, at any time and without notice to you.
                You may cancel your Account at any time by sending an email to
                us at support@BluAgent.com. Upon any termination,
                discontinuation or cancellation of Services or your Account, all
                provisions of the Terms that should, by their nature, survive
                termination of this Terms will survive termination. Such
                provisions include, but are not limited to: Your Data and Your
                Ownership of Your Data; Disclaimers; Indemnity; Limitation of
                Liability; Arbitration Agreement, Dispute Resolution and
                Release; and General Terms; and provisions related to ownership.
              </p>
              <p>
                15.3. In the event that you have paid for Premium Services, and
                we terminate your Account in our own discretion with no fault of
                your own, we will refund you a proportionate amount of the fees
                paid for the Premium Services for the time from which we
                terminated your Account to the end of the then-current payment
                period.
              </p>
              <p>
                15.4. All accrued rights to payment shall survive termination of
                the Terms.
              </p>
              <p>
                15.5. Notwithstanding Section 15.2, please be aware that once
                your Account has been terminated, we no longer have any
                obligation to maintain or provide Your Data, and we may delete
                or destroy all copies of Your Data in our possession or control,
                unless legally prohibited.
              </p>

              <p>16. Disclaimers</p>
              <p>
                16.1. THE SERVICES ARE PROVIDED "AS IS," WITHOUT WARRANTY OF ANY
                KIND. WITHOUT LIMITING THE FOREGOING, WE EXPLICITLY DISCLAIM ANY
                IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, QUIET ENJOYMENT AND NON-INFRINGEMENT AND ANY WARRANTIES
                ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE. BLUAGENT
                EXPLICITLY DISCLAIMS ALL LIABILITY FOR ANY ACT OR OMISSION OF
                ANY DRIVER, FLEET USER, COMPANY OR OTHER THIRD PARTY. We make no
                warranty that the Services will meet your requirements or be
                available on an uninterrupted, secure, or error-free basis. We
                make no warranty regarding the quality, accuracy, timeliness,
                truthfulness, completeness or reliability of any of the Services
                or anything shared by any users of the Services.
              </p>
              <p>
                16.2. You are solely responsible for your interactions with
                other users on the Services. You are solely responsible for, and
                will exercise caution, discretion, common sense and judgment in,
                using the Services.
              </p>
              <p>
                16.3. Neither BluAgent nor its affiliates or licensors is
                responsible for the conduct of any user of BluAgent's Services.
                Your use of the Services and your use of Your Data in connection
                with the Services and performance of and participation in any
                professional services is at your sole risk and discretion and
                BluAgent hereby disclaims any and all liability to you or any
                third party relating thereto.
              </p>

              <p>17. Limitation of Liability</p>
              <p>
                17.1. NEITHER BLUAGENT NOR ANY OTHER PARTY INVOLVED IN CREATING,
                PRODUCING, OR DELIVERING THE SERVICES OR CONTENT WILL BE LIABLE
                FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES,
                INCLUDING LOST PROFITS, LOSS OF DATA OR GOODWILL, SERVICE
                INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR THE COST OF
                SUBSTITUTE SERVICES ARISING OUT OF OR IN CONNECTION WITH THESE
                TERMS OR FROM THE USE OF OR INABILITY TO USE THE SERVICES,
                WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING
                NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER LEGAL THEORY, AND
                WHETHER OR NOT BLUAGENT HAS BEEN INFORMED OF THE POSSIBILITY OF
                SUCH DAMAGE, EVEN IF A LIMITED REMEDY SET FORTH HEREIN IS FOUND
                TO HAVE FAILED OF ITS ESSENTIAL PURPOSE. SOME JURISDICTIONS DO
                NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR
                CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE ABOVE LIMITATION MAY
                NOT APPLY TO YOU.
              </p>
              <p>
                17.2. TO THE MAXIMUM EXTENT PERMITTED UNDER LAW, BLUAGENT DOES
                NOT ACCEPT ANY LIABILITY WITH RESPECT TO THE QUALITY OR FITNESS
                OF ANY PROFESSIONAL SERVICES PERFORMED BY USERS OF OUR SERVICES
                IN CONNECTION WITH THEIR USE OF THE SERVICES. BLUAGENT WILL NOT
                BE LIABLE TO YOU UNDER ANY CIRCUMSTANCES ARISING OUT OF THE
                MISUSE OF YOUR USER CONTENT BY THIRD PARTIES INCLUDING, WITHOUT
                LIMITATION, OTHER USERS WITH WHOM YOU HAVE CONNECTED THROUGH THE
                SERVICES OR ENTERED INTO AN AGREEMENT IN CONNECTION WITH THE
                PERFORMANCE OF PROFESSIONAL SERVICES. IN NO EVENT WILL
                BLUAGENT'S TOTAL LIABILITY ARISING OUT OF OR IN CONNECTION WITH
                THESE TERMS OR FROM THE USE OF OR INABILITY TO USE THE SERVICES
                OR CONTENT EXCEED THE GREATER OF (A) ONE HUNDRED DOLLARS ($100)
                OR (B) THE TOTAL AMOUNT OF FEES RECEIVED BY BLUAGENT FROM YOU
                FOR THE USE OF PREMIUM SERVICES DURING THE PAST SIX (6) MONTHS.
                THE LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL
                ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN BLUAGENT AND YOU.
              </p>
              <p>
                17.3. Any cause of action related to the Services or the Terms
                must commence within one (1) year after the cause of action
                arises. Otherwise, such cause of action is barred permanently.
              </p>

              <p>18. Indemnity</p>
              <p>
                18.1. You will indemnify, defend and hold harmless BluAgent and
                its officers, directors, employees and agents, from and against,
                and covenant not to sue them for any claims, disputes, demands,
                liabilities, damages, losses, and costs and expenses, including,
                without limitation, reasonable legal and accounting fees,
                arising out of or in any way connected with (i) your access to
                or use of the Services or Our Content; (ii) Your Data; (iii)
                your performance of or participation in professional services in
                connection with your use of the Services or Our Content; or (iv)
                your violation of these Terms. BluAgent reserves the right to
                control and conduct the defense of any matter subject to
                indemnification under these Terms. If BluAgent decides to
                control or conduct any such defense, you agree to cooperate with
                BluAgent's requests in assisting BluAgent's defense of such
                matters.
              </p>

              <p>19. General Terms</p>
              <p>
                19.1. Integration. These Terms constitute the entire and
                exclusive understanding and agreement between BluAgent and you
                regarding the Services, and these Terms supersede and replace
                any and all prior oral or written understandings or agreements
                between BluAgent and you regarding the Services. If for any
                reason a court of competent jurisdiction finds any provision of
                these Terms invalid or unenforceable, that provision will be
                enforced to the maximum extent permissible and the other
                provisions of these Terms will remain in full force and effect.
              </p>
              <p>
                19.2. Assignment. You may not assign or transfer these Terms, by
                operation of law or otherwise, without BluAgent's prior written
                consent. Any attempt by you to assign or transfer these Terms,
                without such consent, will be null and of no effect. BluAgent
                may freely assign or transfer these Terms without restriction.
                Subject to the foregoing, these Terms will bind and inure to the
                benefit of the parties, their successors and permitted assigns.
              </p>
              <p>
                19.3. Governing Law. The Terms and the relationship between you
                and BluAgent shall be governed by the laws of the State of
                California.
              </p>
              <p>
                19.4. Notices. Any notices or other communications provided by
                BluAgent under these Terms, including those regarding
                modifications to these Terms, will be given by BluAgent: (i) via
                email; or (ii) by posting to the Site. For notices made by
                e-mail, the date of receipt will be deemed the date on which
                such notice is transmitted.
              </p>
              <p>
                19.5. Waiver and Severability. BluAgent's failure to enforce any
                right or provision of these Terms will not be considered a
                waiver of those rights. The waiver of any such right or
                provision will be effective only if in writing and signed by a
                duly authorized representative of BluAgent. Except as expressly
                set forth in these Terms, the exercise by either party of any of
                its remedies under these Terms will be without prejudice to its
                other remedies under these Terms or otherwise. If any of these
                Terms are unenforceable, it will not affect the enforceability
                of the rest of the Terms.
              </p>

              <p>20. Contact Information</p>
              <p>
                If you have any questions about these Terms or the Services
                please contact us at support@bluagent.com or at 101 W Broadway,
                Suite 200, San Diego, CA 92101.
              </p>

              <h6 className='text-center'>PRIVACY POLICY</h6>

              <p>
                Protecting your private information is our priority. This
                Statement of Privacy applies to the www.bluagent.com and
                BluAgent, Technologies Inc. and governs data collection and
                usage. For the purposes of this Privacy Policy, unless otherwise
                noted, all references to BluAgent Technologies, Inc. include
                www.bluagent.com and BluAgent. The BluAgent website is an
                informational and online business website. By using the BluAgent
                website and mobile solutions, you consent to the data practices
                described in this statement.{' '}
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
                provide additional services in the future.{' '}
              </p>
              <p>
                BluAgent encourages you to review the privacy statements of
                websites you choose to link to from BluAgent so that you can
                understand how those websites collect, use and share your
                information. BluAgent is not responsible for the privacy
                statements or other content on websites outside of the BluAgent
                website.{' '}
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
                for permission to use the BluAgent website and mobile solutions.{' '}
              </p>
              <p>Opt-Out & Unsubscribe </p>
              <p>
                We respect your privacy and give you an opportunity to opt-out
                of receiving announcements of certain information. Users may
                opt-out of receiving any or all communications from BluAgent by
                contacting us here:{' '}
              </p>
              <p>- Web page: www.bluagent.com </p>
              <p>- Email: info@bluagent.com </p>
              <p>- Phone: 619-8785852 </p>
              <p>Changes to this Statement </p>
              <p>
                BluAgent will occasionally update this Statement of Privacy to
                reflect company and customer feedback. BluAgent encourages you
                to periodically review this Statement to be informed of how
                BluAgent is protecting your information.{' '}
              </p>
              <p>Contact Information </p>
              <p>
                BluAgent welcomes your questions or comments regarding this
                Statement of Privacy. If you believe that BluAgent has not
                adhered to this Statement, please contact BluAgent at:{' '}
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

export default Terms;
