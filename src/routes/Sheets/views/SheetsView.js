import React from 'react'
import { actions as sheetActions } from 'store/sheets'
import componentDispatch from 'modules/component-dispatch'

import {
  AddRecordButtonContainer,
  RecordFormModalContainer,
  SheetContainer,
  SearchRecordsContainer,
  FieldModalContainer
} from '../containers'
// import { selectors } from 'store/users'

const SheetsView = () => {
  return (
    <section className='app-content'>
      <div>
        <div className='row'>
          <div className='col-md-3 col-sm-3'>
            <AddRecordButtonContainer />
            <RecordFormModalContainer />
          </div>
          <div className='col-md-9 col-sm-9'>
            <SearchRecordsContainer />
          </div>
        </div>
        <FieldModalContainer />
        <div className='row'>
          &nbsp;
        </div>

        <SheetContainer />
      </div>
    </section>
  )
}

SheetsView.displayName = 'SheetsView'
SheetsView.propTypes = {}

export default componentDispatch({
  componentWillReceiveProps: (props, nextProps, dispatch) => {
    if (nextProps.params.id) {
      dispatch(sheetActions.requestSheet(nextProps.params.id))
    }
  }
})(SheetsView)
