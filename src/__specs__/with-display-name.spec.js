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

  it('Lets original props pass through', () => {
    @withDisplayName('NewName')
    class TestComponent extends React.Component {
      render() {
        const contents = this.props.some ? 'GotIt' : 'DidntWork'
        return (
          <div className='contents'>{contents}</div>
        )
      }
    }
    const component = TestUtils.renderIntoDocument(<TestComponent some="prop" />)
    const div = TestUtils.findRenderedDOMComponentWithClass(component, 'contents')
    div.innerHTML.should.eql('GotIt')
  })

  it('Can distinguish displayName in props.children loop', () => {
    @withDisplayName('Person')
    class CompType1 extends React.Component {
      render() {
        return <div>person</div>
      }
    }

    @withDisplayName('Cat')
    class CompType2 extends React.Component {
      render() {
        return <div>cat</div>
      }
    }

    const parent = (
      <div>
        <CompType1 />
        <CompType2 />
        <CompType1 />
      </div>
    )

    const component = TestUtils.renderIntoDocument(parent)

    React.Children.count(component.props.children).should.eql(3)
    getDisplayName(component.props.children[0].type).should.eql('Person')
    getDisplayName(component.props.children[1].type).should.eql('Cat')
    getDisplayName(component.props.children[2].type).should.eql('Person')
  })

  it('works with compiled code', () => {
    
  })

  it('works with external files', () => {

  })

})
