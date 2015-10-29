import getDisplayName from 'react-display-name'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

import withDisplayName from '../with-display-name'

describe('with-display-name', () => {

  it('provides a displayName to components with no displayName', () => {
    const whoAmI = 'JeanValjean'
    @withDisplayName(whoAmI)
    class HorseWithNoName extends React.Component {
      render() {
        return (
          <div>America</div>
        )
      }
    }
    getDisplayName(HorseWithNoName).should.eql(whoAmI)
  })

  it('provides a new displayName to components with existing displayName', () => {
    const newName = 'MrHyde'
    @withDisplayName(newName)
    class AlterEgo extends React.Component {
      static displayName = 'DrJekyll'
      render() {
        return (
          <div>Very Unstable</div>
        )
      }
    }
    getDisplayName(AlterEgo).should.eql(newName)
  })

  it('provides a reliable displayName to wrapped components', () => {
    const origDisplayName = 'ShavedYak'

    function newWrapper() {
      return function wrapComponentThang() {
        return class NewWrapper extends React.Component {
          render() {
            return <div>{this.props.children}</div>
          }
        }
      }
    }

    @withDisplayName(origDisplayName)
    @newWrapper
    class TestComponent extends React.Component {
      static displayName = origDisplayName
      render() {
        return (
          <div>Wrap Me</div>
        )
      }
    }

    getDisplayName(TestComponent).should.eql(origDisplayName)
  })

})
