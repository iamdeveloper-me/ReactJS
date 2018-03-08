import React from 'react'
import {CheckboxField} from './../forms'

export default React.createClass({
  deleteWebhooks (webhook) {
    this.props.onDeleteWebhook(webhook)
  },
  render () {
    const {webhook} = this.props
    return (
      <div className="ui segment">
        <div className="ui grid ">
          <div className="one row">
            <a className="item">
              <div webhook={webhook} className="ui horizontal label">Webhook URL</div>
              {webhook.url}
            </a>
          </div>
          <div className="two wide column">
            <CheckboxField type="checkbox" className="ui read-only" webhook={webhook} checked={webhook.enabled_hooks.sensordata} label="Sensor Data"/>
          </div>
          <div className="two wide column">
            <CheckboxField type="checkbox" className="ui read-only" webhook={webhook} checked={webhook.enabled_hooks.alert} label="Alerts"/>
          </div>
          <div className="two wide column">
            <CheckboxField type="checkbox" className="ui read-only" webhook={webhook} checked={webhook.enabled_hooks.image} label="Images"/>
          </div>
          <div className="two wide column">
            <CheckboxField type="checkbox" className="ui read-only" webhook={webhook} checked={webhook.enabled_hooks.video} label="Videos"/>
          </div>
          <div className="two wide column">
            <CheckboxField type="checkbox" className="ui read-only" webhook={webhook} checked={webhook.enabled_hooks.activity} label="Activities"/>
          </div>
          <div className="two wide column">
            <CheckboxField type="checkbox" className="ui read-only" webhook={webhook} checked={webhook.enabled_hooks.inference} label="Inferences"/>
          </div>
          <div className="four wide column">
            <button webhook={webhook} className="ui compact circular black icon right floated button" id={webhook.id} onClick={() => this.deleteWebhooks(this.props.webhook)} >
              <i className = "trash icon"/>
            </button>
          </div>
        </div>
      </div>
    )
  }
})
