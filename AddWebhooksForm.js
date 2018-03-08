/* globals $ */
import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {ModalForm, CheckboxField} from './../forms'
import {addWebhooks, getWebhooks} from './../../models/webhooks'

const AddWebhooksForm = reduxForm({
  form: 'add webhooks',
  fields: ['url', 'sensor_data', 'alerts', 'images', 'videos', 'activities', 'inferences', 'building_id']
})(React.createClass({
  getInitialState () {
    return ({
      showErrorPopUp: false
    })
  },
  hideErrorPopup () {
    this.setState({showErrorPopUp: false, errorwebhookurl: null})
  },
  render () {
    const handleSubmit = values => (this.props.valid ? this.props.onAction(this.props.values).then(() => this.props.getWebhook()).then(() => this.props.onClosed())
    .catch(() => {
      this.setState({showErrorPopUp: true, errorwebhookurl: this.props.errorwebhookurl})
    }) : '')
    const {
      fields: {url, sensor_data, alerts, images, videos, activities, inferences, building_id}, onClosed, errorwebhookurl, ...props
    } = this.props

    return (
      <ModalForm className="ui form" title="Add Webhook" actionLabel="Add" onCancel={onClosed} onAction={handleSubmit}>
        <div className="ui form">
          <div className="one field">
            <h4>Webhook URL:</h4>
            <input type="url" id="url" placeholder="Webhook URL" {...url}/>
            {this.state.showErrorPopUp && url.valid && errorwebhookurl && <ErrorPopup error_message={this.props.errorwebhookurl} onClosed={this.hideErrorPopup} {...props} />}
            {url.touched && url.error && <div className="ui pointing red basic label">{url.error}</div>}
            <input type="hidden" id="building_id" {...building_id}/>
          </div>
            <div className="ui dividing header"></div>
              <div className="row" >
                <h4>Post these events:</h4>
                  <div className="ui hidden divider"></div>
                    <div className="one field">
                    <CheckboxField type="checkbox" label="Sensor Data" {...sensor_data} />
                    </div>
                  <div className="ui hidden divider"></div>
                    <div className="one field">
                    <CheckboxField type="checkbox" label="Alerts" {...alerts} />
                    </div>
                  <div className="ui hidden divider"></div>
                    <div className="one field">
                    <CheckboxField type="checkbox" label="Images" {...images} />
                    </div>
                  <div className="ui hidden divider"></div>
                    <div className="one field">
                    <CheckboxField type="checkbox" label="Videos" {...videos} />
                    </div>
                  <div className="ui hidden divider"></div>
                    <div className="one field">
                    <CheckboxField type="checkbox" label="Activities" {...activities} />
                  </div>
                  <div className="ui hidden divider"></div>
                    <div className="one field">
                    <CheckboxField type="checkbox" label="Inferences" {...inferences} />
                  </div>
              </div>
        </div>
      </ModalForm>
    )
  }
}))

const ErrorPopup = React.createClass({
  render () {
    return (
      <div className="ui modal small text-center second tiny">
        <div className="ui top attached message">
          <h2>INACTIVE URL</h2>
        </div>
        <div className="ui middle center aligned attached segment">
          <p>{this.props.error_message}</p>
        </div>
        <div className="ui bottom attached center aligned segment">
          <button className="ui center aligned primary button" onClick={this.props.onClosed}>Ok</button>
        </div>
      </div>
    )
  },
  componentDidMount () {
    $('.ui.modal.second')
      .modal({
        detachable: false,
        closable: true,
        onHidden: () => (this.props.onClosed())
      })
      .modal('show')
  },
  componentWillUnmount () {
    this.props.getWebhook()
    const isActive = $('.ui.modal.second').modal('is active')
    if (isActive) {
      $('.ui.modal.second').modal('hide')
    }
  }
})

export default connect((state, ownProps) => ({
  errorwebhookurl: state.webhooks.errorwebhookurl
}), (dispatch, ownProps) => ({
  getWebhook: (values) => dispatch(getWebhooks(ownProps.propertyId)),
  onAction: (values) => dispatch(addWebhooks(values))
}))(AddWebhooksForm)
