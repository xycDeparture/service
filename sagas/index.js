import { fork } from 'redux-saga/effects'
import appSaga from '../controllers/app/sagas'
import mainSaga from '../controllers/main/sagas'
import myTimeSaga from '../controllers/mytime/sagas'
import netWorkTimeSaga from '../controllers/netWorkTime/sagas'
import myClientsSaga from '../controllers/myClients/sagas'
import clientAddSaga from '../controllers/clientAdd/sagas'
import myIntegralSaga from '../controllers/myIntegral/sagas'
import integralSaga from '../controllers/integralDetail/sagas'
import updateInfosSaga from '../controllers/updateInfos/sagas'
import apptSaga from '../controllers/appt/sagas'
import myVisitedCardSaga from '../controllers/myVisitedCard/sagas'
import managerLoginSaga from 'application/controllers/managerLogin/sagas'
import messageSaga from 'application/controllers/message/sagas'
import clientDetailSaga from '../controllers/clientDetail/sagas'
import orderRecordsSaga from '../controllers/orderRecords/sagas'
import apptDetailSaga from '../controllers/apptDetail/sagas'

export default function* entrySaga() {
    yield fork(appSaga)
    yield fork(mainSaga)
    yield fork(myTimeSaga)
    yield fork(netWorkTimeSaga)
    yield fork(myClientsSaga)
    yield fork(clientAddSaga)
    yield fork(myIntegralSaga)
    yield fork(integralSaga)
    yield fork(updateInfosSaga)
    yield fork(apptSaga)
    yield fork(myVisitedCardSaga)
    yield fork(managerLoginSaga)
    yield fork(messageSaga)
    yield fork(clientDetailSaga)
    yield fork(orderRecordsSaga)
    yield fork(apptDetailSaga)
}
