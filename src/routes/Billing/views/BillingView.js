import React from 'react'
import { connect } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import componentDispatch from 'modules/component-dispatch'
import { actions as userActions, selectors as usersSelectors } from 'store/users'

const products = [
  {
    minUsers: 1,
    maxUsers: 50,
    stripeAmountPerUser: 2000
  },
  {
    minUsers: 51,
    maxUsers: 100,
    stripeAmountPerUser: 1500
  },
  {
    minUsers: 101,
    maxUsers: 1000000000,
    stripeAmountPerUser: 1000
  }
]

const BillingView = ({
  product,
  totalUsers,
  userActiveCount,
  userInactiveCount
}) => {
  return (
    <div>
      <h1>Your account currently has {totalUsers} users</h1>
      <div className='row'>
        <div className='col-md-3 col-md-offset-1'>
          <h3 className='text-muted'>{userActiveCount} active users</h3>
          <h3 className='text-muted'>{userInactiveCount} inactive users</h3>
        </div>
        <div className='col-md-3'>
          <h4>Pay for {userActiveCount} users</h4>
          <div>${(product.stripeAmountPerUser / 100)} per user</div>
          <br />
          <StripeCheckout
            token={(tok) => {
              alert('got token - ' + JSON.stringify(tok))
            }}
            stripeKey='pk_test_aMcdkt6IoZzehZQ7Y1Zz1brB'
            amount={product.stripeAmountPerUser * userActiveCount}
            panelLabel='Pay'
            name='Promere'
          />
        </div>
      </div>
    </div>
  )
}

BillingView.displayName = 'BillingView'
BillingView.propTypes = {
  product: React.PropTypes.object,
  totalUsers: React.PropTypes.number,
  userActiveCount: React.PropTypes.number,
  userInactiveCount: React.PropTypes.number
}

export default componentDispatch({
  willMount: (props, dispatch) => {
    dispatch(userActions.getUserList())
  }
})(connect((state) => {
  const activeCount = usersSelectors.getActiveCount(state)
  let product = products[0]
  if (activeCount > 50) {
    product = products[1]
  } else if (activeCount > 100) {
    product = products[2]
  }
  return {
    product,
    totalUsers: usersSelectors.getUsers(state).length,
    userActiveCount: activeCount,
    userInactiveCount: usersSelectors.getInactiveCount(state)
  }
})(BillingView))
