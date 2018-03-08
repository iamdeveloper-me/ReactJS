/* globals $ */
import React from 'react'
import AddWebhooksForm from './AddWebhooksForm'

const validate = values => {
  const required = value => value ? null : 'Required'
  const urlregex = url => (!/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(values.url || '')) ? 'Invalid URL' : null
  const errors = {}
  errors.url = required(values.url)
  errors.url = urlregex(values.url || '')
  if (!values.url) {
    errors.url = 'Required'
  } else if (urlregex(values.url)) {
    errors.url = 'Invalid URL'
  }
  return errors
}

const AddWebhooks = React.createClass({
  getInitialState () {
    return ({
      showAddWebhooksForm: false,
      showErrorPopup: false
    })
  },
  handleCancel () {
    this.props.getWebhooks()
    this.setState({showAddWebhooksForm: false})
  },
  render () {
    const initialValues = { sensor_data: false, alerts: false, images: false, videos: false, activities: false, inferences: false, building_id: this.props.params.propertyId }
    return <AddWebhooksForm onCancel={this.handleCancel} onClosed={this.props.onClosed} validate={validate} initialValues={initialValues} propertyId={this.props.params.propertyId}/>
  },
  componentDidMount () {
    $('.ui.modal')
      .modal({
        autofocus: false,
        detachable: false,
        closable: true,
        observeChanges: true,
        onHidden: () => this.props.onClosed(),
        allowMultiple: true
      })
      .modal('show')
  },
  componentWillUnmount () {
    const isActive = $('.ui.modal').modal('is active')
    if (isActive) {
      $('.ui.modal').modal('hide')
    }
  }
})

export default AddWebhooks
