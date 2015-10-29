import React from 'react'

export default function withDisplayName(displayName) {
  return function wrapComponent(WrappedComponent) {
    return class DisplayNameSetter extends React.Component {
      static displayName = displayName
      render() {
        return <WrappedComponent />
      }
    }
  }
}
