import React from 'react'
import {connect} from 'react-redux'
import AddWebhooks from './AddWebhooks'
import {getWebhooks, deleteWebhooks} from './../../models/webhooks'
import WebhooksLayout from './WebhooksLayout'

const WebhooksPage = React.createClass({
  getInitialState () {
    return {
      showAddWebhooksForm: false,
      showErrorPopup: false,
      errorwebhookurl: null
    }
  },
  handleWebhooksDeleteButton (webhook) {
    this.props.deleteWebhooks({'building_id': webhook.building_id, 'webhook_id': webhook.id})
  },
  hideUnhideAddWebhooksForm (hide) {
    this.setState({ showAddWebhooksForm: hide })
  },
  addNewWebhooksButtonClicked () {
    this.hideUnhideAddWebhooksForm(true)
  },
  onCancelActionOfWebhooksForm () {
    this.hideUnhideAddWebhooksForm(false)
  },
  componentDidMount () {
    this.props.getWebhooks()
  },
  render () {
    const {webhooks, webhook, ...props} = this.props
    return (
        <div>
          <div className="ui top attached message">
            <div className="ui container">
              <div className="left floated eight wide column">
                <div className="ui large header">
                  Webhooks
                </div>
              </div>
            </div>
          </div>
          <div className="ui middle attached segment" >
  <WebhooksList webhooks={webhooks} onDeleteWebhook={(webhook) => this.handleWebhooksDeleteButton(webhook)} webhook={webhook} />
  </div>
                <div className="ui bottom attached clearing segment">
  <button className={'ui basic button right floated'} onClick={this.addNewWebhooksButtonClicked}>
                  <i className="icon blue external url sign"/>
  Add New Webhook
  </button>
                </div>
                {this.state.showAddWebhooksForm && <AddWebhooks webhooks={webhooks} onClosed={this.onCancelActionOfWebhooksForm} {...props}/>}
        </div>
    )
  }
})

const WebhooksList = ({webhooks, onDeleteWebhook, webhook, ...props}) => (
  <div className="ui container">
    {webhooks.map(webhook => <WebhooksLayout key={webhook.id} onDeleteWebhook={onDeleteWebhook} webhooks={webhooks} webhook={webhook} {...props}/>)}
  </div>
)

export default connect(state => ({
  webhooks: state.webhooks.webhookslist || []
}), (dispatch, ownProps) => ({
  dispatch,
  getWebhooks: () => dispatch(getWebhooks(ownProps.params.propertyId)),
  deleteWebhooks: (values) => dispatch(deleteWebhooks(values)).then(() => dispatch(getWebhooks(values.building_id)))
}))(WebhooksPage)
