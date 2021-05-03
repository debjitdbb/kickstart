import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component{

    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        // console.log(summary);
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
        };
    }

    renderCards(){
        const {
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = this.props;
        const items = [
          {
            header: manager,
            meta: "Address of Manager",
            description:
              "The manager created this campaign and can create requests to withdraw money",
            style: { overflowWrap: "break-word" },
          },
          {
            header: minimumContribution,
            meta: "Minimumm Contribution (Wei)",
            description:
              "You must contribute this much wei to become a contributer",
            style: { overflowWrap: "break-word" },
          },
          {
            header: requestsCount,
            meta: "Number of Requests",
            description:
              "A request tries to withdraw money from the contract. Request must be approved by approvers",
            style: { overflowWrap: "break-word" },
          },
          {
            header: approversCount,
            meta: "Number of approvers",
            description: "Number of people who have donated to the campaign",
            style: { overflowWrap: "break-word" },
          },
          {
            header: web3.utils.fromWei(balance,'ether'),
            meta: "Campaign balance (ether)",
            description:
              "The amount of money that this balance has left to spend",
            style: { overflowWrap: "break-word" },
          }
        ];

        return <Card.Group items = {items} />;
    }


    render(){
        return (
          <Layout>
            <h3>Campaign Show</h3>
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
                <Grid.Column width={6}>
                  <ContributeForm address={this.props.address} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                      <Button primary> View Requests</Button>
                    </a>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Layout>
        );
    }
}

export default CampaignShow;