# react-with-display-name

Set a predictable `displayName` for components wrapped in higher-order components

## Install

```
npm install react-with-display-name --save
```

## Enjoy

Have you ever wrapped your component in a higher-order component and then lost your `displayName`?  There is no set way to either preserve or change the displayName at the higher-order component level.  In order to get your `displayName` back and make it reliable, wrap your higher-order component in this higher-order component that is purely in charge of setting your `displayName`.


(from the specs...)
```
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

// Makes certain that the displayName is 'ShavedYak', instead of the 'wrapComponentThang' that the newWrapper decoration gives it
getDisplayName(TestComponent).should.eql(origDisplayName)
```
