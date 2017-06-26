import React from 'react'
import { connect } from 'react-redux'

export default ({
  componentWillMount,
  componentDidMount,
  componentWillReceiveProps,
  shouldComponentUpdate,
  componentWillUpdate,
  componentDidUpdate,
  componentWillUnmount,

  // aliases
  willMount,
  didMount,
  willReceiveProps,
  willUpdate,
  didUpdate,
  willUnmount
}) => {
  return (InnerComponent) => {
    class ComponentDispatch extends React.Component {
      applyDispatch (func, nextProps) {
        const { dispatch, ...restProps } = this.props
        if (nextProps) {
          func(restProps, nextProps, dispatch)
        } else {
          func(restProps, dispatch)
        }
      }

      componentWillMount () {
        const func = willMount || componentWillMount
        if (func) {
          this.applyDispatch(func)
        }
      }

      componentDidMount () {
        const func = didMount || componentDidMount
        if (func) {
          this.applyDispatch(func)
        }
      }

      componentWillReceiveProps (nextProps) {
        const func = willReceiveProps || componentWillReceiveProps
        if (func) {
          this.applyDispatch(func, nextProps)
        }
      }

      shouldComponentUpdate (nextProps, nextState) {
        if (shouldComponentUpdate) {
          return this.applyDispatch(shouldComponentUpdate, nextProps)
        } else {
          // React default is true
          return true
        }
      }

      componentWillUpdate (nextProps) {
        const func = willUpdate || componentWillUpdate
        if (func) {
          this.applyDispatch(func, nextProps)
        }
      }

      componentDidUpdate (prevProps) {
        const func = didUpdate || componentDidUpdate
        if (func) {
          const { dispatch, ...restProps } = this.props
          func(prevProps, restProps, dispatch)
        }
      }

      componentWillUnmount () {
        const func = willUnmount || componentWillUnmount
        if (func) {
          this.applyDispatch(func)
        }
      }

      render () {
        return (
          <InnerComponent {...this.props} />
        )
      }
    }

    ComponentDispatch.displayName = 'ComponentDispatch'
    ComponentDispatch.propTypes = {
      dispatch: React.PropTypes.func
    }

    return connect()(ComponentDispatch)
  }
}
